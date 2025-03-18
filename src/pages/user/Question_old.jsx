import React, { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Mic, MicOff, LogOut, ArrowRight, Volume2, AlertTriangle } from "lucide-react"
import CryptoJS from "crypto-js"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you want to close your interview? You can Resume your interview from My Scores.
        </p>
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

const Question = () => {
  const [questions, setQuestions] = useState(null)
  const [statusCode, setStatusCode] = useState("")
  const [totalQuestions, setTotalQuestions] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [remain_que, setRemainQue] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showTimer, setShowTimer] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [timeUpDialog, setTimeUpDialog] = useState(false)
  const [showNonEnglishAlert, setShowNonEnglishAlert] = useState(false)
  const [showErrorMessage, setshowErrorMessage] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showLastDialog, setShowLastDialog] = useState(false)

  const API_BASE_URL = process.env.REACT_APP_BASE_URL
  const authToken = localStorage.getItem("auth_code")
  const sessionId = localStorage.getItem("session_id")

  const navigate = useNavigate()
  const location = useLocation()
  const prevLocationRef = useRef(location)
  const timerRef = useRef(null)
  const speechTimeoutRef = useRef(null)

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const progress = ((totalQuestions - remain_que) / totalQuestions) * 100

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = "Do you want to leave?"
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      stopRecording()
      window.speechSynthesis.cancel()
      clearInterval(timerRef.current)
      clearTimeout(speechTimeoutRef.current)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, []) // Removed reloadKey dependency

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout()
    }
  }, [timeLeft])

  useEffect(() => {
    const handlePushState = () => {
      window.history.pushState({ modalVisible: true }, "")
    }

    const handlePopState = () => {
      if (window.history.state?.modalVisible) {
        setShowModal(true)
        window.history.pushState({ modalVisible: true }, "")
      } else {
        navigate(-1)
      }
    }

    handlePushState()
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [navigate])

  useEffect(() => {
    setTranscribedText(transcript)
  }, [transcript])

  const handleModalConfirm = () => {
    setShowModal(false)
    navigate("/dashboard", { state: { activeTab: "my-interview" } })
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  const hasFetched = useRef(false)

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchQuestions(authToken, sessionId)
    }
  }, [authToken, sessionId])

  const fetchQuestions = (authToken, sessionId) => {
    fetch(`${API_BASE_URL}/next-question/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to fetch questions")
          setTimeout(() => {
            navigate("/dashboard", { state: { activeTab: "my-interview" } })
          }, 3000)
          return
        }
        return response.json()
      })
      .then((data) => {
        const questions = data.data?.data?.question_data
        const questionId = data.data?.data?.question_id
        const remaining_questions = data.data?.data?.remaining_questions
        const total_questions = data.data?.data?.total_questions
        const statuscode = data.data.status

        if (!questions) {
          toast.error("Failed to fetch questions")
          setTimeout(() => {
            navigate("/dashboard", { state: { activeTab: "my-interview" } })
          }, 3000)
          return
        } else {
          localStorage.setItem("question_id", questionId)
          setQuestions(questions)
          setRemainQue(remaining_questions)
          setTotalQuestions(total_questions)
          setStatusCode(statuscode)
          resetTimer()
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch questions")
        setTimeout(() => {
          navigate("/dashboard", { state: { activeTab: "my-interview" } })
        }, 3000)
        return
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (questions && questions.question) {
      if (!document.hidden) {
        speak(questions.question)
      }
    }
  }, [questions])

  const speak = (text) => {
    if ("speechSynthesis" in window && !document.hidden) {
      setIsSpeaking(true)
      setShowTimer(false)
      clearInterval(timerRef.current)
      const utterance = new SpeechSynthesisUtterance(text)

      utterance.onend = () => {
        setIsSpeaking(false)
        startRecording()
        resetTimer()
        setShowTimer(false)
      }

      window.speechSynthesis.cancel()

      setTimeout(() => {
        if (!document.hidden) {
          window.speechSynthesis.speak(utterance)
        }
      }, 100)
    } else {
      toast.error("Text-to-Speech not supported in this browser.")
    }
  }

  const startRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }

    try {
      SpeechRecognition.startListening({ continuous: true })
      setIsRecording(true)
    } catch (error) {
      toast.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    SpeechRecognition.stopListening()
    setIsRecording(false)
  }

  const nextQuestion = async () => {
    stopRecording()
    await saveRecording()
    setTranscribedText("")
    resetTranscript() // Reset the transcript for the next question
    setShowNonEnglishAlert(false)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    setTimeLeft(60)
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current)
          handleTimeout()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const handleTimeout = () => {
    stopRecording()
    clearInterval(timerRef.current)
    setTimeUpDialog(true)
  }

  const handlelastConfirmation = () => {
    setShowLastDialog(true)
  }

  const handleExitConfirmation = () => {
    setShowExitDialog(true)
  }

  const completeSession = () => {
    if (!authToken || !sessionId) {
      toast.error("Auth token or session ID is missing!")
      return
    }

    fetch(`${API_BASE_URL}/complete_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        //console.log(data);
        if(data.status === "completed"){}
          
      })
      .catch((err) => {
        toast.error("Complete Session error:", err.message)
        setError("Complete Session Error")
      })
      .finally(() => setLoading(false))
  }

  const handleLambda = async () => {
    if (!authToken || !sessionId) {
      toast.error("Auth token or session ID is missing!");
      return;
    }
  
    const LAMBDA_URL = "https://prod.chocosoft.in/jsr-ai-crack-visa-question_feed";
  
    try {
      console.log("Sending request to Lambda with session_id:", sessionId);
  
      const response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ session_id: String(sessionId) }),
      });
  
      console.log("Raw response status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Lambda HTTP error:", errorText);
        toast.error(`Lambda HTTP error! Status: ${response.status}`);
        return;
      }
  
      const lambdaData = await response.json();
      console.log("Lambda response JSON:", lambdaData);
  
      if (lambdaData.status === "success") {
        if (!lambdaData.feedback || lambdaData.feedback.length === 0) {
          console.warn("Warning: No feedback data returned from Lambda.");
          toast.warning("No feedback data found.");
        } else {
          console.log("Feedback received:", lambdaData.feedback);
        }
        
        navigate("/dashboard", { state: { activeTab: "my-scores" } });
      } else {
        console.error("Unexpected response format:", lambdaData);
        toast.error("Unexpected response from Lambda.");
      }
    } catch (error) {
      console.error("Lambda Request Failed:", error);
      toast.error("Lambda Error: " + error.message);
    }
  }

  const handleExitConfirmed = async () => {
    try {
      await completeSession();
      await handleLambda();
      //await Promise.all([completeSession(), handleLambda()])
    } catch (error) {
      toast.error("Error while exiting the interview:", error)
      toast.error("An error occurred while exiting the interview. Please try again.")
    }
  }

  const handleSubmitConfirmed = async () => {
    try {
      if (statusCode === "success") {
           await completeSession();
            await handleLambda();
        //await Promise.all([completeSession(), handleLambda()])
      } else {
        console.log("Questions are not completed yet.")
      }
    } catch (error) {
      toast.error("Error while exiting the interview:", error)
    }
  }

  const saveRecording = async () => {
    if (isRecording) {
      stopRecording()
    }
    const textToSave = transcribedText.trim() || "No Answer"

    const blob = new Blob([textToSave], { type: "text/plain" })

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result.split(",")[1])
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })

    try {
      const authToken = localStorage.getItem("auth_code")
      const session_Id = localStorage.getItem("session_id")
      const question_Id = localStorage.getItem("question_id")

      const response = await fetch(`${API_BASE_URL}/submit-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          session_id: session_Id,
          question_id: question_Id,
          user_answer: textToSave,
        }),
      })

      if (!response.ok) {
        toast.error(`Error: ${response.status}`)
        return
      }

      if (remain_que > 0) {
        fetchQuestions(authToken, sessionId)
      } else {
        handlelastConfirmation()
      }
    } catch (error) {
      toast.error("Failed to upload the file:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  if (!questions) {
    return <div className="text-center p-4">No questions available for this interview.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-600 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {timeLeft > 0 && (
            <div className="top-4 right-4 z-50 w-full">
              <div className="bg-white shadow-lg border rounded-xl p-4">
                <div className="text-2xl font-bold tabular-nums">
                  {timeLeft < 10 && timeLeft > 0 ? (
                    <span className="text-red-500">{timeLeft}</span>
                  ) : (
                    <span>{timeLeft}</span>
                  )}
                  <span className="text-gray-500 text-lg ml-1">sec</span>
                  <span className="text-gray-700 text-lg text-center ml-60">Interview Question</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2 mb-4 mt-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-medium text-yellow-600">Total Questions:</span>
                <span className="ml-1 text-gray-500">{totalQuestions}</span>
              </div>
              <div>
                <span className="font-medium text-red-500">Remaining:</span>
                <span className="ml-1 text-gray-500">{remain_que}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative bg-gray-100 p-6 rounded-lg border">
              <p className="text-lg md:text-xl text-gray-800">{questions.question}</p>
              {isSpeaking && (
                <div className="absolute bottom-4 right-4 text-blue-500 animate-pulse">
                  <Volume2 className="h-6 w-6" />
                </div>
              )}
            </div>

            {!browserSupportsSpeechRecognition && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                <div className="flex">
                  <div className="py-1">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" />
                  </div>
                  <div>
                    <p className="font-bold">Browser not supported</p>
                    <p>Your browser doesn't support speech recognition. Please try using a different browser.</p>
                  </div>
                </div>
              </div>
            )}

            {isRecording && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                <div className="flex">
                  <div className="py-1">
                    <Mic className="h-6 w-6 text-green-500 mr-4" />
                  </div>
                  <div>
                    <p className="font-bold">Recording in progress...</p>
                  </div>
                </div>
              </div>
            )}

            <div className="min-h-[150px] max-h-[250px] overflow-y-auto bg-gray-100 rounded-lg border p-4">
              <p className="text-gray-600">{transcribedText || "Your answer will appear here..."}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex w-full sm:w-auto gap-4">
              <button
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg border bg-red-500 text-white hover:bg-red-600"
                onClick={handleExitConfirmation}
              >
                <LogOut className="inline-block mr-2 h-4 w-4" /> Exit Interview
              </button>
            </div>
            {remain_que > 0 ? (
              <button
                className="w-full sm:w-auto sm:ml-auto px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                onClick={() => {
                  nextQuestion()
                  setTimeLeft(60)
                }}
              >
                <span>Next Question</span>
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                className="w-full sm:w-auto sm:ml-auto px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                onClick={handlelastConfirmation}
              >
                Submit Interview
              </button>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Interview Alert!</h3>
            <p className="text-gray-600 mb-6">You have finished with your Interview!</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                onClick={handleExitConfirmed}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showExitDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Exit Interview?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to exit? This will consider you complete with the interview.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                onClick={() => setShowExitDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                onClick={handleExitConfirmed}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
      {timeUpDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Time's Up!</h3>
            <p className="text-gray-600 mb-6">Time is up for this question! Ready to proceed to the next question?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                onClick={() => {
                  setTimeUpDialog(false)
                  nextQuestion()
                  setTimeLeft(60)
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {showLastDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Interview Alert!</h3>
            <p className="text-gray-600 mb-6">You have finished with your Interview!</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                onClick={handleSubmitConfirmed}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && <ConfirmationModal onConfirm={handleModalConfirm} onCancel={handleModalCancel} />}
    </div>
  )
}

export default Question


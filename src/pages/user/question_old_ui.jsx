import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CryptoJS from "crypto-js";
import { franc } from "franc";
import { Mic, MicOff, LogOut, ArrowRight, Volume2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const Question = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [interview_id, setInterviewId] = useState(null);
  const [num_questions, set_id] = useState(null);
  const [remain_que, setRemainQue] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showTimer, setShowTimer] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [timeUpDialog, setTimeUpDialog] = useState(false); // Added state for time-up dialog
  const [showNonEnglishAlert, setShowNonEnglishAlert] = useState(false);
  const [showErrorMessage, setshowErrorMessage] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const encryptionKey = "!@115588lkjh";
  const { encryptedInterviewId, encryptedId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const speechTimeoutRef = useRef(null);

  const progress = ((totalQuestions - remainingQuestions) / totalQuestions) * 100

 useEffect(() => {
    try {
      const decodedInterviewId = decodeURIComponent(encryptedInterviewId);
      const decodedId = decodeURIComponent(encryptedId);

      setInterviewId(
        CryptoJS.AES.decrypt(decodedInterviewId, encryptionKey).toString(
          CryptoJS.enc.Utf8
        )
      );
      set_id(
        CryptoJS.AES.decrypt(decodedId, encryptionKey).toString(
          CryptoJS.enc.Utf8
        )
      );
    } catch (error) {
      console.error("Decryption error:", error);
    }

    if (interview_id && num_questions) {
      loadInterviewAndFetchQuestions(interview_id, num_questions);
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Do you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      stopRecording();
      window.speechSynthesis.cancel();
      clearInterval(timerRef.current);
      clearTimeout(speechTimeoutRef.current);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Clear speech queue on unmount
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [reloadKey, interview_id, num_questions]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft]);

  useEffect(() => {
    // Check if the location changed
    if (prevLocationRef.current !== location) {
      // Handle back or forward navigation
      handleExitConfirmed();
    }
    // Update the previous location ref
    prevLocationRef.current = location;
  }, [location]);

  const loadInterviewAndFetchQuestions = async (
    interview_id,
    num_questions
  ) => {
    try {
      setLoading(true);
      setError(null);
      const authToken = localStorage.getItem("auth_code");
      const loadInterviewResponse = await fetch(
        `${API_BASE_URL}/start-interview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            interview_id: String(interview_id), // Convert to string
            total_questions: parseInt(num_questions, 10), // Convert to integer
          }),
        }
      );
      if (!loadInterviewResponse.ok) {
        throw new Error(
          `Failed to load interview! Status: ${loadInterviewResponse.status}`
        );
      }

      const responseData = await loadInterviewResponse.json();
      const questionsData = responseData.data;

      // console.log("loadInterviewResponse response:",questionsData);

      const remain_que = questionsData.remaining_questions.length;

      setRemainQue(remain_que);

      const totalQuestions = num_questions;
      const remainingQuestions = remain_que;
      const currentQuestion = questions.question;

      const sessionId = questionsData.session_id;
      
       localStorage.setItem("session_id", sessionId);

      await fetchQuestions(sessionId);
    } catch (err) {
      console.error("Error in loadInterviewAndFetchQuestions:", err);
      
      setError(
        "Failed to load interview or questions. Please try again later."
      );
   
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (sessionId) => {
  
    

    try {
        const authToken = localStorage.getItem("auth_code");
        const response = await fetch(
            `https://api.crackvisa.com/next-question/${sessionId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch questions! Status: ${response.status}`);
        }

        const data = await response.json();
        const questions = data.data?.data?.question_data;
        const questionId = data.data?.data?.question_id;

        if (!questions) {
          // No more questions, interview is finished
          navigate("/dashboard", { 
            state: { 
              message: "You have finished the interview! Please go to Scores.",
              activeTab: "my-scores" 
            } 
          });
          return;
        }

        localStorage.setItem("question_id", questionId);
        setQuestions(questions);
        resetTimer();
        
        // Update remaining questions count
        setRemainQue(prev => Math.max(0, prev - 1));
    } catch (err) {
        console.error("Error in fetchQuestions:", err);
        setError("Failed to fetch questions. Please try again later.");
    }
};


  // const nextQuestion = () => {
  //   setReloadKey((prevKey) => prevKey + 1);
  //   setTranscribedText("");
  // };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Stop speech when the page is hidden
        window.speechSynthesis.cancel();
        setIsSpeaking(false); // Ensure speaking state is reset
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (questions && questions.question) {
      // Only speak if the page is visible
      if (!document.hidden) {
        speak(questions.question);
      }
    }
  }, [questions]);

  const speak = (text) => {
    if ("speechSynthesis" in window && !document.hidden) {
      // Only speak if the page is visible
      setIsSpeaking(true);
      setShowTimer(false);
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onend = () => {
        setIsSpeaking(false);
        startRecording();
        resetTimer();
        setShowTimer(true);
      };

      // Cancel any ongoing speech before starting new one
      window.speechSynthesis.cancel();

      // Add a small delay before speaking to prevent race conditions
      setTimeout(() => {
        if (!document.hidden) {
          window.speechSynthesis.speak(utterance);
        }
      }, 100);
    } else {
      console.error("Text-to-Speech not supported in this browser.");
      alert("Your browser does not support text-to-speech.");
    }
  };

  const startRecording = async () => {
    try {
      // Check if SpeechRecognition is supported
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser.');
        return;
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
  
      // Stopping any ongoing speech recognition before initializing a new one
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
  
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US"; // Set language to English
  
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscribedText(transcript);
      };
  
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech" || event.error === "audio-capture") {
          alert("No microphone detected or permission denied!");
        }
      };
      setIsRecording(true);
      recognitionRef.current.start(); // Start speech recognition
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };
  


  const nextQuestion = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop the current recognition
    }
    saveRecording();
    stopRecording(); // Stop media recording
    
    if (remain_que <= 0) {
      // This was the last question
      navigate("/dashboard", { 
        state: { 
          message: "You have finished the interview!",
          activeTab: "my-scores" 
        } 
      });
    } else {
      setReloadKey((prevKey) => prevKey + 1); // Trigger reload
      setTranscribedText("");
      setShowNonEnglishAlert(false); // Reset non-English alert
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(60);
    setShowTimer(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    stopRecording();
    clearInterval(timerRef.current);
    // Store current question before showing alert
    const currentQuestion = questions;

    // Use a custom dialog instead of alert to maintain question state
    setTimeUpDialog(true);

    // Only fetch next question after dialog is closed
    const proceedToNext = () => {
      setTimeUpDialog(false);
      fetchQuestions(interview_id);
    };
  };

  const stopRecording = () => {
    // if (mediaRecorderRef.current && isRecording) {
    //   mediaRecorderRef.current.stop();
    //   recognitionRef.current.stop();
    //   setIsRecording(false);
    // }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
     // console.log("Media recorder stopped");
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      //console.log("Speech recognition stopped");
    }
    setIsRecording(false);
  };

  const handleExitConfirmation = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirmed = () => {
    setShowExitDialog(false);
    navigate("/dashboard", { state: { activeTab: "my-scores" } });
  };

  const saveRecording = async () => {
    if (isRecording) {
      stopRecording();
    }
    const textToSave = transcribedText.trim() || "No Answer";

    const blob = new Blob([textToSave], { type: "text/plain" });

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const storedExamId = `${num_questions}`;
    const interviewid = `${interview_id}`;
    const fileName = `${interview_id}_interview_answer.txt`;

    try {
      
      const authToken = localStorage.getItem("auth_code");
      const session_Id = localStorage.getItem("session_id");
      const question_Id = localStorage.getItem("question_id");

      const response = await fetch("https://api.crackvisa.com/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
         // num_questions: storedExamId,
         session_id: session_Id,
         question_id:question_Id,
         // filename: fileName,
         user_answer: textToSave,
         // file_content: base64,
        }),
      });

 //console.log(response.status);
 

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        //console.log(await response.text()); // Print server response for debugging
        return;
      }
      //console.log("File successfully uploaded");
      //navigate("/Scores"); // Navigate to Scores page
      
    } catch (error) {
      console.error("Failed to upload the file:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!questions) {
    return (
      <div className="text-center p-4">
        No questions available for this interview.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Interview Question
          </h2>
          <div className="flex justify-between items-center mb-4 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold text-yellow-600">Total Questions:</span> {num_questions}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-500">Remaining Questions:</span> {remain_que}
          </p>
        </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6 relative">
            <p className="text-gray-800 text-lg md:text-xl">
              {questions.question}
            </p>
            {showTimer && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <p className="text-gray-600 text-sm font-medium">
                  Time Left: {timeLeft}s
                </p>
              </div>
            )}
            {isSpeaking && (
              <div className="absolute bottom-4 right-4 text-blue-500 animate-pulse">
                <Volume2 className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={stopRecording}
                disabled={!isRecording} // Disable if not recording
              >
                <MicOff className="mr-2 h-5 w-5" />
                Stop Recording
              </button>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
                onClick={handleExitConfirmed}

                // disabled={!transcribedText}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Exit Interview
              </button>
            </div>
            {isRecording && (
              <div className="text-center text-red-500 animate-pulse font-medium">
                Recording in progress...
              </div>
            )}
            {showNonEnglishAlert && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Please speak only in English.
                  </p>
                  <button
                    onClick={() => setShowNonEnglishAlert(false)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg min-h-[120px] max-h-[240px] overflow-y-auto border border-gray-200">
              <p className="text-gray-700">
                {transcribedText || "Your answer will appear here..."}
              </p>
            </div>
            <button
              className="w-full sm:w-auto sm:min-w-[200px] mx-auto flex justify-center items-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={nextQuestion}
              disabled={isSpeaking}
            >
              Next Question
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showExitDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Exit Interview?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to exit? Your progress will not be saved.
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
      {timeUpDialog && ( // Added time-up dialog
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Time's Up!</h3>
            <p className="text-gray-600 mb-6">
              Time is up for this question! Ready to proceed to the next
              question?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                onClick={() => {
                  setTimeUpDialog(false);
                  nextQuestion();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;


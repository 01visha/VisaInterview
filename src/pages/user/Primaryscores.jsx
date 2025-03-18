import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { X, Volume2, StopCircle, CheckCircle, XCircle } from "lucide-react"

export default function Primaryscores({ test_id, session_id, onClose }) {
  const [data, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [speaking, setSpeaking] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_BASE_URL
  const authToken = localStorage.getItem("auth_code") || localStorage.getItem("authToken")

  useEffect(() => {
    if (!authToken) {
      toast.error("No auth token found")
    }

    fetch(`${API_BASE_URL}/get-user-answers/${session_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((responseData) => {
        if (responseData?.data) {
          setInterviews(responseData.data)
        }
      })
      .catch((err) => {
        //toast.error("Error fetching Result")
        setError("You have not Answered any Question Yet! Please Attempt the Interview again.")
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }, [API_BASE_URL, session_id, authToken])

  const readAloud = (text) => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const foreignVoice = voices.find((voice) => voice.lang.includes("en-GB"))
    if (foreignVoice) utterance.voice = foreignVoice
    utterance.rate = 1
    utterance.onend = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }  

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Scorecard For Test-{test_id}</h1>
          <button
            onClick={() => {
              window.speechSynthesis.cancel()
              onClose()
            }}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close scorecard"
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-gray-50 p-2 md:p-2 border-b md:border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Questions</h2>
            {data.map((item, index) => (
              <button
                key={index}
                className={`w-full text-left p-2 rounded-lg mb-2 transition-colors ${
                  activeQuestion === index ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-200 text-gray-600"
                }`}
                onClick={() => setActiveQuestion(index)}
              >
                Question {index + 1}
              </button>
            ))}
          </div>
          <div className="w-full md:w-3/4 p-2 md:p-2">
  {data.length > 0 && data[activeQuestion] ? (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Question {activeQuestion + 1}:
        </h2>
        <p className="text-lg text-gray-700 bg-gray-50 p-2 rounded-lg shadow-inner">
          {data[activeQuestion].question}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Answer:</h3>
          <div
            className={`p-2 rounded-lg ${
              data[activeQuestion].user_answer === "No Answer"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            <p>{data[activeQuestion].user_answer}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            Model Answer:
            <button
              onClick={() => readAloud(data[activeQuestion].model_answer)}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
              aria-label="Read aloud model answer"
            >
              {speaking ? <StopCircle className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </h3>
          <div className="bg-indigo-50 text-indigo-700 p-2 rounded-lg">
            <p>{data[activeQuestion].model_answer}</p>
          </div>
        </div>
      </div>
      {data[activeQuestion].predicted_feedback && (
        <div className="bg-gray-50 p-2 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Predicted Feedback:</h3>
          <div className="space-y-4">
            <FeedbackItem
              label="Correctness"
              value={data[activeQuestion].predicted_feedback.correctness}
              icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            />
            <FeedbackItem
              label="Grammar"
              value={data[activeQuestion].predicted_feedback.grammar}
              icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            />
            <FeedbackItem
              label="Constructive Feedback"
              value={data[activeQuestion].predicted_feedback.constructive_feedback}
              icon={<XCircle className="h-5 w-5 text-yellow-500" />}
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-bold text-indigo-600">
              Score: {data[activeQuestion].predicted_feedback.score}/10
            </p>
            <p className="text-sm text-gray-500">
              Answered: {new Date(data[activeQuestion].answered_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  ) : (
    <p className="text-center text-red-500">{error}</p>
  )}
</div>

        
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

const FeedbackItem = ({ label, value, icon }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="mt-1 text-sm text-gray-600">{value || ""}</p>
    </div>
  </div>
)


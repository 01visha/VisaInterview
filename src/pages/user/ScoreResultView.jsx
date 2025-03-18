import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptText, decryptText } from "../../utils/encryptionHelper";
import { FaHome } from "react-icons/fa";
import { Volume2, StopCircle, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const ScoreResultView = () => {
  const { id, num, num2 } = useParams();
  const [data, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAttempt, setSelectedAttempt] = useState(() => {
    // Retrieve the selected attempt from local storage on initial render
    const savedAttempt = localStorage.getItem("selectedAttempt");
    return savedAttempt ? parseInt(savedAttempt, 10) : 0;
  });
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const authToken =
    localStorage.getItem("auth_code") || localStorage.getItem("authToken");
  const [interview_name, setInterview_name] = useState(null);
  const [test_id, setTest_id] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const questionRef = useRef(null);

  // Save selectedAttempt to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedAttempt", selectedAttempt);
  }, [selectedAttempt]);

  const handleDashboardRedirect = () => {
    navigate("/dashboard", { state: { activeTab: "my-scores" } });
  };

  useEffect(() => {
    const test_id = decryptText(id);
    const session_id = decryptText(num);
    const interview_name = decryptText(num2);

    setTest_id(test_id);
    setInterview_name(interview_name);

    if (!authToken) {
      toast.error("No auth token found");
      return;
    }

    fetch(`${API_BASE_URL}/get-score-card/${session_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data?.child_sessions) {
          if (
            data.child_sessions.every((session) => session.answers.length === 0)
          ) {
            setError(
              "You have not Answered any Question Yet! Please Attempt the Interview again."
            );
          } else {
            data.child_sessions.forEach((session) => {
              if (session.answers.length === 0) {
                setError(
                  "You have not Answered any Question Yet for this Attempt."
                );
                setInterviews(data.child_sessions);
                               
              } else {
                const missingFeedback = session.answers.some(
                  (answer) =>
                    !answer.predicted_feedback ||
                    answer.predicted_feedback === "Feedback placeholder" ||
                    Object.keys(answer.predicted_feedback).length === 0
                );

                if (missingFeedback) {
                  handleLambda(session_id, session.child_session_id);
                }
              }
            });
            setInterviews(data.child_sessions);
            console.log(data.child_sessions.length);
            console.log(selectedAttempt);
          }
        }
      })
      .catch((err) => {
        setError(
          "You have not Answered any Question Yet! Please Attempt the Interview again."
        );
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [API_BASE_URL, authToken, id, num, num2]); // Removed session_id from dependencies

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeQuestion]);

  const handleLambda = (sessionid, childSession_id) => {
    const LAMBDA_URL =
      "https://prod.chocosoft.in/jsr-ai-crack-visa-question_feed";

    fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        session_id: String(sessionid),
        child_session_id: childSession_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error(`Lambda HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((lambdaData) => {
        // Handle lambda data if needed
      })
      .catch((err) => {
        toast.error("Lambda Error: " + err.message);
      });
  };

  const handleUserAns = (attemptIndex) => {
    if (data[attemptIndex]) {
      setActiveQuestion(0);
      setSelectedAttempt(attemptIndex);
    } else {
      toast.error(`No data available for Attempt ${attemptIndex + 1}`);
    }
  };

  const readAloud = (text) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const foreignVoice = voices.find((voice) => voice.lang.includes("en-GB"));
    if (foreignVoice) utterance.voice = foreignVoice;
    utterance.rate = 1;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const FeedbackItem = ({ label, value, icon }) => (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="mt-1 text-sm text-gray-600">{value || ""}</p>
      </div>
    </div>
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const feedback =
    data[selectedAttempt]?.answers[activeQuestion]?.predicted_feedback;

  const hasFeedback =
    feedback &&
    (feedback.correctness ||
      feedback.grammar ||
      feedback.constructive_feedback ||
      feedback.score !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="m-0 flex flex-col md:flex-row justify-between items-center px-4 py-2 mb-4 text-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <ol className="inline-flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse mb-1.5 pl-0 flex-wrap md:flex-nowrap w-full">
            <li className="inline-flex items-center flex-wrap md:flex-nowrap w-full">
              <Link
                to="/dashboard"
                className="no-underline inline-flex items-baseline text-lg font-bold text-white hover:text-indigo-200 dark:text-white dark:hover:text-indigo-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center">
                  <FaHome size={20} className="mr-1 mb-1" />
                  Dashboard
                </div>
              </Link>

              <svg
                className="rtl:rotate-180 block w-4 h-4 mx-2 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>

              <Link
                to="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  handleDashboardRedirect();
                }}
                className="no-underline inline-flex items-baseline text-lg font-bold text-white hover:text-indigo-200 dark:text-white dark:hover:text-indigo-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                My Scores
              </Link>

              <svg
                className="rtl:rotate-180 block w-4 h-4 mx-2 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>

              <Link
                to={`/scorecard/${encryptText(interview_name)}`}
                className="no-underline inline-flex items-baseline text-lg font-bold text-white hover:text-indigo-200 dark:text-white dark:hover:text-indigo-300 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full sm:max-w-[500px] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Scorecard Details
              </Link>

              <svg
                className="rtl:rotate-180 block w-4 h-4 mx-2 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>

              <span className="ms-1 text-lg font-bold text-white md:ms-2 dark:text-gray-400 w-full sm:w-auto break-words flex-grow">
                Interview - {test_id}
              </span>
              <div className="relative flex items-center">
                {/* Button with rotating icon */}
                <button
                  onMouseEnter={() => {
                    setShowTooltip(true);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => {
                    setShowTooltip(false);
                    setIsHovering(false);
                  }}
                  onClick={handleRefresh}
                  className="flex items-center justify-center bg-blue-400 text-white px-2 py-2 rounded-lg hover:bg-indigo-900 transition relative"
                >
                  <motion.div
                    animate={isHovering ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      duration: 1,
                      ease: "linear",
                      repeat: isHovering ? Infinity : 0,
                    }}
                  >
                    <ArrowPathIcon className="h-5 w-5 text-white" />
                  </motion.div>
                </button>

                {/* Custom tooltip */}
                {showTooltip && (
                  <div className="absolute right-full mr-2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
                    Refresh if there is no Predicted feedback!
                    <div className="absolute top-1/2 left-full ml-1 w-2 h-2 bg-gray-900 rotate-45 -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            </li>
          </ol>
        </nav>

        {data.length > 0 &&
        selectedAttempt >= 0 &&
        selectedAttempt <= data.length ? (
          <div className="max-w-full mx-auto p-3 bg-white rounded-lg shadow-2xl">
            <div className="max-w-full mx-auto bg-white rounded-md shadow-2xl overflow-hidden">
              {/* Attempt Selection Buttons */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-wrap justify-center gap-4 p-1 sm:p-4">
                {data.map((attempt, index) => (
                  <div key={index} className="flex flex-col">
                     <button
      onClick={() => handleUserAns(index)}
      className={`min-w-[120px] w-full sm:w-auto text-center flex items-center justify-center 
        ${selectedAttempt === index ? "bg-green-400" : "bg-blue-400"} 
        text-white px-4 py-1 sm:px-6 sm:py-2 border-b-[4px] border-transparent rounded-md transition-all 
        hover:bg-green-400 hover:border-green-400 hover:brightness-110 hover:top-[-1px] 
        active:border-b-[2px] active:brightness-90 active:top-[1px] relative
        ${
          attempt.retry_count === 3 && attempt.status !== "completed"
            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:border-transparent"
            : ""
        }`}
      disabled={
        attempt.retry_count === 3 &&
        attempt.status !== "completed"
      }
    >
      Attempt-{index + 1}
    </button>
                  </div>
                ))}
              </div>

              {/* Check if the selected attempt has answers */}
              {data[selectedAttempt]?.answers?.length > 0 ? (
                <div className="flex flex-col md:flex-row">
                  {/* Sidebar - List of Questions */}
                  <div className="w-full md:w-1/4 bg-gray-50 p-2 sm:p-4 border-b md:border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                      Questions
                    </h2>
                    {data[selectedAttempt]?.answers?.map((item, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-2 sm:p-3 rounded-lg mb-3 transition-colors ${
                          activeQuestion === index
                            ? "bg-indigo-100 text-indigo-700"
                            : !item.predicted_feedback ||
                              item.predicted_feedback ===
                                "Feedback placeholder" ||
                              Object.keys(item.predicted_feedback).length === 0
                            ? "bg-red-50 text-red-600 font-bold hover:bg-red-100"
                            : "hover:bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => setActiveQuestion(index)}
                      >
                        Question {index + 1}
                      </button>
                    ))}
                  </div>
                  <div ref={questionRef}></div>
                  {/* Main Content - Display Selected Question & Answer */}
                  <div className="w-full md:w-3/4 p-2 sm:p-4 sm:mt-10">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Question {activeQuestion + 1}:
                      </h2>
                      <p className="text-lg text-gray-700 bg-gray-50 p-3 rounded-lg shadow-md">
                        {data[selectedAttempt]?.answers?.[activeQuestion]
                          ?.question || "No question available"}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* User Answer */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Your Answer:
                        </h3>
                        <div
                          className={`p-3 rounded-lg ${
                            data[selectedAttempt]?.answers?.[activeQuestion]
                              ?.user_answer === "No Idea"
                              ? "bg-red-50 text-red-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          <p>
                            {data[selectedAttempt]?.answers?.[activeQuestion]
                              ?.user_answer || "No answer provided"}
                          </p>
                        </div>
                      </div>

                      {/* Model Answer */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                          Model Answer:
                          <button
                            onClick={() =>
                              readAloud(
                                data[selectedAttempt]?.answers?.[activeQuestion]
                                  ?.model_answer
                              )
                            }
                            className="ml-3 text-indigo-600 hover:text-indigo-800"
                            aria-label="Read aloud model answer"
                          >
                            {speaking ? (
                              <StopCircle className="h-5 w-5" />
                            ) : (
                              <Volume2 className="h-5 w-5" />
                            )}
                          </button>
                        </h3>
                        <div className="bg-indigo-50 text-indigo-700 p-3 rounded-lg shadow-md">
                          <p>
                            {data[selectedAttempt]?.answers?.[activeQuestion]
                              ?.model_answer || "No model answer available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 🔥 Predicted Feedback Section */}
                    {data[selectedAttempt]?.answers?.[activeQuestion]
                      ?.predicted_feedback &&
                    Object.keys(
                      data[selectedAttempt]?.answers?.[activeQuestion]
                        ?.predicted_feedback
                    ).length > 0 ? (
                      <div className="bg-gray-200 p-2 sm:p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Predicted Feedback:
                        </h3>
                        <div className="space-y-4">
                          <FeedbackItem
                            label="Correctness"
                            value={
                              data[selectedAttempt]?.answers?.[activeQuestion]
                                ?.predicted_feedback?.correctness ||
                              "No feedback available"
                            }
                            icon={
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            }
                          />
                          <FeedbackItem
                            label="Grammar"
                            value={
                              data[selectedAttempt]?.answers?.[activeQuestion]
                                ?.predicted_feedback?.grammar ||
                              "No feedback available"
                            }
                            icon={
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            }
                          />
                          <FeedbackItem
                            label="Constructive Feedback"
                            value={
                              data[selectedAttempt]?.answers?.[activeQuestion]
                                ?.predicted_feedback?.constructive_feedback ||
                              "No feedback available"
                            }
                            icon={
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            }
                          />
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                          {/* Score */}
                          <p className="text-2xl font-bold text-indigo-600">
                            Score:{" "}
                            {data[selectedAttempt]?.answers?.[activeQuestion]
                              ?.predicted_feedback?.score ?? "N/A"}
                            /10
                          </p>

                          {/* Answered At */}
                          <p className="text-sm text-gray-500">
                            Answered:{" "}
                            {data[selectedAttempt]?.answers?.[activeQuestion]
                              ?.answered_at
                              ? new Date(
                                  data[selectedAttempt]?.answers?.[
                                    activeQuestion
                                  ]?.answered_at
                                ).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-500 text-center mt-4">
                        Please wait for 5-10 minutes while it's processing, or click on the Refresh button to get the feedback.
                      </p>
                    )}

                    {/* Toast Notification */}
                    <ToastContainer />
                  </div>
                </div>
              ) : (
                <p className="text-center text-red-500 mt-20 mb-20">{error}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 mt-20 mb-20">
            {error} <br></br>{" "}
            <Link
              to={`/scorecard/${encryptText(interview_name)}`}
              className="no-underline inline-flex items-baseline text-lg font-bold text-indigo-900 hover:text-indigo-200 dark:text-white dark:hover:text-indigo-300 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full sm:max-w-[500px] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Go Back
              {/* {interview_name} */}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ScoreResultView;

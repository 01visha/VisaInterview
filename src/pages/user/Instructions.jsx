import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questionset from "../../pages/user/Questionset";
import { encryptText, decryptText } from "../../utils/encryptionHelper";

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure?
        </h3>
        <p className="text-gray-600 mb-6">
          Do you want to close the Interview session? If you close the session,
          you will need to resume the interview from Scores.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function StartInterviewPopup({ onClose, onConfirm }) {
  const steps = [
    {
      title: "Find a Quiet Environment",
      content:
        "Ensure you are in a silent and distraction-free space to stay focused.",
    },
    {
      title: "Stay Confident and Calm",
      content:
        "Approach the interview with confidence. It's okay to pause and gather your thoughts.",
    },
    {
      title: "Be Prepared for the Beeping Sound (In Mobile)",
      content:
        "If you remain silent for too long, a beep may occur. The mic will stay on until the end.",
    },
    {
      title: "Use the Interview Controls",
      content: 'Use "End Interview" to finish and "Next Question" to proceed.',
    },
  ];
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-400">
          <h3 className="text-2xl font-bold text-blue-900">
            Interview Preparation
          </h3>
          <button
            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="p-2 space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 rounded-r-md p-2"
              >
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg font-semibold text-indigo-700">
                    {step.title}
                  </p>
                </div>
                <p className="text-gray-600 ml-8">{step.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onConfirm}
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState({
    interviewid: {
      interview_id: "",
      num_questions: "",
    },
  });
  const [showModal, setShowModal] = useState(false); // Modal state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { id, num } = useParams();

  const interview_id = decryptText(id);
  const num_questions = decryptText(num);

  localStorage.removeItem("interviewExited");


  useEffect(() => {
    if (selectedQuestionSet?.interviewid?.interview_id) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll when modal closes
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [selectedQuestionSet]);


  // Handle browser back button
  useEffect(() => {
    // Push a state into history when the component loads
    const handlePushState = () => {
      window.history.pushState({ modalVisible: true }, ""); // Add state
    };

    const handlePopState = () => {
      // Show modal when user presses the back button
      if (window.history.state?.modalVisible) {
        setShowModal(true);
        window.history.pushState({ modalVisible: true }, ""); // Push state back to prevent navigation
      } else {
        navigate(-1); // Fallback if no modalVisible state is found
      }
    };

    // Push initial state when component mounts
    handlePushState();

    // Add listener for popstate events
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleCheckForActiveSubscription = async (
    interview_id,
    num_questions
  ) => {
    const selectedInterview = { interviewid: { interview_id, num_questions } };

    if (interview_id && num_questions) {
      setSelectedQuestionSet(selectedInterview);
    } else {
      toast.error("No matching interview found.");
    }
  };

  const handleInterviewClick = async () => {
    setShowPopup(true);
  };

  // const handleStartInterview = () => {
  //   setShowPopup(true);
  // };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate(`/Question`);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/dashboard", { state: { activeTab: "my-scores" } });
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-center">
        Instructions
        </h1>

        {/* Instruction Content */}

        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            {/* <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
              Instructions
            </h2> */}
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-teal-500">
                  <strong className="text-teal-600">Step 1:</strong> Understand
                  the Importance of a Mock Interview
                </span>
                <p className="text-gray-600">
                  A mock interview helps you prepare for your actual visa
                  interview by simulating real-life questions and scenarios.
                  This allows you to practice answering confidently and improve
                  your chances of success.
                </p>
              </div>

              <div>
                <span className="font-semibold text-teal-500">
                  <strong className="text-teal-600">Step 2:</strong> How to Use
                  the Preview Feature
                </span>
                <p className="text-gray-600">
                  Before starting the mock interview, you can use the Preview
                  button to review the format of the questions. This helps you
                  understand the structure and ensures you are ready before
                  attempting the full interview."Try playing the audio to hear the correct pronunciation."
                </p>
              </div>

              <div>
                <span className="font-semibold text-teal-500">
                  <strong className="text-teal-600">Step 3:</strong> Tips for a
                  Successful Mock Interview
                </span>

                <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
                  <li>
                    Answer Clearly and Confidently: Speak naturally and avoid
                    hesitations.
                  </li>
                  <li>
                    Be Honest: Your responses should reflect accurate and
                    truthful information.
                  </li>
                  <li>
                    Stay Calm and Focused: Practice in a quiet environment to
                    avoid distractions and boost your confidence.
                  </li>
                  <li>
                    Learn from the Preview Page: Use the Preview feature to
                    familiarize yourself with the types of questions and prepare
                    your best answers in advance.
                  </li>
                  <li>
                    Don't Rush, Take Your Time: It's okay to pause and think
                    before answering — the goal is to improve your performance
                    step by step.
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-semibold text-teal-500">
                  <strong className="text-teal-600">Step 4:</strong> Get
                  Feedback and Improve
                </span>
                <p className="text-gray-600">
                  After completing the mock interview, you'll receive predicted
                  feedback on your answers. This feedback will guide you on
                  which areas need improvement, helping you gain confidence and
                  achieve better results in the actual interview.
                </p>
                <p className="text-teal-700 mt-2">
                  When you're ready, click the Preview button to begin your
                  journey towards a successful interview!
                </p>
              </div>

              {/* <div>
                <h3 className="font-semibold text-teal-700">Interview Preparation</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Ensure you are in a quiet environment</li>
                  <li>Check your camera and microphone</li>
                  <li>Have a copy of your resume handy</li>
                  <li>Be prepared to discuss your experience and skills</li>
                  <li>The interview will last approximately 30 minutes</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border border-indigo-300 rounded-md text-white bg-blue-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() =>
              handleCheckForActiveSubscription(interview_id, num_questions)
            }
          >
            Preview Question Set
          </button>
          {/* <button
            className="px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleInterviewClick()}
          >
            Start Interview
          </button> */}
        </div>

        {selectedQuestionSet?.interviewid?.interview_id && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto  w-full h-full z-10">
            <div className="h-full w-full overflow-y-auto">
              <Questionset
                interview_id={selectedQuestionSet.interviewid.interview_id}
                num_questions={selectedQuestionSet.interviewid.num_questions}
                onClose={() => setSelectedQuestionSet(null)}
              />
            </div>
          </div>
        )}
        {showModal && (
          <ConfirmationModal
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        )}
        {showPopup && (
          <StartInterviewPopup
            onClose={() => setShowPopup(false)}
            onConfirm={handlePopupConfirm}
          />
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import QuestionAccordion from "./QuestionAccordion";

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
              Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Questionset({ interview_id ,onClose}) {
  const [showPopup, setShowPopup] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!interview_id) {
      toast.error("Interview ID is missing");
      setLoading(false);
      return;
    }

    const authToken =
      localStorage.getItem("auth_code") || localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No auth token found");
      setLoading(false);
      return;
    }

    const sessionid = localStorage.getItem("session_id");

    if (!sessionid) {
      toast.error("Session ID is missing");
      setLoading(false);
      return;
    }

    const requestBody = {
      interview_id: String(interview_id), // Ensure this is a valid value
      session_id: sessionid, // Ensure this is retrieved correctly
    };

    //  console.log( "Sending API Request:", {
    //     url: `${API_BASE_URL}/list_questions_with_answers`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //     body: requestBody,
    //   });

    fetch(`${API_BASE_URL}/list_questions_with_answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        //console.log("Raw Response:", response);
        if (!response.ok) {
          return response.json().then((errData) => {
            console.error("Error Details:", errData);
            //throw new Error(`HTTP error! Status: ${response.status}, Details: ${errData.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        // console.log("API Response Data:", data.dada);
        //const firstTenQuestions = data;
        setQuestions(data.data);
      })
      .catch((err) => {
        toast.error("No Questions Available for this Interview.");
        setTimeout(() => {
          navigate("/dashboard", { state: { activeTab: "my-interview" } });
        }, 3000);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_BASE_URL, interview_id]);

  const handleInterviewClick = async () => {
    setShowPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate(`/Question`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 z-10">
      <div className="bg-white shadow-lg rounded-lg w-full p-6">
        <div className="flex justify-between items-center border-b p-4">
          <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Welcome to The Question Set For Visa Mock Interview!
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close question set"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm font-semibold text-indigo-800 mt-2 mb-4">
          Please review the questions and answers below, learn them, and then
          proceed to the mock interview by clicking the "Start Interview"
          button. <span className="text-medium font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">(Try playing the audio to hear the correct pronunciation)</span>
        </p>

        {loading ? (
          <p className="text-center mt-4">Loading questions...</p>
        ) : (
          <QuestionAccordion questions={questions} />
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleInterviewClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Start Interview
          </button>
        </div>
      </div>
      {showPopup && (
        <StartInterviewPopup
          onClose={() => setShowPopup(false)}
          onConfirm={handlePopupConfirm}
        />
      )}
      <ToastContainer />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Scorecard from "./Scorecard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptText, decryptText } from "../../utils/encryptionHelper";
import Primaryscores from "../../pages/user/Primaryscores";
import { FaHome } from "react-icons/fa";

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

const ScorecardView = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedPrimaryscore, setSelectedPrimaryscore] = useState(null);
  const [selectedRetestscore, setSelectedRetestscore] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const authToken =
    localStorage.getItem("auth_code") || localStorage.getItem("authToken");
  const [interview_name, setInterview_name] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleDashboardRedirect = (test_id, session_id, interview_name) => {
    navigate("/dashboard", { state: { activeTab: "my-scores" } });
  };

  const handleRedirect = (test_id, session_id, interview_name) => {
    navigate(
      "/scoreresult/" +
        encryptText(test_id) +
        "/" +
        encryptText(session_id) +
        "/" +
        encryptText(interview_name)
    );
  };

  useEffect(() => {
    const originalText = decryptText(id);
    setInterview_name(originalText);
    const authToken =
      localStorage.getItem("auth_code") || localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No auth token found");
    }

    fetch(`${API_BASE_URL}/user-sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data?.data) {
          const filteredInterviews = data.data.filter(
            (interview) => interview.interview_name === originalText
          );
          //console.log(filteredInterviews);
          setInterviews(filteredInterviews);
        }
      })
      .catch((err) => {
        toast.error("Error fetching interviews:", err);
        setError("Failed to fetch interviews.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_BASE_URL, id]);

  const capitalizeWords = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleRetest = (interview_id, sessionid, num_questions) => {
    localStorage.setItem("session_id", interview_id.sessionid);

    const id = interview_id.interview_id;
    const num = interview_id.num_questions;

    const reqbody = {
      interview_id: interview_id.interview_id,
      session_id: interview_id.sessionid,
    };

    if (!authToken) {
      toast.error("No auth token found");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/retrysession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(reqbody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          navigate(`/instructions/${id}/${num}`);
        }
      })
      .catch((err) => {
        toast.error("Error fetching Retry:", err.message);
        setError("Failed to fetch Retry.");
      })
      .finally(() => setLoading(false));
    //navigate("/dashboard", { state: { activeTab: "my-interview" } });
  };

  const handleResume = (interview_id, session_id) => {
    localStorage.removeItem("interviewExited");
    localStorage.setItem("session_id", interview_id.session_id);
    // navigate(`/Question`);
    setShowPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate(`/Question`);
  };

  const renderMobileCard = (interview, index) => (
    <div
      key={interview.session_id}
      className="bg-white rounded-lg shadow p-4 space-y-4 overflow-y-auto w-full h-full"
    >
      <div className="flex justify-between items-center w-full h-full">
        <span
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-800`}
        >
          {`Test-${index + 1}`}
        </span>
        <span
          className={`text-sm font-medium ${
            interview.status === "completed"
              ? "text-green-500"
              : "text-orange-600"
          }`}
        >
          {capitalizeWords(interview.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="text-gray-500">Total Questions</p>
          <p className="font-medium">{interview.total_questions}</p>
        </div>
        <div>
          <p className="text-gray-500">Presented Question</p>
          <p className="font-medium">{interview.answered_questions}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Start Date</p>
          <p className="font-medium">
            {new Date(interview.start_date).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {interview.status === "completed" ? (
        interview.retrycount < 3 ? (
          <>
            <button
              onClick={() =>
                handleRetest({
                  interview_id: interview.interview_id,
                  sessionid: interview.session_id,
                  num_questions: interview.total_questions,
                })
              }
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Retest ({interview.retrycount}/3)
            </button>
            <button
              onClick={() =>
                handleRedirect(index + 1, interview.session_id, interview_name)
              }
              className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              View Result
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              handleRedirect(index + 1, interview.session_id, interview_name)
            }
            className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
          >
            View Result
          </button>
        )
      ) : (
        <button
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
          onClick={() => {
            handleResume({
              interview_id: interview.interview_id,
              session_id: interview.session_id,
            });
          }}
        >
          Resume
        </button>
      )}
    </div>
  );

  const getIconForInterview = (interviewName) => {
    switch (interviewName.toLowerCase()) {
      case "the f1 navigator: crack your interview":
        return "assets/img/scorecard/scorecard2.png";
      // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-18433.jpg?t=st=1734341686~exp=1734345286~hmac=875b3a1c180f9f20afbbdb23a4dd2bb4612185cdbb9db4068f8e080882479a94&w=996";
      case "the b1 navigator: master your interview":
        // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-28468.jpg?t=st=1736237283~exp=1736240883~hmac=09a9e8ef27f92f6cce824ec5f6bedde19a54d7d1816d24c709081e02910e5361&w=996";
        return "assets/img/scorecard/scorecard1.png";
      case "the b2 navigator: master your interview":
        // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-28468.jpg?t=st=1736237283~exp=1736240883~hmac=09a9e8ef27f92f6cce824ec5f6bedde19a54d7d1816d24c709081e02910e5361&w=996";
        return "assets/img/scorecard/scorecard3.png";
      default:
        return "assets/img/scorecard/scorecard4.png";
      // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-18433.jpg?t=st=1734341686~exp=1734345286~hmac=875b3a1c180f9f20afbbdb23a4dd2bb4612185cdbb9db4068f8e080882479a94&w=996";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <nav
          className="m-0 flex flex-col md:flex-row justify-between items-center px-4 py-2 mb-4 text-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse mb-1.5 pl-0 flex-wrap md:flex-nowrap">
            <li className="inline-flex items-center flex-wrap md:flex-nowrap space-x-2">
              <Link
                scroll={false}
                to="/dashboard"
                className="no-underline inline-flex items-baseline text-md font-bold text-white hover:text-indigo-200 dark:text-white dark:hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center">
                  <FaHome size={20} className="mr-1 mb-1" />
                  Dashboard
                </div>
              </Link>

              <svg
                className="rtl:rotate-180 block w-3 h-3 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
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
                scroll={false}
                onClick={(e) => {
                  e.preventDefault();
                  handleDashboardRedirect();
                }}
                className="no-underline inline-flex items-baseline text-md font-bold text-white hover:text-indigo-200 dark:text-white dark:hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                My Scores
              </Link>

              <svg
                className="rtl:rotate-180 block w-3 h-3 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
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

              <span className="text-md font-medium text-white sm:text-lg block sm:inline w-full sm:w-auto break-words">
                {interview_name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-full mx-auto p-3 bg-white rounded-lg shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-800 pl-4 rounded-t-lg shadow-lg">
            <div className="flex items-center justify-between flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
              <h2 className="p-2 text-2xl md:text-2xl font-bold text-white tracking-wide font-poppins drop-shadow-md">
                SCORECARD DETAILS
              </h2>
              <div className="flex sm:justify-start justify-center w-full sm:w-auto sm:mt-0 lg:ml-5">
                <span className="bg-gradient-to-r from-green-500 to-green-700 text-white text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl font-bold mx-3 my-2">
                  {interview_name}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-100 shadow-md">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Test Name / Test ID
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Total Questions
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Presented Questions
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-indigo-700 text-sm uppercase tracking-wider font-inter">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500 font-roboto"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-red-500 font-roboto"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : interviews.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500 font-roboto"
                      >
                        <span className="text-red-500">
                          You have not attempted Interviews yet!
                        </span>
                        <br />
                        <button
                          onClick={() =>
                            navigate("/dashboard", {
                              state: { activeTab: "my-interview" },
                            })
                          }
                          className="mt-4 px-6 py-3 bg-blue-800 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-lg font-poppins"
                        >
                          Go for Interview
                        </button>
                      </td>
                    </tr>
                  ) : (
                    interviews.map((interview, index) => (
                      <tr
                        key={interview.session_id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-700 font-inter">
                            Test-{index + 1}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            interview.status === "completed"
                              ? "text-green-500"
                              : "text-orange-600"
                          } font-inter border-t border-gray-200`}
                        >
                          {capitalizeWords(interview.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-inter border-t border-gray-200">
                          {interview.total_questions}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-inter border-t border-gray-200">
                          {interview.answered_questions}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-inter border-t border-gray-200">
                          {new Date(interview.start_date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2 border-t border-gray-200">
                          {interview.status === "completed" ? (
                            interview.retrycount < 3 ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleRetest({
                                      interview_id: interview.interview_id,
                                      sessionid: interview.session_id,
                                      num_questions: interview.total_questions,
                                    })
                                  }
                                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 font-poppins"
                                >
                                  Retest ({interview.retrycount}/3)
                                </button>
                                <button
                          onClick={() => handleRedirect(index + 1, interview.session_id, interview_name)}
                          className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors transform hover:scale-105 font-poppins"
                        >
                          View Result
                        </button>
                                {/* <div
                                  className="relative inline-block"
                                  onMouseEnter={() =>
                                    setHoveredButton(interview.session_id)
                                  } // Set hovered button's ID
                                  onMouseLeave={() => setHoveredButton(null)} // Reset when mouse leaves
                                  onClick={() =>
                                    handleRedirect(
                                      index + 1,
                                      interview.session_id,
                                      interview_name
                                    )
                                  }
                                >
                                  <button
                                    className="relative px-4 py-2 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 
    transition-all duration-300 overflow-hidden"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:opacity-75 transition-opacity"></div>

                                    <span className="relative flex items-center gap-2">
                                      <svg
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        fill="none"
                                        className="w-4 h-4"
                                      >
                                        <path
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          strokeWidth="2"
                                          strokeLinejoin="round"
                                          strokeLinecap="round"
                                        ></path>
                                      </svg>
                                      View Result
                                    </span>
                                  </button>

                                  {hoveredButton === interview.session_id && (
                                    <div
                                      className="absolute top-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out 
      transform opacity-100 visible z-50 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md 
      rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
                                    >
                                      <div className="relative p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
                                            <svg
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                              className="w-4 h-4 text-indigo-400"
                                            >
                                              <path
                                                clipRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                fillRule="evenodd"
                                              ></path>
                                            </svg>
                                          </div>
                                          <h3 className="text-sm font-semibold text-white">
                                            Important Information
                                          </h3>
                                        </div>

                                        <p className="text-sm text-gray-300">
                                          If you did't get any feedback for your
                                          Answer, please wait for some time and
                                          try again
                                        </p>

                                        <div
                                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
          bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div> */}
                              </>
                            ) : (
                              <>
                               <button
                          onClick={() => handleRedirect(index + 1, interview.session_id, interview_name)}
                          className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors transform hover:scale-105 font-poppins"
                        >
                          View Result
                        </button>
                              </>
//                               <div
//                                 className="relative inline-block"
//                                 onMouseEnter={() =>
//                                   setHoveredButton(interview.session_id)
//                                 } // Set hovered button's ID
//                                 onMouseLeave={() => setHoveredButton(null)}
//                                 onClick={() =>
//                                   handleRedirect(
//                                     index + 1,
//                                     interview.session_id,
//                                     interview_name
//                                   )
//                                 } // Reset when mouse leaves
//                               >
                                
//                                 <button
//                                   className="relative px-4 py-2 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 
// transition-all duration-300 overflow-hidden"
//                                 >
//                                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:opacity-75 transition-opacity"></div>

//                                   <span className="relative flex items-center gap-2">
//                                     <svg
//                                       viewBox="0 0 24 24"
//                                       stroke="currentColor"
//                                       fill="none"
//                                       className="w-4 h-4"
//                                     >
//                                       <path
//                                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                         strokeWidth="2"
//                                         strokeLinejoin="round"
//                                         strokeLinecap="round"
//                                       ></path>
//                                     </svg>
//                                     View Result
//                                   </span>
//                                 </button>

                              
//                                 {hoveredButton === interview.session_id && (
//                                   <div
//                                     className="absolute top-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out 
//   transform opacity-100 visible z-50 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md 
//   rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
//                                   >
//                                     <div className="relative p-4">
//                                       <div className="flex items-center gap-3 mb-2">
//                                         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
//                                           <svg
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                             className="w-4 h-4 text-indigo-400"
//                                           >
//                                             <path
//                                               clipRule="evenodd"
//                                               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                                               fillRule="evenodd"
//                                             ></path>
//                                           </svg>
//                                         </div>
//                                         <h3 className="text-sm font-semibold text-white">
//                                           Important Information
//                                         </h3>
//                                       </div>

//                                       <p className="text-sm text-gray-300">
//                                         If you did't get any feedback for your
//                                         Answer, please wait for some time and
//                                         try again
//                                       </p>

                                     
//                                       <div
//                                         className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
//       bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"
//                                       ></div>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
                            )
                          ) : (
                            <button
                              onClick={() =>
                                handleResume({
                                  interview_id: interview.interview_id,
                                  session_id: interview.session_id,
                                })
                              }
                              className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors transform hover:scale-105 font-poppins"
                            >
                              Resume
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="block md:hidden space-y-4 pb-4">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : interviews.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No interviews available
            </div>
          ) : (
            interviews.map((interview, index) => (
              <div
                key={interview.session_id}
                className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-semibold text-gray-700 text-sm">{`Test-${
                      index + 1
                    }`}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      interview.status === "completed"
                        ? "bg-green-100 text-green-500"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {capitalizeWords(interview.status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Total Questions: </span>
                    {interview.total_questions}
                  </p>
                  <p>
                    <span className="font-semibold">Presented Questions: </span>
                    {interview.answered_questions}
                  </p>
                  <p>
                    <span className="font-semibold">Start Date: </span>
                    {new Date(interview.start_date).toLocaleString()}
                  </p>
                </div>

                <div className="space-x-2 mt-3">
                  {interview.status === "completed" ? (
                    interview.retrycount < 3 ? (
                      <>
                        <button
                          onClick={() =>
                            handleRetest({
                              interview_id: interview.interview_id,
                              sessionid: interview.session_id,
                              num_questions: interview.total_questions,
                            })
                          }
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Retest ({interview.retrycount}/3)
                        </button>
                        <button
                          onClick={() => handleRedirect(index + 1, interview.session_id, interview_name)}
                          className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors transform hover:scale-105 font-poppins"
                        >
                          View Result
                        </button>

                        {/* <div
                          className="relative inline-block"
                          onMouseEnter={() =>
                            setHoveredButton(interview.session_id)
                          } // Set hovered button's ID
                          onMouseLeave={() => setHoveredButton(null)} // Reset when mouse leaves
                          onClick={() =>
                            handleRedirect(
                              index + 1,
                              interview.session_id,
                              interview_name
                            )
                          }
                        >
                         
                          <button
                            className="relative px-4 py-2 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 
    transition-all duration-300 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:opacity-75 transition-opacity"></div>

                            <span className="relative flex items-center gap-2">
                              <svg
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                                className="w-4 h-4"
                              >
                                <path
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                              View Result
                            </span>
                          </button>

                          
                          {hoveredButton === interview.session_id && (
                            <div
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out 
      transform opacity-100 visible z-50 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md 
      rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
                            >
                              <div className="relative p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
                                    <svg
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-4 h-4 text-indigo-400"
                                    >
                                      <path
                                        clipRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        fillRule="evenodd"
                                      ></path>
                                    </svg>
                                  </div>
                                  <h3 className="text-sm font-semibold text-white">
                                    Important Information
                                  </h3>
                                </div>

                                <p className="text-sm text-gray-300">
                                  If you did't get any feedback for your Answer,
                                  please wait for some time and try again
                                </p>

                               
                                <div
                                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
          bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"
                                ></div>
                              </div>
                            </div>
                          )}
                        </div> */}
                      </>
                    ) : (
                      <>
                      <button
                          onClick={() => handleRedirect(index + 1, interview.session_id, interview_name)}
                          className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors transform hover:scale-105 font-poppins"
                        >
                          View Result
                        </button>
                      </>
    //                   <div
    //                     className="relative inline-block"
    //                     onMouseEnter={() =>
    //                       setHoveredButton(interview.session_id)
    //                     } // Set hovered button's ID
    //                     onMouseLeave={() => setHoveredButton(null)} // Reset when mouse leaves
    //                     onClick={() =>
    //                       handleRedirect(
    //                         index + 1,
    //                         interview.session_id,
    //                         interview_name
    //                       )
    //                     }
    //                   >
                     
    //                     <button
    //                       className="relative px-4 py-2 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 
    // focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 
    // transition-all duration-300 overflow-hidden"
    //                     >
    //                       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:opacity-75 transition-opacity"></div>

    //                       <span className="relative flex items-center gap-2">
    //                         <svg
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                           fill="none"
    //                           className="w-4 h-4"
    //                         >
    //                           <path
    //                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                             strokeWidth="2"
    //                             strokeLinejoin="round"
    //                             strokeLinecap="round"
    //                           ></path>
    //                         </svg>
    //                         View Result
    //                       </span>
    //                     </button>

                      
    //                     {hoveredButton === interview.session_id && (
    //                       <div
    //                         className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out 
    //   transform opacity-100 visible z-50 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md 
    //   rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
    //                       >
    //                         <div className="relative p-4">
    //                           <div className="flex items-center gap-3 mb-2">
    //                             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
    //                               <svg
    //                                 viewBox="0 0 20 20"
    //                                 fill="currentColor"
    //                                 className="w-4 h-4 text-indigo-400"
    //                               >
    //                                 <path
    //                                   clipRule="evenodd"
    //                                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
    //                                   fillRule="evenodd"
    //                                 ></path>
    //                               </svg>
    //                             </div>
    //                             <h3 className="text-sm font-semibold text-white">
    //                               Important Information
    //                             </h3>
    //                           </div>

    //                           <p className="text-sm text-gray-300">
    //                             If you did't get any feedback for your Answer,
    //                             please wait for some time and try again
    //                           </p>

                           
    //                           <div
    //                             className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
    //       bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"
    //                           ></div>
    //                         </div>
    //                       </div>
    //                     )}
    //                   </div>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        handleResume({
                          interview_id: interview.interview_id,
                          session_id: interview.session_id,
                        });
                      }}
                      className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors"
                    >
                      Resume
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <StartInterviewPopup
          onClose={() => setShowPopup(false)}
          onConfirm={handlePopupConfirm}
        />
      )}
    </div>
  );
};

export default ScorecardView;

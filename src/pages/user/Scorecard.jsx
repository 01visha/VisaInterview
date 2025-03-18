import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import Primaryscores from "../../pages/user/Primaryscores";
import Retestscores from "../../pages/user/Retestscores";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Scorecard({ interview_name, onClose }) {
  const [selectedPrimaryscore, setSelectedPrimaryscore] = useState(null);
  const [selectedRetestscore, setSelectedRetestscore] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const authToken = localStorage.getItem("auth_code") || localStorage.getItem("authToken");

  useEffect(() => {
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
            (interview) => interview.interview_name === interview_name
          );
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
  }, [API_BASE_URL, interview_name]);

  const capitalizeWords = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleRetest = (interview_id,sessionid,num_questions) => {
        
    localStorage.setItem("session_id", interview_id.sessionid);

    const id = interview_id.interview_id;
    const num = interview_id.num_questions;  

    const reqbody = {
      interview_id: interview_id.interview_id,
      session_id:interview_id.sessionid}
        
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

  const handleResume = (interview_id,session_id) => {
    localStorage.removeItem("interviewExited");
    localStorage.setItem("session_id",interview_id.session_id); 
    navigate(`/Question`);    
  }

  const renderMobileCard = (interview, index) => (
    <div key={interview.session_id} className="bg-white rounded-lg shadow p-4 space-y-4 overflow-y-auto w-full h-full">
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
              onClick={() => {
                setSelectedPrimaryscore({
                  test_id: `${index + 1}`,
                  session_id: interview.session_id,
                });
              }}
              className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              View Result
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setSelectedPrimaryscore({
                test_id: `${index + 1}`,
                session_id: interview.session_id,
              });
            }}
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
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-full h-full">
      <div className="bg-white rounded-lg shadow-xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Scorecard
              </h2>
              <span className="bg-green-600 text-white text-xs md:text-sm px-3 py-1 rounded-full">
                {interview_name}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Test Name / Test ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Total Questions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Presented Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : interviews.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                     <span className="text-red-500 text-center">You have not attempted Interviews yet!</span>
                     <br />    <br /> 
                     <span className="">
                        <button
                              onClick={() => { navigate("/dashboard", { state: { activeTab: "my-interview" } });  }}
                              className="px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition-colors"
                              >
                               Go for Interview
                        </button>
                      </span>
                      </td>
                    </tr>
                  ) : (
                    interviews.map((interview, index) => (
                      <tr key={interview.session_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-700`}
                           
                          >
                            {`Test-${index + 1}`}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              interview.status ===
                              'completed'
                                ? "text-green-500"
                                : "text-orange-600"
                            }`}>
                          {capitalizeWords(interview.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {interview.total_questions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {interview.answered_questions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(interview.start_date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                                onClick={() => {
                                  setSelectedPrimaryscore({
                                    test_id: `${index + 1}`,
                                    session_id: interview.session_id,
                                  });
                                }}
                                className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
                              >
                                View Result
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedPrimaryscore({
                                  test_id: `${index + 1}`,
                                  session_id: interview.session_id,
                                });
                              }}
                              className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
                            >
                              View Result
                            </button>
                          )
                        ) : (
                          <button
                            className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors"
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

                      
                      </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : interviews.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No data available
              </div>
            ) : (
              interviews.map((interview, index) =>
                renderMobileCard(interview, index)
              )
            )}
          </div>
        </div>
      </div>

      {/* Score Details Modal */}
      {(selectedPrimaryscore) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full h-full overflow-y-auto">           
            <div>
              {selectedPrimaryscore && (
                <Primaryscores
                  test_id={selectedPrimaryscore.test_id}
                  session_id={selectedPrimaryscore.session_id}
                  onClose={() => setSelectedPrimaryscore(null)}
                />
              )}             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
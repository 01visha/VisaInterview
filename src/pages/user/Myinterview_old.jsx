import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes, FaComments, FaChartBar, FaStar, FaInfoCircle, FaTag, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function MyInterview({ remainingTests, subscriptionName }) {
  //console.log(subscriptionName);
  const [interviews, setInterviews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToInstructions, setRedirectToInstructions] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const authToken =
  localStorage.getItem("auth_code") || localStorage.getItem("authToken");

  const navigate = useNavigate();

  const getIconForInterview = (interviewName) => {
    switch (interviewName.toLowerCase()) {
      case "the f1 navigator: crack your interview":
        return "https://img.freepik.com/free-photo/young-bearded-student-guy-red-polo-shirt-with-backpack-holding-globe-airline-tickets-looking-up-intrigued-happy-standing_141793-99275.jpg?t=st=1735213077~exp=1735216677~hmac=aa110618e2c1cdbecd2546c0aff8b0c33b074ba9eec9145039872c6a4ea12e98&w=826";
      case "the b1/b2 navigator: master your interview":
        return "https://img.freepik.com/free-photo/beautiful-tourist-woman-holding-travel-suitcase-passport-with-tickets-with-smile-face-happy-positive-travel-concept-standing-blue-space_141793-22051.jpg?t=st=1735212492~exp=1735216092~hmac=80b0b9855af72db8f05fbbc1e76819aa5a10b27e4d2deedcd0101b8a92559d5b&w=996";
      default:
        return "https://img.freepik.com/free-photo/beautiful-tourist-woman-holding-travel-suitcase-passport-with-tickets-with-smile-face-happy-positive-travel-concept-standing-blue-space_141793-22051.jpg?t=st=1735212492~exp=1735216092~hmac=80b0b9855af72db8f05fbbc1e76819aa5a10b27e4d2deedcd0101b8a92559d5b&w=996";
    }
  };

  // Fetch interviews on mount
  useEffect(() => {
   
    if (!authToken) {
      toast.error("No auth token found");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/get-all-interviews`, {
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
        if (data?.data) {
          setInterviews(data.data);
        }
      })
      .catch((err) => {
        toast.error("Error fetching interviews:", err.message);
        setError("Failed to fetch interviews.");
      })
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

  // Redirect if redirectToInstructions becomes true
  useEffect(() => {
    if (redirectToInstructions) {
      navigate(`/instructions`);
    }
  }, [redirectToInstructions, navigate]);

  const handleInterviewClick = (interview_id, num_questions) => {
    // Perform any required operations here, then set state to trigger navigation
    setRedirectToInstructions(true);
  };

  const handleCheckForActiveSubscription = async (interview_id, num_questions) => {
    
    //console.log('In handleCheckForActiveSubscription');return;
    
    try {           
          if (!authToken) {
            toast.error("No authentication token found.");
          }

          const requestBody = {
            interview_id: interview_id,
            total_questions: num_questions,
          };
            
          //console.log(requestBody);

          const response = await fetch(`${API_BASE_URL}/start-interview`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
             const errorData = await response.json();
            toast.error(`Failed to load interview! Status: ${response.status}, Details: ${errorData.message}`);
            
           // navigate('/subscribe')
          }       

      
          const responseData = await response.json();   
                   
          const sessionId = responseData.session_id;
        
          localStorage.setItem("session_id", sessionId);
          const id = interview_id;
          const num = num_questions;
          
          navigate(`/instructions/${id}/${num}`);

          } catch (error) {
          toast.error("Error in handleInterviewClick:", error);
          toast.error("An error occurred while processing your request."); 
        }
   
   
  };

  if (loading) {
    return <div>Loading interviews...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div
              key={interview.interview_id}
              className="overflow-hidden rounded-lg bg-white shadow hover:scale-[1.02] transition-transform"
            >
              <img
                src={getIconForInterview(interview.interview_name)}
                alt={interview.interview_name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-blue-500" >
                  {interview.interview_name}
                </h3>
                <div className="mt-2">
                  <span className="text-xs text-gray-600">{interview.interview_description}</span>
                </div>
                {subscriptionName && remainingTests !== null && (() => {
  // Extract the plan type from the subscription name
  const getPlanType = (name) => {
    if (name.toLowerCase().includes("f1")) return "F1";
    if (name.toLowerCase().includes("b1")) return "B1";
    if (name.toLowerCase().includes("b2")) return "B2";
    return null; // Default case
  };

  const subscriptionPlan = getPlanType(subscriptionName); // Active subscription plan
  const interviewPlan = getPlanType(interview.interview_name); // Current interview plan

  if (subscriptionPlan === interviewPlan || subscriptionName === 'Trial') {
    // Display only the matching section
    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-700">
          Subscription Details: {subscriptionPlan}
        </h3>
        <p className="text-gray-700">
          Subscription: <span className="font-medium">{subscriptionName}</span>
        </p>
        <p className="text-gray-700">
          Remaining Attempts: <span className="font-medium">{remainingTests}</span>
        </p>
        <button
          onClick={() => handleCheckForActiveSubscription(interview.interview_id, interview.num_questions)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go For Interview
        </button>
      </div>
    );
  } else {
    // Display a locked message if the subscription doesn't match
    return (
      <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">
          This section is locked
        </h3>
        <p className="text-gray-600">
          Please proceed with your current active subscription:{" "}
          <span className="font-medium">{subscriptionName}</span>.
        </p>
      </div>
    );
  }
})()}



               
              </div>
              {/* <div className="p-4 border-t flex justify-center">
                    <button 
                    className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-1/2 bg-slate-300"
                    onClick={() =>
                      handleCheckForActiveSubscription(interview.interview_id, interview.num_questions)
                    }
                    >
                      Go For Interview
                    </button>
              </div> */}
            </div>
          ))
        ) : (
          <div>No interviews available.</div>
        )}
        <div  className="rounded-lg bg-gradient-to-l from-gray-400 via-gray-200 to-gray-300 p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
         <div className="mt-2">
          <p className="font-medium text-red-700">You should know the following:</p>
              <ul className="ml-4 list-inside space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Climatic Conditions where you are going
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Website and E-mail ID of the University
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Nearest International Airport for the University
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  General about where you are going and about the University
                </li>
              </ul>
        </div>
         </div>
        <ToastContainer />
      </div>
    </div>
  );
}

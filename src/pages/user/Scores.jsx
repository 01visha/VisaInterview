import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Scorecard from "./Scorecard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { encryptText, decryptText } from '../../utils/encryptionHelper';


export default function Scores() {
 
  const [key, setKey] = useState('crackvisascore');  
 

  const handleRedirect = (text) => {  
    navigate("/scorecard/"+encryptText(text));
  };

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const getIconForInterview = (interviewName) => {
    switch (interviewName.toLowerCase()) {
      case "the f1 navigator: crack your interview":
        return "assets/img/scorecard/scorecard2.png"
       // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-18433.jpg?t=st=1734341686~exp=1734345286~hmac=875b3a1c180f9f20afbbdb23a4dd2bb4612185cdbb9db4068f8e080882479a94&w=996";
      case "the b1 navigator: master your interview":
       // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-28468.jpg?t=st=1736237283~exp=1736240883~hmac=09a9e8ef27f92f6cce824ec5f6bedde19a54d7d1816d24c709081e02910e5361&w=996";
       return "assets/img/scorecard/scorecard1.png"
       case "the b2 navigator: master your interview":
         // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-28468.jpg?t=st=1736237283~exp=1736240883~hmac=09a9e8ef27f92f6cce824ec5f6bedde19a54d7d1816d24c709081e02910e5361&w=996";
        return "assets/img/scorecard/scorecard3.png" 
         default:
          return "assets/img/scorecard/scorecard4.png" 
       // return "https://img.freepik.com/free-vector/illustration-university-graduates_53876-18433.jpg?t=st=1734341686~exp=1734345286~hmac=875b3a1c180f9f20afbbdb23a4dd2bb4612185cdbb9db4068f8e080882479a94&w=996";
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    //const authToken = localStorage.getItem("auth_code");
    const authToken = localStorage.getItem("auth_code") || localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No auth token found");
    }

   // console.log("Auth Token: ", authToken);
    // fetch(`${API_BASE_URL}/get-all-interviews`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // })
    fetch(`${API_BASE_URL}/get-all-interviews`, {
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
        //console.log("API Response Data:", data); // Log the API response
        
        if (data?.data) {
          setInterviews(data.data); // Set the interviews to the data from the response
        }
      })
      .catch((err) => {
        toast.error("Error fetching interviews:", err);
        setError("Failed to fetch interviews.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);










  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto rounded-xl border-2 border-blue-600 p-6">
        {/* <h1 className="text-3xl font-bold text-blue-900 text-left mb-8">My Scores</h1> */}        
        <div className="rounded-lg bg-gradient-to-l from-blue-400 via-blue-300 to-blue-400 p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02] mb-6">
          <p className="text-gray-600 mb-4 leading-relaxed">
            At CrackVisa Interview, we specialize in revolutionizing visa interview preparation through cutting-edge AI technology. Our platform is designed to simulate multiple rounds of visa interviews, offering candidates a real-life experience that helps them excel in the actual interview.
          </p>
          <p className="text-gray-800 font-semibold">
            You have successfully attempted the Visa Interview! Click on View Scorecard below to view your Scorecard.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div
              key={interview.interview_id}
              className="overflow-hidden rounded-lg bg-white shadow hover:scale-[1.02] transition-transform"
            >
             
              <div className="p-4 text-center">
                <h3
                  className="mb-2 line-clamp-2 text-lg font-semibold text-blue-600 "                  
                >  {interview.interview_name} </h3>
                <img
                src={getIconForInterview(interview.interview_name)}
                alt={interview.interview_name}
                className="h-49 w-full object-cover mb-2"
              />
                
               
                {/* <div className="mt-2">
                  <span className="text-xs text-gray-600">{interview.interview_description}</span>
                </div> */}

                {/* Display interview type and number of questions below the description */}
                {/* <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <div className="text-xs font-semibold text-blue-600">{interview.interview_type}</div>
                  <div className="text-xs text-gray-600">{interview.num_questions} Questions</div>
                </div> */}
                
                <button
                  // onClick={() => setSelectedCourse(interview.interview_name)} 
                  onClick={() => handleRedirect(interview.interview_name)}
                  className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  View Scorecard
                </button>
               
              </div>
            </div>
          ))
        ) : (
          <div>No interviews available.</div>
        )}          
        </div>

        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4 z-50 w-full h-full">
            <div className="w-full h-full overflow-y-auto">
              <Scorecard
                interview_name={selectedCourse}
                onClose={() => setSelectedCourse(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


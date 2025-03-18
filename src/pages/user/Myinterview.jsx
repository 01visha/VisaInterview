import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
// import { ToastContainer } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questionset from "../../pages/user/Questionset";
import { encryptText, decryptText } from "../../utils/encryptionHelper";

function ConfirmationModal({ onConfirm, onCancel, interviewName }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure?
        </h3>
        <p className="text-gray-600 mb-6">
          Do you want to start with a new Session of{" "}
          <span className="font-bold">{interviewName}</span>. If you start with
          a new session, your Attempts will get reduced, and you will have to
          resume from My Scores{">"}View Scorecard.{" "}
        </p>
        <div className="flex justify-end space-x-4">
        <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={onConfirm}
          >
            OK
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default function MyInterview() {
  const [interviews, setInterviews] = useState([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedInterview, setSelectedInterview] = useState(null); // State for selected interview

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const getIconForInterview = (interviewName) => {
    switch (interviewName.toLowerCase()) {
      case "the f1 navigator: crack your interview":
        return "assets/img/interviews/F1_visa.png";
      //"https://img.freepik.com/free-photo/front-view-young-female-red-shirt-with-map-pink-background-colors-fashion-woman_140725-70882.jpg?t=st=1738069937~exp=1738073537~hmac=2abf0edd88e83f51a7817355083a2d1d47a17900033a0c4095bedd627774ac7f&w=996";
      case "the b1 navigator: master your interview":
        return "assets/img/interviews/B1_visa.png";
      //return "https://img.freepik.com/free-photo/front-view-travel-agent-her-working-place-map-indoors-manager-operator-agency-world-document-occupation-worker_140725-155650.jpg?t=st=1738068147~exp=1738071747~hmac=1c8f30cc7265b97d9c1c46e817a861de1bd6775d18a6533e5d2a37634494b35a&w=996";
      case "the b2 navigator: master your interview":
        return "assets/img/interviews/B2_visa.png";
      //return "https://img.freepik.com/free-photo/tourist-woman-holding-travel-suitcase-passport-with-tickets-with-smile-face-happy-positive_141793-16606.jpg?t=st=1738069992~exp=1738073592~hmac=1e930e57583579276dae3d31e4bf5fa3565e7850bc3f2cf1013c2f67e6fb4664&w=996";
      default:
        return "assets/img/interviews/F1_visa.png";
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const authToken =
      localStorage.getItem("auth_code") || localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No auth token found");
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
          toast.error("Failed to fetch interviews.");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.data) {
          setInterviews(data.data);
        }
      })
      .catch((err) => {
        toast.error("Error fetching interviews");
        setError("Failed to fetch interviews.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInterviewClick = async (interview_id, num_questions) => {
    try {
      const authToken =
        localStorage.getItem("auth_code") || localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("No authentication token found.");
      }

      const response = await fetch(`${API_BASE_URL}/start-interview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          interview_id: interview_id,
          total_questions: num_questions,
        }),
      });

      if (!response.ok) {
        toast.error(`Failed to load interview! Status: ${response.status}`);
      }

      const responseData = await response.json();

      const sessionId = responseData.session_id;

      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("child_session_id", sessionId);
      const id = interview_id;
      const num = num_questions;

      //navigate(`/instructions/${id}/${num}`);
      navigate("/instructions/" + encryptText(id) + "/" + encryptText(num));
    } catch (error) {
      toast.error("An error occurred while processing your request.");
    }
  };

  const handleCheckForActiveSubscription = async (
    interview_id,
    num_questions
  ) => {
    const authToken =
      localStorage.getItem("auth_code") || localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No auth token found");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/active_subscription`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        //toast.error("Failed to fetch Active Subscription.");
        //throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      //console.log("API Response Data:", data);

      if (Array.isArray(data.data)) {
        const matchingSubscriptions = data.data.filter((subscription) => {
          return subscription.interview_id === interview_id;
        });

        data.data.forEach((subscription, index) => {});

        if (matchingSubscriptions.length > 0) {
          const validSubscription = matchingSubscriptions.find(
            (subscription) => {
              return (
                subscription.status === "Active" &&
                subscription.remaining_tests > 0
              );
            }
          );

          if (validSubscription) {
            handleInterviewClick(interview_id, num_questions);
          } else {
            toast.error(
              "Your subscription is not active or you have no remaining tests. Please purchase a plan."
            );
            setTimeout(() => {
              navigate("/subscribe");
            }, 3000);
          }
        } else {
          toast.error(
            "Your subscription is not active or you have no remaining tests. Please purchase a plan."
          );
          setTimeout(() => {
            navigate("/subscribe");
          }, 3000);
        }
      } else {
       // console.error("Unexpected API response structure:", data);
       // toast.error("Unexpected API response structure.");
       toast.error(
        "Your subscription is not active or you have no remaining tests. Please purchase a plan."
      );
      setTimeout(() => {
        navigate("/subscribe");
      }, 3000);
      }
    } catch (err) {
      console.error("Error fetching subscription history:", err);
      toast.error("Error fetching subscription history.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (selectedInterview) {
      handleCheckForActiveSubscription(
        selectedInterview.interview_id,
        selectedInterview.num_questions
      );
    }
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal
    //navigate("/dashboard", { state: { activeTab: "my-interview" } });
  };

  const requestMicrophoneAccess = async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      alert("Microphone access granted!");
    } catch (err) {
      alert("Microphone access denied or not available.");
      toast.error(err);
    }
  };

  if (loading) {
    return <div>Loading interviews...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="rounded-xl border-2 border-blue-600 p-6">
      <div className="rounded-lg bg-gradient-to-l from-blue-400 via-blue-300 to-blue-400 p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02] mb-6">
        <div className="mt-2">
          <p className="font-bold text-red-700">
            You should know the following:
          </p>
          <ul className="ml-4 list-inside space-y-2 text-gray-900">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Speak Clearly & Slowly – Ensure your voice is clear and at a
              moderate pace.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Test Your Mic Beforehand – Check audio settings to avoid technical
              issues.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Avoid Background Noise – Use headphones or sit in a quiet place.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Mute When Not Speaking – Unmute only when answering to avoid
              disturbances.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Practice Short, Confident Answers – Keep responses crisp, avoid
              mumbling.
            </li>
          </ul>
        </div>
      </div>
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
              <div className="p-4">
                <h3
                  className="mb-2 line-clamp-2 text-lg font-semibold text-blue-500 "
                  // onClick={() => {
                  //   //requestMicrophoneAccess();
                  //   //handleInterviewClick(interview.interview_id,interview.num_questions);
                  //   handleCheckForActiveSubscription(interview.interview_id,interview.num_questions);
                  // }
                  //}
                >
                  {interview.interview_name}
                </h3>
                <div className="mt-2">
                  <span className="text-xs text-gray-600">
                    {interview.interview_description}
                  </span>
                </div>

                {/* Display interview type and number of questions below the description */}
                <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <div className="text-xs font-semibold text-blue-600">
                    Total License Purchased :
                    {interview.subscription_info.total_purchases}
                  </div>
                  <div className="text-xs text-gray-600">
                    Remaining Tests:
                    {interview.subscription_info.remaining_tests_for_user}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedInterview({
                      interview_id: interview.interview_id,
                      num_questions: interview.num_questions,
                      interview_name: interview.interview_name,
                    });
                    setShowModal(true);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors justify-center items-center"
                >
                  Go For Interview
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No interviews available.</div>
        )}
      </div>
      {showModal && (
        <ConfirmationModal
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          interviewName={selectedInterview?.interview_name}
        />
      )}
      <ToastContainer />
    </div>
  );
}

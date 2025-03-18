import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const ForgotPassword = ({ setStep }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Email sent successfully", {
          autoClose: 2000, // Show for 2 seconds
        });
        
        // Delay the navigation by 2 seconds after showing the toast
        setTimeout(() => {
          navigate("/email-sent", { state: { email } });
        }, 2000); // 2-second delay before navigating
      } else {
        toast.error(data.message || "Failed to send email", {
          autoClose: 2000, // Show for 2 seconds
        });
      }
    } catch (error) {
      //   toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-emerald-400 to-indigo-700 flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <Lock className="w-24 h-24 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Forgot Password?</h1>
          <p className="text-purple-200">Enter your email to receive a reset link.</p>
        </div>
      </div>

      <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
};

export default ForgotPassword;

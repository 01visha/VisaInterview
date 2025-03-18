import React from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Sparkles } from 'lucide-react';

const EmailSent = () => {
  // Get email from location state
  const location = useLocation();
  const email = location.state?.email || "check gmail";

//   const handleResend = () => {
//     // Implement resend logic here
//     console.log("Resending email to:", email);
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-emerald-400 to-indigo-700 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto text-center relative overflow-hidden">
        {/* Decorative top curve */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gray-50 rounded-t-2xl" />
        
        {/* Content */}
        <div className="relative">
          {/* Icon container with sparkles effect */}
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-purple-600" />
            </div>
            {/* Sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-400" />
            <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-purple-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Check your inbox, please!
          </h1>
          
          <p className="text-gray-600 mb-2">
            We've sent a password reset link to:
          </p>
          <p className="text-purple-600 font-medium mb-6">
            {email}
          </p>
          
          <p className="text-sm text-gray-500 mb-8">
            Please check your email and click on the link to reset your password. 
            The link will expire in 1 hour.
          </p>

          {/* <button
            onClick={handleResend}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Resend Email
          </button> */}

          <p className="mt-6 text-sm text-gray-500">
            Didn't receive the email?{" "}
            <span className="text-blue-500 hover:text-blue-600">
              Check your spam folder
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PricingPackage = () => {
    const [isRazorpayReady, setIsRazorpayReady] = useState(false);
    const [user, setUser] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [packages, setPackages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
  
    // Simulate user data
    useEffect(() => {
      const storedUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      };
      setUser(storedUser);
    }, []);
  
    // Load hardcoded packages
    useEffect(() => {
      const hardcodedPackages = [
        { id: 1, name: "Basic Plan", price: 499 },
        { id: 2, name: "Pro Plan", price: 999 },
        { id: 3, name: "Enterprise Plan", price: 1999 },
      ];
      setPackages(hardcodedPackages);
    }, []);
  
    // Load Razorpay script
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setIsRazorpayReady(true);
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    const handleToast = () => {
      setPaymentStatus(true);
      toast.success("You have already purchased this package. Thank you!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    };

  const  handleSubmit = () => {
        setShowPopup(true);
    }

  const  handleDismis = () => {
        navigate("/login");
    }
  
    const handlePayment = (price) => {
      if (!isRazorpayReady) {
        alert("Razorpay is not ready yet. Please try again later.");
        return;
      }
  
      const options = {
        key: "rzp_live_OEpc7y8YOlS12E", // Replace with your Razorpay test key
        amount: price * 100,
        currency: "INR",
        name: "Make Payment",
        description: "Payment for package",
        handler: (response) => {
          //console.log("Payment Successful: ", response);
          toast.success("Payment successful!");
          setPaymentStatus(true);
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.contact || "9999999999",
        },
        theme: {
          color: "#528FF0",
        },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="assets/video/siginvideo.mp4" type="video/mp4" />
      </video>

      {/* Blur Effect and Slogans */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-white bg-gradient-to-b from-black/50 via-black/70 to-black/50">
        <div className="space-y-4 w-full md:w-1/2 lg:w-2/3 xl:w-1/2 pr-4 md:pr-8 lg:pr-16 mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Elevate Your Interview Experience
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 text-white">
            Transform your Visa preparation journey with expert-curated answers, priority notifications, and exclusive resources tailored for your success.
          </p>
          <div className="space-y-4 text-lg md:text-2xl font-medium font-custom  italic">
            <p className="text-yellow-500">"Face your interviews with confidence."</p>
            <p className="text-yellow-500">"Get exclusive access to all interview answers."</p>
            <p className="text-yellow-500">"Seamless, affordable, and effective plans."</p>
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 overflow-y-auto max-h-[80vh] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
           
                <div  className="bg-white shadow-lg rounded-lg p-6 text-center w-full">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                   Monthly Plan
                  </h2>
                  <p className="text-2xl font-semibold text-gray-600 mb-4">
                    ₹999   
                    <span className="mt-20 ml-3 text-sm sm:text-base md:text-lg line-through text-gray-400">
                    ₹1998
                    </span>                 
                  </p>
                  
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mb-4">
                    50% OFF
                    </span>
               
                  <ul className="text-left text-sm text-gray-600 mb-4">
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access to expert-curated answers
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Priority notifications
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Exclusive resources
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      24/7 support
                    </li>
                  </ul>
                  <button
                    onClick={() => handleSubmit()}
                    className="w-full py-2 bg-orange-500 text-white rounded-md font-bold text-lg hover:bg-orange-600 transition-colors"
                  >
                    SUBSCRIBE NOW
                  </button>
                </div>

                <div  className="bg-white shadow-lg rounded-lg p-6 text-center w-full">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                   Free Trial
                  </h2>
                  <p className="text-2xl font-semibold text-gray-600 mb-4">
                   
                  </p>
                  
                    {/* <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mb-4">
                   
                    </span>
                */}
                  <ul className="text-left text-sm text-gray-600 mb-4 mt-20">
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access to attempt 3 Mock Interviews
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access of Questions and Answers
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access to view scorecard of previous attempts
                    </li>
                    <li className="flex items-center">
                     
                    </li>
                  </ul>
                  <button
                    onClick={() => handleSubmit()}
                    className="w-full py-2 bg-orange-500 text-white rounded-md font-bold text-lg hover:bg-orange-600 transition-colors mt-8"
                  >
                    SUBSCRIBE NOW
                  </button>
                </div>
             
          </div>
        </div>
      </div>

      <ToastContainer />
      {showPopup && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-lg p-6 max-w-sm w-full">
           <h3 className="text-lg font-semibold mb-4">Subscription Alert!</h3>
           <p className="text-gray-600 mb-6">
           To Subscribe, You Need to login First!
           </p>
           <div className="flex justify-end">
             <button
               className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
               onClick={handleDismis}
             >
               OK
             </button>
           </div>
         </div>
       </div>
      )}
    </div>

  );
};

export default PricingPackage;


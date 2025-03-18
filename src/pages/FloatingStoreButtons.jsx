import React, { useState }  from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const FloatingStoreButtons = () => {

const [showPopup, setShowPopup] = useState(false);


  return (
    // <div className="fixed top-[50%] right-0.5 md:right-2 flex  flex-col items-center space-y-4 z-10">
    //   {/* Google Play Store Button */}
    //   <a
    //     href="https://play.google.com/store/games?device=windows"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="group flex items-center  bg-transparent p-2 md:p-3  rounded-full shadow-lg transition-transform duration-300 hover:scale-105 "
    //   >
    //     <img
    //       src="/assets/img/icon/playstore.png" // replace with actual image path
    //       alt="Google Play Store"
    //       className="w-7 md:w-12"
    //     />
    //   </a>
    //   {/* Apple Store Button */}
    //   <a
    //     href="https://play.google.com/store/games?device=windows"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="group flex items-center bg-black text-white p-2 md:p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-800 "
    //   >
    //     <FaApple className="text-lg md:text-3xl" />
    //   </a>
    // </div>
    
    <>
      <div className="fixed top-16 md:top-[50%] right-0.5 md:right-2 flex flex-col items-center space-y-4 z-10">

        {/* Google Play Store Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="group flex items-center bg-transparent p-2 md:p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <img
            src="/assets/img/icon/playstore.png" // replace with actual image path
            alt="Google Play Store"
            className="w-7 md:w-12"
          />
        </button>

        {/* Apple Store Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="group flex items-center bg-black text-white p-2 md:p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-800 focus:outline-none"
        >
          <FaApple className="text-lg md:text-3xl" />
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold text-gray-800">Coming Soon...</h2>
            <p className="text-gray-600 mt-2">
              The app will be available soon. Stay tuned!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
    
  );
}

export default FloatingStoreButtons;

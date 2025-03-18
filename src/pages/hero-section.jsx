import React, { useState } from 'react';
import { FaGooglePlay } from 'react-icons/fa';

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/assets/img/1.png'];

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 max-w-xl">
          <h1 className="text-[#1A2B48] text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
            Download the <span className="text-[#325dc8]">CrackVisa</span> app to get all your study abroad updates on the go!
          </h1>

          <p className="text-gray-600 text-lg md:text-xl">
            Just Tap on Button and Install on your phone or visit the store on your mobile and search 'CrackVisa'
          </p>

          <div className="pt-4">
            {/* <a
              href="https://play.google.com/store/games?device=windows"
              className="inline-flex items-center justify-center bg-[#325dc8] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#FF8C00] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaGooglePlay className="mr-2 text-xl" />
              Get it on Google Play
            </a> */}
             <button onClick={() => setShowPopup(true)} className="inline-flex items-center justify-center bg-[#325dc8] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#FF8C00] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
             <FaGooglePlay className="mr-2 text-xl" /> Get it on Google Play
             </button>
          </div>
           {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
        </div>

        {/* Right Content - Image */}
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
          <img src={images} alt="App Screenshot" className="w-full h-full object-contain" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

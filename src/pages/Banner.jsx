// import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
const Banner = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth_code'); // Assuming you store the token in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="relative h-[700px] w-full flex items-center justify-start overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="assets/video/siginvideo.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="relative z-20 text-white px-8 sm:px-12 lg:px-16 max-w-xl pt-52 sm:pt-64 md:pt-72 lg:pt-0">
      <motion.h1
        className="font-custom text-4xl sm:text-5xl md:text-6xl mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let AI train your VISA Interview
      </motion.h1>

      <motion.p
        className="font-custom text-xl sm:text-2xl mb-8 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Face Visa interviews with our AI-powered Mock Visa interview Assessment Platform
      </motion.p>

      {/* Conditionally render the button */}
      {!isAuthenticated && (
        <motion.button
          className="group font-custom bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 1.95 }}
          onClick={() => navigate('/login')}
        >
          Try For Free
        </motion.button>
      )}
    </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16 sm:h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-white opacity-25"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;

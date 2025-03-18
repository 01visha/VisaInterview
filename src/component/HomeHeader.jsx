"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaBehance,
  FaSkype,
  FaYoutube,
  FaUser,
  FaArrowRight,
  FaHome,
  FaComments,
  FaChartBar,
  FaStar,
  FaInfoCircle,
  FaEnvelope,
  FaTag,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa";
// import "./css/home-header.css";
import "./css/home-header.css";

function HomeHeader() {
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 1,
    hours: 6,
    minutes: 0,
    seconds: 9,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const sentence = "Get Trained with Crack Visa Mock Interview!".split(" ");
  const controls = useAnimation();

  useEffect(() => {
    let isActive = true; // Prevent calling animation after unmounting
  
    const startAnimation = async () => {
      while (isActive) { 
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        if (!isActive) return; // Check before starting next animation
        await controls.start("hidden");
      }
    };
  
    startAnimation();
  
    return () => {
      isActive = false; // Stop animation when unmounting
    };
  }, [controls]);

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown.seconds > 0) {
          return { ...prevCountdown, seconds: prevCountdown.seconds - 1 };
        } else if (prevCountdown.minutes > 0) {
          return {
            ...prevCountdown,
            minutes: prevCountdown.minutes - 1,
            seconds: 59,
          };
        } else if (prevCountdown.hours > 0) {
          return {
            ...prevCountdown,
            hours: prevCountdown.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevCountdown.days > 0) {
          return {
            ...prevCountdown,
            days: prevCountdown.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevCountdown;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      <div className="hidden md:flex px-3 bg-gradient-to-r from-[#004792] to-[#2c3968] gap-2 items-center">
        <div className="text-white text-sm">
          <motion.p
            className="mb-0 font-custom text-white text-lg"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            {sentence.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={wordVariants}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </div>

        <div className="font-custom flex space-x-2 text-white text-xs">
          <a href="https://play.google.com/store" target="_blank">
            <img
              src="/assets/img/icon/playstore.png"
              alt="Get it on Google Play"
              className="h-8 transition-transform duration-300 hover:scale-110"
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <FaApple className="text-lg text-white md:text-3xl bg-black rounded-full p-1 transition-transform duration-300 hover:scale-105" />
          </a>
        </div>

        {/* Shift this div to the right corner */}
        <div className="flex items-center space-x-4 text-sm ml-auto">
          <div className="flex space-x-3">
            <a href="#" className="text-blue-500 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-pink-500 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-600 hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-red-600 hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex flex-wrap justify-between items-center">
          <div className="ml-2">
            <a href="/">
              <img
                src="assets/img/logo/visa_logo1_new.png"
                alt="Logo"
                className="h-12"
              />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <nav className="hidden md:block md:w-auto justify-end">
              <ul className="flex flex-wrap space-x-2 lg:space-x-2 text-base lg:text-lg font-custom font-sm text-gray-700 mr-20">
                <li className={activeHash === "/" ? "text-blue-500" : ""}>
                  <HashLink smooth to="/">
                    Home
                  </HashLink>
                </li>
                <li
                  className={
                    activeHash === "#testimonials" ? "text-blue-500" : ""
                  }
                >
                  <HashLink smooth to="/#testimonials">
                    Testimonials
                  </HashLink>
                </li>
                <li
                  className={activeHash === "#overview" ? "text-blue-500" : ""}
                >
                  <HashLink smooth to="/#overview">
                    Overview
                  </HashLink>
                </li>
                <li
                  className={activeHash === "#features" ? "text-blue-500" : ""}
                >
                  <HashLink smooth to="/#features">
                    Features
                  </HashLink>
                </li>
                <li
                  className={activeHash === "#reviews" ? "text-blue-500" : ""}
                >
                  <HashLink smooth to="/#reviews">
                    Reviews
                  </HashLink>
                </li>
                <li
                  className={activeHash === "/Contact" ? "text-blue-500" : ""}
                >
                  <Link to="/Contact">Contact</Link>
                </li>
              </ul>
            </nav>

            <Link to="/login" className="login-button" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/Signup" className="signup-button" onClick={closeMenu}>
              Sign up
            </Link>
            <Link to="/subscribe" className="pbutton1 mr-4" onClick={closeMenu}>
              Pricing <FaArrowRight className="icon" />
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-64 bg-white h-full shadow-md p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <img
                  src="assets/img/logo/visa_logo1_new.png"
                  alt="Logo"
                  className="h-8"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 focus:outline-none"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <div className="mb-6">
                <p className="font-custom text-gray-700 mb-2">
                  Get your CrackVisa Interview!
                </p>
                {/* <div className="font-custom flex space-x-2 text-gray-700 text-sm">
                  <span>{countdown.days}d</span>
                  <span>{countdown.hours}h</span>
                  <span>{countdown.minutes}m</span>
                  <span>{countdown.seconds}s</span>
                </div> */}
              </div>

              <nav>
                <ul className="space-y-4 text-gray-700 text-lg font-medium">
                  <li>
                    <HashLink
                      smooth
                      to="/"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaHome className="mr-3 text-blue-500" /> Home
                    </HashLink>
                  </li>
                  <li>
                    <HashLink
                      smooth
                      to="/#testimonials"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaComments className="mr-3 text-green-500" />{" "}
                      Testimonials
                    </HashLink>
                  </li>
                  <li>
                    <HashLink
                      smooth
                      to="/#overview"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaChartBar className="mr-3 text-yellow-500" /> Overview
                    </HashLink>
                  </li>
                  <li>
                    <HashLink
                      smooth
                      to="/#features"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="mr-3 text-purple-500" /> Features
                    </HashLink>
                  </li>
                  <li>
                    <HashLink
                      smooth
                      to="/#reviews"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaStar className="mr-3 text-orange-500" /> Reviews
                    </HashLink>
                  </li>
                  <li>
                    <Link
                      to="/Contact"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaEnvelope className="mr-3 text-red-500" /> Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-6 space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full border border-violet-700 text-purple-900 px-4 py-2 rounded-full font-semibold text-lg transition-colors hover:bg-purple-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className="mr-2" /> Login/Signup
                </Link>

                <Link
                  to="/subscribe"
                  className="flex items-center justify-center w-full bg-violet-700 text-white px-4 py-2 rounded-full font-semibold text-lg transition-colors hover:bg-purple-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaTag className="mr-2" /> Pricing
                </Link>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <a href="#" className="text-blue-500">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-pink-500">
                  <FaInstagram />
                </a>
                <a href="#" className="text-blue-600">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="text-red-600">
                  <FaYoutube />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default HomeHeader;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { HashLink } from "react-router-hash-link";

import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaUser,
  FaArrowRight,
  FaHome,
  FaComments,
  FaChartBar,
  FaApple,
  FaStar,
  FaInfoCircle,
  FaEnvelope,
  FaTag,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import SignOutModal from "../component/SignOutModal";
// import "../component/css/home-header.css";
// import "../component/css/userheader.css";

function UnifiedHeader() {
  const navigate = useNavigate();
  const { userData, loginUser, logoutUser } = useUserContext();
  const [profileImage, setProfileImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "", email: "" });
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const controls = useAnimation();
  const sentence = "Get Trained with Crack Visa Mock Interview!".split(" ");

  const defaultProfileImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PHWKX1-RSvrB1MujZfo_H81KeeLH-G9SHg&s";

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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

  
  useEffect(() => {
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (!userData.isAuthenticated && userData.name && userData.email) {
      const userInfo = {
        accountType: "user",
        name: userData.name,
        email: userData.email,
        picture: userData.picture || profileImage || defaultProfileImage,
      };
      //console.log('UserInfo:-',userInfo);
      loginUser(userInfo);
    }
  }, [
    userData.isAuthenticated,
    loginUser,
    profileImage,
    userData.name,
    userData.email,
    userData.picture,
  ]);

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(false);
    setIsDropdownOpen(false);
  };

  const handleSignOut = () => {
    localStorage.clear();
    logoutUser();
    navigate("/login");  
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("auth_code");

    // if (!authToken) {
    //   console.error("Authentication token not found");
    //   return; // Exit early if authToken is not found
    // }
    if (authToken) {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/get_user_profile`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );



        const data = await response.json();

        if (data.status === "success" && data.data) {
          setUserProfile({
            name: data.data.full_name,
            email: data.data.email_address,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();

  }else{
   // console.log("Authentication token not found");
    //return; // Exit early if authToken is not found
  }
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      {/* Top Bar */}
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
          {/* <a href="https://play.google.com/store" target="_blank">
            <img
              src="/assets/img/icon/playstore.png"
              alt="Get it on Google Play"
              className="h-8 transition-transform duration-300 hover:scale-110"
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <FaApple className="text-lg text-white md:text-3xl bg-black rounded-full p-1 transition-transform duration-300 hover:scale-105" />
          </a> */}
           <button onClick={() => setShowPopup(true)} className="focus:outline-none">
        <img
          src="/assets/img/icon/playstore.png"
          alt="Get it on Google Play"
          className="h-8 transition-transform duration-300 hover:scale-105"
        />
      </button>

      {/* Apple Store Button */}
      <button onClick={() => setShowPopup(true)} className="focus:outline-none">
        <FaApple className="text-lg text-white md:text-3xl bg-black rounded-full p-1 transition-transform duration-300 hover:scale-105" />
      </button>
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

      {/* Main Header */}
      <div className="bg-white">
        <div className="mx-auto flex flex-wrap justify-between items-center">
          <div className="ml-2">
            <a href="/">
              <img
                src="/assets/img/logo/visa_logo1_new.png"
                alt="Logo"
                className="h-12"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
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

            {userData.isAuthenticated ? (
              <>
                {/* <Link
                  to="/dashboard"
                  className="dash-button"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link> */}
                 <Link to="/dashboard" className="pbutton" onClick={closeMenu}>
                 Dashboard
                </Link>
                <Link to="/subscribe" className="pbutton" onClick={closeMenu}>
                  Pricing <FaArrowRight className="icon" />
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <div className="cursor-pointer">
                    {userData.picture ? (
                      <img
                        src={userData.picture || defaultProfileImage}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border-2 border-gray-200 cursor-pointer"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 font-semibold cursor-pointer mr-4">
                        {userData.name?.charAt(0).toUpperCase() ||
                          userProfile.name?.charAt(0).toUpperCase() ||
                          "U"}
                      </div>
                    )}
                  </div>

                  {showProfileDropdown && (
                    <div className="absolute right-0 w-64 bg-white shadow-lg rounded-md z-10 py-4">
                      <div className="flex items-center space-x-3 mb-3 px-4">
                        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                          {userData.picture ? (
                            <img
                              src={userData.picture || defaultProfileImage}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold">
                              {userData.name?.charAt(0).toUpperCase() ||
                                userProfile.name?.charAt(0).toUpperCase() ||
                                "U"}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="block font-custom text-xs font-semibold text-gray-800 truncate">
                            {userProfile.name}
                          </span>
                          <span
                            className="block text-xs text-gray-500 truncate"
                            title={
                              userData.name === userProfile.email
                                ? userProfile.email
                                : userData.email
                            }
                          >
                            {userData.name === userProfile.email
                              ? userProfile.email
                              : userData.email}
                          </span>
                        </div>
                      </div>

                      <hr className="my-2 border-t border-gray-200" />

                      <Link
                        to="/Myprofile"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                        onClick={closeMenu}
                      >
                        <FaUser className="mr-2 inline" /> My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowSignOutModal(true);
                          closeMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        <FaSignOutAlt className="mr-2 inline" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="login-button" onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  to="/Signup"
                  className="signup-button"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
                <Link
                  to="/subscribe"
                  className="pbutton1 mr-4"
                  onClick={closeMenu}
                >
                  Pricing <FaArrowRight className="icon" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
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
                  src="/assets/img/logo/visa_logo1_new.png"
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
              </div>

              <nav>
                <ul className="text-gray-700 text-lg font-medium">
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
                    {/* <Link
                                          to="/myprofile"
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                          onClick={closeMenu}
                                        >
                                          My Profile
                                        </Link> */}
                  </li>
                  <li>
                    <Link
                      to="/myprofile"
                      className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="mr-3 text-red-500" /> My Profile
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-6 space-y-3">
                {userData.isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center w-full border border-violet-700 text-purple-900 px-4 py-2 rounded-full font-semibold text-lg transition-colors hover:bg-purple-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaChartBar className="mr-2" /> Dashboard
                    </Link>
                    <Link
                      to="/subscribe"
                      className="flex items-center justify-center w-full bg-violet-700 text-white px-4 py-2 rounded-full font-semibold text-lg transition-colors hover:bg-purple-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaTag className="mr-2" /> Pricing
                    </Link>
                    <button
                      onClick={() => {
                        setShowSignOutModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center w-full border border-red-600 text-red-600 px-4 py-2 rounded-full font-semibold text-lg transition-colors hover:bg-red-50"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
      />
    </header>
  );
}

export default UnifiedHeader;

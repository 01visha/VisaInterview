import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { HashLink } from "react-router-hash-link"
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaComments,
  FaChartBar,
  FaStar,
  FaInfoCircle,
  FaTag,
  FaArrowRight,
  FaChevronDown,
  FaCircle,
} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import "./css/userheader.css"
import SignOutModal from "./SignOutModal"

function UserHeader() {
  const navigate = useNavigate()
  const { userData, loginUser, logoutUser } = useUserContext()
  const [activeHash, setActiveHash] = useState(window.location.hash)
  const [profileImage, setProfileImage] = useState("")
  const [userProfile, setUserProfile] = useState({ name: "", email: "" })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const defaultProfileImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PHWKX1-RSvrB1MujZfo_H81KeeLH-G9SHg&s"
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)


  useEffect(() => {
    const authToken = localStorage.getItem("auth_code")
    if (!authToken) throw new Error("Authentication token not found")

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get_user_profile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }) // Replace with actual API URL
        const data = await response.json()
        if (data.status === "success" && data.data) {          
          setUserProfile({
            name: data.data.full_name,
            email: data.data.email_address,
          })
        }        
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchUserProfile()
  }, [])


  useEffect(() => {
    const savedImage = localStorage.getItem("profilePicture")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])


  useEffect(() => {
    const savedImage = localStorage.getItem("profilePicture")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  useEffect(() => {
    
    if (!userData.isAuthenticated && userData.name && userData.email) {
      const userInfo = {
        accountType: "user",
        name: userData.name,
        email: userData.email,
        picture: userData.picture || profileImage || defaultProfileImage,
      }
      //console.log('UserInfo:-',userInfo);
      loginUser(userInfo)     
    }
  }, [userData.isAuthenticated, loginUser, profileImage, userData.name, userData.email, userData.picture])

  useEffect(() => {
    if (!userData.isAuthenticated) {
      logoutUser()
    }
  }, [userData.isAuthenticated, logoutUser])

  const handleSignOut = () => {
    localStorage.clear()
    logoutUser()
    navigate("/login");   
   
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setShowProfileDropdown(false)
    setIsDropdownOpen(false)
  }

  return (
    <header className="font-custom sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="ml-4">
          <a href="/" onClick={closeMenu}>
            <img src="/assets/img/logo/visa_logo1_new.png" alt="Logo" className="h-12 w-auto max-w-[150px] object-contain" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Testimonials, Reviews, Pricing Button and Profile */}
        <div className="hidden md:flex items-center space">
          <HashLink
            smooth
            to="/"
            className={`hover:text-blue-500 transition duration-300 ${activeHash === "/" ? "text-blue-500" : ""}`}
            onClick={closeMenu}
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className={`hover:text-blue-500 transition duration-300 ${activeHash === "/#testimonials" ? "text-blue-500" : ""}`}
            onClick={closeMenu}
          >
            Testimonials
          </HashLink>
          <HashLink smooth to="/#overview" className="hover:text-blue-500 transition duration-300" onClick={closeMenu}>
            Overview
          </HashLink>
          <HashLink smooth to="/#features" className="hover:text-blue-500 transition duration-300" onClick={closeMenu}>
            Features
          </HashLink>
          <HashLink
            smooth
            to="/#reviews"
            className={`hover:text-blue-500 transition duration-300 ${activeHash === "/#reviews" ? "text-blue-500" : ""}`}
            onClick={closeMenu}
          >
            Reviews
          </HashLink>
          {/* <Link to="/aboutus" className="hover:text-blue-500 transition duration-300" onClick={closeMenu}>
            About Us
          </Link> */}
          <Link to="/contact" className="hover:text-blue-500 transition duration-300" onClick={closeMenu}>
            Contact
          </Link>
          <Link
            to="/dashboard"
            className="dash-button"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/subscribe"
            className="pbutton"
            onClick={closeMenu}
          >
            Pricing  <FaArrowRight className="icon" /> 
          </Link>
          <div
      className="relative"
      onMouseEnter={() => setShowProfileDropdown(true)} // Show dropdown on hover
      onMouseLeave={() => setShowProfileDropdown(false)} // Hide dropdown on mouse leave
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
             {userData.name?.charAt(0).toUpperCase() || userProfile.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>

      {/* Dropdown Menu, visibility controlled by mouse hover */}
      {showProfileDropdown && (
        <div className="absolute right-0 w-64 bg-white shadow-lg rounded-md z-10 py-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-3 px-4">
            {/* Profile Image (Left Aligned) */}
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
              {userData.picture ? (
                <img
                  src={userData.picture || defaultProfileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold">
                  {userData.name?.charAt(0).toUpperCase() || userProfile.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Name and Email (Right Aligned) */}
            <div className="flex-1 min-w-0">
              <span className="block font-custom text-xs font-semibold text-gray-800 truncate">
              {userProfile.name}
                
              </span>
              <span
                className="block text-xs text-gray-500 truncate"
                title={(userData.name === userProfile.email)
                  ? userProfile.email
                  : userData.email} 
              >
                {(userData.name === userProfile.email)
                  ? userProfile.email
                  : userData.email}
              </span>
            </div>
          </div>

          <hr className="my-2 border-t border-gray-200" />

          {/* Links */}
          <Link
            to="/Myprofile"
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
            onClick={closeMenu}
          >
            <FaUser className="mr-2 inline" /> My Profile
          </Link>
          {/* <Link
            to="/dashboard"
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
            onClick={closeMenu}
          >
            <FaChartBar className="mr-2 inline" /> Dashboard
          </Link> */}
          <button
            onClick={() => {
              setShowSignOutModal(true)
              closeMenu()
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            <FaSignOutAlt className="mr-2 inline" /> Sign Out
          </button>
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-64 bg-white h-full shadow-md p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Menu Button */}
             

              {/* User Profile */}
              <div className="flex items-start space-x-3 mb-6">
              {/* Close Button (Left Aligned) */}
              <div className="mb-4">
                <button onClick={closeMenu} className="text-gray-700 focus:outline-none">
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Profile Image and User Details (Right Aligned) */}
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-200">
                  {userData.picture ? (
                    <img
                      src={userData.picture || defaultProfileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold">
                       {userData.name?.charAt(0).toUpperCase() || userProfile.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>

              {/* User Name and Email */}
              <div className="text-center mt-2 max-w-[150px] overflow-hidden">
              <span className="block font-custom text-xs font-semibold text-gray-800 truncate">
              {userProfile.name}
              </span>
              <span
              className="text-xs text-gray-500 truncate whitespace-nowrap overflow-hidden"
              title={(userData.name === userProfile.email) 
                ? userProfile.email 
                : userData.email} 
              >
              {(userData.name === userProfile.email) 
                ? userProfile.email 
                : userData.email}
              </span>
              </div>
              </div>
              </div>                          

              {/* Navigation Links */}
              <nav>
                <ul className="space-y-4 text-gray-700 text-lg font-medium">
                <li className="flex items-center space-x-2">
                    <FaChartBar className="text-yellow-500" />
                    <HashLink
                      smooth
                      to="/dashboard"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </HashLink>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaChartBar className="text-green-500" />
                    <HashLink
                      smooth
                      to="/#overview"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Overview
                    </HashLink>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaInfoCircle className="text-yellow-500" />
                    <HashLink
                      smooth
                      to="/#features"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Features
                    </HashLink>
                  </li>
                  
                  <li className="flex items-center space-x-2">
                    <FaComments className="text-blue-500" />
                    <HashLink
                      smooth
                      to="/#testimonials"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Testimonials
                    </HashLink>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaStar className="text-purple-500" />
                    <HashLink
                      smooth
                      to="/#reviews"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Reviews
                    </HashLink>
                  </li>
                  {/* <li className="flex items-center space-x-2">
                    <FaInfoCircle className="text-red-500" />
                    <Link
                      to="/aboutus"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      About Us
                    </Link>
                  </li> */}
                  <li className="flex items-center space-x-2">
                    <FaTag className="text-indigo-500" />
                    <Link
                      to="/subscribe"
                      className="hover:text-blue-500 transition duration-300 border border-gray-300 rounded-md py-2 px-3 w-full"
                      onClick={closeMenu}
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Profile Dropdown */}
              <div className="mt-6">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full py-2 px-3 text-left text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out"
                >
                  <span>Profile Options</span>
                  <FaChevronDown
                    className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 py-2 bg-white rounded-md shadow-xs">
                    <Link
                      to="/myprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                      onClick={closeMenu}
                    >
                      My Profile
                    </Link>
                    {/* <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link> */}
                    <button
                      onClick={() => {
                        setShowSignOutModal(true)
                        closeMenu()
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <SignOutModal isOpen={showSignOutModal} onClose={() => setShowSignOutModal(false)} onConfirm={handleSignOut} />
    </header>
  )
}

export default UserHeader
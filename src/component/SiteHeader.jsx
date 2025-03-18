import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Home from "../pages/Home";

export default function SiteHeader() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { userData, loginUser, logoutUser } = useUserContext();
  const [activeHash, setActiveHash] = useState(window.location.hash);

  // Simulate user login for demonstration purposes
  useEffect(() => {
    // If userData is not set, simulate a user login
    if (!userData.isAuthenticated) {
      const userInfo = {
        accountType: "user",
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      };
      loginUser(userInfo); // Update context with user information
    } else {
      // If userData is set, simulate a user data here
      const userdetails = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      };
    }
  }, [userData.isAuthenticated, loginUser]);

  // If the user is not authenticated, show the home page
  if (!userData.isAuthenticated) {
    logoutUser();
    return <Home />;
  }

  // Sign-out handler
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    logoutUser(); // Call logoutUser to log the user out
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-14 items-center">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Visa Interview</span>
        </a>
        {/* <nav className="flex items-center space-x-6 text-sm font-medium">
          <a
            href="/categories"
            className="transition-colors hover:text-gray-600"
          >
            Categories
          </a>
        </nav> */}
        {/* <div className="flex flex-1 items-center space-x-2">
          <div className="w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2 rounded bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </div> */}
        {/* <nav className="flex items-center space-x-2">
          <a
            href="/business"
            className="text-sm font-medium transition-colors hover:text-gray-600"
          >
            Visa Interview Business
          </a>
          <a
            href="/teach"
            className="text-sm font-medium transition-colors hover:text-gray-600"
          >
            Teach on Visa Interview
          </a>
          <a href="/cart" className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </a>
        </nav> */}
        <div className="ml-auto flex items-center space-x-2">
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={handleSignOut}
          >
            SignOut
          </button>
          {/* <button className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Log in
          </button>
          <button className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Sign up
          </button> */}
        </div>
      </div>
    </header>
  );
}

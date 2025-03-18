import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation for route detection
import { HomeHeader, UserHeader } from "../component/Header"; // Import the headers
import Footer from "../component/Footer";
import UnifiedHeader from "../pages/UnifiedHeader";

const Layout = React.memo(({ children }) => {
  const [userData, setUserData] = useState(null); // Local state for userData
  const location = useLocation(); // Get the current route

  // Check if the current route is '/login' or '/signup'
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/Signup" ||
    // location.pathname === "/EmailSignup" ||
    // location.pathname === "/GoogleSignup";
    location.pathname === "/profile-update";

  // Check if userData is available in localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData"); // Assuming userData is stored as a JSON string
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Set the state from localStorage if userData is found
    }
  }, []); // Run once when the component mounts

  const renderHeader = () => {
    if (isAuthPage) return null; // Don't render header on /login or /signup pages
    if (!userData) return <UnifiedHeader />; // Show HomeHeader when userData is not found or not authenticated
    return <UnifiedHeader userData={userData} />; // Pass userData as props to UserHeader
    <UnifiedHeader/>
  };

  const renderFooter = () => {
    if (isAuthPage) return null; // Don't render footer on /login or /signup pages
    return <Footer />; // Show footer on other pages
  };

  return (
    <div>
      {renderHeader()}
      <main>{children}</main>
      {renderFooter()}
    </div>
  );
});

export default Layout;

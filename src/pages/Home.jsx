import React, { useEffect, useState } from "react";
import Testimonials from "./Testimonials.jsx";
import Overview from "./Overview.jsx";
import Reviews from "./Reviews.jsx";
import Features from "./Features.jsx";
import Banner from "./Banner.jsx";
import { useUserContext } from "../context/UserContext.js"; // Assuming you're using context
import HeroSection from "./hero-section/hero-section.jsx";
import FloatingStoreButtons  from "../../src/pages/FloatingStoreButtons.jsx";



function Home() {
  const { userData, loginUser } = useUserContext();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");
  // Handle user data login and simulation
    useEffect(() => {
      if (!userData.isAuthenticated) {
        // Simulate a user login by setting user data in context if user is not authenticated
        if (storedUserData) {
          const userInfo = {
            accountType: storedUserData.accountType || "user",
            name: storedUserData.name || "",
            email: storedUserData.email || "",
            picture: storedUserData.picture || "",
          };
          loginUser(userInfo, authToken); // Update context with user information and token
        }
      } else {
        // Simulate user details when already authenticated
        const userdetails = {
          accountType: userData.accountType || "user",
          name: userData.name || "",
          email: userData.email || "",
          picture: userData.picture || "",
        };
        //console.log("User already authenticated, user details: ", userdetails);
      }
    }, [userData.isAuthenticated, storedUserData, authToken, loginUser]);
  
    return (
        
        <>
       
        <div id="popup-search-box">
          <div className="box-inner-wrap d-flex align-items-center">
            <form id="form" action="#" method="get" role="search">
              <input id="popup-search" type="text" name="s" placeholder="Type keywords here..." />
            </form>
            <div className="search-close"><i className="fa-sharp fa-regular fa-xmark" /></div>
          </div>
        </div>
      {/* /.mobile-side-menu */}
        <div className="mobile-side-menu-overlay" />
      <Banner />
      <Testimonials />
      <Overview />
      <Features />     
      <Reviews />   
      <HeroSection /> 
      <FloatingStoreButtons/>
        </>
    );

}

export default Home
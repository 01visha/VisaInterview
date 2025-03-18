import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInterview from "../../pages/user/Myinterview";
import Tips from "../../pages/user/Tips";
import Scores from "../../pages/user/Scores";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useUserContext } from "../../context/UserContext"; // Assuming you're using context

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData, loginUser } = useUserContext(); // Get user context and loginUser function

  // Retrieve user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");

  // Redirect if not authenticated
  useEffect(() => {
    if (!storedUserData || !authToken) {
      navigate("/"); // Redirect to home page if not authenticated
    }
  }, [storedUserData, authToken, navigate]);

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

  // Render a fallback while loading user data
  if (!storedUserData || !authToken) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-start py-5" id="sec-8fb1">
      <div className="container">
        <div className="row g-4 mb-3 border">
          <div className="col-md-12">
            <div>
            <h3 className="text-start mb-3">My Interview</h3>
              <p>              
              The following information will be used to get you a visa:
              <ul>
              <li>Your Confidence</li>
              <li>Your Presentation skills</li>
              <li>Your communication skills</li>
              <li>Your presence of mind backed by adequate documents.</li>
              <li>Never use any abbreviations i.e short form i.e. you should not say WCL rather u should say Western Coalfields Ltd.</li>
              <li>Always carry original documents, no photocopies acceptable.</li>
              <li>You should give adequate time to prepare for your visa interview, You  should go through the experiences shared by students who have already given interviews on various websites like face book, yahoo , What’s App group, you tube videos, etc If any.</li>
              <li>One should concentrate on interview as there may be a possibility that the visa officer will just ask u questions and u may not have to show a single document.
              </li>
              </ul>         
              </p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <Tabs
            defaultActiveKey="myinterview"
            id="uncontrolled-tab-example"
            className="mb-3 bg-black txtcol custom-tabs"
          >
            <Tab eventKey="myinterview" title="My Interviews">
              <MyInterview />
            </Tab>
            <Tab eventKey="tips" title="Tips">
              <Tips />
            </Tab>
            <Tab eventKey="scores" title="Scores">
              <Scores />
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

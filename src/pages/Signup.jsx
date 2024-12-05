import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../context/UserContext";

export default function Signup() {
  const navigate = useNavigate(); // Initialize navigation
  const { setUserData } = useUserContext();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userData = await userInfoResponse.json();

        // Save the fetched user data
        setUserData(userData);
        //console.log("User Data:", userData);

        // Optional: Send this data to your backend for authentication/record-keeping
        // await fetch('/api/save-user-data', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(userData),
        // });

        // Navigate to the profile page
        navigate('/Myprofile');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="m-5 d-flex align-items-center justify-content-center">
          <div className="card shadow p-4 div-design">
            <div className="text-center mb-4">
              <p>
                <a href="/">
                  <img className="img-logo" src="assets/img/logo/interview_logo_copy.png" alt="Logo" />
                </a>
              </p>
              <h1 className="h5 font-weight-medium">Sign In</h1>
              <p className="text-muted">You can currently sign in with Google. More providers coming soon.</p>
            </div>
            <div className="d-flex flex-column align-items-center gap-3">
              <button
                className="btn btn-primary btn-block d-flex align-items-center gap-2"
                onClick={() => login()}
              >
                <img
                  alt="Google"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  src="https://authjs.dev/img/providers/google.svg"
                />
                Sign in with Google
              </button>
              <div className="d-flex align-items-center text-muted my-3">
                <div className="flex-fill border-bottom mx-2"></div>
                <span>or continue with Mobile No.</span>
                <div className="flex-fill border-bottom mx-2"></div>
              </div>
              <form className="d-flex gap-2 w-100">
                <input type="text" className="form-control" placeholder="Mobile No." value="" />
                <button type="submit" className="btn btn-outline-secondary" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8L22 12L18 16"></path>
                    <path d="M2 12H22"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

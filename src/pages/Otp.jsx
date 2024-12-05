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
              <h1 className="h5 font-weight-medium">OTP</h1>
              <p className="text-muted">Please Enter OTP send on your mobile no.</p>
            </div>
            <div className="d-flex flex-column align-items-center gap-3">
              <form className="d-flex gap-2 w-100">
                <input type="text" className="form-control" placeholder="Enter OTP" value="" />
                <button type="submit" className="btn bg-otp">
                  Send OTP                  
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

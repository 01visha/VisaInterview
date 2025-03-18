import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../context/UserContext";
import Layout from "../component/Layout";
// import { ToastContainer } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const slogans = [
    "Unlock Your Global Potential",
    "Embrace a World of Opportunities",
    "Shape Your International Future"
  ];

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const ordertype = localStorage.getItem("order_type");
  const subscriptionId = localStorage.getItem("subscription_id");

  const catname = localStorage.getItem("visa_category");
  const trialsubscriptionId = localStorage.getItem("trial_subscription_id");
  const price = localStorage.getItem("price");
  const isAuthenticated = !!localStorage.getItem("auth_code");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",

  });
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000); // Change slogan every 5 seconds

    return () => clearInterval(interval);
  }, []);

  

  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     const { access_token } = tokenResponse;
  
  //     try {
  //       // Fetch user info from Google
  //       const userInfoResponse = await fetch(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );
  
  //       if (!userInfoResponse.ok) {
  //         throw new Error("Failed to fetch user information");
  //       }
  
  //       const userData = await userInfoResponse.json();
  //       console.log("Google User Data:", userData); // Log Google user data
  
  //       // Check if email is present in the response
  //       if (!userData.email) {
  //         throw new Error("Email not found in Google user data");
  //       }
  
  //       // Prepare login payload
  //       const loginPayload = {
  //         identifier: userData.email, // Email as identifier
  //         password: userData.sub, // Google user_id as password
  //       };
  
  //       // First, try to log in the user
  //       const loginResponse = await fetch(`${API_BASE_URL}/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(loginPayload),
  //       });
  
  //       if (loginResponse.ok) {
  //         // User exists, proceed to login
  //         const responseData = await loginResponse.json();
  //         console.log("Login Success:", responseData); // Log login success
  //         toast.success("Login successful! Redirecting...");
  //         handleSuccessfulLogin(userData, responseData);
  //         // Redirect to /profile-update
  //         window.location.href = "/profile-update";
  //         return;
  //       }
  
  //       // If login fails with 401 and message "User not found", proceed to register
  //       if (loginResponse.status === 401) {
  //         const errorData = await loginResponse.json();
  //         console.log("Login Error Data:", errorData); // Log login error
  //         if (errorData.message === "User not found") {
  //           // Prepare registration payload with static values
  //           const registrationPayload = {
  //             email_address: userData.email, // Google email as email_address
  //             password: userData.sub, // Google user_id as password
  //             full_name: userData.name, // Google name as full_name
  //             mobile_number: formData.mobile, // Assuming formData is available
  //             subscription_id: "d574cd99-da37-475b-a713-5f9069da562a", // Static value for subscription_id
  //             visa_date: "2025-12-31", // Static value for visa_date
  //             visa_center: "Static Visa Center", // Static value for visa_center
  //             order_type: "Paid", // Static value for order_type
  //             sso: 1, // Add the sso field with default value 1
  //             trial_subscription_id: "2b64d3ed-2b45-4c6c-9f29-adf85a99a43a", // Static value for trial_subscription_id
  //           };
  
  //           console.log("Registration Payload:", registrationPayload); // Log registration payload
  
  //           // Call the registration API
  //           const registrationResponse = await fetch(`${API_BASE_URL}/register`, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(registrationPayload),
  //           });
  
  //           console.log("Registration Response:", registrationResponse); // Log registration response
  
  //           if (!registrationResponse.ok) {
  //             const errorData = await registrationResponse.json();
  //             console.error("Registration Error Data:", errorData); // Log registration error
  //             toast.error(errorData.message || "Registration failed");
  //             throw new Error(errorData.message || "Registration failed");
  //           }
  
  //           // Registration successful
  //           const registrationSuccessData = await registrationResponse.json();
  //           console.log("Registration Success:", registrationSuccessData); // Log registration success
  //           toast.success("Registration successful! Logging you in...");
  
  //           // Proceed to login again
  //           const newLoginResponse = await fetch(`${API_BASE_URL}/login`, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(loginPayload),
  //           });
  
  //           if (!newLoginResponse.ok) {
  //             const errorData = await newLoginResponse.json();
  //             console.error("Login After Registration Error:", errorData); // Log login error
  //             toast.error(errorData.message || "Failed to log in after registration");
  //             throw new Error(errorData.message || "Failed to log in after registration");
  //           }
  
  //           const loginAfterRegistrationData = await newLoginResponse.json();
  //           console.log("Login After Registration Success:", loginAfterRegistrationData); // Log login success
  //           toast.success("Login successful! Redirecting...");
  //           handleSuccessfulLogin(userData, loginAfterRegistrationData);
  //           // Redirect to /profile-update
  //           window.location.href = "/profile-update";
  //         } else {
  //           toast.error(errorData.message || "Login failed with unexpected message");
  //           throw new Error(errorData.message || "Login failed with unexpected message");
  //         }
  //       } else {
  //         const errorData = await loginResponse.json();
  //         console.error("Login Failed with Unexpected Status:", errorData); // Log unexpected error
  //         toast.error(errorData.message || "Login failed with unexpected status");
  //         throw new Error(errorData.message || "Login failed with unexpected status");
  //       }
  //     } catch (error) {
  //       console.error("Error during login process:", error); // Log general error
  //       toast.error("An error occurred during login. Please try again.");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Google Login Failed:", error); // Log Google login error
  //     toast.error("Google Login failed. Please try again.");
  //   },
  // });


  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
  
      try {
        // Fetch user info from Google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
  
        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user information");
        }
  
        const userData = await userInfoResponse.json();
        console.log("Google User Data:", userData); // Log Google user data
  
        // Check if email is present in the response
        if (!userData.email) {
          throw new Error("Email not found in Google user data");
        }
  
        // Prepare login payload
        const loginPayload = {
          identifier: userData.email, // Email as identifier
          password: userData.sub, // Google user_id as password
        };
  
        // First, try to log in the user
        const loginResponse = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginPayload),
        });
  
        if (loginResponse.ok) {
          // User exists, proceed to login
          const responseData = await loginResponse.json();
          console.log("Login Success:", responseData); // Log login success
          toast.success("Login successful! Redirecting to dashboard...");
          handleSuccessfulLogin(userData, responseData);
          // Redirect to /dashboard
          window.location.href = "/dashboard";
          return;
        }
  
        // If login fails with 401 and message "User not found", redirect to /profile-update
        if (loginResponse.status === 401) {
          const errorData = await loginResponse.json();
          console.log("Login Error Data:", errorData); // Log login error
          if (errorData.message === "User not found") {
            // Store Google user data in localStorage or state for later use
            localStorage.setItem("googleUserData", JSON.stringify(userData));
            // Redirect to /profile-update to collect missing fields
            window.location.href = "/profile-update";
          } else {
            toast.error(errorData.message || "Login failed with unexpected message");
            throw new Error(errorData.message || "Login failed with unexpected message");
          }
        } else {
          const errorData = await loginResponse.json();
          console.error("Login Failed with Unexpected Status:", errorData); // Log unexpected error
          toast.error(errorData.message || "Login failed with unexpected status");
          throw new Error(errorData.message || "Login failed with unexpected status");
        }
      } catch (error) {
        console.error("Error during login process:", error); // Log general error
        toast.error("An error occurred during login. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error); // Log Google login error
      toast.error("Google Login failed. Please try again.");
    },
  });
  // Helper function to handle successful login
  const handleSuccessfulLogin = (userData, responseData) => {
    localStorage.setItem("auth_code", responseData.token);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: responseData.user_id,
        email: userData.email,
        name: userData.name,
        resourceId: responseData.resourceid,
        status: responseData.status,
        picture: userData.picture,
      })
    );
  
    setUserData({
      isAuthenticated: true,
      accountType: "User",
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      token: responseData.token,
    });
  
    toast.success("Login successful!");
    setTimeout(() => {
      navigate("/dashboard");
      window.location.reload();
    }, 1000);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    const requestBody = {
      identifier: formData.identifier,
      password: formData.password,
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }
  
      const data = await response.json();
      
  
      // Store user data (identifier and password) in localStorage
      const userData = {
        name: formData.identifier, // Store email as identifier
        // password: formData.password, // Store password (consider encrypting it for security)
        token: data.token,
      };
  
  
      localStorage.setItem("userData", JSON.stringify(userData)); // Store user data in localStorage
      localStorage.setItem("auth_code", data.token); // Store token separately if needed
  
      // Update user context
      setUserData({
        ...userData,
        isAuthenticated: true,
        accountType: "User",
        token: data.token,
      });
  
       // Show success message
    toast.success("Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/dashboard");
      window.location.reload();
    }, 1000); // Redirect after 1 second

  } catch (error) {
    
    setErrorMessage(error.message);

    if (error.message === 'User not found') {
      toast.error('Please register first.');
      setTimeout(() => {
        navigate("/Signup");
        // window.location.reload();
      }, 1000); // 2-second delay
      return;
    }
    if (error.message === 'Invalid credentials') {
      toast.error('Invalid credentials!');
      setTimeout(() => {
       navigate("/login");
        // window.location.reload();
      }, 1000); // 2-second delay
      
    }
    // Show error message
   // toast.error("Login failed: " + error.message);
  }
};

  return (
    <Layout noHeaderFooter={true}>
      <div className="min-h-screen flex items-center bg-[#161E2D] justify-between relative">
        {/* Logo in the top left corner */}
        <div className="absolute top-0 left-0 p-4 z-10 md:block hidden">
          <a href="/">
            <img
              src="assets/img/logo/visa_logo1_new.png"
              alt="Logo"
              className="h-12"
            />
          </a>
        </div>

        {/* Video and Slogans for larger screens */}
        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="assets/video/signinvideo2.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm z-0 hidden md:block"></div>

        {/* Show slogans for larger screens */}
        <div className="w-full md:w-1/2 p-12 text-white relative z-10 hidden md:block">
          <div className="relative h-32 overflow-hidden">
            {slogans.map((slogan, index) => (
              <h1
                key={index}
                className={`absolute w-full text-4xl md:text-5xl font-bold mb-4 transition-all duration-500 ease-in-out ${
                  index === currentSloganIndex
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform -translate-y-full"
                }`}
              >
                {slogan}
              </h1>
            ))}
          </div>
          <h3 className="text-white text-3xl mt-4">
            Embark on a journey of knowledge, culture, and opportunity
          </h3>
        </div>

        {/* Sign-in Form */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-[#161E2D]  backdrop-blur-sm shadow-2xl rounded-l-3xl min-h-[500px]">
            <div>
              <a href="/" className="flex justify-center items-center">
                <img
                  src="assets/img/logo/visa_logo1_new.png"
                  alt="Logo"
                  className="h-12"
                />
              </a>
              {/* <h1 className="mt-6 text-center text-3xl font-bold text-black-700" >CrackVisa</h1> */}
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-100">
                Sign in to your Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-100">
                Welcome, to The CrackVisa!
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="identifier"
                  type="email"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3.5C4.917 3.5 1.403 7.66.833 10a9.993 9.993 0 0018.334 0C18.597 7.66 15.083 3.5 10 3.5zM10 15.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm0-8.5a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3.98 7.606a10.17 10.17 0 0112.04 0 10.071 10.071 0 01-6.02 9.066 10.071 10.071 0 01-6.02-9.066zM10 13.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#161E2D] text-gray-100">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => login()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm  font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                  />
                  <span> Sign in with Google</span>
                </button>
              </div>
              <p className="w-full flex items-center justify-center text-sm text-gray-600 mt-2">
                <a
                  href="/forgot-password"
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  {" "}
                  Forgot Password?
                </a>
              </p>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-100">
                  By continuing, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    terms of use
                  </a>
                  .
                </p>
                <p className="text-sm text-gray-100 mt-2">
                  If you don’t have an account?{" "}
                  <a
                    href="/Signup"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    Signup
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

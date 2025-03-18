import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Layout from "../component/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle, FaEnvelope } from "react-icons/fa";
export default function Signup() {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [storedVisaCategory, setStoredVisaCategory] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    mobile: "",
    visa_date: "",
    visa_center: "",
  });
  const [errors, setErrors] = useState({});
  const [signupMethod, setSignupMethod] = useState("email");
  const [signupgoogle, setSignupGoogle] = useState({
    user: { name: "", email: "", password: "" }, // Set default values to prevent errors
  });
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [user, setUser] = useState(null);
  const [ssotype, setSsotype] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const ordertype = localStorage.getItem("order_type");
  const subscriptionId = localStorage.getItem("subscription_id");

  const catname = localStorage.getItem("visa_category");
  const trialsubscriptionId = localStorage.getItem("trial_subscription_id");
  const price = localStorage.getItem("price");
  const isAuthenticated = !!localStorage.getItem("auth_code");
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard or another page if logged in
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const slogans = [
    "Unlock Your Global Success",
    "Your Visa, Your Future",
    "Crack the Visa Code with Confidence",
    "Step into Opportunity Abroad",
    "Turning Dreams into Destinations",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedCategory = localStorage.getItem("categoryname");
    setStoredVisaCategory(storedCategory);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    let isValid = true;

    // Full Name Validation
    if (!formData.full_name.trim()) {
      toast.error("Name is required.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      toast.error("Name must contain only alphabets.");
      isValid = false;
    }

    // Email Validation
    if (!formData.email) {
      toast.error("Email is required.");
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      toast.error("Invalid email format.");
      isValid = false;
    }

    // Password Validation
    if (!formData.password) {
      toast.error("Password is required.");
      isValid = false;
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      isValid = false;
    } else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        formData.password
      )
    ) {
      toast.error(
        "Password must contain an uppercase letter, a number, and a special character."
      );
      isValid = false;
    }

    // Mobile Number Validation
    if (!formData.mobile) {
      toast.error("Mobile number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits.");
      isValid = false;
    }

    return isValid;
  };

  const loginWithGoogle = () => {
    const type = localStorage.getItem("signin_type");

    if (type === "google") {
      // User already logged in with Google, retrieve user details from localStorage
      const user = {
        name: localStorage.getItem("signin_name"),
        password: localStorage.getItem("signin_pwd"),
        email: localStorage.getItem("signin_email"),
      };

      // Store the user info for further use
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      setSignupGoogle({ user });

      // Proceed with registration
      handleGoogleSignup(user);
    } else {
      // If signin_type is not 'google', trigger the Google login flow
      googleLogin();
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        // Fetch Google user info using the access token
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

        const user = {
          name: userData.name,
          password: userData.sub, // Unique user ID as password or you may adjust this as needed
          email: userData.email,
        };

        // Store user info in localStorage
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        setSignupGoogle({ user });

        // Proceed with registration
        handleGoogleSignup(user);
      } catch (error) {
        toast.error(
          "An error occurred during Google login. Please try again.",
          {
            autoClose: 2000,
          }
        );
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      toast.error("Google Login failed. Please try again.", {
        autoClose: 2000,
      });
    },
  });

  const handleGoogleSignup = async (googleUser) => {
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: googleUser.email,
          password: googleUser.password,
          full_name: googleUser.name,
          mobile_number: formData.mobile,
          subscription_id: subscriptionId,
          subscription_id: subscriptionId,
          visa_date: formData.visa_date,
          visa_center: formData.visa_center,
          order_type: ordertype,
          sso: 1,
          trial_subscription_id: trialsubscriptionId,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        //console.log('User registered successfully! Redirecting...');
        toast.success("User registered successfully! Redirecting...");
        handleSuccessfulLogin(googleUser, data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
      toast.error("Registration failed: " + error.message + ", Please click on Login button given below.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      //toast.info("Fill Form Correctly")
      return;
    }

    if (signupMethod === "google") {
      await handleGoogleSignup();
    } else {
      const requestBody = {
        email_address:
          signupMethod === "email" ? formData.email : signupgoogle.user?.email,
        password:
          signupMethod === "email"
            ? formData.password
            : signupgoogle.user?.password,
        full_name:
          signupMethod === "email"
            ? formData.full_name
            : signupgoogle.user?.name,
        mobile_number: formData.mobile,
        subscription_id: subscriptionId,
        // interview_id: interviewId,
        visa_date: formData.visa_date,
        visa_center: formData.visa_center,
        order_type: ordertype,
        sso: signupMethod === "google" ? 1 : 0,
        trial_subscription_id: trialsubscriptionId,
      };

      try {
        //console.log(requestBody)
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.status === 201) {
          const data = await response.json();
          //console.log('User registered successfully! Redirecting...');
          toast.success("User registered successfully! Redirecting...");
          setTimeout(() => {
            //console.log('formData:-',formData);
            // console.log('data:-',data);
            handleSuccessfulLogin(formData, data);
          }, 3000);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed.");
        }
      } catch (error) {
        setErrors({ ...errors, submit: error.message });
        toast.error("Registration failed: " + error.message);
      }
    }
  };

  const handleSuccessfulLogin = async (userData, responseData) => {
    try {
      localStorage.setItem("auth_code", responseData.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: responseData.user_id,
          email: userData.email,
          name: userData.full_name || userData.name,
          resourceId: responseData.resourceid,
          status: responseData.status,
          picture: userData.picture,
        })
      );

      setUserData({
        isAuthenticated: true,
        accountType: "User",
        name: userData.full_name || userData.name,
        email: userData.email,
        picture: userData.picture,
        token: responseData.token,
      });

      if (String(ordertype).trim() === "Trial") {
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate("/dashboard");
          // window.location.reload();
        }, 3000);
      } else {
        // console.log('Login successful! Please complete the payment to activate your subscription.');
        toast.success(
          "Login successful! Please complete the payment to activate your subscription."
        );
        setTimeout(() => {
          if (!isRazorpayReady) {
            toast.error("Payment gateway is not ready. Please try again.");
            return;
          }

          const authCode = responseData.token;
          // console.log(authCode);

          if (!authCode) {
            toast.error("Authentication failed. Please try again.");
            return;
          }

          const options = {
           key: "rzp_test_4tlTQj2JaR14Au",// test mode
            amount: price * 100,
            // key:"rzp_live_zAd0BGkYfvmkIW",
            // amount: 1 * 100,
            currency: "INR",
            name: "Crack Visa",
            description: `Payment for ${catname} package`,
            handler: async (response) => {
              try {
                const subscriptionHistoryResponse = await fetch(
                  `${API_BASE_URL}/subscription_history`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authCode}`,
                    },
                  }
                );

                if (!subscriptionHistoryResponse.ok) {
                  throw new Error(
                    `Subscription History Error: ${subscriptionHistoryResponse.status} - ${subscriptionHistoryResponse.statusText}`
                  );
                }

                const subscriptionHistoryData =
                  await subscriptionHistoryResponse.json();
                const subscriptionHistory = subscriptionHistoryData.data.data;

                const matchedSubscription = subscriptionHistory.find(
                  (subscription) =>
                    subscription.subscription_id === subscriptionId
                );

                if (!matchedSubscription) {
                  toast.error(
                    "No matching subscription found. Please try again."
                  );
                  return;
                }

                const orderId = matchedSubscription.order_id;

                const updateStatusPayload = {
                  subscription_id: subscriptionId,
                  order_id: orderId,
                  pg_response: {
                    status: "Active",
                    transaction_id: response.razorpay_payment_id,
                    payment_gateway: "Razorpay",
                  },
                };

                //console.log(updateStatusPayload);

                const updateStatusResponse = await fetch(
                  `${API_BASE_URL}/update-subscription-status`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authCode}`,
                    },
                    body: JSON.stringify(updateStatusPayload),
                  }
                );

                if (!updateStatusResponse.ok) {
                  throw new Error(
                    `Update Status Error: ${updateStatusResponse.status} - ${updateStatusResponse.statusText}`
                  );
                }

                const updateStatusResult = await updateStatusResponse.json();
                //console.log("Subscription status updated successfully:", updateStatusResult);

                toast.success("Payment successful! Subscription activated.");
                setTimeout(() => {                  
                  navigate("/dashboard");
                  
                }, 2000);
              } catch (error) {
                //console.error("Error during payment process:", error.message);
                toast.error("Failed to process payment. Please try again.");
              }
            },
            prefill: {
              name: userData.full_name || userData.name,
              email: userData.email,
              contact: userData.mobile || formData.mobile,
            },
            theme: {
              color: "#528FF0",
            },
            modal: {
              ondismiss: () => {
                //console.log("Razorpay gateway was closed by the user.");

                toast.error(
                  "Payment process not completed Redirecting to Dashboard..."
                );
                setTimeout(() => {
                  navigate("/dashboard");
                  window.location.reload();
                }, 1000);
              },
            },
          };

          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
        }, 2000);
      }
    } catch (error) {
      //console.error("Error in handleSuccessfulLogin:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    // Get the signin_type from localStorage on component mount
    const savedSigninType = localStorage.getItem("signin_type");
    if (savedSigninType) {
      setSignupMethod(savedSigninType);
    }
  }, []); // Empty dependency array to only run on mount

  const handleLogin = () => {
    localStorage.removeItem("signin_type");
    navigate("/login");
  };

  return (
    <Layout noHeaderFooter={true}>
      <div className="min-h-screen flex items-center justify-between relative bg-[#161E2D]">
        <div className="absolute top-0 left-0 p-4 z-10">
          <a href="/">
            <img
              src="assets/img/logo/visa_logo1_new.png"
              alt="Logo"
              className="h-12"
            />
          </a>
        </div>

        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="assets/video/siginvideo.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm z-0 hidden md:block"></div>

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
            Build your future abroad with ease and confidence.
          </h3>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative z-10 w-full max-w-xl p-8 space-y-8 bg-[#161E2D] backdrop-blur-sm shadow-2xl rounded-l-3xl">
            <div className="">
              <a href="/" className="flex justify-center items-center">
                <img
                  src="assets/img/logo/visa_logo1_new.png"
                  alt="Logo"
                  className="h-12"
                />
              </a>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-100">
                SignUp for Your
              </h2>
              <h3 className="mt-2 text-center font-bold text-indigo-500">
                {catname} ({ordertype})
              </h3>
              <p className="mt-2 text-center text-sm text-gray-100">
                Join us and take the first step towards your global journey!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-6">
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-100"
                      >
                        Mobile No.
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your Mobile No."
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />

                      {errors.mobile && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="visa_date"
                        className="block text-sm font-medium text-gray-100"
                      >
                        Visa Date
                      </label>
                      <input
                        id="visa_date"
                        name="visa_date"
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.visa_date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]} 
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="visa_center"
                      className="block text-sm font-medium text-gray-100"
                    >
                      Visa Center
                    </label>
                    <select
                      id="visa_center"
                      name="visa_center"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-700 focus:border-indigo-500 sm:text-sm"
                      value={formData.visa_center}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Visa Center</option>
                      <option value="BENGALURU">BENGALURU</option>
                      <option value="CHENNAI">CHENNAI</option>
                      <option value="DELHI">DELHI</option>
                      <option value="HYDERABAD">HYDERABAD</option>
                      <option value="KOLKATA">KOLKATA</option>
                      <option value="MUMBAI">MUMBAI</option>                      
                    </select>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (formData.mobile && /^\d{10}$/.test(formData.mobile)) {
                        loginWithGoogle();
                      } else {
                        toast.error(
                          "Please enter a valid 10-digit mobile number"
                        );
                      }
                    }}
                    disabled={!formData.mobile}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      formData.mobile
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Sign up
                  </button>
                </>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-100">
                  By continuing, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms-and-conditions"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    terms of use
                  </a>
                  .
                </p>
                <p className="mt-2 text-sm text-gray-100">
                  Already have an account?{" "}
                  <button
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
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

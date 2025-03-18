import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/ProfileSetup.css";

const API_BASE_URL = "https://api.crackvisa.com";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const ordertype = localStorage.getItem("order_type");
  const subscriptionId = localStorage.getItem("subscription_id");
  const trialsubscriptionId = localStorage.getItem("trial_subscription_id");
  const price = localStorage.getItem("price");
  const catname = localStorage.getItem("visa_category");
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    mobile: "",
    visa_date: "",
    visa_center: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.mobile) {
      toast.error("Mobile number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const googleUserData = JSON.parse(localStorage.getItem("googleUserData"));
      const subscriptionData = JSON.parse(localStorage.getItem("subscriptionData"));
      const authCode = localStorage.getItem("auth_code");

      if (!subscriptionData || !authCode) {
        throw new Error("Subscription data or authorization token not found.");
      }

      const updatePayload = {
        full_name: googleUserData.name,
        email_address: googleUserData.email,
        password: googleUserData.sub || googleUserData.password,
        mobile_number: formData.mobile,
        visa_date: formData.visa_date,
        visa_center: formData.visa_center,
        subscription_id: subscriptionData.subscription_id,
        trial_subscription_id: subscriptionData.trial_subscription_id,
        order_type: subscriptionData.order_type,
      };

      const updateResponse = await fetch(`${API_BASE_URL}/save_user_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCode}`,
        },
        body: JSON.stringify(updatePayload),
      });

      const updateResponseData = await updateResponse.json();

      if (!updateResponse.ok) {
        toast.error(updateResponseData.message);
        throw new Error(updateResponseData.message || "Profile update failed");
      }

      if (String(ordertype).trim() === "Trial") {
        localStorage.removeItem("subscriptionData");
        toast.success("Profile Updated Successfully!");
        window.location.href = "/dashboard";
      } else {
        toast.success("Profile Updated successfully! Please complete the payment to activate your subscription.");
        setTimeout(() => {
          if (!isRazorpayReady) {
            toast.error("Payment gateway is not ready. Please try again.");
            return;
          }

          const options = {
            key: "rzp_test_mPWcOUk1gXlKUZ",
            amount: price * 100,
            currency: "INR",
            name: "Crack Visa",
            description: `Payment for ${catname} package`,
            handler: async (response) => {
              try {
                const subscriptionHistoryResponse = await fetch(`${API_BASE_URL}/subscription_history`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCode}`,
                  },
                });

                if (!subscriptionHistoryResponse.ok) {
                  throw new Error(`Subscription History Error: ${subscriptionHistoryResponse.status} - ${subscriptionHistoryResponse.statusText}`);
                }

                const subscriptionHistoryData = await subscriptionHistoryResponse.json();
                const subscriptionHistory = subscriptionHistoryData.data.data;
                const matchedSubscription = subscriptionHistory.find((subscription) => subscription.subscription_id === subscriptionId);

                if (!matchedSubscription) {
                  toast.error("No matching subscription found. Please try again.");
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

                const updateStatusResponse = await fetch(`${API_BASE_URL}/update-subscription-status`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCode}`,
                  },
                  body: JSON.stringify(updateStatusPayload),
                });

                if (!updateStatusResponse.ok) {
                  throw new Error(`Update Status Error: ${updateStatusResponse.status} - ${updateStatusResponse.statusText}`);
                }

                const updateStatusResult = await updateStatusResponse.json();
                toast.success("Payment successful! Subscription activated.");
                setTimeout(() => {
                  navigate("/dashboard");
                }, 2000);
              } catch (error) {
                toast.error("Failed to process payment. Please try again.");
              }
            },
            prefill: {
              name: googleUserData.full_name || googleUserData.name,
              email: googleUserData.email,
              contact: formData.mobile,
            },
            theme: {
              color: "#528FF0",
            },
            modal: {
              ondismiss: () => {
                toast.error("Payment process not completed. Redirecting to Dashboard...");
                setTimeout(() => {
                  navigate("/dashboard");
                }, 1000);
              },
            },
          };

          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
        }, 2000);
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen w-full bg-gray-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {/* Right side with form (always on top on mobile, on the right on larger screens) */}
      <div className="relative flex-1 flex justify-center items-center p-4 md:p-8 bg-gray-50 lg:order-2">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}></div>
        </div>

        <div className="w-full max-w-md animate-slide-up">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-100">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500"></div>

            {/* Glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-sm -z-10"></div>

            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Set Up Your Profile</h1>
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-blue-500 mx-auto mt-2 rounded-full"></div>
                <p className="mt-3 text-gray-600">Complete your information to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    <div className="absolute inset-0 rounded-lg shadow-sm pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="visa_date" className="block text-sm font-semibold text-gray-700">
                    Visa Date
                  </label>
                  <div className="relative">
                    <input
                      id="visa_date"
                      name="visa_date"
                      type="date"
                      value={formData.visa_date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      onKeyDown={(e) => e.preventDefault()}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    <div className="absolute inset-0 rounded-lg shadow-sm pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="visa_center" className="block text-sm font-semibold text-gray-700">
                    Visa Center
                  </label>
                  <div className="relative">
                    <select
                      id="visa_center"
                      name="visa_center"
                      value={formData.visa_center}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
                    >
                      <option value="">Select Visa Center</option>
                      <option value="BENGALURU">BENGALURU</option>
                      <option value="CHENNAI">CHENNAI</option>
                      <option value="DELHI">DELHI</option>
                      <option value="HYDERABAD">HYDERABAD</option>
                      <option value="KOLKATA">KOLKATA</option>
                      <option value="MUMBAI">MUMBAI</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-lg shadow-sm pointer-events-none"></div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full relative overflow-hidden group py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300
                      ${isLoading ? 'bg-gradient-to-r from-indigo-600 to-blue-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0'}`}
                  >
                    {/* Shine effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out"></span>

                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </span>
                    ) : (
                      <span className="relative z-10">Save Profile</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>

          {/* Card shadow and glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl blur-xl -z-10"></div>
        </div>
      </div>

      {/* Left side with image (always at the bottom on mobile, on the left on larger screens) */}
      <div className="relative flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-500 p-8 text-white overflow-hidden lg:order-1">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative w-4/5 max-w-md mb-8 animate-float-slow">
          <img
            src="https://img.freepik.com/free-vector/update-concept-illustration_114360-1742.jpg?t=st=1740726556~exp=1740730156~hmac=b8ae73cbdcbc69ee5c94cac84da19f44616f16d390885736d8dff259fef50b2c&w=900"
            alt="Travel World"
            className="w-full h-auto rounded-xl shadow-2xl"
          />

          {/* Glow effect behind image */}
          <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-xl -z-10"></div>
        </div>

        <div className="relative text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">Your Journey Begins Here</h2>
          <p className="text-lg opacity-90 max-w-md mx-auto leading-relaxed">
            Explore the world with ease. Let us handle your visa process while you plan your adventure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
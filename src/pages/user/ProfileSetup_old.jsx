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




  const [formData, setFormData] = useState({
    mobile: "",
    visa_date: "",
    visa_center: "",
  });


  // logout user when user closes the browser
  useEffect(() => {
    const handleBackButton = () => {
      localStorage.clear(); // Clear all stored data
      sessionStorage.clear(); // Clear session storage if needed
      navigate("/login"); // Redirect to login page
    };
  
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
// Mobile Number Validation
    if (!formData.mobile) {
      toast.error("Mobile number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 Digit Number.");
      isValid = false;
    }

    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      //toast.info("Fill Form Correctly")
      return;
    }

  
    try {
      // Get Google user data from localStorage
      const googleUserData = JSON.parse(localStorage.getItem("googleUserData"));
  
      // Get subscription data from localStorage
      const subscriptionData = JSON.parse(localStorage.getItem("subscriptionData"));
  
      // Get auth_code from localStorage
      const authCode = localStorage.getItem("auth_code");
  
      if (!subscriptionData) {
        throw new Error("Subscription data not found in localStorage");
      }
  
      if (!authCode) {
        throw new Error("Authorization token not found in localStorage");
      }
  
      // Prepare payload for profile update
      const updatePayload = {
        full_name: googleUserData.name, // Use name from Google data
        email_address: googleUserData.email, // Use email from Google data
        password: googleUserData.sub || googleUserData.password, // Use Google user_id (sub) as password
        mobile_number: formData.mobile,
        visa_date: formData.visa_date,
        visa_center: formData.visa_center,
        subscription_id: subscriptionData.subscription_id,
        trial_subscription_id: subscriptionData.trial_subscription_id,
        order_type: subscriptionData.order_type,
      };
      
  
      // Call the save_user_profile API to update the profile
      const updateResponse = await fetch(`${API_BASE_URL}/save_user_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCode}`, // Include the auth_code as a Bearer token
        },
        body: JSON.stringify(updatePayload),
      });
  
      const updateResponseData = await updateResponse.json();
        
      if (!updateResponse.ok) {
        toast.error(updateResponseData.message );
        throw new Error(updateResponseData.message || "Profile update failed");        
      }


     if (String(ordertype).trim() === "Trial") {

      localStorage.removeItem("subscriptionData");  

      toast.success("Profile Updated Successfully!");

      navigate("/dashboard");

     }
      else{
        toast.success(
          "Profile Updated successfully! Please complete the payment to activate your subscription."
        );
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
              name: googleUserData.full_name || googleUserData.name,
              email: googleUserData.email,
              contact: formData.mobile,
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
      toast.error(error);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="left-side">
        <div className="image-container">
          <img
            src="https://img.freepik.com/free-vector/update-concept-illustration_114360-1742.jpg?t=st=1740726556~exp=1740730156~hmac=b8ae73cbdcbc69ee5c94cac84da19f44616f16d390885736d8dff259fef50b2c&w=900"
            alt="Travel World"
            className="profile-image"
          />
        </div>
        <div className="slogan-container">
          <h2>Your Journey Begins Here</h2>
          <p>Explore the world with ease. Let us handle your visa process.</p>
        </div>
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit} className="profile-form">
          <h1>Set Up Your Profile</h1>
          <div className="form-group">
            <label htmlFor="mobile">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="visa_date">Visa Date</label>
            <input
              id="visa_date"
              name="visa_date"
              type="date"
              value={formData.visa_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="visa_center">Visa Center</label>
            <select
              id="visa_center"
              name="visa_center"
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
          <button type="submit" className="submit-button">
            Save Profile
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileSetup;
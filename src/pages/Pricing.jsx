import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Bell, Book, HeadphonesIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PricingPackage = () => {
   const navigate = useNavigate();
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)
  const [user, setUser] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [subscriptions, setSubscriptions] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Added authentication state
 const [loading, setLoading] = useState(true);
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  // // Simulate user data
  // useEffect(() => {
  //   const storedUser = {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     contact: "9999999999",
  //   }
  //   setUser(storedUser)
  // }, [])

  // Load subscriptions from API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/list_subscriptions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const result = await response.json()
        setSubscriptions(result.data || [])
      } catch (error) {
        toast.error("Failed to load subscriptions. Please try again.")
      }
    }
if(isAuthenticated == true){
    const fetchProfile = async () => {
        try {
          const authToken = localStorage.getItem("auth_code");
          if (!authToken) throw new Error("Authentication token not found");
    
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/get_user_profile`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (!response.ok) throw new Error("Failed to fetch profile");
    
          const result = await response.json();
    
          if (result.status === "success" && result.data) {           
            setUser(result.data);
          } else {
            throw new Error("Invalid API response structure");
          }
        } catch (error) {
          toast.error("Failed to load profile data");
        } finally {
          setLoading(false);
        }
      }
      fetchProfile ()
      //console.log('in-get-profile');
      
    }

    fetchSubscriptions()
   
  }, [])

 useEffect(() => {
  //console.log("useEffect - Razorpay script loading");

  if (document.getElementById("razorpay-script")) {
    setIsRazorpayReady(true);
    return;
  }

  const script = document.createElement("script");
  script.id = "razorpay-script";
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => setIsRazorpayReady(true);
  document.body.appendChild(script);
}, []);


  // Check for authentication
  useEffect(() => {
    const authCode = localStorage.getItem("auth_code")
    setIsAuthenticated(!!authCode)
  }, [])

  const advantages = [
    { icon: CheckCircle, text: "Access to expert-curated answers" },
    { icon: Bell, text: "Priority notifications" },
    { icon: Book, text: "Exclusive resources" },
    { icon: HeadphonesIcon, text: "24/7 support" },
  ]

  const slides = [
    {
      image:
        "https://img.freepik.com/free-vector/influencer-marketing-composition-with-character-guy-recording-voice-microphone_1284-54403.jpg?t=st=1736766144~exp=1736769744~hmac=af58bbec2febdbc6507612733cd691d25f0a2ad3f1631929f6f1b20ab18a5472&w=740",
      slogan: "Transform Your Visa Journey",
      description: "Expert guidance at your fingertips",
    },
    {
      image:
        "https://img.freepik.com/free-vector/hand-drawn-study-abroad-illustration_23-2150314523.jpg?t=st=1737697689~exp=1737701289~hmac=386dbdc4d4c79cc28590e498e93ef77fa841b6c920babcbae1bc395c8892377a&w=740",
      slogan: "Ace Your Interview",
      description: "Comprehensive preparation materials",
    },
    {
      image:
        "https://img.freepik.com/free-vector/flat-hand-drawn-people-celebrating-goal-achievement_23-2148851724.jpg?t=st=1736766269~exp=1736769869~hmac=ced111424ac8e23beeb019082e66fffe2ce4abb2a3670e799f929d6159b57b3d&w=740",
      slogan: "Success Guaranteed",
      description: "Join thousands of successful applicants",
    },
    {
      image:
        "https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg?t=st=1736766328~exp=1736769928~hmac=95a772651ed1a340310fa573079828a3e05afd136e01096d71ba4879de51f937&w=996",
      slogan: "24/7 Expert Support",
      description: "We're here to help you succeed",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const filteredSubscriptions = subscriptions.filter((subscription) => subscription.subscription_type !== "Trial")
  const trialSubscription = subscriptions.find((subscription) => subscription.subscription_type === "Trial")

  useEffect(() => {
    if (trialSubscription) {
      //console.log("Trial Subscription:", trialSubscription)
    }
  }, [trialSubscription])

  const handleAction = (subscription, actionType) => {
    const trialSubscriptionId = trialSubscription ? trialSubscription.subscription_id : null
    const authCode = localStorage.getItem("auth_code")

    localStorage.setItem("trial_subscription_id", trialSubscriptionId)
    localStorage.setItem("subscription_id", subscription.subscription_id)
    localStorage.setItem("visa_category", subscription.name)
    localStorage.setItem("order_type", "Paid")
    localStorage.setItem("interview_id", subscription.interview_id); 
    localStorage.setItem("price", subscription.price); 
    if (!authCode) {   // User is not authenticated, redirect to signup
      navigate("/Signup");
    } else {
      if (actionType === "buy") {
        // User is authenticated and wants to buy, open Razorpay immediately
        handleBuyNowClick(subscription.price, subscription.subscription_id, subscription.interview_id, subscription.name, trialSubscriptionId)
      } else {
        // Free trial for authenticated user, redirect to dashboard
       
        navigate("/dashboard");
      }
    }
  }

  // const handlePayment = async (price, subscriptionId, description, trialSubscriptionId) => {
  //   if (!isRazorpayReady) {
  //     toast.error("Payment gateway is not ready. Please try again.")
  //     return
  //   }

  //   const options = {
  //     // key: "rzp_live_OEpc7y8YOlS12E",
  //     key: "rzp_test_mPWcOUk1gXlKUZ",
  
  //     amount: price * 100,
  //     currency: "INR",
  //     name: "Crack Visa",
  //     description: `Payment for ${description} package`,
  //     handler: async (response) => {
  //       try {
  //         console.log("Payment successful:", response);
  //         const payload = {
  //           subscription_id: subscriptionId,
  //           trial_subscription_id: trialSubscriptionId,
  //           amount: price * 100,
  //           payment_id:response.razorpay_payment_id,
  //           order_id: response.razorpay_order_id,
  //           razor_signature:response.razorpay_signature
  //         }
  //         console.log("Payment successful:",payload);
  //         const authCode = localStorage.getItem("auth_code")
  //         const apiResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/place_order`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authCode}`,
  //           },
  //           body: JSON.stringify(payload),
  //         })

  //         if (!apiResponse.ok) {
  //           throw new Error(`Error: ${apiResponse.status} - ${apiResponse.statusText}`)
  //         }

  //         const result = await apiResponse.json()
  //         toast.success("Payment successful! Subscription activated.")
  //         setPaymentStatus(true)
  //         // Redirect to dashboard after successful payment
  //         navigate("/dashboard");
  //       } catch (error) {
  //         console.log("API error while placing the order:", error.message);
  //         toast.error("Failed to place order. Please try again.")
  //       }
  //     },
  //     prefill: {
  //       name: user?.name || "Guest",
  //       email: user?.email || "guest@example.com",
  //       contact: user?.contact || "9999999999",
  //     },
  //     theme: {
  //       color: "#528FF0",
  //     },
      
  //     modal: {
  //       ondismiss: () => {
  //         console.log("Razorpay gateway was closed by the user.");
  //         toast.error("Payment process was not completed.");
  //       },
  //     },
  //   };

  //   const razorpayInstance = new window.Razorpay(options)
  //   razorpayInstance.open()
  // }   


  const handleBuyNowClick = async (price, subscriptionId, interviewId, description, trialSubscriptionId) => {
    if (!isRazorpayReady) {
      toast.error("Loading payment gateway. Please wait a few seconds and try again.");
      return;
    }
  
    await handlePayment(price, subscriptionId, interviewId, description, trialSubscriptionId);
  };


  const handlePayment = async (price, subscriptionId, interviewId, description, trialSubscriptionId) => {
    
    
    if (!isRazorpayReady) {
      toast.error("Payment gateway is not ready. Please try again.");
      return;
    }
  
    try {
      const authCode = localStorage.getItem("auth_code");
  
      if (!authCode) {
        toast.error("Authentication failed. Please try again.");
        return;
      }
  
      // Step 1: Call place_order API to get the order ID
      const placeOrderPayload = {
        subscription_id: subscriptionId,
        interview_id: interviewId,
      };
  
      const placeOrderResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/place_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCode}`,
        },
        body: JSON.stringify(placeOrderPayload),
      });
  
      if (!placeOrderResponse.ok) {
        const errorText = await placeOrderResponse.text();
        throw new Error(`Place Order Error: ${placeOrderResponse.status} - ${errorText}`);
      }
  
      const placeOrderResult = await placeOrderResponse.json();
      //console.log("Order placed successfully:", placeOrderResult);
  
      const orderId = placeOrderResult.order_id; // Extract the order_id from the response
  
      // Step 2: Initialize Razorpay payment
      const options = {
       key: "rzp_test_4tlTQj2JaR14Au", // Replace with your live key for production
       amount: price * 100, // Razorpay expects the amount in paise
        // key:"rzp_live_zAd0BGkYfvmkIW",
        // amount: 1 * 100,
        currency: "INR",
        name: "Crack Visa",
        description: `Payment for ${description} package`,
        handler: async (response) => {
          try {
            //console.log("Payment successful:", response);
  
            // Step 3: Call update-subscription-status API after successful payment
            const updateStatusPayload = {
              subscription_id: subscriptionId,
              order_id: orderId, // Use the order_id from place_order API response
              pg_response: {
                status: "Active",
                transaction_id: response.razorpay_payment_id,
                payment_gateway: "Razorpay",
              },
            };
  
            const updateStatusResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/update-subscription-status`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authCode}`,
              },
              body: JSON.stringify(updateStatusPayload),
            });
  
            if (!updateStatusResponse.ok) {
              const errorText = await updateStatusResponse.text();
              throw new Error(`Update Status Error: ${updateStatusResponse.status} - ${errorText}`);
            }
  
            const updateStatusResult = await updateStatusResponse.json();
            //console.log("Subscription status updated successfully:", updateStatusResult);
  
            // Notify success and redirect to dashboard
            toast.success("Payment successful! Subscription activated.");
            navigate("/dashboard");          
          } catch (error) {
           // console.error("Error during subscription status update:", error.message);
            toast.error("Failed to update subscription status. Please try again.");
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.contact || "9999999999",
        },
        theme: {
          color: "#528FF0",
        },
        modal: {
          ondismiss: () => {
           // console.log("Razorpay gateway was closed by the user.");
           toast.error("Payment process was not completed.");
            setTimeout(() => {
              navigate('/subscription-history')
            }, 3000);
           
          },
        },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      //console.error("Error during payment initialization:", error.message);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };
  
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-custom text-white mb-4">Crack Your Visa Interview</h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg"
        >
         
          <p className="bg-gray-900 text-white text-lg sm:text-xl px-6 py-3 rounded-lg">
            Buy Now and Get More Interview Attempts!
          </p>
        
        </motion.div>
        
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 mt-20">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-custom text-white text-center mb-6"
            >
              Choose Your Interview Plan
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredSubscriptions.map((subscription) => (
                <motion.div
                  key={subscription.subscription_id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl flex flex-col justify-between h-full"
                >
                  <div>
                    {subscription.subscription_type !== "trial" && subscription.tag1 && (
                      <span className="inline-block mb-2 px-2 py-1 bg-gradient-to-r from-purple-800 to-blue-800 text-white text-xs font-medium rounded-full shadow-lg">
                        {subscription.tag1}
                      </span>
                    )}
                    <h3 className="text-lg font-custom text-white mb-1">{subscription.name}</h3>
                    {subscription.subscription_type !== "trial" && (
                      <div className="text-2xl font-custom text-white mb-1">
                        ₹{subscription.price}
                        <span className="text-gray-400 text-xs mb-2">/month</span>
                      </div>
                    )}

                    <ul className="space-y-1 mb-3">
                      {advantages.slice(0, 2).map((advantage, i) => (
                        <li key={i} className="flex items-start text-gray-300 text-xs">
                          <advantage.icon className="mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>{advantage.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-2">
                    {/* {!localStorage.getItem("auth_code") && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAction(subscription, "trial")}
                        className="w-1/2 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                      >
                        Free Trial
                      </motion.button>
                    )} */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction(subscription, "buy")}
                      className={`${
                        localStorage.getItem("auth_code") ? "w-full" : "w-1/2"
                      } py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25`}
                    >
                      Buy Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].slogan}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                  >
                    {slides[currentSlide].slogan}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-200"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-purple-500" : "bg-gray-400/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="dark" autoClose={5000} />
    </div>
  )
}

export default PricingPackage


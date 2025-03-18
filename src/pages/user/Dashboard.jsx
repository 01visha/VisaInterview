"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import MyInterview from "./Myinterview"
import Tips from "./Tips"
import Scores from "./Scores"
import { useUserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { X } from "lucide-react"

const tabs = ["Guidelines", "My Interview", "My Scores"]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("guidelines")
  const [isVisible, setIsVisible] = useState(true)
  const [remainingTests, setRemainingTests] = useState(null)
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)
  const [subscriptionName, setSubscriptionName] = useState(null)
  const [subscriptionId, setSubscriptionId] = useState(null)
  const [profileData, setProfileData] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { userData, loginUser } = useUserContext()

  const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}")
  const authToken = localStorage.getItem("authToken")
  const auth_code = localStorage.getItem("auth_code")
  const API_BASE_URL = process.env.REACT_APP_BASE_URL
  const order_type = localStorage.getItem("order_type")

  const handleDismiss = () => setIsVisible(false)

  const handleSubscribe = () => navigate("/subscribe")

  const handlefeedback = () => setActiveTab("my-scores")

  const handleshowSubscriptionPopupClose = () => {
    setShowSubscriptionPopup(false);
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

  useEffect(() => {
    const authToken = localStorage.getItem("auth_code");
    if (authToken) {
    const fetchProfile = async () => {     
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get_user_profile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) throw new Error("Failed to fetch profile")
        const result = await response.json()
        if (result.status === "success" && result.data) {
          setProfileData(result.data)
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message)
      }
    }
    fetchProfile()
  }else{
   // console.log("Authentication token not found");
   // return; // Exit early if authToken is not found
  }
  }, [])

  const checkSubscription = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/active_subscription`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_code}`,
        },
      })
      const data = await response.json()

      //console.log(data)

      if (data.status === "success") {
        setRemainingTests(data.data.remaining_tests)
        setSubscriptionName(data.data.name || "Unknown Subscription")
        setSubscriptionId(data.data.subscription_id)
        setShowSubscriptionPopup(false)
      } else {
        setShowSubscriptionPopup(true)
      }
    } catch (error) {
      toast.error("No Active Subscription Available")
      navigate("/subscribe")
    }
  }

  const handleTabClick = (tab) => {
    const newActiveTab = tab.toLowerCase().replace(" ", "-")
    setActiveTab(newActiveTab)
    if (newActiveTab === "my-interview") {
      checkSubscription()
    } else {
      setShowSubscriptionPopup(false)
    }
  }

  // Sync user authentication
  useEffect(() => {
    if (!userData.isAuthenticated && storedUserData) {
      const userInfo = {
        accountType: storedUserData.accountType || "user",
        name: storedUserData.name || "",
        email: storedUserData.email || "",
        picture: storedUserData.picture || "",
      }
      loginUser(userInfo, authToken)
    }
  }, [userData.isAuthenticated, storedUserData, authToken, loginUser])

  // Navigation checks
  useEffect(() => {
    const currentPath = location.pathname
    if (auth_code && currentPath !== "/dashboard") {
      navigate("/dashboard")
    } else if (!storedUserData && currentPath !== "/") {
      navigate("/")
    }
  }, [auth_code, storedUserData, location.pathname, navigate])

  const getMessageContent = () => {
    if (!isVisible || remainingTests === null) return null

    return {
      title: "Message",
      description: `You Have ${remainingTests} attempts under the "${subscriptionName}" subscription!`,
      buttons: [{ label: "Ok", onClick: handleDismiss, style: "bg-blue-200 text-blue-700 hover:bg-blue-300" }],
    }
  }

  const messageContent = getMessageContent()

  if (!storedUserData || (!auth_code && !authToken)) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold sm:text-4xl text-indigo-800">My Learning</h1>

        {showSubscriptionPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-indigo-600">
              <button
                onClick={handleshowSubscriptionPopupClose}
                className=" absolute ml-80 text-gray-500 hover:text-gray-700"
              >
                <X className="h-8 w-8" />
              </button>
              <h2 className="text-2xl font-bold mb-4">Subscription Required</h2>

              <p className="mb-6">Please subscribe to continue using our services.</p>
              <div className="flex justify-end">
                <button
                  onClick={handleSubscribe}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  Go to Pricing
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full overflow-hidden bg-white/30 backdrop-blur-sm rounded-xl shadow-lg">
          <nav className="flex w-full relative">
            <div className="absolute bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300"></div>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.toLowerCase().replace(" ", "-")
              return (
                <button
                  key={tab}
                  className={`
        relative flex-1 py-4 text-sm sm:text-lg font-medium transition-all duration-300
            before:absolute before:inset-0 before:z-0 before:transition-all before:duration-300
            before:opacity-0 before:bg-gradient-to-r before:from-blue-400/20 before:via-blue-600/20 before:to-blue-400/20
            hover:before:opacity-100
            ${
              isActive
                ? `
                  text-blue-700 font-bold text-lg
                  before:opacity-100 before:bg-gradient-to-r before:from-blue-400/30 before:via-blue-600/30 before:to-blue-400/30
                  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-600
                  after:animate-expandBorder
                  [&>span]:animate-contentPulse
                  shadow-[inset_0_-2px_0_0_#7c3aed]
                `
                : "text-gray-600 hover:text-blue-700"
            }
          `}
                  onClick={() => handleTabClick(tab)}
                >
                  <span className="relative z-10">{tab}</span>
                  {isActive && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 opacity-20 shine-effect"></div>
                    </div>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {activeTab === "guidelines" && <Tips />}
        {activeTab === "my-interview" && !showSubscriptionPopup && (
          <MyInterview
            remainingTests={remainingTests}
            subscriptionName={subscriptionName}
            subscriptionId={subscriptionId}
          />
        )}
        {activeTab === "my-scores" && <Scores />}
      </div>
    </div>
  )
}


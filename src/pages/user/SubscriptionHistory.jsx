import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHome,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaPencilAlt,
  FaMoneyBillWave,
  FaHistory,
  FaEdit,
} from "react-icons/fa";
import "./css/MyProfile.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import SignOutModal from "../.././component/SignOutModal";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { X, Search, ChevronUp, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import ChangePasswordModal from "../.././component/ChangePasswordModal";

const SubscriptionHistory = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "purchase_date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { userData, loginUser, logoutUser } = useUserContext();
  const defaultProfileImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PHWKX1-RSvrB1MujZfo_H81KeeLH-G9SHg&s";
  const [errors, setErrors] = useState({
    full_name: "",
    mobile_number: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: "",
    email_address: "",
    mobile_number: "",
    created_date: "",
  });
  const [tempProfileData, setTempProfileData] = useState({});
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const livekey = process.env.REACT_APP_RAZORPAY_KEY_ID;
  //console.log("Live Razorpay Key:", livekey);

  useEffect(() => {
    fetchProfile();
    fetchSubscriptionHistory();
    /*   if (show) {
      fetchSubscriptionHistory()
    } */
  }, [show]);

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
        setProfileData(result.data);
        setUser(result.data);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTempProfileData({ ...profileData });
    setEditMode(true);
  };

  const handleChange = (e) => {
    setTempProfileData({ ...tempProfileData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!tempProfileData.full_name.trim()) {
      toast.error("Name is required.");
      formIsValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(tempProfileData.full_name)) {
      toast.error("Name must contain only alphabets.");
      formIsValid = false;
    }

    if (!tempProfileData.mobile_number) {
      toast.error("Mobile number is required.");
      formIsValid = false;
    } else if (!/^\d{10}$/.test(tempProfileData.mobile_number)) {
      toast.error("Mobile number must be exactly 10 digits.");
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      //toast.error("Please fix the below given errors before saving.")
      return;
    }

    try {
      const authToken = localStorage.getItem("auth_code");
      if (!authToken) throw new Error("Authentication token not found");

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/save_user_profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempProfileData),
        }
      );

      if (!response.ok) throw new Error("Failed to save profile");

      const result = await response.json();
      if (result.status === "success") {
        setProfileData(tempProfileData);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrors({});
  };

  const handleSignOut = () => {
    localStorage.clear();
    logoutUser();
    navigate("/login");
  };

  const fetchSubscriptionHistory = async () => {
    setIsLoading(true);
    try {
      const authCode = localStorage.getItem("auth_code");
      if (!authCode) {
        toast.error("Authentication code not found. Please login again.");
        handleClose();
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subscription_history`,
        {
          headers: { Authorization: `Bearer ${authCode}` },
        }
      );

      const sortedData =
        response.data.data?.data.sort(
          (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
        ) || [];
      setSubscriptions(sortedData);
    } catch (error) {
      console.error("Error fetching subscription history:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch subscription history."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handlePayNow = async (
    price,
    subscriptionId,
    interviewId,
    description,
    trialSubscriptionId,
    orderIdFromHistory
  ) => {
    try {
      if (!window.Razorpay) {
        toast.error("Payment gateway is not ready. Please try again.");
        return;
      }

      const authCode = localStorage.getItem("auth_code");
      if (!authCode) {
        toast.error("Authentication code not found. Please login again.");
        return;
      }

      const options = {
        key: "rzp_test_4tlTQj2JaR14Au", // Replace with your live key for production
        amount: price * 100, // Razorpay accepts amount in paise, so multiplying by 100
        // key:"rzp_live_zAd0BGkYfvmkIW",
        // amount: 1 * 100,
        currency: "INR",
        name: "Crack Visa",
        description: `Payment for ${description} package`,
        handler: async (response) => {
          try {
            //console.log("Payment successful:", response.razorpay_payment_id);

            // Step 1: Payload for updating subscription status
            const updateStatusPayload = {
              subscription_id: subscriptionId,
              order_id: orderIdFromHistory,
              pg_response: {
                status: "Active",
                transaction_id: response.razorpay_payment_id,
                payment_gateway: "Razorpay",
              },
            };

            //console.log("Update Status Payload:", updateStatusPayload);

            // Step 2: API call to update subscription status
            const updateStatusResponse = await fetch(
              `${process.env.REACT_APP_BASE_URL}/update-subscription-status`,
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
            //console.log("Subscription status updated successfully:",updateStatusResult);

            // Final success message and redirect to dashboard
            toast.success("Payment successful! Subscription activated.");
            navigate("/dashboard"); // Redirect to the dashboard
          } catch (error) {
            console.error("Error during payment process:", error.message);
            toast.error("Failed to process payment. Please try again.");
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
            //console.log("Razorpay gateway was closed by the user.");
            toast.error("Payment process was not completed.");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error during payment initialization:", error.message);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedSubscriptions = React.useMemo(() => {
    const sortableItems = [...subscriptions];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [subscriptions, sortConfig]);

  const filteredSubscriptions = sortedSubscriptions.filter((subscription) =>
    Object.values(subscription).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      );
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    // return <div className="loading">Loading...</div>
  }

  return (
    <div className="profile-container ">
      <aside className="sidebar w-full md:w-1/4 bg-gray-200 p-4 ">
        <div className="profile-image mb-4 flex justify-center">
          <img
            src={userData.picture || defaultProfileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <nav className="nav-menu flex flex-col">
          <a
            href="/dashboard"
            className="nav-item flex items-center space-x-2 p-2 text-white hover:bg-white/30   hover:text-blue-900 rounded-md"
          >
            <FaHome />
            <span>Dashboard</span>
          </a>

          <NavLink
            to="/MyProfile"
            className={({ isActive }) =>
              `nav-item flex items-center space-x-2 p-2 text-white hover:bg-white/30 hover:text-blue-900 rounded-md ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaUser />
            <span>Account Details</span>
          </NavLink>

          {profileData.sso === 0 && (
            <button
              onClick={handleShowModal}
              className="flex items-center space-x-2 p-2 text-white hover:bg-white/30   hover:text-blue-900 rounded-md"
            >
              <FaKey />
              <span>Change Password</span>
            </button>
          )}

          <NavLink
            to="/subscription-history"
            className={({ isActive }) =>
              `nav-item flex items-center space-x-2 p-2 text-white hover:bg-white/30 hover:text-blue-900 rounded-md ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaHistory />
            <span>Subscription History</span>
          </NavLink>

          <button
            onClick={() => setShowSignOutModal(true)}
            className="flex items-center space-x-2 p-2  text-white hover:bg-white/30   hover:text-blue-900 rounded-md"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      <main className="main-content w-full md:w-3/4 flex-1 py-4 md:py-6 bg-white">
        <h1 className="profile-heading">Subscription History</h1>

        <div className="profile-content">
          <div className="flex items-center space-x-2 p-4 bg-gray-50 border-b w-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredSubscriptions.length > 0 ? (
            <div className="overflow-x-auto mx-auto">
              {/* Table View for Desktop */}
              <div className="hidden md:block overflow-x-auto px-2">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden py-1 h-full ">
                  <thead className="bg-blue-100">
                    <tr>
                      {[
                        "Interview Name",
                        "Name",
                        "Status",
                        "Purchase Date",
                        "Expiry Date",
                        "Auto Renew",
                        "Remaining Tests",
                        "Pay Now",
                      ].map((header, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-2 py-2 text-left text-sm font-medium text-gray-800 uppercase tracking-wider cursor-pointer"
                          onClick={() =>
                            handleSort(header.toLowerCase().replace(" ", "_"))
                          }
                        >
                          <div className="flex items-center">
                            {header}
                            <SortIcon
                              column={header.toLowerCase().replace(" ", "_")}
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscriptions.map((subscription, index) => (
                      <tr key={subscription.order_id || subscription.subscription_id || index}>
                        <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                          {subscription.interview_name}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                          {subscription.name}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                          {formatDate(subscription.purchase_date)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                          {formatDate(subscription.expiry_date)}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-center text-gray-500 ">
                          <span
                            className={`px-2 py-1 rounded-full  text-xs font-medium ${
                              subscription.is_auto_renew
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subscription.is_auto_renew ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-center text-gray-500">
                          {subscription.remaining_tests}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                          {subscription.status ===
                          "In Progress - Payment Due" ? (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                              onClick={() =>
                                handlePayNow(
                                  subscription.price,
                                  subscription.subscription_id,
                                  subscription.interview_id,
                                  subscription.name,
                                  subscription.trial_subscription_id,
                                  subscription.order_id
                                )
                              }
                            >
                              Pay Now
                            </button>
                          ) : (
                            <button
                              className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-600"
                              disabled
                            >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="block md:hidden space-y-4 pb-4">
                {filteredSubscriptions.map((subscription, index) => (
                  <div
                    key={subscription.order_id || subscription.subscription_id || index}
                    className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      {/* <p className="text-sm font-semibold text-gray-700">
                        Order ID: {subscription.order_id}
                      </p> */}
                      <p className="text-sm font-semibold text-gray-700">
                        Intsrview Name: {subscription.interview_name}
                      </p>
                    </div>
                    <div className="text-gray-500 space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Status: </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            subscription.status
                          )}`}
                        >
                          {subscription.status}
                        </span>
                      </p>

                      <p className="text-sm">
                        <span className="font-semibold">Name: </span>
                        {subscription.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Purchase Date: </span>{" "}
                        {formatDate(subscription.purchase_date)}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Expiry Date: </span>{" "}
                        {formatDate(subscription.expiry_date)}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Auto Renew: </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subscription.is_auto_renew
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {subscription.is_auto_renew ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Remaining Tests:</span>{" "}
                        {subscription.remaining_tests}
                      </p>
                      {subscription.status === "In Progress - Payment Due" && (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            handlePayNow(
                              subscription.price,
                              subscription.subscription_id,
                              subscription.interview_id,
                              subscription.name,
                              subscription.trial_subscription_id,
                              subscription.order_id
                            )
                          }
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <table className="min-w-full bg-white overflow-hidden">
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center text-gray-500">
                    No subscription history found.
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </main>

      <ToastContainer />

      <ChangePasswordModal
        show={showModal}
        handleClose={handleCloseModal}
        ssoStatus={profileData.sso}
      />
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
      />
    </div>
  );
};

export default SubscriptionHistory;

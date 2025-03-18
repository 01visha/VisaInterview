import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaUser, FaKey, FaSignOutAlt, FaHistory } from "react-icons/fa";
import { Link, useNavigate, NavLink } from "react-router-dom";
import SignOutModal from "../../component/SignOutModal";
import { useUserContext } from "../../context/UserContext";
import ChangePasswordModal from "../../component/ChangePasswordModal";
import SubscriptionHistoryModal from "../../component/SubscriptionHistoryModal";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: "",
    email_address: "",
    mobile_number: "",
    created_date: "",
  });
  const [tempProfileData, setTempProfileData] = useState({});
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userData, logoutUser } = useUserContext();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const handleShowModal = () => setShowModal(true)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const defaultProfileImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PHWKX1-RSvrB1MujZfo_H81KeeLH-G9SHg&s";
  const [errors, setErrors] = useState({
    full_name: "",
    mobile_number: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchSubscription();
  }, []);

  const fetchProfile = async () => {
    try {
      const authToken = localStorage.getItem("auth_code");
      if (!authToken) throw new Error("Authentication token not found");

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get_user_profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const result = await response.json();

      if (result.status === "success" && result.data) {
        setProfileData(result.data);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    logoutUser();
    navigate("/login");
  };

  const fetchSubscription = async () => {
    try {
      const authToken = localStorage.getItem("auth_code");
      if (!authToken) throw new Error("Authentication token not found");

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/active_subscription`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch subscription");

      const result = await response.json();
      if (result.status === "success" && result.data) {
        setSubscriptionData(result.data);
      } else {
        toast.error("No Active Subscriptions.");
      }
    } catch (error) {
      // toast.error("No Active Subscriptions Available.");
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
      return;
    }

    try {
      const authToken = localStorage.getItem("auth_code");
      if (!authToken) throw new Error("Authentication token not found");

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/save_user_profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempProfileData),
      });

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <aside className="sidebar w-full md:w-1/4 bg-gray-200 p-4">
        <div className="profile-image mb-4 flex justify-center">
          <img
            src={userData.picture || defaultProfileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <nav className="nav-menu flex flex-col">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-item flex items-center space-x-2 p-2 text-gray-800 hover:bg-gray-200 hover:text-blue-900 rounded-md ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/MyProfile"
            className={({ isActive }) =>
              `nav-item flex items-center space-x-2 p-2 text-gray-800 hover:bg-gray-200 hover:text-blue-900 rounded-md ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            <FaUser />
            <span>Account Details</span>
          </NavLink>

          {profileData.sso === 0 && (
            <button
              onClick={handleShowModal}
              className="flex items-center space-x-2 p-2 text-white hover:bg-white/30 hover:text-blue-900 rounded-md"
            >
              <FaKey />
              <span>Change Password</span>
            </button>
          )}

          <NavLink
            to="/subscription-history"
            className={({ isActive }) =>
              `nav-item flex items-center space-x-2 p-2 text-gray-800 hover:bg-gray-200 hover:text-blue-900 rounded-md ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            <FaHistory />
            <span>Subscription History</span>
          </NavLink>

          <button
            onClick={() => setShowSignOutModal(true)}
            className="flex items-center space-x-2 p-2 text-white hover:bg-white/30 hover:text-blue-900 rounded-md"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <h1 className="profile-heading">My Account</h1>
        <div className="profile-content">
          <div className="profile-info">
            <h2 className="profile-info-heading">Profile Information</h2>

            <div className="info-group">
              <label htmlFor="full_name">Full Name</label>
              {editMode ? (
                <div className="edit-field">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={tempProfileData.full_name}
                    onChange={handleChange}
                    className={`edit-input ${errors.full_name ? "error-input" : ""}`}
                    required
                  />
                  {errors.full_name && <span className="error">{errors.full_name}</span>}
                </div>
              ) : (
                <p>{profileData.full_name}</p>
              )}
            </div>

            <div className="info-group">
              <label>Email Address</label>
              <p>{profileData.email_address}</p>
            </div>

            <div className="info-group">
              <label htmlFor="mobile_number">Mobile Number</label>
              {editMode ? (
                <div className="edit-field">
                  <input
                    type="tel"
                    id="mobile_number"
                    name="mobile_number"
                    value={tempProfileData.mobile_number}
                    onChange={handleChange}
                    className={`edit-input ${errors.mobile_number ? "error-input" : ""}`}
                    required
                  />
                  {errors.mobile_number && <span className="error">{errors.mobile_number}</span>}
                </div>
              ) : (
                <p>{profileData.mobile_number}</p>
              )}
            </div>

            {editMode ? (
              <div className="edit-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            ) : (
              <button className="edit-profile-btn" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>

          <div className="subscription-orders">
            <h2 className="profile-info-heading">Active Subscriptions</h2>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData ? (
                  subscriptionData.map((subscription, index) => (
                    <tr key={subscription.order_id || index}>
                      <td>
                        <button
                          onClick={() => navigate("/subscription-history")}
                          className="text-blue-400"
                        >
                          {subscription.name}
                        </button>
                      </td>
                      <td>{formatDate(subscription.created_date)}</td>
                      <td>{formatDate(subscription.expiry_date)}</td>
                      <td>
                        <span className="text-green-500 font-bold">{subscription.status}</span>
                      </td>
                      <td>₹{subscription.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No subscription order found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <ToastContainer />
      <SubscriptionHistoryModal
        show={showSubscriptionModal}
        handleClose={() => setShowSubscriptionModal(false)}
      />
      <ChangePasswordModal
        show={showModal}
        handleClose={() => setShowModal(false)}
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

export default MyProfile;
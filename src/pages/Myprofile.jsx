import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Home from "../Home";
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaPencilAlt, FaSave } from "react-icons/fa";

const Myprofile = () => {
  const { userData, loginUser } = useUserContext();
  const [resume, setResume] = useState(null);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [profileData, setProfileData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    phone: "",
  });

  useEffect(() => {
    if (!userData.isAuthenticated) {
      const userInfo = {
        accountType: 'user',
        name: userData.name,
        email: userData.email,
        picture: userData.picture
      };
      loginUser(userInfo);
    }
  }, [userData.isAuthenticated, loginUser]);

  const handleFileUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Profile updated successfully!");
    //console.log("Updated profile:", profileData);
   // console.log("Uploaded resume:", resume);
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  if (!userData.isAuthenticated) {
    return <Home />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <img
              src={userData.picture || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
              <p className="text-xl text-white opacity-80">{profileData.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div className="flex-grow">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  {editMode.name ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 block w-full py-2 px-3 text-gray-900">{profileData.name}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => editMode.name ? handleSave('name') : handleEdit('name')}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editMode.name ? <FaSave /> : <FaPencilAlt />}
                </button>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <div className="flex-grow">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  {editMode.email ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 block w-full py-2 px-3 text-gray-900">{profileData.email}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => editMode.email ? handleSave('email') : handleEdit('email')}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editMode.email ? <FaSave /> : <FaPencilAlt />}
                </button>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <div className="flex-grow">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  {editMode.phone ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 block w-full py-2 px-3 text-gray-900">{profileData.phone || "Not provided"}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => editMode.phone ? handleSave('phone') : handleEdit('phone')}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editMode.phone ? <FaSave /> : <FaPencilAlt />}
                </button>
              </div>

              <div className="flex items-center">
                <FaFileAlt className="text-gray-400 mr-3" />
                <div className="flex-grow">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Resume
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                    <label
                      htmlFor="resume"
                      className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {resume ? "Change file" : "Upload file"}
                    </label>
                    {resume && <span className="ml-3 text-sm text-gray-500">{resume.name}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;


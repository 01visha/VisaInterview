import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);

  // Initialize state from localStorage or defaults
  const [userData, setUserData] = useState({
    accountType: null,
    isAuthenticated: false,
    name: '',
    email: '',
    picture: '',
    token: null,
  });

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const token = localStorage.getItem("authToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (token && userInfo) {
      setUserData({
        ...userInfo,
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_code");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
    if (token && storedUserData) {
      setUserData({
        ...storedUserData,
        token,
        isAuthenticated: true,
      });
    }
    setIsLoading(false);
  }, []);

  // Function to update user data when the user logs in
  const loginUser = (userInfo, token) => {
    setUserData({
      isAuthenticated: true,
      accountType: userInfo.accountType,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      token,
    }); // Store token and user info in localStorage

  };

  // Function to logout the user
  const logoutUser = () => {
    setUserData({
      isAuthenticated: false,
      accountType: null,
      name: '',
      email: '',
      picture: '',
      token: null,
    });
    localStorage.clear();
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
   
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loginUser, logoutUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
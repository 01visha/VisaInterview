import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// Utility function to decode JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  } catch (e) {
    return null;
  }
};

// Extract actual token from "Bearer <token>"
const extractToken = (bearerToken) => {
  return bearerToken?.startsWith("Bearer ") ? bearerToken.split(" ")[1] : null;
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    accountType: null,
    isAuthenticated: false,
    name: "",
    email: "",
    picture: "",
    token: null,
  });

  useEffect(() => {
    const bearerToken = localStorage.getItem("auth_code");
    const token = extractToken(bearerToken);
    const userInfo = JSON.parse(localStorage.getItem("userData"));
  
    if (bearerToken && userInfo) {
      const decodedToken = parseJwt(bearerToken);
      const expiryTime = decodedToken?.exp * 1000;
      const currentTime = Date.now();
  
      if (expiryTime && expiryTime < currentTime) {
        //console.log("Token expired, logging out...");
        logoutUser();
      } else {
        setUserData({
          ...userInfo,
          token: bearerToken,
          isAuthenticated: true,
        });
  
        if (expiryTime) {
          setTimeout(logoutUser, expiryTime - currentTime);
        }
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userData.isAuthenticated) {
    //  const inactivityLimit = 60 * 1000; // 1 min for testing
      const inactivityLimit = 60 * 60 * 1000; // 1 hr for production

      let inactivityTimer;
      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          //console.log("User inactive. Logging out...");
          logoutUser();
        }, inactivityLimit);
      };

      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keydown", resetInactivityTimer);

      resetInactivityTimer();

      return () => {
        clearTimeout(inactivityTimer);
        window.removeEventListener("mousemove", resetInactivityTimer);
        window.removeEventListener("keydown", resetInactivityTimer);
      };
    }
  }, [userData.isAuthenticated]);

  const loginUser = (userInfo, bearerToken) => {
    //const token = extractToken(bearerToken);
    if (bearerToken) {
      const decodedToken = parseJwt(bearerToken);
      const expiryTime = decodedToken?.exp * 1000;
      const currentTime = Date.now();

      setUserData({
        isAuthenticated: true,
        accountType: userInfo.accountType,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        token: bearerToken,
      });

      localStorage.setItem("authToken", bearerToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("loginTime", Date.now());

      if (expiryTime) {
        setTimeout(logoutUser, expiryTime - currentTime);
      }
    }
  };

  const logoutUser = () => {
    //console.log("Logging out user...");
    setUserData({
      isAuthenticated: false,
      accountType: null,
      name: "",
      email: "",
      picture: "",
      token: null,
    });
    localStorage.clear();
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loginUser, logoutUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

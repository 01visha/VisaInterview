import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userData, isLoading, logoutUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !userData.isAuthenticated) {
      //console.log("Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [userData.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && userData.isAuthenticated) {
      const token = userData.token; 
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = decodedToken?.exp * 1000;
        const currentTime = Date.now();

        if (expiryTime < currentTime) {
          //console.log("Token expired. Logging out...");
          logoutUser(() => navigate("/login", { replace: true }));
          return;
        }

        // Auto logout on inactivity
        //const inactivityLimit = 60 * 1000; // 1 min for testing
        const inactivityLimit = 60 * 60 * 1000; // 1 hr for production

        let inactivityTimer = setTimeout(() => {
          //console.log("User inactive. Logging out...");
          logoutUser(() => navigate("/login", { replace: true }));
        }, inactivityLimit);

        const resetInactivityTimer = () => {
          clearTimeout(inactivityTimer);
          inactivityTimer = setTimeout(() => {
            //console.log("User inactive. Logging out...");
            logoutUser(() => navigate("/login", { replace: true }));
          }, inactivityLimit);
        };

        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);

        return () => {
          clearTimeout(inactivityTimer);
          window.removeEventListener("mousemove", resetInactivityTimer);
          window.removeEventListener("keydown", resetInactivityTimer);
        };
      }
    }
  }, [userData.isAuthenticated, isLoading, logoutUser, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;

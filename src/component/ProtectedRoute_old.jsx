import { useEffect } from "react";
import { useUserContext } from "../context/UserContext"; // Adjust path
import { useNavigate } from "react-router-dom"; // React Router

const ProtectedRoute = ({ children }) => {
  const { userData, isLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !userData.isAuthenticated) {     
      navigate("/login", { replace: true }); // `replace: true` prevents infinite loop
    }
  }, [userData.isAuthenticated, isLoading, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;
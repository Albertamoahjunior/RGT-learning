import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Auth from "../services/auth";

interface ProtectedProps {
  children: React.ReactElement;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { authParcel, setAuthParcel } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to store auth result

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authParcel.token !== "") {
        setIsAuthenticated(true);
      } else {
        const refresh = await Auth.refresh();


        if (refresh?.state === true) {
          setAuthParcel({
            token: refresh.token ?? "",
            user_id: refresh.userId ?? "",
            username: refresh.username ?? ""
          });
          setIsAuthenticated(true);
        } else {
          alert("Session expired, please log in again.");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, [authParcel, setAuthParcel]);

  // Show a loading indicator while the async operation completes
  if (isLoading) return <div>Loading...</div>;

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render the children if authenticated
  return children;
};

export default Protected;

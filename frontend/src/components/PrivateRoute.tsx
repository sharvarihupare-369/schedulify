import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { token } = authContext;
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;

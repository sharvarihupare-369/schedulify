import React, { createContext, useEffect, useState, ReactNode } from "react";
import { AuthContextType } from "../utils/types";


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") || "");
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem("username") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } 
    else {
      localStorage.removeItem("token"); 
    }

    if (username) {
      localStorage.setItem("username", username);
    } 
    else {
      localStorage.removeItem("username"); 
    }
  }, [token, username]);

  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken, username: username, setUsername: setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContextProvider;

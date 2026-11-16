import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const responce = await login(username, password);
      console.log("full",responce);
      console.log("useer",responce.user);
      console.log("token",responce.token);
      
      setUser(responce.user);
    }
    
     catch (err) {
      console.log(err);
    }

     finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const responce = await register(username, email, password);
      setUser(responce.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useContext } from "react";
// Assuming useLocalStorage is in ../hooks/useLocalStorage
import { useLocalStorage } from "../hooks/useLocalStorage"; 
// Define the initial state structure for an unauthenticated user
const initialUser = null; 
// The key for localStorage
const AUTH_KEY = "auth-user";

// Create the Auth Context
const AuthContext = createContext();
// Ensure the raw context object is exported for useContext(AuthContext)
export { AuthContext };

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // [user, setUser, clearUserStorage] matches the return array of the hook
  const [user, setUser, clearUserStorage] = useLocalStorage(AUTH_KEY, initialUser); 
  const login = (email) => {
    // Sets the user object, which is now automatically persisted by useLocalStorage
    const userData = { email: email, isLoggedIn: true };
    setUser(userData);
    // CHANGE: Updated log message
    console.log(`User logged in for this session: ${email}`);
  };
  const logout = () => {
    // Clears user from both state and localStorage
    clearUserStorage(); // Uses the clear function from the hook
    //  Updated log message
    console.log("User logged out and session cleared.");
  };
  const contextValue = {
    user,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom Hook (Recommended way to consume the context)
export const useAuth = () => useContext(AuthContext);
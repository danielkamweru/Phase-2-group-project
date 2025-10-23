import React from "react";
import Navbar from "./components/NavBar";          
import HomePage from "./pages/HomePage";          
import ProjectPage from "./pages/ProjectPage";    
import NewProject from "./pages/NewProject";  
import Settings from "./components/Settings";
import Dashboard from "./pages/Dashboard"; 
import Login from "./pages/Login";
import About from "./pages/About";
// Import needed React Router components and the custom auth hook
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Use the custom hook for auth

function App() {
  // Use the custom hook to get the user state from AuthContext
  const { user } = useAuth(); 
  // Boolean to quickly check if the user is logged in
  const isLoggedIn = !!user; 
  const ProtectedRoute = ({ element: Element }) => {
    return isLoggedIn ? Element : <Navigate to="/login" replace />;
  };
  return (
    <Router>
      {/* 1. Navbar is only visible if the user is logged in */}
      {isLoggedIn && <Navbar />}
      
      <main>
        <Routes>
          {/* Public Route: Login */}
          <Route 
            path="/login" 
            // If logged in, redirect away from the login page (e.g., to dashboard)
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          {/* Protected Routes (All routes other than login) */}
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/projects" element={<ProtectedRoute element={<ProjectPage />} />} />
          <Route path="/new" element={<ProtectedRoute element={<NewProject />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          {/* Catch-all for 404 Not Found (or redirect to a known state) */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      {/* 2. Floating Settings is only visible if the user is logged in */}
      {isLoggedIn && <Settings />}
    </Router>
  );
}

export default App;
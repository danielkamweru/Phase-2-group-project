import React from "react";
import Navbar from "./components/NavBar";          
import HomePage from "./pages/HomePage";          
import ProjectPage from "./pages/projectPage";    
import NewProject from "./pages/NewProject";  
import Settings from "./components/Settings";
import Dashboard from "./pages/Dashboard"; 
import AuthPage from "./pages/AuthPage"; // Combined Login/Signup page
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // ProtectedRoute wrapper
  const ProtectedRoute = ({ element: Element }) => {
    return isLoggedIn ? Element : <Navigate to="/auth" replace />;
  };

  return (
    <Router>
      {/* Navbar is only visible when logged in */}
      {isLoggedIn && <Navbar />}

      <main>
        <Routes>
          {/* Auth Page (Login + Signup combined) */}
          <Route 
            path="/auth" 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
          />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/projects" element={<ProtectedRoute element={<ProjectPage />} />} />
          <Route path="/new" element={<ProtectedRoute element={<NewProject />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

          {/* Public route */}
          <Route path="/about" element={<About />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/auth"} />} />
        </Routes>
      </main>

      {/* Floating Settings only visible when logged in */}
      {isLoggedIn && <Settings />}
    </Router>
  );
}

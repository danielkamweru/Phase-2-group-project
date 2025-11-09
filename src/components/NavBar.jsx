import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
      <div className="font-bold text-lg">Project Tracker</div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/new" className="hover:text-blue-400">New Project</Link>
        <Link to="/dashboard" className="hover:text-blue-400 font-semibold">Dashboard</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
      <div className="font-bold text-lg">Project Tracker</div>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/new" className="hover:text-blue-400">New Project</Link>
       < Link to="/dashboard" className="hover:text-blue-400 font-semibold"> Dashboard</Link >
       <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              About
            </Link>
      </div>
    </nav>
  );
};

export default NavBar;
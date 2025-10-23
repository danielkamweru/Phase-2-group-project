import React from "react";
import { useNavigate } from "react-router-dom"; 
import Settings from "../components/Settings"; 
import { useProjects } from "../context/ProjectContext";
// FIX: The react-icons/fa import is now completely removed.
const HomePage = () => {
  const { projects } = useProjects();
  const navigate = useNavigate(); 
  const total = projects.length;
  const completed = projects.filter((p) => p.progress === 100).length;
  const remaining = total - completed;
  const overallProgress =
    total === 0 ? 0 : Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total);
  const handleGoToProjects = () => {
    navigate("/projects"); 
  };
  return (
    <section className="min-h-screen relative py-16 transition-all duration-300">
      {/* Floating Settings */}
      <Settings />
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
 <div className="flex justify-center items-center mb-4">
   {/* CHANGE: Replaced FaStar with ⭐ emoji */}
  <span className="text-4xl mx-2 animate-pulse" role="img" aria-label="Star">⭐</span>
    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600">
    Welcome to TaskFlow
    </h1>
  <span className="text-4xl mx-2 animate-pulse animation-delay-200" role="img" aria-label="Star">⭐</span>
</div>
 <p className="text-xl md:text-2xl max-w-2xl mx-auto">
Your command center for efficient project management.
 </p></div>
{/* Project Summary */}
  <div className="max-w-xl mx-auto mb-12 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
 <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 dark:text-orange-400">
 Current Project Overview
</h2>
<div className="flex flex-col sm:flex-row items-center justify-around gap-6"> 
<div className="flex flex-col items-center">
  {/* CHANGE: Completed status */}
  <span className="mb-2 text-green-500 text-3xl" role="img" aria-label="Checkmark">✅</span> 
 <span className="font-medium text-lg">Completed</span>
  <span className="text-2xl font-bold">{completed}</span>
  </div>
  <div className="flex flex-col items-center">
  {/* CHANGE: ⏳ emoji for Remaining status */}
   <span className="mb-2 text-yellow-500 text-3xl" role="img" aria-label="Hourglass">⏳</span> 
<span className="font-medium text-lg">Remaining</span>
 <span className="text-2xl font-bold">{remaining}</span>
  </div>
 <div className="flex flex-col items-center">
<span className="font-medium text-lg">Overall Progress</span>
 <div className="w-36 h-5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
 <div
className="h-5 bg-green-500 transition-all duration-500 ease-out"
 style={{ width: `${overallProgress}%` }}
  ></div>
</div>
<span className="text-2xl font-bold mt-2">{overallProgress}%</span>
</div>
</div>
<hr className="my-8 border-gray-200 dark:border-gray-700" />
{/* Button to navigate to Projects page */}
<div className="text-center">
 <button
 onClick={handleGoToProjects} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">Go to My Projects</button>
</div>
</div>
</section>
  );
};
export default HomePage;
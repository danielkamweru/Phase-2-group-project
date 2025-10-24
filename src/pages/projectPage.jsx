// ProjectsPage.jsx (using the enhanced context)

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from './context/ProjectContext'; // Import the hook
import ProjectCardSkeleton from './ProjectCardSkeleton'; // Assuming it's in a separate file

const ProjectsPage = () => {
  // Get projects, loading, and error state from the context
  const { projects, loading, error } = useProjects(); 
  const navigate = useNavigate();

  // 1. HANDLE LOADING STATE
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-400">Fetching Project Data...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // 2. HANDLE ERROR STATE
  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  // 3. HANDLE EMPTY STATE
  if (projects.length === 0) {
    return <p className="p-6 text-center text-gray-600">No projects found. Time to create one! 🚀</p>;
  }

  // 4. RENDER THE PROJECT LIST (when data is ready)
  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 border-b-2 pb-3 text-gray-800">
        All Projects <span className="text-blue-600">({projects.length})</span>
      </h1>
      
      {/* ... Your grid of project cards ... */}
    </div>
  );
};

export default ProjectsPage;
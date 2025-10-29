import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext"; // Use shared context
const ProjectsPage = () => {
  const navigate = useNavigate();
  // We only pull 'projects' now, as the context handles fetching/loading
  const { projects } = useProjects(); 
  // to show the initial animation for a fixed time.
  const [showInitialLoadScreen, setShowInitialLoadScreen] = useState(true);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => setShowInitialLoadScreen(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  // Loading screens
  if (showInitialLoadScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-6xl font-extrabold text-teal-400 animate-pulse">
          LOADING PROJECTS...
        </p>
      </div>
    );
  }
  // Use a temporary loading state for the skeleton if projects are empty 
  if (projects.length === 0 && !showInitialLoadScreen) {
    return (
      <p className="p-6 text-center text-gray-600">
        No projects found. Time to create one! 🚀
      </p>
    );
  }

  // Status Badge Styling
  const getStatusClasses = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-800";
    switch (status) {
      case "Stuck":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Join Project (local-only, no backend save)
  const handleJoinProject = (projectId) => {
    console.log(`User joining project ${projectId}`);

    // Navigate to dashboard & pass success message
    navigate(`/dashboard`, {
      state: {
        joinSuccess: true,
        projectId,
        message:
          "Joined successfully! ✅ You can now view, delete, save or manage this project from your dashboard.",
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 border-b-2 pb-3 text-gray-800">
        All Projects{" "}
        <span className="text-blue-600">({projects.length})</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {projects.map((project) => {
          const isCompleted = project.progress >= 100;
          let displayStatus = project.status || "In Progress";
          if (isCompleted) displayStatus = "Completed";
          const canJoin = !isCompleted;
          const titleIcon = isCompleted
            ? "⭐⭐"
            : displayStatus === "In Progress" || displayStatus === "Stuck"
            ? "⭐"
            : "";

          return (
            <div
              key={project.id}
              className={`relative bg-white p-6 rounded-2xl shadow-xl ${
                canJoin ? "hover:shadow-2xl hover:scale-[1.02]" : "pointer-events-none"
              } transition duration-300 ease-in-out border-t-4 ${
                isCompleted ? "border-green-500" : "border-blue-500"
              } flex flex-col`}
            >
              {/* Top: Status + Icon */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                    displayStatus
                  )}`}
                >
                  {displayStatus}
                  {!isCompleted && project.progress !== undefined
                    ? ` (${project.progress}%)`
                    : ""}
                </span>
                <div className="text-3xl">{canJoin ? "🛠️" : ""}</div>
              </div>

              {/* Main */}
              <div className="relative flex flex-col flex-grow">
                <Link to={`/projects/${project.id}`} className="block">
                  <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 mb-2 line-clamp-1">
                    {titleIcon} {project.name}
                  </h2>
                </Link>
                <p className="mt-1 text-gray-600 line-clamp-3 text-sm flex-grow mb-4">
                  {project.description}
                </p>

                {/* Join button */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end items-center">
                  {canJoin && (
                    <button
                      onClick={() => handleJoinProject(project.id)}
                      className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow-md flex items-center"
                    >
                      <span className="mr-1 text-lg">⭐</span> Join
                    </button>
                  )}
                </div>

                {/* Overlay for completed projects */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex flex-col items-center justify-center p-4 z-10">
                    <div className="text-6xl text-green-500 mb-2">🏆</div>
                    <p className="mt-2 text-xl font-bold text-green-700">
                      PROJECT COMPLETE!
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      This project is finished and cannot be joined.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
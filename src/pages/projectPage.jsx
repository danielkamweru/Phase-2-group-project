
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
// Assuming JSON Server is running on port 5000
const API_URL = "http://localhost:5000/projects";
// Component for the Skeleton Loader
const ProjectCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-40 animate-pulse">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        {/* Description Placeholder */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        {/* Status Placeholder */}
        <div className="h-3 bg-gray-300 rounded w-1/4 mt-6"></div>
    </div>
);
const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInitialLoadScreen, setShowInitialLoadScreen] = useState(true);
  // useNavigate hook is for programmatic navigation
  const navigate = useNavigate(); 
  useEffect(() => {
    // Start the timer for the initial load screen
    const initialLoadTimer = setTimeout(() => {
      setShowInitialLoadScreen(false);
    }, 2000); // 2-second delay for the aqua text

    // Once the initial screen is done, start fetching data (and show skeleton)
    setIsLoading(true);
    const fetchTimer = setTimeout(() => {
        fetch(API_URL)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch projects');
            }
            return res.json();
          })
          .then((data) => {
            // Use data directly, assuming 'progress' field exists
            setProjects(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            // Default to empty array if fetch fails, but stop loading
            setProjects([]); 
            setIsLoading(false);
          });
    }, 2500); // Start fetch 500ms *after* the initial screen ends

    return () => {
        clearTimeout(initialLoadTimer);
        clearTimeout(fetchTimer);
    };
  }, []);
  // 1. INITIAL LOADING SCREEN
  if (showInitialLoadScreen) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <p className="text-6xl font-extrabold text-teal-400 animate-pulse">
                  LOADING PROJECTS...
              </p>
          </div>
      );
  }
  // 2. SKELETON LOADING STATE (after initial screen, while fetching data)
  if (isLoading) {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-400">Fetching Project Data...</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>
            <p className="p-6 text-center text-xl text-blue-500 mt-8">Please wait while we prepare your projects!</p>
        </div>
    );
  }

  if (projects.length === 0) {
    return <p className="p-6 text-center text-gray-600">No projects found. Time to create one! 🚀</p>;
  }
  
  // Helper function to dynamically style the status badge
  const getStatusClasses = (status) => {
    if (status === 'Completed') {
        return 'bg-green-100 text-green-800';
    }
    // Assume any other status is a variant of "In Progress"
    switch (status) {
      case 'Stuck':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800'; // Default to 'In Progress' style
    }
  };
  
  // ⭐ UPDATED FUNCTION: 
  const handleJoinProject = (projectId) => {
      // 1. Simulate API call to join the project (If needed, actual join logic goes here)
      console.log(`User joining project ${projectId}`);
      
      // 2. REDIRECT the user to the DASHBOARD and pass a success state
      navigate(`/dashboard`, {
          state: { 
              joinSuccess: true,
              projectId: projectId,
              message: "Joined successfully! ✅ You can now view,delete,save or manage this projects from your dashboard ."
          }
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 border-b-2 pb-3 text-gray-800">
        All Projects <span className="text-blue-600">({projects.length})</span>
      </h1>
      
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {projects.map((project) => {
    // DYNAMIC STATUS CHECK: Project is complete if progress is 100 or greater
    const isCompleted = project.progress >= 100;
    
    // Determine the text status for the badge
    let displayStatus = project.status;
    if (isCompleted) {
        displayStatus = 'Completed';
    } else if (!displayStatus) {
        displayStatus = 'In Progress';
    }
    
    const canJoin = !isCompleted;

    // Determine the icon to show next to the title
    let titleIcon = '';
    if (isCompleted) {
        titleIcon = '⭐⭐ '; 
    } else if (displayStatus === 'In Progress' || displayStatus === 'Stuck') {
        titleIcon = '⭐ ';   
    }
    
    return (
  <div 
    key={project.id} 
   className={`relative bg-white p-6 rounded-2xl shadow-xl 
   ${canJoin 
    ? 'hover:shadow-2xl hover:scale-[1.02]'   : 'pointer-events-none'} 
 transition duration-300 ease-in-out 
 border-t-4 ${isCompleted ? 'border-green-500' : 'border-blue-500'} 
 flex flex-col`}
  >
        
  {/* 1. TOP ROW: Status Badge (Always visible) and Icon */}
  <div className="flex justify-between items-center mb-3">
  {/* Status Badge - Uses the dynamically determined displayStatus */}
  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(displayStatus)}`}>
  {displayStatus} 
 {/* Optional: Add percentage if not complete */}
  {!isCompleted && project.progress !== undefined && ` (${project.progress}%)`} 
  </span>
{/* Project Icon/Emoji - Hammer for joinable projects */}
  <div className="text-3xl">
  {canJoin ? '🛠️' : ''}
   </div>
  </div>

  {/* 2. MAIN CONTENT WRAPPER */}
  <div className="relative flex flex-col flex-grow">
{/* Link and Title */}
<Link 
 to={`/projects/${project.id}`} 
    className="block"
 >
 <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 mb-2 line-clamp-1">
{titleIcon} {project.name}
 </h2>
</Link>     
{/* Description */}
  <p className="mt-1 text-gray-600 line-clamp-3 text-sm flex-grow mb-4">
 {project.description}
</p>
 {/* Join Button */}
 <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end items-center"> 
{/* CONDITIONAL JOIN BUTTON (Green) - Only show for In Progress projects */}
 {canJoin && (
  <button
 onClick={() => handleJoinProject(project.id)}
 className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg 
 hover:bg-green-600 transition duration-200 shadow-md flex items-center"
>
 <span className="mr-1 text-lg">⭐</span> Join
 </button>
  )}
  </div>
 {/* 3. CONDITIONAL OVERLAY - Covers content for completed projects */}
  {isCompleted && (
  <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex flex-col items-center justify-center p-4 z-10">
  <div className="text-6xl text-green-500 mb-2">
    🏆
  </div>
<p className="mt-2 text-xl font-bold text-green-700">PROJECT COMPLETE!</p>
<p className="text-center text-sm text-gray-600">This project is finished and cannot be joined.</p>
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
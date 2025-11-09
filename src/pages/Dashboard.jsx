import React, { useState, useEffect } from "react";
// useLocation to read navigation state from ProjectsPage
import { useLocation } from "react-router-dom"; 
import { useProjects } from "../context/ProjectContext";
import { FaTrash, FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const { projects, deleteProject, updateProject } = useProjects();
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editProgress, setEditProgress] = useState(0);
  // NEW STATE: For handling validation errors in the progress field
  const [progressError, setProgressError] = useState(null); 
  // State for success message from joining a project
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(null);

  //useEffect to handle incoming success state
  useEffect(() => {
    if (location.state && location.state.joinSuccess) {
  // Use the message passed from ProjectsPage
 setSuccessMessage(location.state.message);
 // Clear the message after a few seconds
const timer = setTimeout(() => {
  setSuccessMessage(null);
  // Clear state from the URL history to prevent re-showing on refresh/back/forward
}, 7000); 

// Cleanup function for the timer
return () => clearTimeout(timer);
    }
  }, [location.state]); // Re-run effect when navigation state changes
  
  // Open edit modal
  const handleEdit = (project) => {
    setEditing(project);
    setEditName(project.name);
    setEditDesc(project.description);
    setEditProgress(project.progress);
    setProgressError(null); // Clear any previous error when opening
  };

  // Save changes - UPDATED WITH VALIDATION
  const handleSave = async () => {
    const progressValue = Number(editProgress);

    // *** Validation Check ***
    if (progressValue < 0 || progressValue > 100) {
      setProgressError("Please input value from 0-100 only.");
      return; // Stop the save process
    }

    // Clear error and proceed with save if validation passes
    setProgressError(null);
    await updateProject(editing.id, {
      name: editName,
      description: editDesc,
      progress: progressValue,
    });
    setEditing(null);
  };
  
  // Confirms and executes the deletion
  const handleConfirmDelete = async () => {
    if (deletingId) {
      await deleteProject(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-bold">{successMessage}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                {project.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {project.description}
              </p>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Progress: {project.progress}%
                </span>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      project.progress === 100
                        ? "bg-green-500"
                        : project.progress >= 50
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              {/* Now opens confirmation modal */}
              <button
                onClick={() => setDeletingId(project.id)}
                className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Edit Project
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="p-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Project Name"
              />
              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="p-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Project Description"
              />
              <input
                type="number"
                value={editProgress}
                onChange={(e) => {
                  setEditProgress(e.target.value);
                  // Clear error as user starts typing again
                  setProgressError(null); 
                }}
                className={`p-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 ${progressError ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-600'}`}
                placeholder="Progress %"
                min="0"
                max="100"
              />
              {/* Validation Error Message */}
              {progressError && (
                <p className="text-red-500 text-sm mt-1">{progressError}</p>
              )}
              {/* --- */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => {
                    setEditing(null);
                    setProgressError(null); // Clear error on cancel
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Deletion Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to permanently delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
import React, { createContext, useState, useEffect, useContext } from "react";

// Key for localStorage
const LOCAL_STORAGE_KEY = "localProjectsData";

const ProjectContext = createContext();
export { ProjectContext };

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const API_URL = "https://project-tracker-backend-beta.vercel.app/projects";

  //  Load Projects from LocalStorage or Backend (Runs ONCE)
  useEffect(() => {
    const fetchProjects = async () => {
      // Try to load from localStorage first
      const storedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
        console.log("Projects loaded from localStorage.");
        return; // Stop here if local data is found
      }

      // If no local data, fetch from backend
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProjects(data);
        // Save the initial backend data to localStorage for the first session
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        console.log("Projects fetched from backend and saved to localStorage.");
      } catch (err) {
        console.error(
          "Failed to fetch projects. Backend may be offline or misconfigured:",
          err
        );
      }
    };
    fetchProjects();
  }, []);

  //  Persist Projects to LocalStorage (Runs whenever 'projects' changes)
  useEffect(() => {
    // Only save if the array is populated to prevent wiping real data on initial load
    if (projects.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
      console.log("Projects state updated and saved to localStorage.");
    }
  }, [projects]);

  //  Add project — local only (persistence handled by useEffect)
  const addProject = (project) => {
    const newProject = {
      id: Date.now(),
      // Ensure progress is a number, defaulting to 0, and capping it at 100
      ...project,
      progress: Math.min(100, Number(project.progress) || 0), 
    };
    setProjects((prev) => [...prev, newProject]);
  };

  // Delete project — local only (persistence handled by useEffect)
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Update project — local only (persistence handled by useEffect)
  const updateProject = (id, updatedProject) => {
    // Check if a 'progress' update is included
    if (updatedProject.progress !== undefined) {
        // Enforce the 100% maximum limit for progress
        updatedProject.progress = Math.min(100, Number(updatedProject.progress));
    }
    
    setProjects((prev) =>
      prev.map((p) =>
        String(p.id) === String(id) ? { ...p, ...updatedProject } : p
      )
    );
    return true; // pretend success
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
export default ProjectContext;
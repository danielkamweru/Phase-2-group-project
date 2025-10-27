import React, { createContext, useState, useEffect, useContext } from "react";
// Create the Project Context
const ProjectContext = createContext();
// import { ProjectContext } from './context/ProjectContext';
export { ProjectContext };
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  // Using port 5000 as typical for JSON Server, assuming it's running.
  const API_URL = "https://project-tracker-backend-beta.vercel.app/projects"; 

  // Fetch projects from JSON Server on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        // Check for HTTP errors (e.g., 404, 500)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        // Log a user-friendly error if the JSON server is likely not running
        console.error("Failed to fetch projects. Make sure your JSON server is running on http://localhost:5000:", err);
      }
    };
    fetchProjects();
  }, []);

  // Add a new project
  const addProject = async (project) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      setProjects((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };
  // Delete a project by ID
  const deleteProject = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  // Update a project by ID
  const updateProject = async (id, updatedProject) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      const data = await res.json();
      // Ensure we use the server's response (data) which includes the updated data
      setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ 
        projects, 
        addProject, 
        deleteProject, 
        updateProject 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
// Custom hook for easy context usage (Recommended way to consume)
export const useProjects = () => useContext(ProjectContext); 
// when the custom hook is provided.
export default ProjectContext;
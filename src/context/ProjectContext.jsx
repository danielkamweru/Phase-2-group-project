import React, { createContext, useState, useEffect, useContext } from "react";

const ProjectContext = createContext();
export { ProjectContext };

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const API_URL = "https://project-tracker-backend-beta.vercel.app/projects";

  // Load Projects from Backend (Runs ONCE)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProjects(data);
        console.log("Projects fetched from backend.");
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // Add project to backend and update local state
  const addProject = async (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
      progress: Math.min(100, Number(project.progress) || 0),
    };
    
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      
      if (res.ok) {
        const savedProject = await res.json();
        setProjects((prev) => [...prev, savedProject]);
        console.log("Project added to backend.");
      }
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  // Delete project from backend and update local state
  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        console.log("Project deleted from backend.");
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  // Update project in backend and update local state
  const updateProject = async (id, updatedProject) => {
    if (updatedProject.progress !== undefined) {
      updatedProject.progress = Math.min(100, Number(updatedProject.progress));
    }
    
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (String(p.id) === String(id) ? updated : p))
        );
        console.log("Project updated in backend.");
        return true;
      }
    } catch (err) {
      console.error("Failed to update project:", err);
    }
    return false;
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
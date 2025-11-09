import React, { createContext, useState, useEffect, useContext } from "react";

const LOCAL_STORAGE_KEY = "localProjectsData";

const ProjectContext = createContext();
export { ProjectContext };

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const API_URL = "https://project-tracker-backend-beta.vercel.app/projects";

  const fetchProjects = async () => {
    try {
      // Get backend projects
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const backendProjects = await res.json();
      
      // Get local projects
      const localProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      
      // Merge projects (backend + local, avoiding duplicates)
      const allProjects = [...backendProjects];
      localProjects.forEach(localProject => {
        if (!backendProjects.find(p => String(p.id) === String(localProject.id))) {
          allProjects.push(localProject);
        }
      });
      
      setProjects(allProjects);
      return true;
    } catch (err) {
      // Fallback to localStorage only
      const localProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      setProjects(localProjects);
      console.error("Failed to fetch from backend, using localStorage:", err);
      return false;
    }
  };

  // Initial load and setup polling
  useEffect(() => {
    fetchProjects();
    
    // Poll for updates every 3 seconds
    const interval = setInterval(() => {
      fetchProjects();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  // Add project (try backend, fallback to local)
  const addProject = async (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
      progress: Math.min(100, Number(project.progress) || 0),
    };
    
    // Always add to local state immediately
    setProjects((prev) => [...prev, newProject]);
    
    // Try to sync with backend (but don't fail if it doesn't work)
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      
      if (res.ok) {
        console.log("Project synced to backend.");
        // Refresh immediately to get latest data
        setTimeout(() => fetchProjects(), 500);
      } else {
        console.log("Backend sync failed, project saved locally.");
      }
    } catch (err) {
      console.log("Backend unavailable, project saved locally:", err.message);
    }
  };

  // Delete project (try backend, fallback to local)
  const deleteProject = async (id) => {
    // Always delete from local state immediately
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
    
    // Try to sync with backend
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        console.log("Project deleted from backend.");
        // Refresh immediately to get latest data
        setTimeout(() => fetchProjects(), 500);
      } else {
        console.log("Backend delete failed, project deleted locally.");
      }
    } catch (err) {
      console.log("Backend unavailable, project deleted locally:", err.message);
    }
  };

  // Update project (try backend, fallback to local)
  const updateProject = async (id, updatedProject) => {
    if (updatedProject.progress !== undefined) {
      updatedProject.progress = Math.min(100, Number(updatedProject.progress));
    }
    
    // Always update local state immediately
    setProjects((prev) =>
      prev.map((p) => 
        String(p.id) === String(id) ? { ...p, ...updatedProject } : p
      )
    );
    
    // Try to sync with backend
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      
      if (res.ok) {
        console.log("Project updated in backend.");
        // Refresh immediately to get latest data
        setTimeout(() => fetchProjects(), 500);
      } else {
        console.log("Backend update failed, project updated locally.");
      }
    } catch (err) {
      console.log("Backend unavailable, project updated locally:", err.message);
    }
    
    return true;
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
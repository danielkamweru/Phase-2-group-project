import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";

const NewProject = () => {
  const { addProject } = useProjects(); // Access context
  const [form, setForm] = useState({ name: "", description: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return; // Simple validation 
    
    setIsLoading(true);
    try {
      await addProject({
        ...form,
      });
      setForm({ name: "", description: "" }); // Reset form
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to add project:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const SuccessMessage = () => (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl bg-green-500 text-white flex items-center space-x-2 transition-opacity duration-300">
        <span className="text-xl">✨</span>
        <p className="font-bold">
            YOU HAVE SUCCESSFULLY CREATED A NEW PROJECT!
            <p className="font-medium">It is now visible in the Dashboard page and will persist on refresh.</p>
        </p>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg relative" 
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Project</h2>

      {/* Success Prompt */}
      {showSuccess && <SuccessMessage />}

      {/* Project Name */}
      <input
        type="text"
        placeholder="Project Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Project Description */}
      <textarea
        placeholder="Project Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors disabled:opacity-50"
        disabled={!form.name.trim() || isLoading}
      >
        {isLoading ? "Creating Project..." : "Create Project"}
      </button>
    </form>
  );
};

export default NewProject;
import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";

const NewProject = () => {
  const { addProject } = useProjects(); // Access context
  const [form, setForm] = useState({ name: "", description: "" });
  // New state to manage success message visibility
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return; // Simple validation

    // Add project to context with default values
    addProject({
      ...form,
      id: Date.now(), // Unique ID
      progress: 0,
      tasks: [],
    });
    setForm({ name: "", description: "" }); // Reset form
    // Show success message
    setShowSuccess(true);
    // Hide the success message after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg relative" // Added 'relative' for absolute positioning of the message
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Project</h2>

      {/* Success Prompt */}
      {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl bg-green-500 text-white flex items-center space-x-2 animate-bounce-in">
          {/* Colorful Star Icon (using an emoji) */}
          <span className="text-xl">✨</span>
          <p className="font-bold">
             YOU HAVE SUCCESSFULLY CREATED A NEW PROJECT THAT IS NOW VISIBLE IN THE DASHBOARD PAGE!
          <p className="font-medium"></p>
          </p>
        </div>
      )}

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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors"
        disabled={!form.name.trim()} // Optionally disable if name is empty
      >
        Create Project
      </button>
    </form>
  );
};

export default NewProject;
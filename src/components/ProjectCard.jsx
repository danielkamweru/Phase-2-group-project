import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:scale-105 transition-transform">
    <h2 className="text-xl font-semibold">{project.name}</h2>
    <p className="text-gray-500">{project.description}</p>
    <Link
      to={`/projects/${project.id}`}
      className="mt-3 inline-block text-blue-600 hover:text-blue-400"
    >
      View Details →
    </Link>
  </div>
);

export default ProjectCard;


import React from "react";

const ProgressBar = ({ progress = 0 }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
    <div
      className="bg-blue-600 h-3 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;

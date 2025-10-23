
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 
// Import both providers
import { ProjectProvider } from "./context/ProjectContext"; 
import { AuthProvider } from "./context/AuthContext"; 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 1. Use AuthProvider on the outside (Login state is needed everywhere).
      2. Use ProjectProvider inside (It relies on Auth/User if you integrate them later).
    */}
    <AuthProvider> 
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
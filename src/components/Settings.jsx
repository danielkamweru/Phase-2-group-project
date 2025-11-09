import React, { useState, useEffect } from "react";
// Keys for localStorage
const THEME_KEY = "user-theme-setting";
const FONT_SIZE_KEY = "user-font-size-setting";
// Helper function to get initial theme from localStorage or fall back to 'light'
const getInitialTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light"; // Default remains 'light' if nothing is saved
};
// Helper function to get initial font size from localStorage or fall back to 1.0
const getInitialFontSize = () => {
  const savedSize = localStorage.getItem(FONT_SIZE_KEY);
  return savedSize ? parseFloat(savedSize) : 1.0; // Default remains 1.0 if nothing is saved
};
const Settings = () => {
  // Initialize state from localStorage
  const [theme, setTheme] = useState(getInitialTheme);
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(getInitialFontSize);

  // --- useEffect for Theme Persistence and Application ---
  useEffect(() => {
    // 1. Apply theme class to the body
    document.body.className = theme;
    // 2. Save the current theme to localStorage
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // --- useEffect for Font Size Persistence and Application ---
  useEffect(() => {
    // 1. Apply font size to the <html> element
    document.documentElement.style.fontSize = `${fontSize}rem`;
    // 2. Save the current font size to localStorage
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
  }, [fontSize]);

  // Handler to safely increase font size
  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + 0.1, 1.5)); // Max size of 1.5rem
  };
  // Handler to safely decrease font size
  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 0.1, 0.8)); // Min size of 0.8rem
  };
  // Handler to reset font size
  const resetFontSize = () => {
    setFontSize(1);
  };
  
  // Removed the "default" keyword from the export.
  return (
    <div className="fixed top-6 left-6 z-50">
      {/* Gear Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        title="Theme Settings"
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      {open && (
        <div className="absolute top-14 left-0 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl w-64 transition-all">
          <h3 className="text-lg font-semibold mb-3 text-center text-gray-800 dark:text-gray-100">
            Settings
          </h3>

          {/* Theme Controls */}
          <section className="mb-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
              Theme
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  theme === "light"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setTheme("colorful")}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  theme === "colorful"
                    ? "bg-gradient-to-r from-pink-400 via-cyan-300 to-yellow-300 text-gray-800"
                    : "bg-gradient-to-r from-pink-200 via-cyan-100 to-yellow-100 text-gray-700 hover:scale-105 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                🎨 Colorful
              </button>
            </div>
          </section>

          <hr className="my-3 border-gray-200 dark:border-gray-700" />

          {/* Font Size Controls */}
          <section>
            <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
              Font Size
            </h4>
            <div className="flex items-center justify-between gap-2">
              {/* Decrease Button */}
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 0.8} // Disable if at minimum
                className="flex-1 px-3 py-2 rounded-lg border text-lg font-bold bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                A-
              </button>

              {/* Reset Button */}
              <button
                onClick={resetFontSize}
                className="px-3 py-2 rounded-lg border text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                title="Reset to Default Size"
              >
                Default
              </button>

              {/* Increase Button */}
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 1.5} // Disable if at maximum
                className="flex-1 px-3 py-2 rounded-lg border text-xl font-bold bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                A+
              </button>
            </div>
          </section>
          
          <hr className="my-3 border-gray-200 dark:border-gray-700" />

          {/* Status Display */}
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
            Theme: <span className="font-semibold capitalize text-blue-500">{theme}</span>
            <br />
            Size: <span className="font-semibold text-blue-500">{Math.round(fontSize * 100)}%</span>
          </p>
        </div>
      )}
    </div>
  );
};
export default Settings;
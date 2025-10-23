import { useState, useEffect } from "react";
// Save and load data from sessionStorage instead of localStorage
 function useLocalStorage(key, initialValue) { // Renaming this hook is optional but recommended
  // Get initial value from sessionStorage or use the provided initialValue
  const [value, setValue] = useState(() => {
    try {
        const stored = sessionStorage.getItem(key); // CHANGE 1: Use sessionStorage
        // Handle malformed JSON safely
        return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
        // Updated log message for clarity
        console.error("Error reading sessionStorage key “" + key + "”: ", error);
        return initialValue;
    }
  })
  // Effect to sync state changes to sessionStorage
  useEffect(() => {
    try {
        // Save the current state value to sessionStorage whenever it changes
        sessionStorage.setItem(key, JSON.stringify(value)); // CHANGE 2: Use sessionStorage
    } catch (error) {
        // Updated log message for clarity
        console.error("Error writing to sessionStorage key “" + key + "”: ", error);
    }
  }, [key, value]);
  // Clears the value from sessionStorage and resets the state
  const clearStorage = () => {
    try {
        // 1. Remove the item from browser storage
        sessionStorage.removeItem(key); // CHANGE 3: Use sessionStorage
        // 2. Reset the state value back to the initial value
        setValue(initialValue);
        console.log(`Key "${key}" cleared from sessionStorage.`);
    } catch (error) {
        // Updated log message for clarity
        console.error("Error clearing sessionStorage key “" + key + "”: ", error);
    }
  }
  // Return the value, the standard setter, AND the new clear function
  return [value, setValue, clearStorage];
}

export default useLocalStorage
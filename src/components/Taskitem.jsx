
import React from 'react';
// This component receives a single task object and handler functions
const TaskItem = ({ task, onDelete, onToggle }) => {
return (
  <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-200   ${task.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-gray-200 hover:shadow-md'}`}
  >
 <div className="flex items-center flex-grow" onClick={() => onToggle(task)}>
  <input
type="checkbox"
  checked={task.completed}  onChange={() => onToggle(task)} // Toggles the task status
className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
/>
<span 
 className={`ml-3 text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'} cursor-pointer`}
>
{task.name}
 </span>
 </div>
{/* Delete Button */}
<button
 onClick={() => onDelete(task.id)} // Calls the deletion handler
 className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
aria-label={`Delete task ${task.name}`}
>
{/* Simple close/X icon - replace with an icon component if using a library */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
 </div>
    );
};

export default TaskItem;
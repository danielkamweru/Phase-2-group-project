import React, { useState } from "react";
//  Icons
const icons = {
  decompose: '🧩',
  track: '📈',
  methodology: '⚖️',
  expand: '⬇️',
  collapse: '⬆️'
};
const About = () => {
  const [expandedBlog, setExpandedBlog] = useState(null); 
const toggleExpand = (blogId) => {
   setExpandedBlog(expandedBlog === blogId ? null : blogId);
  };
const BlogCard = ({ id, icon, title, shortDescription, fullContent, customClass }) => (
   // Blog card background is maintained as bg-red-600/dark:bg-teal-950
<div className={`p-6 rounded-xl shadow-md border bg-red-600 dark:bg-teal-950 ${customClass} hover:shadow-lg transition duration-300`}>
<div className="flex justify-between items-start cursor-pointer" onClick={() => toggleExpand(id)}>
 <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
  <span className="text-2xl mr-3">{icon}</span>
  {title}
  </h3>
 <button
 className="text-orange-600 dark:text-gray-300 hover:scale-110 transition-transform text-lg"
 title={expandedBlog === id ? "Collapse" : "Learn More"}
 >
 {expandedBlog === id ? icons.collapse : icons.expand}
 </button>
  </div>
 <p className="mt-2 text-orange-600 dark:text-gray-400 text-sm">  {shortDescription}
      </p>
 {expandedBlog === id && (
<div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
 <p className="text-orange-700 dark:text-gray-300 text-base leading-relaxed">
   {fullContent}
   </p>
 </div>
      )}
    </div>
  );
return (
  // Main container with new violet background and increased size
<div className="max-w-6xl mx-auto p-10 bg-violet-100 dark:bg-gray-800 rounded-lg shadow-2xl text-base">
{/* Increased size of the 'About TaskFlow' heading */}
<h1 className="text-6xl font-extrabold mb-6 text-violet-700 dark:text-violet-400 text-center">
  About TaskFlow
 </h1>
 <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 text-center">
TaskFlow is your modern solution for **efficient project management**. We provide clear visuals,
 intuitive progress tracking, and a simple interface, all powered by React and Tailwind CSS.
  Manage your tasks, track your team's velocity, and achieve your goals with ease.  </p>
<hr className="my-8 border-gray-300 dark:border-gray-700" />
<h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-white text-center"> Learn More: Essential Project Management Blogs
  </h2>
   <div className="space-y-6">
  <BlogCard
  id="blog1"
  icon={icons.decompose}
 title="The Art of Task Decomposition (Breakdown)"
 shortDescription="Learn how to break large, overwhelming projects into small, manageable tasks that you can **edit, delete, and save** quickly. Click to learn more!"
fullContent="Task decomposition, also known as Work Breakdown Structure (WBS), is essential for clarity. By breaking a project into tasks that take no more than 1-2 days, you ensure tasks are always actionable. This process significantly improves progress tracking accuracy and allows for rapid adjustments via the edit and delete features in TaskFlow."
 customClass="border-blue-400 dark:border-blue-700 shadow-blue-100 dark:shadow-blue-900" />
<BlogCard
id="blog2" icon={icons.track}
title="Mastering Progress Tracking: Tips for Daily Updates"
shortDescription="Discover best practices for using tools like TaskFlow to accurately **increase progress** indicators. Understand the difference between estimated and actual progress percentages."
fullContent="Accurate progress tracking isn't just about moving a slider; it's about honest reporting. Use TaskFlow's features to commit to daily updates. Focus on reporting 'percent complete' based on *work done*, not *time elapsed*. This practice helps flag bottlenecks early and improves future project estimation."
customClass="border-green-400 dark:border-green-700 shadow-green-100 dark:shadow-green-900" />
<BlogCard
id="blog3"
icon={icons.methodology}
title="Agile vs. Waterfall: Choosing the Right Flow for Your Project"
 shortDescription="A deep dive into project methodologies. Find out which approach best suits your team's needs and how TaskFlow supports both iterative and sequential project structures."
fullContent="The Waterfall approach is sequential and works best for projects with stable requirements (like construction). Agile is iterative and thrives on frequent feedback (like software development). TaskFlow is flexible, allowing you to manage sprints (Agile) or milestones (Waterfall) effectively within the same interface."
  customClass="border-purple-400 dark:border-purple-700 shadow-purple-100 dark:shadow-purple-900"
        />
      </div>
    </div>
  );
};
export default About;
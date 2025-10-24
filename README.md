# 📊 Project Tracker  

> A sleek, interactive, and modern **React-based project management tracker** built with **Tailwind CSS**, **React Router**, and **JSON Server**.  
> Easily create, track, and manage your projects — from planning to progress completion — in a responsive and theme-customizable UI.  

---

## 🧭 Table of Contents  
- [🚀 Features](#-features)  
- [🛠️ Tech Stack](#️-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [⚙️ Installation & Setup](#️-installation--setup)  
- [🌐 Running the App](#-running-the-app)  
- [🧪 Testing](#-testing)  
- [🎨 Theming](#-theming)  
- [📁 JSON Server (Backend)](#-json-server-backend)  
- [👥 Collaborators](#-collaborators)  
- [📜 License](#-license)  
- [💡 Future Enhancements](#-future-enhancements)  

---

## 🚀 Features  

✅ **Project Management** – Add, view, and track your projects easily.  
✅ **Dynamic Progress Bars** – Visualize project completion.  
✅ **Task Management** – Organize and monitor tasks within projects.  
✅ **Modern Theming** – Switch between `Light 🌞`, `Dark 🌙`, and `Colorful 🌈` modes.  
✅ **Persistent Data** – Data saved locally using `useLocalStorage` or via a mock API (`db.json`).  
✅ **Responsive UI** – Tailwind CSS ensures a clean layout on all screen sizes.  
✅ **TDD Ready** – Includes Jest and React Testing Library for test-driven development.  

---

## 🛠️ Tech Stack  

| Category | Technologies Used |
|-----------|-------------------|
| 🧠 **Frontend** | React, React Router |
| 💅 **Styling** | Tailwind CSS |
| 💾 **State Management** | React Context API |
| 🧰 **Testing** | Jest, React Testing Library |
| 🔗 **Mock Backend** | JSON Server |
| ⚙️ **Build Tool** | Create React App |

---

## 📂 Project Structure  

project-tracker/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── ProjectCard.jsx
│ │ ├── ProgressBar.jsx
│ │ ├── TaskItem.jsx
│ │ ├── TaskList.jsx
│ │ └── Settings.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── ProjectPage.jsx
│ │ ├── NewProject.jsx
│ │ ├── About.jsx
│ │ └── HomePage.jsx
│ ├── context/
│ │ └── ProjectContext.jsx
│ ├── hooks/
│ │ └── useLocalStorage.js
│ ├── App.jsx
│ ├── index.js
│ └── index.css
├── db.json
├── package.json
├── tailwind.config.js
└── README.md


---

## ⚙️ Installation & Setup  

### 🧩 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/en/) (v16+)
- npm or yarn

### 🪄 Steps  


# 1️⃣ Clone the repository
git clone https://github.com/your-username/project-tracker.git

# 2️⃣ Move into the project directory
cd project-tracker

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the frontend
npm start
# 🌐 Running the App
The app runs on port 3000 by default.
To start the mock backend using JSON Server:

bash
Copy code
npm run server
By default, JSON Server runs on port 5000.
Access the mock data at 👉 http://localhost:5000/projects

To run all test suites:

bash
Copy code
npm test
Test Files:
App.test.js – Verifies main app rendering and routing.

ProjectPage.test.js – Tests project fetching and rendering.

useLocalStorage.test.js – Ensures custom hook data persistence.

## 🎨 Theming
You can toggle between:

🌞 Light Theme

🌙 Dark Theme

🌈 Colorful Theme

Theme settings are managed in Settings.jsx and applied globally via index.css using CSS variables.

 ## 📁 JSON Server (Backend)
The db.json acts as your local mock database. Example structure:

json
Copy code
{
  "projects": [
    {
      "id": 1,
      "name": "React Dashboard UI",
      "description": "A beautiful and modern dashboard built with React.",
      "progress": 80,
      "tasks": ["Setup project", "Add components", "Integrate API"]
    },
    {
      "id": 2,
      "name": "Portfolio Website",
      "description": "Personal portfolio with animations and contact form.",
      "progress": 45,
      "tasks": ["Design UI", "Setup hosting", "Add projects"]
    }
  ]
}
To edit or add data manually, just open db.json and modify your entries.

## 👥 Collaborators
👤 Name	💼 Role
Daniel Kamweru	initialsetup/components/db.json
Brian Muigai	pages/secretary
Patrickson Mungai	hooks/api
Beatrice Kibucha	vice secretary/context

🙌 A special thanks to everyone who contributed to making Project Tracker beautiful and functional!

 ## 📜 License
📝 MIT License
© 2025 — Daniel Kamweru, Brian Muigai, Patrickson Mungai, and Beatrice Kibucha.
Feel free to use and modify this project under the open MIT license, but please provide credit to the original authors.

💡 Future Enhancements
✨ Add user authentication (JWT-based login).
📅 Implement calendar-based project timelines.
📊 Integrate real-time analytics for project progress.
☁️ Deploy on Vercel or Netlify with live JSON Server on Render.

🖤 Built with passion using:
React + Tailwind + JSON Server

“Organize your ideas, visualize your progress, and track your success!” 🚀



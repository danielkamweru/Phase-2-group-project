
import { useState } from "react";
// 1. Import necessary hook from React Router for redirection
import { useNavigate } from "react-router-dom"; 
// 2. Import the Auth context hook (assuming this is where 'login' lives)
import { useAuth } from "../context/AuthContext"; 
export default function Login() {
  // FIX: Use the useAuth hook to correctly access the 'login' function
  const { login } = useAuth(); 
  // 3. Initialize the navigate hook
  const navigate = useNavigate(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    // if (password !== " ") {
    //   setError("Incorrect password. Hint: it's ''");
    //   setIsLoading(false);
    //   return;
    // }

    // If validation passes:
    setError("");
    // Simulate a brief network delay (0.5 seconds)
    setTimeout(() => {
      login(email); // Call the context login function
      setIsLoading(false);
      // 4. Redirect the user to a protected page (e.g., /dashboard)
      navigate("/dashboard", { replace: true }); 
    }, 500);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 transition-all duration-500">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8 w-[95%] max-w-md border border-slate-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome Back 👋</h1>
          <p className="text-gray-500 dark:text-gray-300">Login to access your projects</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-semibold py-2 rounded-lg shadow-md transition ${
                isLoading
                  ? "bg-cyan-400 cursor-not-allowed text-slate-700"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          🔒 Only use your email and password to access your session.
        </p>
      </div>
    </div>
  );
}
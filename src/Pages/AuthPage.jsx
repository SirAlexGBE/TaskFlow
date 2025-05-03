import {useState, useEffect, useContext} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../Context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (users.some((u) => u.username === formData.username)) {
      toast.error("Username already exists");
      return;
    }
    if (users.some((u) => u.email === formData.email)) {
      toast.error("Email already exists");
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    toast.success("Account created successfully!");
    setTimeout(() => {
      login({username: newUser.username, fullName: newUser.fullName});
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === formData.username);
    if (!user) {
      toast.error("User not found");
      return;
    }
    if (user.password !== formData.password) {
      toast.error("Incorrect password");
      return;
    }

    toast.success("Login successful!");
    login({username: user.username, fullName: user.fullName});
  };

  const formVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.3}},
    exit: {opacity: 0, y: -20, transition: {duration: 0.3}},
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
          {isLogin && (
            <div className="w-full h-40 flex justify-center items-center">
              <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  initial={{pathLength: 0}}
                  animate={{pathLength: 1}}
                  transition={{duration: 5, repeat: Infinity, repeatType: "loop"}}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your username"
                    required
                    autoComplete="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Login
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={toggleAuthMode} className="text-blue-600 hover:underline font-medium">
                    Sign up
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="p-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Choose a username"
                    required
                    autoComplete="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                  />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium">
                  Sign Up
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button onClick={toggleAuthMode} className="text-blue-600 hover:underline font-medium">
                    Login
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

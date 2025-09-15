import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Jobs from "./components/Jobs";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { emailOrPhone, password });
    setIsLoggedIn(true);
    setShowAuth(false);
    setEmailOrPhone("");
    setPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    console.log("Creating account with:", { name, emailOrPhone, password });
    setIsLoggedIn(true);
    setShowAuth(false);
    setEmailOrPhone("");
    setPassword("");
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuth(false);
    setAuthMode("login");
    setShowDashboard(false);
    setUserData(null);
    setUserName("");
  };

  const toggleAuthBox = () => {
    setShowAuth(!showAuth);
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setShowDashboard(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onGetStarted={toggleAuthBox}
        />
        {showDashboard ? (
          <Dashboard userData={userData} userName={userName} /> // Updated: Pass userName prop
        ) : (
          <>
            <Hero onFormSubmit={handleFormSubmit} userName={userName} />
            <Features />
            <Courses />
            <Jobs />
          </>
        )}
        <Footer />
        {showAuth && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full relative">
              <button
                onClick={toggleAuthBox}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                &times;
              </button>
              {authMode === "login" ? (
                <form onSubmit={handleLogin}>
                  <h4 className="text-2xl font-bold mb-4">Login</h4>
                  <p className="text-gray-400 mb-6">
                    Enter your details to log in.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      placeholder="Email or Phone Number"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      type="submit"
                      className="btn-cta text-white font-bold py-3 rounded-lg hover:opacity-90"
                    >
                      Login
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-gray-400">
                      Don't have an account?
                      <button
                        type="button"
                        onClick={() => switchAuthMode("register")}
                        className="text-orange-400 font-semibold ml-2 hover:underline"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <h4 className="text-2xl font-bold mb-4">Create Account</h4>
                  <p className="text-gray-400 mb-6">
                    Enter your details to get started.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email ID"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      type="password"
                      placeholder="Create Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      type="submit"
                      className="btn-cta text-white font-bold py-3 rounded-lg hover:opacity-90"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-gray-400">
                      Already have an account?
                      <button
                        type="button"
                        onClick={() => switchAuthMode("login")}
                        className="text-orange-400 font-semibold ml-2 hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

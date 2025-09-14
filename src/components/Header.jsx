import React from "react";

export default function Header({ isLoggedIn, onLogout, onGetStarted }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-4">
      <a className="flex items-center space-x-3" href="#" aria-label="Home">
        <div className="brand-logo text-white">CS</div>
        <div>
          <div className="logo-text font-black leading-none">Career Sarthi</div>
          <div className="text-gray-400 text-xs mt-1">
            Turning Dreams Into Game Plans
          </div>
        </div>
      </a>

      <nav
        className="mt-4 sm:mt-0 space-x-4 sm:space-x-6"
        aria-label="Main navigation"
      >
        <a className="hover:text-orange-400 transition-colors" href="#features">
          Features
        </a>
        <a className="hover:text-orange-400 transition-colors" href="#courses">
          Courses
        </a>
        <a className="hover:text-orange-400 transition-colors" href="#jobs">
          Jobs
        </a>

        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="btn-cta text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onGetStarted}
            className="btn-cta text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        )}
      </nav>
    </header>
  );
}

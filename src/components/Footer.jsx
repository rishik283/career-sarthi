import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-12 border-t border-gray-700 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
        <div>&copy; 2025 MS Advisor. All rights reserved.</div>
        <div className="mt-4 sm:mt-0 space-x-4">
          <a href="#" className="hover:text-orange-400 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-orange-400 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-orange-400 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

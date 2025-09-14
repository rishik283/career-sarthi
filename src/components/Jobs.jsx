import React from "react";

export default function Jobs() {
  return (
    <section id="jobs" className="py-12">
      <h3 className="text-xl font-bold">Latest Internships & Jobs</h3>
      <ul className="space-y-3 mt-4">
        <li className="bg-gray-800 text-white rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          Frontend Intern • StartupX •{" "}
          <span className="text-gray-400">Remote</span>
        </li>
        <li className="bg-gray-800 text-white rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          Data Science Intern • FinTechCo •{" "}
          <span className="text-gray-400">On-site</span>
        </li>
      </ul>
    </section>
  );
}

import React from "react";

export default function Features() {
  return (
    <section id="features" className="py-12">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-bold">Recommended for you</h3>
        <div className="text-gray-400 text-sm">Based on recent activity</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform">
          <h5 className="font-semibold">Data Analyst Path</h5>
          <div className="text-xs bg-gray-700 text-gray-200 rounded-full px-2 py-1 inline-block mt-2">
            Beginner
          </div>
          <p className="text-gray-400 text-sm mt-2">
            4-month plan • Projects: 3 • Internships: 2
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform">
          <h5 className="font-semibold">Frontend Developer</h5>
          <div className="text-xs bg-gray-700 text-gray-200 rounded-full px-2 py-1 inline-block mt-2">
            Web
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Bootcamp-style syllabus, portfolio focus
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform">
          <h5 className="font-semibold">Masters Scholarships</h5>
          <div className="text-xs bg-gray-700 text-gray-200 rounded-full px-2 py-1 inline-block mt-2">
            Funding
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Scholarship matches and application deadlines
          </p>
        </div>
      </div>
    </section>
  );
}

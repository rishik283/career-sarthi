import React from "react";
export default function Courses() {
  return (
    <section id="courses" className="py-12">
      <h3 className="text-xl font-bold">Curated Courses</h3>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-1 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform">
          <h4 className="font-bold">Python for Data Analysis</h4>
          <div className="text-gray-400 text-sm mt-1">
            10 weeks · Project-based · Certificate
          </div>
        </div>

        <div className="w-full md:w-60 flex-none bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform">
          <h4 className="font-bold">Interview Prep Pack</h4>
          <div className="text-gray-400 text-sm mt-1">
            Mock interviews • Score & feedback
          </div>
        </div>
      </div>
    </section>
  );
}

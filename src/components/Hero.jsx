import React from "react";

export default function Hero() {
  return (
    <main className="grid lg:grid-cols-3 gap-8 py-12">
      <div className="col-span-2">
        <div className="text-orange-400 text-xs font-bold uppercase tracking-wider">
          Personalized • AI-backed • Free trial
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mt-2">
          One-Stop <br />
          Personalized Career & Education Advisor
        </h1>

        <p className="lead text-gray-300 mt-4">
          Discover career paths, tailored course plans, resume feedback,
          interview practice and internship/job matches — all in one place.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center bg-gray-800 rounded-xl p-1 mt-6 shadow-lg"
          role="search"
        >
          <input
            type="search"
            placeholder='Try: "Become a data analyst" or "Internships for CSE"'
            aria-label="Search services"
            className="flex-1 bg-transparent border-none text-white p-3 rounded-lg focus:outline-none placeholder-gray-500"
          />
          <button className="btn-cta text-white font-bold py-3 px-6 rounded-lg mt-2 sm:mt-0 sm:ml-2">
            Explore
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:transform hover:-translate-y-1 transition-transform">
            <h4 className="font-bold">Career Path Builder</h4>
            <p className="text-gray-400 mt-1 text-sm">
              Interactive, step-by-step plans tailored to your goals.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:transform hover:-translate-y-1 transition-transform">
            <h4 className="font-bold">Course & Scholarship Recs</h4>
            <p className="text-gray-400 mt-1 text-sm">
              AI-curated courses & scholarship alerts based on profile.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:transform hover:-translate-y-1 transition-transform">
            <h4 className="font-bold">Internship Match</h4>
            <p className="text-gray-400 mt-1 text-sm">
              Find internships that fit your skills and availability.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:transform hover:-translate-y-1 transition-transform">
            <h4 className="font-bold">Resume + Interview</h4>
            <p className="text-gray-400 mt-1 text-sm">
              Automated feedback and mock interviews with scoring.
            </p>
          </div>
        </div>
      </div>

      <aside className="col-span-1 bg-gray-800 rounded-2xl p-6 h-fit shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full font-bold text-lg">
            AS
          </div>
          <div>
            <div className="font-bold">Hello, Student</div>
            <div className="text-gray-400 text-sm">
              Build your roadmap • 7 steps left
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-400">Profile completeness</div>
          <div
            className="relative w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 mt-6">
          <button className="btn-cta text-white font-bold py-3 px-4 rounded-xl shadow hover:opacity-90 transition-opacity">
            Get Personalized Plan
          </button>
          <button className="bg-transparent border border-gray-700 text-gray-400 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors">
            Take Career Quiz
          </button>
        </div>
      </aside>
    </main>
  );
}

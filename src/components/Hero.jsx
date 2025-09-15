import React, { useState } from "react";

export default function Hero({ onFormSubmit, userName }) {
  // Updated: The full text now appears instantly without a typing effect.
  const fullText = "One-Stop Personalized Career & Education Advisor";

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    higherQualification: "",
    currentCourse: "",
    grades: "",
    hobbies: "",
    currentSkills: "",
    interestedSkills: "",
    achievements: null,
    experienceMonths: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "achievements") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    setShowForm(false);
  };

  return (
    <main className="grid lg:grid-cols-3 gap-8 py-12">
      <div className="col-span-2">
        <div className="text-orange-400 text-xs font-bold uppercase tracking-wider">
          Personalized • AI-backed • Free trial
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mt-2">
          {fullText}
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
            <div className="font-bold">
              Hello, {userName ? userName : "Student"}
            </div>
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
          <button
            onClick={() => setShowForm(true)}
            className="btn-cta text-white font-bold py-3 px-4 rounded-xl shadow hover:opacity-90 transition-opacity"
          >
            Get Personalized Plan
          </button>
          <button className="bg-transparent border border-gray-700 text-gray-400 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors">
            Take Career Quiz
          </button>
        </div>
      </aside>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h4 className="text-2xl font-bold mb-6">
              Create Your Personalized Plan
            </h4>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold mb-2">Education</h5>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    name="higherQualification"
                    placeholder="Higher Qualification"
                    value={formData.higherQualification}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="currentCourse"
                    placeholder="Current Course"
                    value={formData.currentCourse}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="grades"
                    placeholder="Grades (e.g., GPA, Percentage)"
                    value={formData.grades}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">
                  Hobbies/Interests
                </h5>
                <input
                  type="text"
                  name="hobbies"
                  placeholder="Enter your hobbies (e.g., reading, coding, sports)"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                  required
                />
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">Skills</h5>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    name="currentSkills"
                    placeholder="Current Skills"
                    value={formData.currentSkills}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <input
                    type="text"
                    name="interestedSkills"
                    placeholder="Skills you are interested in"
                    value={formData.interestedSkills}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">Achievements</h5>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Upload Certificates (PDF only)
                </label>
                <input
                  type="file"
                  name="achievements"
                  accept="application/pdf"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">Experience</h5>
                <input
                  type="number"
                  name="experienceMonths"
                  placeholder="Internship/Job duration (in months)"
                  value={formData.experienceMonths}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-cta text-white font-bold py-3 px-6 rounded-lg hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

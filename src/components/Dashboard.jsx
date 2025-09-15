import React, { useState, useEffect } from "react";

export default function Dashboard({ userData, userName }) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const fullGreeting = `Hey, ${userName}! Your Personalized Dashboard is here.`;

  useEffect(() => {
    if (charIndex < fullGreeting.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + fullGreeting[charIndex]);
        setCharIndex((prevIndex) => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullGreeting]);

  if (!userData) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-bold">
          No data to display. Please fill out the form.
        </h3>
      </div>
    );
  }

  const formatList = (items) => {
    return items
      .split(",")
      .map((item) => item.trim())
      .join(", ");
  };

  return (
    <div className="dashboard-container py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">{displayText}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 dashboard-grid">
        {/* Education Section */}
        <div className="dashboard-card bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-xl font-bold mb-4">Education</h4>
          <p className="text-gray-400">
            <strong>Higher Qualification:</strong>{" "}
            {userData.higherQualification}
          </p>
          <p className="text-gray-400">
            <strong>Current Course:</strong> {userData.currentCourse}
          </p>
          <p className="text-gray-400">
            <strong>Grades:</strong> {userData.grades}
          </p>
        </div>
        {/* Hobbies/Interests Section */}
        <div className="dashboard-card bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-xl font-bold mb-4">Hobbies/Interests</h4>
          <p className="text-gray-400">{formatList(userData.hobbies)}</p>
        </div>
        {/* Skills Section */}
        <div className="dashboard-card bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-xl font-bold mb-4">Skills</h4>
          <p className="text-gray-400">
            <strong>Current Skills:</strong>{" "}
            {formatList(userData.currentSkills)}
          </p>
          <p className="text-gray-400">
            <strong>Interested Skills:</strong>{" "}
            {formatList(userData.interestedSkills)}
          </p>
        </div>
        {/* Experience Section */}
        <div className="dashboard-card bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-xl font-bold mb-4">Experience</h4>
          <p className="text-gray-400">
            <strong>Internship/Job Duration:</strong>{" "}
            {userData.experienceMonths || "N/A"} months
          </p>
        </div>
        {/* Achievements Section (Optional) */}
        {userData.achievements && (
          <div className="dashboard-card bg-gray-800 p-6 rounded-xl border border-gray-700 col-span-1 md:col-span-2">
            <h4 className="text-xl font-bold mb-4">Achievements</h4>
            <p className="text-gray-400">
              A link to the uploaded file would appear here in a real
              application.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

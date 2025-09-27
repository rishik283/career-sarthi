// src/components/Dashboard.jsx
import React from "react";
import { jsPDF } from "jspdf";

function SmallCard({ title, children }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:-translate-y-1 transition-transform dashboard-card">
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-300 text-sm mt-2">{children}</div>
    </div>
  );
}

export default function Dashboard({ userData, userName }) {
  if (!userData) {
    return (
      <div className="py-12">
        <div className="text-center text-gray-400">
          No data yet. Create a personalized plan to see your dashboard.
        </div>
      </div>
    );
  }

  const {
    higherQualification,
    currentCourse,
    grades,
    hobbies = [],
    currentSkills = [],
    interestedSkills = [],
    strengths = [],
    weaknesses = [],
    environment,
    longTermGoals,
    jobSatisfaction,
    experienceMonths,
    achievements,
  } = userData;

  const makeList = (arr) =>
    arr && arr.length ? (
      <ul className="list-disc list-inside space-y-1">
        {arr.map((it, i) => (
          <li key={i} className="text-sm text-gray-200">
            {it}
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-gray-400 text-sm italic">Not provided</div>
    );

  // 📄 Generate PDF function
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Career Dashboard Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userName || "Student"}`, 20, 35);
    doc.text(`Qualification: ${higherQualification || "—"}`, 20, 45);
    doc.text(`Current Course: ${currentCourse || "—"}`, 20, 55);
    doc.text(`Grades: ${grades || "—"}`, 20, 65);
    doc.text(`Experience: ${experienceMonths || "—"} months`, 20, 75);
    doc.text(`Preferred Environment: ${environment || "—"}`, 20, 85);
    doc.text(`Job Satisfaction: ${jobSatisfaction || "—"}`, 20, 95);

    doc.text("Long-term Goals:", 20, 110);
    doc.text(longTermGoals || "Not provided", 30, 120, { maxWidth: 160 });

    doc.text("Hobbies:", 20, 140);
    doc.text(hobbies.join(", ") || "Not provided", 30, 150, { maxWidth: 160 });

    doc.text("Strengths:", 20, 165);
    doc.text(strengths.join(", ") || "Not provided", 30, 175, {
      maxWidth: 160,
    });

    doc.text("Weaknesses:", 20, 190);
    doc.text(weaknesses.join(", ") || "Not provided", 30, 200, {
      maxWidth: 160,
    });

    doc.text("Current Skills:", 20, 215);
    doc.text(currentSkills.join(", ") || "Not provided", 30, 225, {
      maxWidth: 160,
    });

    doc.text("Interested Skills:", 20, 240);
    doc.text(interestedSkills.join(", ") || "Not provided", 30, 250, {
      maxWidth: 160,
    });

    doc.save("career-report.pdf");
  };

  return (
    <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dashboard-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-sm">Welcome back</div>
          <div className="text-2xl font-bold profile-name">
            {userName || "Student"}
          </div>
        </div>
        <div className="text-gray-400 text-sm">Personalized Snapshot</div>
      </div>

      {/* Top row 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 dashboard-grid">
        <SmallCard title="Education">
          <div className="text-sm text-gray-200">
            {higherQualification || "—"}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            {currentCourse || "—"}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Grades: {grades || "—"}
          </div>
        </SmallCard>

        <SmallCard title="Experience">
          <div className="text-sm text-gray-200">
            {experienceMonths
              ? `${experienceMonths} months`
              : "No experience provided"}
          </div>
        </SmallCard>

        <SmallCard title="Preferred Environment">
          <div className="text-sm text-gray-200">{environment || "—"}</div>
          <div className="text-gray-400 text-sm mt-1">
            Job satisfaction: {jobSatisfaction || "—"}
          </div>
        </SmallCard>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <SmallCard title="Long-term Goals">
            <div className="text-sm text-gray-200">
              {longTermGoals || (
                <span className="text-gray-400 italic">Not provided</span>
              )}
            </div>
          </SmallCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <SmallCard title="Hobbies / Interests">
              {makeList(hobbies)}
            </SmallCard>
            <SmallCard title="Strengths">{makeList(strengths)}</SmallCard>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <SmallCard title="Current Skills">
              {makeList(currentSkills)}
            </SmallCard>
            <SmallCard title="Skills you're interested in">
              {makeList(interestedSkills)}
            </SmallCard>
          </div>
        </div>

        <div>
          <SmallCard title="Weaknesses">{makeList(weaknesses)}</SmallCard>

          <SmallCard title="Achievements" className="mt-4">
            {achievements ? (
              <div className="text-sm">
                <div className="text-gray-200">
                  Uploaded: {achievements.name || "certificate.pdf"}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  You can download or view this file from the user profile
                  (implement file storage to persist).
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm italic">
                No certificates uploaded
              </div>
            )}
          </SmallCard>

          {/* 📥 Download Report Button */}
          <div className="mt-4">
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl btn-cta font-bold"
            >
              📥 Download Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

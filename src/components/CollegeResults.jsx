// src/components/CollegeResults.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CollegeResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const colleges = location.state?.colleges || [];
  const quiz = location.state?.quiz || {};

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Eligible Colleges</h2>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-gray-700"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Quick summary of submitted info */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="text-sm text-gray-300 mb-1">
          Showing matches for: <strong>{quiz.fullName || "Student"}</strong>
        </div>
        <div className="text-xs text-gray-400">
          Course: {quiz.desiredCourse || "—"} · 12th: {quiz.class12Marks || "—"}
          % · Exam: {quiz.recentExam || "—"}{" "}
          {quiz.examScore ? `(${quiz.examScore})` : ""}
        </div>
      </div>

      {colleges.length === 0 ? (
        <div className="text-gray-400">
          No colleges matched your criteria. Try updating details.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-3">College</th>
                <th className="p-3">Course</th>
                <th className="p-3">Eligibility</th>
                <th className="p-3">Fee (per year)</th>
                <th className="p-3">More</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-700 hover:bg-gray-900"
                >
                  <td className="p-3 align-top">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-400">
                      {c.location || ""}
                    </div>
                  </td>
                  <td className="p-3 align-top">{c.course}</td>
                  <td className="p-3 align-top">
                    {c.eligible ? (
                      <span className="text-green-400">✅ Eligible</span>
                    ) : (
                      <span className="text-red-400">❌ Not eligible</span>
                    )}
                    {c.cutoff && (
                      <div className="text-xs text-gray-400 mt-1">
                        Cutoff: {c.cutoff}
                      </div>
                    )}
                  </td>
                  <td className="p-3 align-top">
                    ₹{c.fee?.toLocaleString?.() ?? c.fee}
                  </td>
                  <td className="p-3 align-top">
                    <a
                      className="text-orange-400 hover:underline"
                      href={c.applyLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apply / Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

// src/components/Roadmap.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const roadmap = location.state?.roadmap || null;
  const query = location.state?.query || "";

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">
          Roadmap for <span className="text-orange-400">"{query}"</span>
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Agar roadmap null hai toh message dikhao */}
      {!roadmap ? (
        <div className="text-gray-400 text-lg">
          ⚠ Backend not connected. Please try again later.
        </div>
      ) : (
        <ol className="relative border-l border-gray-700">
          {roadmap.steps.map((step, i) => (
            <li key={i} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full -left-4 ring-4 ring-gray-900">
                {i + 1}
              </span>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">
                  {step.title || `Step ${i + 1}`}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description || "No description provided."}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}

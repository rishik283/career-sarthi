// src/components/ResumePrep.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumePrep() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("⚠️ Please upload your resume first.");
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const resp = await fetch("/api/resume-feedback", {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) throw new Error("Failed to analyze resume");
      const data = await resp.json();
      setFeedback(data);
    } catch (err) {
      console.error(err);
      alert("⚠️ Unable to analyze resume. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📄 Resume & Job Prep</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4 mb-8"
      >
        <div>
          <label className="block text-sm mb-1">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-cta font-bold py-2 px-4 rounded-lg w-full"
        >
          {loading ? "Analyzing..." : "Get Feedback"}
        </button>
      </form>

      {/* Feedback */}
      {feedback && (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="font-semibold mb-2">✅ Feedback</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            {feedback.suggestions?.length ? (
              feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)
            ) : (
              <li>No suggestions available</li>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}

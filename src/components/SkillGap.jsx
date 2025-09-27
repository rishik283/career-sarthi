// src/components/SkillGap.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SkillGap() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentSkills: "",
    interestedSkills: "",
    targetRole: "",
  });

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(null);

    try {
      const resp = await fetch("/api/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Failed to fetch");

      const data = await resp.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Unable to analyze skills. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Colors for chart
  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📈 Skill Gap Analysis</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4 mb-8"
      >
        <div>
          <label className="block text-sm mb-1">
            Current Skills (comma-separated)
          </label>
          <input
            type="text"
            name="currentSkills"
            value={formData.currentSkills}
            onChange={handleChange}
            placeholder="e.g. Python, HTML, Excel"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Interested Skills (comma-separated)
          </label>
          <input
            type="text"
            name="interestedSkills"
            value={formData.interestedSkills}
            onChange={handleChange}
            placeholder="e.g. Machine Learning, SQL"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Target Role</label>
          <input
            type="text"
            name="targetRole"
            value={formData.targetRole}
            onChange={handleChange}
            placeholder="e.g. Data Analyst"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-cta font-bold py-2 px-4 rounded-lg w-full"
        >
          {loading ? "Analyzing..." : "Analyze Skills"}
        </button>
      </form>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Strong & Weak Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h4 className="font-semibold mb-2">✅ Strong Skills</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.strongSkills?.length ? (
                  analysis.strongSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-green-600/30 text-green-300"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">None</span>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h4 className="font-semibold mb-2">⚠️ Skills to Improve</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.gapSkills?.length ? (
                  analysis.gapSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-yellow-600/30 text-yellow-300"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">None</span>
                )}
              </div>
            </div>
          </div>

          {/* Suggested Path */}
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h4 className="font-semibold mb-2">📚 Recommended Learning Path</h4>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              {analysis.learningPath?.length ? (
                analysis.learningPath.map((step, i) => <li key={i}>{step}</li>)
              ) : (
                <li className="text-gray-400 italic">No recommendations</li>
              )}
            </ul>
          </div>

          {/* Chart */}
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h4 className="font-semibold mb-4">📊 Skills Overview</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    {
                      name: "Strong Skills",
                      value: analysis.strongSkills?.length || 0,
                    },
                    {
                      name: "Gap Skills",
                      value: analysis.gapSkills?.length || 0,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </main>
  );
}

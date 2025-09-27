// src/components/CourseFinder.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseFinder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    desiredCourse: "",
    studyLevel: "",
    budget: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const resp = await fetch("/api/course-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Failed to fetch");
      const data = await resp.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("⚠️ Unable to fetch courses. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🎓 Course & Scholarship Finder</h2>
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
          <label className="block text-sm mb-1">Desired Course</label>
          <input
            type="text"
            name="desiredCourse"
            value={formData.desiredCourse}
            onChange={handleChange}
            placeholder="e.g. Data Science, MBA"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Study Level</label>
          <select
            name="studyLevel"
            value={formData.studyLevel}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          >
            <option value="">Select</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Budget (per year)</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. 5,00,000 INR"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Preferred Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. India, USA, UK"
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-cta font-bold py-2 px-4 rounded-lg w-full"
        >
          {loading ? "Finding..." : "Find Courses"}
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {results.length ? (
            results.map((c, i) => (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <h4 className="font-semibold text-lg text-orange-400">
                  {c.name}
                </h4>
                <div className="text-gray-300 text-sm">
                  {c.university} • {c.country}
                </div>
                <div className="text-gray-400 text-sm">
                  Fee: {c.fee} | Scholarship: {c.scholarship || "—"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No courses found</div>
          )}
        </div>
      )}
    </main>
  );
}

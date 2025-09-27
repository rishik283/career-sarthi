// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { LineChart, BookOpen, Users, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero({ onFormSubmit, userName }) {
  const fullText = "One-Stop Personalized Career & Education Advisor";
  const [typedLeadText, setTypedLeadText] = useState("");
  const [leadTextIndex, setLeadTextIndex] = useState(0);

  useEffect(() => {
    const fullLeadText =
      "Discover career paths, tailored course plans, resume feedback, interview practice and internship/job matches — all in one place.";
    if (leadTextIndex < fullLeadText.length) {
      const t = setTimeout(() => {
        setTypedLeadText((p) => p + fullLeadText.charAt(leadTextIndex));
        setLeadTextIndex((i) => i + 1);
      }, 10);
      return () => clearTimeout(t);
    }
  }, [leadTextIndex]);

  const [showForm, setShowForm] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  // ----------------- NEW: Explore (Roadmap) -----------------
  const [searchQuery, setSearchQuery] = useState("");
  async function handleExplore() {
    if (!searchQuery.trim()) return;
    navigate("/roadmap", { state: { roadmap: null, query: searchQuery } });
  }

  // ----------------- Quiz (Find Eligible Colleges) state -----------------
  const [quiz, setQuiz] = useState({
    fullName: userName || "",
    recentExam: "None",
    examScore: "",
    passFail: "pass",
    desiredCourse: "",
    class12Marks: "",
    class12Stream: "",
    class10Marks: "",
    extraInfo: "",
  });
  const [quizErrors, setQuizErrors] = useState({});
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const handleQuizChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setQuiz((s) => ({ ...s, [name]: value }));
    } else {
      setQuiz((s) => ({ ...s, [name]: value }));
    }
    setQuizErrors((s) => ({ ...s, [name]: undefined }));
  };

  const validateQuiz = () => {
    const e = {};
    if (!quiz.desiredCourse || quiz.desiredCourse.trim().length < 2)
      e.desiredCourse = "Please enter desired course";
    if (quiz.class12Marks === "") e.class12Marks = "Enter 12th marks";
    else if (
      isNaN(Number(quiz.class12Marks)) ||
      Number(quiz.class12Marks) < 0 ||
      Number(quiz.class12Marks) > 100
    )
      e.class12Marks = "Enter valid 12th marks (0-100)";
    if (quiz.examScore && isNaN(Number(quiz.examScore)))
      e.examScore = "Enter numeric exam score";
    return e;
  };

  async function handleQuizSubmit(evt) {
    evt.preventDefault();
    const errors = validateQuiz();
    setQuizErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmittingQuiz(true);
    try {
      const resp = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || "Server error");
      }
      const data = await resp.json();
      navigate("/eligible-colleges", { state: { colleges: data, quiz } });
      setShowQuiz(false);
    } catch (err) {
      console.error("Quiz submit error:", err);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setSubmittingQuiz(false);
    }
  }

  // --------------- Personalized Plan (original long form) ---------------
  const [formData, setFormData] = useState({
    higherQualification: "",
    currentCourse: "",
    grades: "",
    hobbies: [""],
    currentSkills: [""],
    interestedSkills: [""],
    strengths: [""],
    weaknesses: [""],
    environment: "",
    longTermGoals: "",
    jobSatisfaction: "",
    achievements: null,
    experienceMonths: "",
  });

  const updateArrayField = (field, index, value) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };
  const addArrayItem = (field, limit = Infinity) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      if (arr.length >= limit) return prev;
      return { ...prev, [field]: [...arr, ""] };
    });
  };
  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      if (arr.length <= 1) {
        arr[0] = "";
      } else {
        arr.splice(index, 1);
      }
      return { ...prev, [field]: arr };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((p) => ({ ...p, achievements: file }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sanitized = {
      ...formData,
      hobbies: (formData.hobbies || []).filter((x) => x && x.trim()),
      currentSkills: (formData.currentSkills || []).filter(
        (x) => x && x.trim()
      ),
      interestedSkills: (formData.interestedSkills || []).filter(
        (x) => x && x.trim()
      ),
      strengths: (formData.strengths || []).filter((x) => x && x.trim()),
      weaknesses: (formData.weaknesses || []).filter((x) => x && x.trim()),
    };
    onFormSubmit && onFormSubmit(sanitized);
    setShowForm(false);
  };

  // ---------------- 3D card glow (unchanged) ----------------
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * -6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,120,180,0.35), rgba(255,120,40,0.22), transparent 70%)`;
    };
    const handleLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      glow.style.background = `radial-gradient(circle at 50% 50%, rgba(255,120,180,0.22), rgba(255,120,40,0.12), transparent 70%)`;
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <main className="grid lg:grid-cols-3 gap-8 py-12">
      {/* LEFT: heading, search, feature cards */}
      <div className="col-span-2">
        <div className="text-orange-400 text-xs font-bold uppercase tracking-wider">
          Personalized • AI-backed • Free trial
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mt-2">
          {fullText}
        </h1>
        <p className="lead text-gray-300 mt-4">{typedLeadText}</p>

        {/* 🔹 Explore search box */}
        <div className="relative group mt-6">
          <div
            className="flex flex-col sm:flex-row items-center bg-gray-900 rounded-2xl p-2 shadow-2xl transform transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105 relative"
            style={{ perspective: "1000px" }}
          >
            {/* Strong Idle Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/25 via-orange-500/25 to-yellow-500/25 blur-lg opacity-100 transition duration-500 group-hover:from-pink-500/40 group-hover:via-orange-500/40 group-hover:to-yellow-500/40 group-hover:blur-xl"></div>

            <input
              type="search"
              placeholder='Try: "Become a data analyst"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-white p-3 rounded-lg focus:outline-none placeholder-gray-500 relative z-10"
            />

            <button
              onClick={handleExplore}
              className="relative z-10 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg mt-2 sm:mt-0 sm:ml-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 active:brightness-110"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: "Skill Gap Analysis",
              desc: "Identify your strengths and discover which skills you need to improve to stay ahead in your career.",
              tag: "AI-powered",
              icon: <LineChart className="w-6 h-6 text-orange-400" />,
            },
            {
              title: "Course & Scholarship Finder",
              desc: "Get AI-curated courses and the latest scholarships tailored to your academic profile and goals.",
              tag: "Recommended",
              icon: <BookOpen className="w-6 h-6 text-pink-400" />,
            },
            {
              title: "Mentor Connect",
              desc: "Connect with experienced mentors for career guidance and personalized advice. (Coming Soon 🚀)",
              tag: "Coming Soon",
              icon: <Users className="w-6 h-6 text-yellow-400" />,
            },
            {
              title: "Resume & Job Prep",
              desc: "Get instant resume feedback, practice mock interviews, and explore AI-matched job & internship opportunities.",
              tag: "New",
              icon: <Briefcase className="w-6 h-6 text-green-400" />,
            },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => {
                if (card.title === "Skill Gap Analysis") navigate("/skill-gap");
              }}
              className="cursor-pointer relative group bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-md
                 hover:shadow-orange-500/20 hover:border-orange-400
                 transform hover:-translate-y-2 transition-all duration-500"
            >
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 
                      opacity-0 group-hover:opacity-100 blur-xl transition duration-500"
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <h4 className="font-bold text-lg">{card.title}</h4>
                  </div>
                  <span className="inline-block text-xs font-semibold text-orange-400 bg-gray-900 px-2 py-1 rounded-full">
                    {card.tag}
                  </span>
                </div>

                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: profile card with buttons */}
      <aside
        ref={cardRef}
        className="relative group col-span-1 bg-gray-800 rounded-2xl p-6 h-fit shadow-xl"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-0 blur-2xl"
        ></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center bg-pink-500 rounded-full font-bold text-lg">
              {userName ? userName.charAt(0).toUpperCase() : "CS"}
            </div>
            <div>
              <div className="font-bold">
                Hello, {userName ? userName : "Student"}
              </div>
              <div className="text-gray-400 text-sm">
                Tailor your life to your liking.
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="btn-cta text-white font-bold py-3 px-4 rounded-xl sidebar-btn"
            >
              Get Personalized Plan
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-transparent border border-gray-700 text-gray-200 font-semibold py-3 px-4 rounded-xl sidebar-btn"
            >
              Find Eligible Colleges
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------- Get Personalized Plan Modal (full form) ---------------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h4 className="text-2xl font-bold mb-4">
              Create Your Personalized Plan
            </h4>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Education */}
              <div>
                <label className="block text-sm mb-1">
                  Higher Qualification
                </label>
                <input
                  type="text"
                  name="higherQualification"
                  placeholder="Higher Qualification"
                  value={formData.higherQualification}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Current Course</label>
                <input
                  type="text"
                  name="currentCourse"
                  placeholder="Current Course"
                  value={formData.currentCourse}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Grades (GPA/Percentage)
                </label>
                <input
                  type="text"
                  name="grades"
                  placeholder="Grades"
                  value={formData.grades}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              {/* Hobbies */}
              <div>
                <label className="block text-sm mb-1">
                  Hobbies / Interests (max 4)
                </label>
                {formData.hobbies.map((h, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={h}
                      onChange={(e) =>
                        updateArrayField("hobbies", i, e.target.value)
                      }
                      placeholder={`Hobby ${i + 1}`}
                      className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("hobbies", i)}
                      className="px-3 bg-gray-600 rounded"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("hobbies", 4)}
                  className="text-sm text-orange-400"
                >
                  + Add hobby
                </button>
              </div>

              {/* Current Skills */}
              <div>
                <label className="block text-sm mb-1">Current Skills</label>
                {formData.currentSkills.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={s}
                      onChange={(e) =>
                        updateArrayField("currentSkills", i, e.target.value)
                      }
                      placeholder={`Skill ${i + 1}`}
                      className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("currentSkills", i)}
                      className="px-3 bg-gray-600 rounded"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("currentSkills")}
                  className="text-sm text-orange-400"
                >
                  + Add skill
                </button>
              </div>

              {/* Interested Skills */}
              <div>
                <label className="block text-sm mb-1">
                  Skills you're interested in
                </label>
                {formData.interestedSkills.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={s}
                      onChange={(e) =>
                        updateArrayField("interestedSkills", i, e.target.value)
                      }
                      placeholder={`Interested skill ${i + 1}`}
                      className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("interestedSkills", i)}
                      className="px-3 bg-gray-600 rounded"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("interestedSkills")}
                  className="text-sm text-orange-400"
                >
                  + Add interested skill
                </button>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    Strengths (max 4)
                  </label>
                  {formData.strengths.map((s, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={s}
                        onChange={(e) =>
                          updateArrayField("strengths", i, e.target.value)
                        }
                        placeholder={`Strength ${i + 1}`}
                        className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("strengths", i)}
                        className="px-3 bg-gray-600 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("strengths", 4)}
                    className="text-sm text-orange-400"
                  >
                    + Add strength
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Weaknesses (max 4)
                  </label>
                  {formData.weaknesses.map((w, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={w}
                        onChange={(e) =>
                          updateArrayField("weaknesses", i, e.target.value)
                        }
                        placeholder={`Weakness ${i + 1}`}
                        className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("weaknesses", i)}
                        className="px-3 bg-gray-600 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("weaknesses", 4)}
                    className="text-sm text-orange-400"
                  >
                    + Add weakness
                  </button>
                </div>
              </div>

              {/* Environment */}
              <div>
                <label className="block text-sm mb-1">
                  Preferred Work Environment
                </label>
                <select
                  name="environment"
                  value={formData.environment}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                >
                  <option value="">Select</option>
                  <option value="Office">Office</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Field work">Field work</option>
                  <option value="Work from home">Work from home</option>
                </select>
              </div>

              {/* Long Term Goals */}
              <div>
                <label className="block text-sm mb-1">
                  Long-term Goals (5–10 years)
                </label>
                <textarea
                  name="longTermGoals"
                  value={formData.longTermGoals}
                  onChange={handleInputChange}
                  placeholder="Where do you see yourself in 5–10 years?"
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full h-24"
                ></textarea>
              </div>

              {/* Job Satisfaction */}
              <div>
                <label className="block text-sm mb-1">
                  Job Satisfaction Preference
                </label>
                <select
                  name="jobSatisfaction"
                  value={formData.jobSatisfaction}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                >
                  <option value="">Select</option>
                  <option value="Money">Paisa</option>
                  <option value="Social Impact">Social impact</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Innovation">Innovation</option>
                </select>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm mb-1">
                  Upload Achievements (optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  onChange={handleFileChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm mb-1">
                  Experience (in months)
                </label>
                <input
                  type="number"
                  name="experienceMonths"
                  value={formData.experienceMonths}
                  onChange={handleInputChange}
                  placeholder="Enter months"
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-cta text-white font-bold py-3 px-4 rounded-xl w-full"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Find Eligible Colleges Modal ---------------- */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h4 className="text-2xl font-bold mb-3">Find Eligible Colleges</h4>
            <p className="text-sm text-gray-400 mb-3">
              Fill these details to check college eligibility (we will match
              against the database).
            </p>

            <form onSubmit={handleQuizSubmit} className="space-y-3">
              {/* Recent Exam */}
              <div>
                <label className="block text-sm mb-1">
                  Recent Exam (if any)
                </label>
                <select
                  name="recentExam"
                  value={quiz.recentExam}
                  onChange={handleQuizChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                >
                  <option value="None">None</option>
                  <option value="JEE(Main)">JEE(Main)</option>
                  <option value="NEET">NEET</option>
                  <option value="CUET">CUET/UG</option>
                  <option value="State">State Entrance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Exam Score & Pass/Fail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">
                    Exam Score (if any)
                  </label>
                  <input
                    name="examScore"
                    value={quiz.examScore}
                    onChange={handleQuizChange}
                    placeholder="e.g. 120 / 720 or 85"
                    className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Result</label>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="passFail"
                        value="pass"
                        checked={quiz.passFail === "pass"}
                        onChange={handleQuizChange}
                      />
                      <span>Pass</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="passFail"
                        value="fail"
                        checked={quiz.passFail === "fail"}
                        onChange={handleQuizChange}
                      />
                      <span>Fail</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Desired Course */}
              <div>
                <label className="block text-sm mb-1">
                  Desired course / admission
                </label>
                <input
                  name="desiredCourse"
                  value={quiz.desiredCourse}
                  onChange={handleQuizChange}
                  placeholder="e.g. B.Tech Computer Science"
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
                {quizErrors.desiredCourse && (
                  <div className="text-xs text-red-500 mt-1">
                    {quizErrors.desiredCourse}
                  </div>
                )}
              </div>

              {/* 12th Marks + Stream */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">12th marks (%)</label>
                  <input
                    name="class12Marks"
                    value={quiz.class12Marks}
                    onChange={handleQuizChange}
                    placeholder="e.g. 82"
                    className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                  />
                  {quizErrors.class12Marks && (
                    <div className="text-xs text-red-500 mt-1">
                      {quizErrors.class12Marks}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">12th stream</label>
                  <select
                    name="class12Stream"
                    value={quiz.class12Stream}
                    onChange={handleQuizChange}
                    className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                  >
                    <option value="">Select stream</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts / Humanities</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* 10th marks */}
              <div>
                <label className="block text-sm mb-1">10th marks (%)</label>
                <input
                  name="class10Marks"
                  value={quiz.class10Marks}
                  onChange={handleQuizChange}
                  placeholder="e.g. 88"
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              {/* Extra info */}
              <div>
                <label className="block text-sm mb-1">
                  Extra details (optional)
                </label>
                <textarea
                  name="extraInfo"
                  value={quiz.extraInfo}
                  onChange={handleQuizChange}
                  placeholder="Any extracurriculars, preferences or location constraints"
                  rows={3}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submittingQuiz}
                  className="btn-cta text-white font-bold py-2 px-4 rounded-xl"
                >
                  {submittingQuiz ? "Checking..." : "Check Eligible Colleges"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuiz(false)}
                  className="px-4 py-2 rounded-xl border border-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

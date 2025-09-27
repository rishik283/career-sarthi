import React, { useState, useRef, useEffect } from "react";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! Main aapki madad ke liye hoon — text ya mic se baat kijiye.",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [listening, setListening] = useState(false);

  const panelRef = useRef(null);
  const glowRef = useRef(null);
  const listRef = useRef(null);
  const recognitionRef = useRef(null);
  const rafRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.interimResults = false;
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  function toggleListening() {
    if (!recognitionRef.current) {
      alert("Speech recognition supported nahi hai is browser me.");
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  }

  // Send message to backend (placeholder)
  async function sendMessage(e) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setIsSending(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!resp.ok) throw new Error("Server error");
      const data = await resp.json();
      const reply = data.reply || "Sorry, koi reply nahi mila.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "⚠️ Error: backend se reply nahi aaya." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  // 3D hover + glow effect
  useEffect(() => {
    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
      return;

    let bounds = null,
      mouseX = 0,
      mouseY = 0,
      lastX = 0,
      lastY = 0;

    function onMove(e) {
      const cx = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
      const cy = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
      if (!bounds) bounds = panel.getBoundingClientRect();
      mouseX = cx - bounds.left;
      mouseY = cy - bounds.top;
      glow.style.setProperty("--gx", `${mouseX}px`);
      glow.style.setProperty("--gy", `${mouseY}px`);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    }

    function animate() {
      lastX += (mouseX - lastX) * 0.12;
      lastY += (mouseY - lastY) * 0.12;
      const cx = bounds.width / 2;
      const cy = bounds.height / 2;
      const nx = (lastX - cx) / cx;
      const ny = (lastY - cy) / cy;
      const rotateY = -nx * 6;
      const rotateX = ny * 6;
      const translateZ = 8 + (Math.abs(nx) + Math.abs(ny)) * 6;
      panel.style.transform = `perspective(1000px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      rafRef.current = requestAnimationFrame(animate);
    }

    function onLeave() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      bounds = null;
      panel.style.transform = `perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)`;
      glow.style.setProperty("--gx", `50%`);
      glow.style.setProperty("--gy", `50%`);
    }

    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseleave", onLeave);
    panel.addEventListener("touchstart", onMove, { passive: true });
    panel.addEventListener("touchmove", onMove, { passive: true });
    panel.addEventListener("touchend", onLeave);

    return () => {
      panel.removeEventListener("mousemove", onMove);
      panel.removeEventListener("mouseleave", onLeave);
      panel.removeEventListener("touchstart", onMove);
      panel.removeEventListener("touchmove", onMove);
      panel.removeEventListener("touchend", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open]);

  return (
    <>
      {/* Floating glowing Ask AI button */}
      {!open && (
        <div className="fixed right-5 bottom-5 z-50">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center space-x-3 px-6 py-3 rounded-full font-bold text-white shadow-2xl 
                       bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-110 transform transition"
          >
            {/* Glowing animated ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-70 blur-lg animate-pulse"></span>
            <span className="relative z-10 text-lg">💬</span>
            <span className="relative z-10">Ask AI</span>
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed right-5 bottom-5 z-50 w-80 md:w-96 h-[70vh] rounded-2xl overflow-hidden transform transition-transform duration-300"
          style={{
            transform:
              "perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)",
            willChange: "transform, box-shadow",
          }}
        >
          {/* Moving glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(360px circle at var(--gx,50%) var(--gy,50%), rgba(255,200,120,0.12), rgba(255,99,132,0.06) 20%, transparent 40%)",
              transition: "background 80ms linear",
            }}
          />

          <div className="flex flex-col h-full bg-gradient-to-b from-gray-900/90 to-gray-800/90 border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header with close button */}
            <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-pink-500 to-orange-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  AI
                </div>
                <div className="font-semibold">🤖 AI Assistant</div>
              </div>
              <button
                onClick={() => {
                  setMessages([
                    {
                      role: "assistant",
                      text: "👋 Hi! Main aapki madad ke liye hoon — text ya mic se baat kijiye.",
                    },
                  ]);
                  setOpen(false);
                }}
                className="text-white text-lg font-bold hover:opacity-85"
              >
                ✖
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-auto p-4 space-y-3 bg-transparent"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-br-none"
                        : "bg-gray-700/90 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="text-xs text-gray-400 italic">
                  Assistant is typing...
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="px-3 py-3 border-t border-gray-700 bg-gray-800 flex items-center gap-3"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-full ${
                  listening ? "bg-red-500" : "bg-pink-500"
                } text-white hover:scale-105 transition`}
              >
                🎤
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400 text-white"
              />
              <button
                type="submit"
                disabled={isSending}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold disabled:opacity-60 hover:scale-105 transition"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

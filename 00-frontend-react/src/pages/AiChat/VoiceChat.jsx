import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "../../components/MessageBubble";

export default function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [draftText, setDraftText] = useState("");
  const recognitionRef = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ SpeechRecognition API!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);

    recognition.onerror = (e) => {
      console.error("❌ SpeechRecognition error:", e);
      setRecording(false);
    };

    recognition.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript + " ";
      }
      setDraftText(transcript.trim());
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (recording) recognitionRef.current.stop();
    else {
      setDraftText("");
      recognitionRef.current.start();
    }
  };

  const handleSend = async () => {
  if (!draftText.trim()) return;

  const newMsg = {
    id: Date.now(),
    who: "user",
    type: "text",
    text: draftText,
  };
  setMessages((prev) => [...prev, newMsg]);
  setDraftText("");

  try {
    const res = await fetch("http://localhost/api/chat", {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
      body: JSON.stringify({ message: newMsg.text }),
    });
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        who: "ai",
        type: "text",
        text: data.reply,
      },
    ]);
  } catch (err) {
    console.error("❌ Lỗi khi gọi API:", err);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        who: "ai",
        type: "text",
        text: "⚠️ Lỗi khi gọi server!",
      },
    ]);
  }
};


  return (
  <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    {/* Header */}
    <header className="bg-white/80 backdrop-blur-md shadow px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <h1 className="font-bold text-lg text-gray-700 flex items-center gap-2">
        🎙️ <span>AI Chat</span>
      </h1>
    </header>

    {/* Chat area */}
    <main className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}

      {/* Hiển thị draft */}
      {draftText && (
        <div className="flex justify-end mb-3">
          <div className="max-w-[70%] rounded-2xl px-4 py-2 shadow-md border border-dashed border-gray-400 text-gray-500 italic bg-white/70">
<span>{draftText} <span className="text-xs">(chờ gửi…)</span></span>

      {/* Nút xóa */}
      <button
        onClick={() => setDraftText("")}
        className="ml-2 text-red-500 hover:text-red-600 transition font-bold"
        title="Xóa draft"
      >
        ✖️
      </button>
    </div>
  </div>
)}
    </main>

    {/* Controls */}
    <footer className="bg-white/80 backdrop-blur-md shadow-inner px-4 py-3 flex items-center gap-3 sticky bottom-0">
      <button
        className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition transform active:scale-95 ${
          recording
            ? "bg-red-500 animate-pulse text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        onClick={toggleRecording}
      >
        {recording ? "⏹️" : "Start"}
      </button>

      <button
        onClick={handleSend}
        disabled={!draftText.trim()}
        className={`flex-1 px-5 py-3 rounded-full font-medium text-center shadow-md transition ${
          draftText.trim()
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </footer>
  </div>
);

}

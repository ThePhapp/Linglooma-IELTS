import React from "react";

export default function MessageBubble({ msg }) {
  const isUser = msg.who === "user";

  return (
    <div className={`flex items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow mr-2">
          🤖
        </div>
      )}

      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md transition ${
          isUser
            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
        }`}
      >
        {msg.type === 'text' && Array.isArray(msg.paragraphs) ? (
          msg.paragraphs.map((p, i) => (
            <p key={i} className="mb-2">
              {p}
            </p>
          ))
        ) : (
          <p className="whitespace-pre-wrap">{msg.text}</p>
        )}
      </div>

      {/* Avatar User */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow ml-2">
          🧑
        </div>
      )}
    </div>
  );
}

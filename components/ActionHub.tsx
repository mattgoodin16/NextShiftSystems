"use client";
import { useState } from "react";
import ChatWidget from "./ChatWidget";

export default function ActionHub() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating Action Hub */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {open && (
          <>
            {/* Book Audit */}
            <div className="flex items-center gap-2 group">
              <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition text-sm font-medium text-navy bg-white border border-gray-200 px-2 py-1 rounded-lg shadow">
                Book Audit
              </span>
              <a
                href="/audit"
                className="bg-white border border-gray-200 text-navy rounded-full w-12 h-12 shadow flex items-center justify-center hover:bg-neon hover:text-navy transition"
                title="Book Audit"
              >
                📅
              </a>
            </div>

            {/* Email Us */}
            <div className="flex items-center gap-2 group">
              <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition text-sm font-medium text-navy bg-white border border-gray-200 px-2 py-1 rounded-lg shadow">
                Email Us
              </span>
              <a
                href="mailto:nextshiftsystems@gmail.com"
                className="bg-white border border-gray-200 text-navy rounded-full w-12 h-12 shadow flex items-center justify-center hover:bg-neon hover:text-navy transition"
                title="Email Us"
              >
                ✉️
              </a>
            </div>

            {/* Chat with Assistant */}
            <div className="flex items-center gap-2 group">
              <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition text-sm font-medium text-navy bg-white border border-gray-200 px-2 py-1 rounded-lg shadow">
                Chat
              </span>
              <button
                onClick={() => setChatOpen((c) => !c)}
                className="bg-white border border-gray-200 text-navy rounded-full w-12 h-12 shadow flex items-center justify-center hover:bg-neon hover:text-navy transition"
                title="Chat with Assistant"
              >
                💬
              </button>
            </div>
          </>
        )}

        {/* Main hub toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-navy text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:opacity-90 transition"
          title="Open Actions"
        >
          {open ? "✕" : "⚡️"}
        </button>
      </div>

      {/* Chat Widget rendered separately */}
      {chatOpen && <ChatWidget />}
    </>
  );
}

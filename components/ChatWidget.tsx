"use client";
import { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I’m NextShift Assistant — here to help with automation, pricing, or getting started. How can I help you?",
    },
  ]);

  // --- Utility to log messages to Make.com (→ Google Sheets) ---
  async function logMessage(sender: string, text: string) {
    try {
      await fetch("https://hook.us2.make.com/o2wbr6u7g6oxj3dvftq4junwfv4gpxq8", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender,
          message: text,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn("Logging failed:", err);
    }
  }

  // --- Local smart intent logic ---
  function getReply(userText: string): string {
    const t = userText.toLowerCase();

    if (/^(hi|hello|hey|yo|sup)/.test(t))
      return "Hey there 👋  — what would you like to learn about?";

    if (t.includes("price") || t.includes("cost") || t.includes("how much"))
      return "Our pricing is simple:\n• Jumpstart – $750 (1-week sprint)\n• Growth Suite – $1,500 (scale + analytics)\n• Partner Plan – $2,000/mo (ongoing automation).";

    if (t.includes("partner"))
      return "Partner Plan includes continuous automation builds, monthly reports, and dedicated support for $2,000/mo.";

    if (t.includes("jumpstart"))
      return "Jumpstart = a 7-day automation sprint. We pick 3-5 tasks and automate them fast for real ROI in a week.";

    if (t.includes("growth"))
      return "Growth Suite scales your automations, adds analytics dashboards, and optimizes your workflows — $1,500.";

    if (t.includes("audit") || t.includes("book"))
      return "You can book a free audit any time at 👉 /audit. We’ll review your workflow and show savings within 30 minutes.";

    if (t.includes("services") || t.includes("offer") || t.includes("what do you do"))
      return "We design and implement custom automations for small businesses — lead follow-ups, CRM syncs, invoicing, email flows, and AI assistants.";

    if (t.includes("industry") || t.includes("business"))
      return "We mainly help small service businesses — coaches, agencies, trades, and online shops.";

    if (t.includes("how long") || t.includes("timeline"))
      return "Most projects launch within 7-14 days after the audit, depending on complexity.";

    if (t.includes("roi") || t.includes("save") || t.includes("benefit"))
      return "Our average client saves 5–20 hours per week and sees 3× faster response times.";

    if (t.includes("tools") || t.includes("integrate") || t.includes("connect"))
      return "We integrate with Google Workspace, Slack, Notion, Airtable, Calendly, QuickBooks, HubSpot, and more.";

    if (t.includes("ai") || t.includes("chatbot") || t.includes("gpt"))
      return "Yes! We build custom AI assistants for workflows — lead responders, data entry helpers, and internal chat tools.";

    if (t.includes("contact") || t.includes("email"))
      return "You can reach us at 📩 nextshiftsystems@gmail.com or through the Contact page.";

    if (t.includes("where") || t.includes("location"))
      return "We’re remote and serve clients worldwide — mostly U.S., Canada, and Australia.";

    if (t.includes("testimonial") || t.includes("results") || t.includes("case"))
      return "Clients report saving 10–25 hours a week after one month. Case studies coming soon!";

    if (t.includes("payment") || t.includes("invoice") || t.includes("bill"))
      return "We accept Stripe and PayPal. Partner Plans can be monthly or quarterly.";

    if (t.includes("support") || t.includes("help"))
      return "Support is included in all plans. Partner clients get same-day help.";

    if (t.includes("thank")) return "You’re very welcome! 😊  Anything else you’d like to know?";
    if (t.includes("bye")) return "Bye for now 👋  — hope to see you on a free audit soon!";

    return "That’s a great question! Can you tell me a bit more about what you’d love to automate?";
  }

  // --- Sending logic ---
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const reply = getReply(userMsg);

    // Update UI
    setMessages((m) => [
      ...m,
      { sender: "user", text: userMsg },
      { sender: "bot", text: reply },
    ]);

    // ✅ Only log the user’s message
await logMessage("user", userMsg);

    setInput("");
  };

  // --- UI ---
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-white w-80 rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-navy text-white flex justify-between items-center p-3">
            <span className="font-semibold">NextShift Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  m.sender === "bot"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-neon text-navy ml-auto"
                } w-fit max-w-[85%]`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm p-2 border rounded-md"
            />
            <button
              type="submit"
              className="ml-2 bg-navy text-white px-3 py-1 rounded-md text-sm"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-navy text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:opacity-90"
        >
          💬
        </button>
      )}
    </div>
  );
}

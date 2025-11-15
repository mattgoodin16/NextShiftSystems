"use client";

import { useMemo, useState } from "react";

type Service = "website" | "chatbot" | "content" | "automation";
type AnswerMap = Record<string, any>;

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full bg-neon transition-all"
        style={{ width: `${pct}%` }}
      />
      <div className="mt-2 text-xs text-gray-600 text-right">{pct}%</div>
    </div>
  );
}

function Section({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden"
      }`}
    >
      {show && <div className="mt-6">{children}</div>}
    </div>
  );
}

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // total steps = 1 (service select) + branch (1) + final summary (1)
  // we’ll compute a dynamic total so the progress bar stays accurate
  const totalSteps = useMemo(() => {
    // Service choice (1) + one branch step (1) + final summary (1)
    return 3;
  }, []);

  const setA = (key: string, value: any) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit() {
    try {
      setSubmitting(true);
      const payload = {
        service,
        ...answers,
        timestamp: new Date().toISOString(),
        source: "Quote Me",
      };
      await fetch("https://hook.us2.make.com/sdgrkd6fbt9oh2v37akp91fk1hb2ydat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
      setStep(3); // move to summary
    } catch (e) {
      alert("There was a problem submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="container max-w-3xl bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-navy text-center">Quote Me</h1>
        <p className="mt-3 text-center text-gray-700">
          Answer a few quick questions and we’ll prepare a tailored quote within 48 hours.
        </p>

        <div className="mt-6">
          <ProgressBar step={Math.min(step, totalSteps)} total={totalSteps} />
        </div>

        {/* STEP 1: Choose service */}
        <Section show={step === 1}>
          <h2 className="text-xl font-semibold text-navy">What service are you looking for?</h2>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <button
              className={`btn btn-primary justify-center ${service === "website" ? "opacity-100" : "opacity-95"}`}
              onClick={() => {
                setService("website");
                setStep(2);
              }}
            >
              Website Builder
            </button>
            <button
              className={`btn btn-primary justify-center ${service === "chatbot" ? "opacity-100" : "opacity-95"}`}
              onClick={() => {
                setService("chatbot");
                setStep(2);
              }}
            >
              ChatBot
            </button>
            <button
              className={`btn btn-primary justify-center ${service === "content" ? "opacity-100" : "opacity-95"}`}
              onClick={() => {
                setService("content");
                setStep(2);
              }}
            >
              AI Content
            </button>
            <button
              className={`btn btn-primary justify-center ${service === "automation" ? "opacity-100" : "opacity-95"}`}
              onClick={() => {
                setService("automation");
                setStep(2);
              }}
            >
              Email & Lead Automation
            </button>
          </div>
        </Section>

        {/* STEP 2: Branch per service */}
        <Section show={step === 2 && service === "website"}>
          <h2 className="text-xl font-semibold text-navy">Website Builder — Questionnaire</h2>

          {/* 1. Basic Information */}
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Your Name / Company Name</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Name / Company", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Email & Contact Info</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Email / Contact", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Current Website (if any)</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Current Website", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">What does your business do in one sentence?</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("One-liner", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Primary goals of your new website</label>
            <textarea className="w-full border rounded-md p-2 mt-1 h-20"
              placeholder="e.g., generate leads, sell products, showcase portfolio, attract investors"
              onChange={(e) => setA("Website Goals", e.target.value)}
            />
          </div>

          {/* Brand assets */}
          <div className="mt-4">
            <label className="text-sm font-medium">Do you already have brand assets? (list links if available)</label>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <input className="w-full border rounded-md p-2" placeholder="Logo link or note" onChange={(e) => setA("Has Logo", e.target.value)} />
              <input className="w-full border rounded-md p-2" placeholder="Color palette" onChange={(e) => setA("Color Palette", e.target.value)} />
              <input className="w-full border rounded-md p-2" placeholder="Fonts" onChange={(e) => setA("Fonts", e.target.value)} />
              <input className="w-full border rounded-md p-2" placeholder="Brand guidelines" onChange={(e) => setA("Brand Guidelines", e.target.value)} />
            </div>
          </div>

          {/* Pages */}
          <div className="mt-4">
            <label className="text-sm font-medium">Main pages you need</label>
            <input className="w-full border rounded-md p-2 mt-1"
              placeholder="e.g., Home, About, Services, Projects, Blog, Contact, Careers"
              onChange={(e) => setA("Pages", e.target.value)}
            />
          </div>

          {/* Copy */}
          <div className="mt-4">
            <label className="text-sm font-medium">Do you already have copy for each page?</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Yes", "No", "Need help with AI"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`border rounded-md p-2 ${answers["Copy Ready"] === opt ? "bg-neon text-navy" : "bg-white"}`}
                  onClick={() => setA("Copy Ready", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Media/graphics */}
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Photography / Stock / 3D?</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Media Needs", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Custom graphics/icons/animations?</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Graphics Needs", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Motion style</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Motion Style", e.target.value)}>
                <option value="">Select</option>
                <option>Subtle animations</option>
                <option>Bold, interactive motion</option>
                <option>Minimal transitions</option>
              </select>
            </div>
          </div>

          {/* Features (multi) */}
          <div className="mt-4">
            <label className="text-sm font-medium">Key features</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Contact form",
                "Booking or scheduling system",
                "E-commerce / shop",
                "Blog or news section",
                "AI chatbot or virtual assistant",
                "Newsletter sign-up",
                "Portfolio or gallery",
                "Dashboard or client portal",
              ].map((feature) => (
                <label key={feature} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Website Features"] || [];
                      setA(
                        "Website Features",
                        e.target.checked
                          ? [...prev, feature]
                          : prev.filter((f) => f !== feature)
                      );
                    }}
                  />
                  {feature}
                </label>
              ))}
            </div>
          </div>

          {/* AI-enhanced */}
          <div className="mt-4">
            <label className="text-sm font-medium">AI enhancements</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Smart content recommendations",
                "ChatGPT-powered chatbot",
                "Personalized user experience",
                "Automated lead capture",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["AI Enhancements"] || [];
                      setA(
                        "AI Enhancements",
                        e.target.checked
                          ? [...prev, item]
                          : prev.filter((f) => f !== item)
                      );
                    }}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Design styles */}
          <div className="mt-4">
            <label className="text-sm font-medium">Design styles you like</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Ultra-modern / futuristic",
                "Minimalist and clean",
                "Bold and vibrant",
                "Dark mode aesthetic",
                "3D or motion-heavy design",
                "Gradient / glassmorphism / neumorphism",
                "Techy / cyber / AI-inspired look",
              ].map((style) => (
                <label key={style} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Design Styles"] || [];
                      setA(
                        "Design Styles",
                        e.target.checked
                          ? [...prev, style]
                          : prev.filter((f) => f !== style)
                      );
                    }}
                  />
                  {style}
                </label>
              ))}
            </div>
          </div>

          {/* Vibe */}
          <div className="mt-4">
            <label className="text-sm font-medium">Overall vibe</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Corporate & professional", "Creative & experimental", "Tech-savvy & futuristic", "Youthful & trendy"].map(
                (v) => (
                  <button
                    type="button"
                    key={v}
                    className={`border rounded-md p-2 text-left ${
                      answers["Vibe"] === v ? "bg-neon text-navy" : "bg-white"
                    }`}
                    onClick={() => setA("Vibe", v)}
                  >
                    {v}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Audience, action, unique, domain/hosting, maintenance, timeline, budget */}
          <div className="mt-4">
            <label className="text-sm font-medium">Target audience</label>
            <textarea className="w-full border rounded-md p-2 mt-1 h-20" onChange={(e) => setA("Target Audience", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Primary action for visitors</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Primary CTA", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">What makes your business unique?</label>
            <textarea className="w-full border rounded-md p-2 mt-1 h-20" onChange={(e) => setA("Unique Value", e.target.value)} />
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Domain & hosting</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Domain/Hosting", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No, I need one</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Ongoing maintenance?</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Maintenance", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Launch deadline</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Launch Deadline", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Estimated budget</label>
            <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Budget", e.target.value)}>
              <option value="">Select</option>
              <option>&lt;$1,000</option>
              <option>$1,000–$3,000</option>
              <option>$3,000–$5,000</option>
              <option>$5,000+</option>
            </select>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Approver for feedback</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Approver", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Anything else?</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Notes", e.target.value)} />
            </div>
          </div>

          {/* Optional add-ons */}
          <div className="mt-4">
            <label className="text-sm font-medium">Optional add-ons</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Brand refresh or logo redesign",
                "AI-powered copywriting",
                "SEO optimization",
                "Analytics dashboard",
                "Product mockups or animations",
              ].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Website Add-ons"] || [];
                      setA("Website Add-ons", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button className="text-sm text-gray-600" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit for Quote"}
            </button>
          </div>
        </Section>

        <Section show={step === 2 && service === "chatbot"}>
          <h2 className="text-xl font-semibold text-navy">ChatBot — Questionnaire</h2>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business / Organization Name</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Org Name", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Your Name & Contact Info</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Contact", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Website URL (if available)</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Site URL", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">What does your business do?</label>
            <textarea className="w-full border rounded-md p-2 mt-1 h-20" onChange={(e) => setA("Biz Description", e.target.value)} />
          </div>

          {/* Where will the chatbot live */}
          <div className="mt-4">
            <label className="text-sm font-medium">Where will the chatbot live?</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Website", "WhatsApp", "Facebook / Instagram", "Slack / Teams", "Other"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Chatbot Channels"] || [];
                      setA("Chatbot Channels", e.target.checked ? [...prev, p] : prev.filter((f) => f !== p));
                    }}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div className="mt-4">
            <label className="text-sm font-medium">What kind of personality?</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Friendly & casual", "Professional & formal", "Playful & witty", "Techy & futuristic", "Empathetic & helpful"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Chatbot Personality"] || [];
                      setA("Chatbot Personality", e.target.checked ? [...prev, p] : prev.filter((f) => f !== p));
                    }}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Preferred greeting</label>
              <input className="w-full border rounded-md p-2 mt-1" placeholder='e.g., "Hi there! How can I help?"' onChange={(e) => setA("Greeting", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Words/Topics to avoid</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Avoid", e.target.value)} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4">
            <label className="text-sm font-medium">What should it do? (select all)</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Collect user info",
                "Route to human agent",
                "Schedule meetings or demos",
                "Search website / knowledge base",
                "Provide AI-generated answers",
                "Send notifications or emails",
                "Integrate with CRM / Email tools",
                "Handle payments or bookings",
              ].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Chatbot Actions"] || [];
                      setA("Chatbot Actions", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Systems to connect (HubSpot, Notion, Sheets, Stripe, Zapier)</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Integrations", e.target.value)} />
          </div>

          {/* AI usage */}
          <div className="mt-4">
            <label className="text-sm font-medium">AI usage</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Fully conversational", "Semi-automated", "Rule-based only"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`border rounded-md p-2 ${answers["AI Mode"] === opt ? "bg-neon text-navy" : "bg-white"}`}
                  onClick={() => setA("AI Mode", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Multilingual, knowledge, learning */}
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Multilingual?</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Multilingual", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Languages (if yes)</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Languages", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Content it should know</label>
            <input className="w-full border rounded-md p-2 mt-1" placeholder="FAQs, pricing, docs, external links..." onChange={(e) => setA("Chatbot Knowledge", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Learning approach</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Stay consistent with preset info", "Learn and improve over time"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`border rounded-md p-2 ${answers["Learning"] === opt ? "bg-neon text-navy" : "bg-white"}`}
                  onClick={() => setA("Learning", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Look and placement */}
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Look</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Look", e.target.value)}>
                <option value="">Select</option>
                <option>Minimal / clean</option>
                <option>Modern / techy</option>
                <option>Colorful / branded</option>
                <option>Custom avatar / 3D style</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Appearance</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Surface", e.target.value)}>
                <option value="">Select</option>
                <option>Chat bubble in corner</option>
                <option>Full-screen chat window</option>
                <option>Pop-up assistant</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Analytics?</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Analytics", e.target.value)}>
                <option value="">Select</option>
                <option>Yes — track usage, drop-offs, conversions</option>
                <option>No — basic setup only</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Launch timeline</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Timeline", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Budget</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Budget", e.target.value)}>
                <option value="">Select</option>
                <option>&lt;$500</option>
                <option>$500–$1,000</option>
                <option>$1,000–$3,000</option>
                <option>$3,000+</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Ongoing support</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Chatbot Support", e.target.value)}>
                <option value="">Select</option>
                <option>One-time build only</option>
                <option>Monthly maintenance & updates</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Anything else?</label>
            <textarea className="w-full border rounded-md p-2 mt-1 h-20" onChange={(e) => setA("Chatbot Notes", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Optional add-ons</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "AI training on business data",
                "CRM & email integrations",
                "Voice-enabled chatbot",
                "Analytics dashboard",
                "Website copywriting or FAQs",
              ].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Chatbot Add-ons"] || [];
                      setA("Chatbot Add-ons", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button className="text-sm text-gray-600" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit for Quote"}
            </button>
          </div>
        </Section>

        <Section show={step === 2 && service === "content"}>
          <h2 className="text-xl font-semibold text-navy">AI Content — Questionnaire</h2>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Your Name / Business Name</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Content Name/Business", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Website or Social (if any)</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Content Site/Social", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">What type of content?</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {[
                "Blog articles",
                "Social media posts",
                "Email/newsletter copy",
                "Product descriptions",
                "Website copy",
                "Other",
              ].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Content Types"] || [];
                      setA("Content Types", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Main goal of this content</label>
            <input className="w-full border rounded-md p-2 mt-1" placeholder="Leads, SEO, launch, educate..." onChange={(e) => setA("Content Goal", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Target audience</label>
            <input className="w-full border rounded-md p-2 mt-1" placeholder="e.g., small businesses, tech founders" onChange={(e) => setA("Content Audience", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Tone</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Professional & polished", "Friendly & conversational", "Bold & creative", "Techy & innovative", "Educational & informative"].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Content Tone"] || [];
                      setA("Content Tone", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Do you want a content plan?</label>
              <input className="w-full border rounded-md p-2 mt-1" placeholder="Every day, weekly, etc." onChange={(e) => setA("Content Plan", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Keywords / SEO terms</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Keywords", e.target.value)} />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Topics or key messages</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Topics", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Phrases/topics to avoid</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Avoid Phrases", e.target.value)} />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">How many pieces?</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Pieces Count", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Preferred length</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Content Length", e.target.value)}>
                <option value="">Select</option>
                <option>Short</option>
                <option>Medium (300–700 words)</option>
                <option>Long-form (1000+ words)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Delivery format</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Delivery Format", e.target.value)}>
                <option value="">Select</option>
                <option>Google Docs</option>
                <option>Notion</option>
                <option>Word file</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Include extras?</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["AI-generated visuals/graphics", "Hashtags or social captions", "Scheduling / posting support"].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Content Add-ons"] || [];
                      setA("Content Add-ons", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Deadline / schedule</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Content Deadline", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Anything else?</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Content Notes", e.target.value)} />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button className="text-sm text-gray-600" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit for Quote"}
            </button>
          </div>
        </Section>

        <Section show={step === 2 && service === "automation"}>
          <h2 className="text-xl font-semibold text-navy">Email & Lead Automation — Questionnaire</h2>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business / Brand Name</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Brand", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Your Name & Contact Info</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Contact", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Website / CRM (if any)</label>
            <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Site/CRM", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">What do you want to automate first?</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Lead capture", "Follow-up emails", "Newsletters or drip campaigns", "Onboarding sequences", "Other"].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Automation Targets"] || [];
                      setA("Automation Targets", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Main goal</label>
            <input className="w-full border rounded-md p-2 mt-1" placeholder="Save time, nurture leads, increase conversions..." onChange={(e) => setA("Automation Goal", e.target.value)} />
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Target leads/customers</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Audience", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Where do leads come from?</label>
              <input className="w-full border rounded-md p-2 mt-1" placeholder="Website, social, ads, CRM..." onChange={(e) => setA("Lead Sources", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Current tools/platforms</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Gmail/Outlook", "HubSpot", "Mailchimp", "ActiveCampaign", "Zapier / Make", "Other"].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Automation Tools"] || [];
                      setA("Automation Tools", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">AI-written/personalized emails?</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Yes — fully AI-written", "Partially (AI drafts, I review)", "No — use my templates"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`border rounded-md p-2 ${answers["AI Emails"] === opt ? "bg-neon text-navy" : "bg-white"}`}
                  onClick={() => setA("AI Emails", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Email types needed</label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {["Welcome / introduction", "Lead nurturing sequence", "Follow-up / reminder", "Promotional / sales", "Re-engagement / win-back"].map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev: string[] = answers["Email Types"] || [];
                      setA("Email Types", e.target.checked ? [...prev, x] : prev.filter((f) => f !== x));
                    }}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Emails per sequence</label>
              <input className="w-full border rounded-md p-2 mt-1" placeholder="e.g., 3-part welcome, 5-part follow-up" onChange={(e) => setA("Sequence Size", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Templates/tone guide</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Has Templates", e.target.value)}>
                <option value="">Select</option>
                <option>Yes (attach or link)</option>
                <option>No — please create them</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">After lead takes action</label>
              <input className="w-full border rounded-md p-2 mt-1" placeholder="Add to CRM, send alert, move list..." onChange={(e) => setA("Post-Action", e.target.value)} />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Analytics/reporting?</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Analytics", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Launch date</label>
              <input className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Launch", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Ongoing support</label>
              <select className="w-full border rounded-md p-2 mt-1" onChange={(e) => setA("Automation Support", e.target.value)}>
                <option value="">Select</option>
                <option>One-time build only</option>
                <option>Monthly maintenance & updates</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button className="text-sm text-gray-600" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit for Quote"}
            </button>
          </div>
        </Section>

        {/* STEP 3: Summary after submit */}
        <Section show={step === 3}>
          <h2 className="text-xl font-semibold text-navy">Summary</h2>
          {submitted ? (
            <>
              <p className="mt-2 text-gray-700">
                Thanks for the details. Here’s a quick summary of what you sent. We’ll email your tailored quote within 48 hours.
              </p>
              <div className="mt-4 border rounded-lg p-4 max-h-[50vh] overflow-auto text-sm">
                <div className="grid grid-cols-1 gap-2">
                  <div><strong>Service:</strong> {service}</div>
                  {Object.entries(answers).map(([k, v]) => (
                    <div key={k}>
                      <strong>{k}:</strong> {Array.isArray(v) ? v.join(", ") : String(v || "")}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <a href="/" className="text-sm text-gray-600">Back to Home</a>
                <a href="/contact" className="btn btn-primary">Contact Us</a>
              </div>
            </>
          ) : (
            <p className="mt-2 text-gray-700">Submitting your answers...</p>
          )}
        </Section>
      </div>
    </section>
  );
}

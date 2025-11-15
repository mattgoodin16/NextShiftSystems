"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [gradient, setGradient] = useState("from-navy to-neon");

  useEffect(() => {
    const colors = [
      "from-navy to-neon",
      "from-blue-500 to-cyan-400",
      "from-navy to-blue-600",
      "from-cyan-400 to-neon",
    ];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % colors.length;
      setGradient(colors[i]);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className={`text-white transition-all duration-1000 bg-gradient-to-br ${gradient}`}>
        <div className="container py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold">Work Smarter. Automate Faster.</h1>
            <p className="mt-6 text-lg text-white/90">
              We help small businesses make their next shift—from manual tasks to intelligent automation powered by AI.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
  href="/quote"
  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white bg-navy rounded-xl group"
>
  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-[-100%] bg-neon group-hover:translate-x-0"></span>
  <span className="relative z-10">🆓 Quote Me</span>
</Link>
              <a href="/services" className="btn bg-white text-navy">See Services</a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold text-lg">Jumpstart</h3>
            <p className="text-gray-600 mt-2">7 days · Automate 3–5 tasks</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">Growth Suite</h3>
            <p className="text-gray-600 mt-2">Scale automations + analytics</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">Partner Plan</h3>
            <p className="text-gray-600 mt-2">Ongoing automation + support</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container text-center py-20">
          <h2 className="text-3xl font-bold text-navy">How It Works</h2>
          <p className="mt-2 text-gray-600">We simplify automation into three effortless steps.</p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-xl transition">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-semibold text-lg">1. Audit</h3>
              <p className="text-sm text-gray-600 mt-2">
                We analyze your workflow and identify time-consuming processes.
              </p>
            </div>
            <div className="card hover:shadow-xl transition">
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="font-semibold text-lg">2. Build</h3>
              <p className="text-sm text-gray-600 mt-2">
                We design AI automations tailored to your business.
              </p>
            </div>
            <div className="card hover:shadow-xl transition">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-lg">3. Automate</h3>
              <p className="text-sm text-gray-600 mt-2">
                Sit back as your systems run seamlessly — saving you hours every week.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

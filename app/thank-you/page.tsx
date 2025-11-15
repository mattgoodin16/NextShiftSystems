"use client";
import { useEffect } from "react";

export default function ThankYou() {
  useEffect(() => {
    // Simple confetti burst
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    const colors = ["#00C6FF", "#0B132B", "#ffffff"];

    (function frame() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;
      const particleCount = 5 * (timeLeft / duration);
      const angle = Math.random() * 360;
      const confettiCanvas = document.createElement("div");
      confettiCanvas.style.position = "fixed";
      confettiCanvas.style.top = "50%";
      confettiCanvas.style.left = "50%";
      confettiCanvas.style.width = "8px";
      confettiCanvas.style.height = "8px";
      confettiCanvas.style.background = colors[Math.floor(Math.random() * colors.length)];
      confettiCanvas.style.borderRadius = "50%";
      confettiCanvas.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      confettiCanvas.style.transition = "all 1s ease-out";
      document.body.appendChild(confettiCanvas);
      setTimeout(() => confettiCanvas.remove(), 1000);
      requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-gray-50">
      <div className="text-center max-w-lg p-8 bg-white rounded-xl shadow">
        <h1 className="text-3xl font-bold text-navy">🎉 Thank You!</h1>
        <p className="mt-4 text-gray-700">
          We’ve received your message and will get back to you soon.
          <br />
          You can expect a reply within 24 hours.
        </p>

        <div className="mt-8">
          <a href="/" className="btn btn-primary">
            Return to Home
          </a>
        </div>
      </div>
    </section>
  );
}

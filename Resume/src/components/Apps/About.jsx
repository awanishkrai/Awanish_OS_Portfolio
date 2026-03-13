import React from "react";
import { PORTFOLIO_DATA } from "../../constants/portfolioData";
import { asciiArt } from "./asciiArt";

export default function About({ isDarkMode }) {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};

  const bgClass = isDarkMode ? "bg-[#0d1117] text-[#8b949e]" : "bg-slate-100 text-slate-800";
  const linkClass = "hover:text-[#53d8fb] transition-colors";

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const fallback = e.target.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  };

  return (
    <div className={`w-full h-full p-4 md:p-8 font-mono text-sm leading-relaxed overflow-auto ${bgClass}`}>
      <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl mx-auto mt-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-20 h-20">
            <img
              src="/profile.png"
              alt={personal.name || "Profile"}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#53d8fb]/50 shadow-lg"
              onError={handleImageError}
            />
            <div
              className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-tr from-[#e94560] to-[#53d8fb] flex items-center justify-center text-2xl font-bold text-white border-2 border-[#53d8fb]/50"
              style={{ display: "none" }}
            >
              {(personal.name || "A").charAt(0)}
            </div>
          </div>
          <pre className="text-[#53d8fb] font-black leading-[1.15] hidden sm:block text-xs md:text-sm">
            {asciiArt}
          </pre>
        </div>

        <div className="flex-1">
          <div className="mb-5 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm p-4">
            <div className="text-white font-bold mb-2">About me</div>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-[#8b949e]">
                <span className="text-white/90 font-semibold">Brief personal intro</span>
                <span className="text-[#8b949e]">
                  : I’m {personal.name || "Awanish Kumar Rai"}, a {personal.subtitle || "Software Engineer | Competitive Programmer"} who enjoys building clean, interactive web experiences and solving problems under constraints.
                </span>
              </li>
              <li className="text-[#8b949e]">
                <span className="text-white/90 font-semibold">Academic background &amp; career goals</span>
                <span className="text-[#8b949e]">
                  : {personal.title || "Computer Science Undergraduate"} with a focus on strong CS fundamentals (DSA, OS, networking). My goal is to grow into a backend/full‑stack engineer who ships reliable systems and polished UX.
                </span>
              </li>
              <li className="text-[#8b949e]">
                <span className="text-white/90 font-semibold">Unique qualities or interests</span>
                <span className="text-[#8b949e]">
                  : Competitive programming mindset, performance-first thinking, and a love for developer tooling. I’m especially interested in Linux, system design, and building products that feel “fast” and intuitive.
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <span className="text-[#53d8fb] font-bold">visitor</span>
            <span className="text-white">@</span>
            <span className="text-[#53d8fb] font-bold">awanish-os</span>
          </div>
          <div className="text-slate-500 mb-2 font-black">-------------------</div>

          <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1 mb-4">
            <span className="text-[#53d8fb] font-bold">OS</span>
            <span className="text-white">PortfolioOS x86_64</span>
            <span className="text-[#39d353] font-bold">Host</span>
            <span className="text-white">React-Vite Machine</span>
            <span className="text-[#e94560] font-bold">Kernel</span>
            <span className="text-white">10.0.1 (Web)</span>
            <span className="text-[#ffbd2e] font-bold">Uptime</span>
            <span className="text-white">3 years (Experience)</span>
            <span className="text-[#a371f7] font-bold">Packages</span>
            <span className="text-white">847 (npm)</span>
            <span className="text-[#53d8fb] font-bold">Shell</span>
            <span className="text-white">bash 5.1.16</span>
            <span className="text-[#39d353] font-bold">Resolution</span>
            <span className="text-white">1920x1080</span>
            <span className="text-[#e94560] font-bold">DE</span>
            <span className="text-white">GNOME-Portfolio</span>
            <span className="text-[#ffbd2e] font-bold">WM</span>
            <span className="text-white">Framer-Motion</span>
            <span className="text-[#a371f7] font-bold">Theme</span>
            <span className="text-white">Ubuntu Dark [GTK2/3]</span>
            <span className="text-[#53d8fb] font-bold">Terminal</span>
            <span className="text-white">Awanish-Term</span>
            <span className="text-[#39d353] font-bold">CPU</span>
            <span className="text-white">Human Brain (1) @ 2.40GHz</span>
          </div>

          <div className="text-slate-500 mb-2 font-black">-------------------</div>

          <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1 mb-4">
            <span className="text-[#ffbd2e] font-bold">Name</span>
            <span className="text-white">{personal.name || "Awanish Kumar Rai"}</span>
            <span className="text-[#a371f7] font-bold">Role</span>
            <span className="text-white">{personal.title || "Computer Science Engineer"}</span>
            <span className="text-[#53d8fb] font-bold">Location</span>
            <span className="text-white">{personal.location || "India"}</span>
            <span className="text-[#39d353] font-bold">Editor</span>
            <span className="text-white">Neovim btw</span>
            <span className="text-[#e94560] font-bold">Email</span>
            <span className="text-white flex items-center">
              <a href={"mailto:" + (personal.email || "awanish420@gmail.com")} className={linkClass}>
                {personal.email || "awanish420@gmail.com"}
              </a>
            </span>
            <span className="text-[#ffbd2e] font-bold">GitHub</span>
            <span className="text-white">
              <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer" className={linkClass}>
                github.com/awanishkrai
              </a>
            </span>
            <span className="text-[#53d8fb] font-bold">LinkedIn</span>
            <span className="text-white">
              <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className={linkClass}>
                linkedin.com/in/awanish-rai
              </a>
            </span>
            <span className="text-[#e94560] font-bold">Codeforces</span>
            <span className="text-white">
              <a href={socials.codeforces || "#"} target="_blank" rel="noopener noreferrer" className={linkClass}>
                codeforces.com/profile/Awanish_Rai
              </a>
            </span>
            <span className="text-[#39d353] font-bold">CodeChef</span>
            <span className="text-white">
              <a href={socials.codechef || "#"} target="_blank" rel="noopener noreferrer" className={linkClass}>
                codechef.com/users/master_magnus
              </a>
            </span>
          </div>

          <div className="flex gap-1 mt-6">
            {["#161b22", "#ff5f56", "#39d353", "#ffbd2e", "#53d8fb", "#a371f7", "#58ebcd", "#ffffff"].map((c) => (
              <div key={c} className="w-5 h-5 rounded-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {["#484f58", "#e94560", "#2ea043", "#d29922", "#318bf8", "#8250df", "#31c0a0", "#b1bac4"].map((c) => (
              <div key={c} className="w-5 h-5 rounded-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

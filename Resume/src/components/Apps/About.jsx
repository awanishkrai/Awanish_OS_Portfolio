import React from "react";
import { PORTFOLIO_DATA } from "../../constants/portfolioData";
import { asciiArt } from "./asciiArt";

export default function About({ isDarkMode }) {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};
  const skills = PORTFOLIO_DATA?.skills ?? {};
  const certifications = PORTFOLIO_DATA?.certifications ?? [];
  const profileSrc = `${import.meta.env.BASE_URL}profile.png`;

  const skillGroups = Object.entries(skills);

  const bgClass = isDarkMode ? "bg-[#0d1117] text-[#8b949e]" : "bg-slate-100 text-slate-800";
  const linkClass = "hover:text-[#E95420] transition-colors";

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
              src={profileSrc}
              alt={personal.name || "Profile"}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#E95420]/50 shadow-lg"
              onError={handleImageError}
            />
            <div
              className="absolute inset-0 w-20 h-20 rounded-full bg-linear-to-tr from-[#E95420] to-[#77216f] flex items-center justify-center text-2xl font-bold text-white border-2 border-[#E95420]/50"
              style={{ display: "none" }}
            >
              {(personal.name || "A").charAt(0)}
            </div>
          </div>
          <pre className="text-[#E95420] font-black leading-[1.15] hidden sm:block text-xs md:text-sm">
            {asciiArt}
          </pre>
        </div>

        <div className="flex-1">
          <div className="mb-5 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <div className="text-white text-lg font-black tracking-tight">{personal.name || "Awanish Kumar Rai"}</div>
                <div className="text-[#E95420] font-semibold">{personal.subtitle || "Software Engineer | Competitive Programmer"}</div>
              </div>
              <div className="text-xs text-white/60">
                {personal.location || "India"} • {personal.email || "awanish420@gmail.com"}
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs uppercase tracking-wider text-white/60">Focus</div>
                <div className="mt-1 text-white/90 font-semibold">Backend + Full‑stack</div>
                <div className="text-xs text-white/60">APIs, databases, UX polish</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs uppercase tracking-wider text-white/60">Strength</div>
                <div className="mt-1 text-white/90 font-semibold">Competitive programming</div>
                <div className="text-xs text-white/60">Constraints → clean solutions</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs uppercase tracking-wider text-white/60">Interests</div>
                <div className="mt-1 text-white/90 font-semibold">Linux + systems</div>
                <div className="text-xs text-white/60">Performance-first thinking</div>
              </div>
            </div>

            <div className="mt-4 text-[#8b949e] leading-relaxed">
              I’m a {personal.title || "Computer Science Undergraduate"} who enjoys shipping fast, reliable products with a strong foundation in DSA, OS, and networking. I like building interfaces that feel “snappy”, and backend systems that are simple to maintain.
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 rounded-full border border-white/10 bg-black/10 text-white/80 hover:text-white ${linkClass}`}>
                GitHub
              </a>
              <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 rounded-full border border-white/10 bg-black/10 text-white/80 hover:text-white ${linkClass}`}>
                LinkedIn
              </a>
              <a href={socials.codeforces || "#"} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 rounded-full border border-white/10 bg-black/10 text-white/80 hover:text-white ${linkClass}`}>
                Codeforces
              </a>
              <a href={socials.codechef || "#"} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 rounded-full border border-white/10 bg-black/10 text-white/80 hover:text-white ${linkClass}`}>
                CodeChef
              </a>
              <a href={"mailto:" + (personal.email || "awanish420@gmail.com")} className={`px-3 py-1 rounded-full border border-white/10 bg-black/10 text-white/80 hover:text-white ${linkClass}`}>
                Email
              </a>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[#E95420] font-bold">visitor</span>
            <span className="text-white">@</span>
            <span className="text-[#E95420] font-bold">awanish-os</span>
          </div>
          <div className="text-slate-500 mb-2 font-black">-------------------</div>

          <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1 mb-4">
            <span className="text-[#E95420] font-bold">OS</span>
            <span className="text-white">Ubuntu 24.04 LTS x86_64</span>
            <span className="text-[#39d353] font-bold">Host</span>
            <span className="text-white">React-Vite Machine</span>
            <span className="text-[#e94560] font-bold">Kernel</span>
            <span className="text-white">10.0.1 (Web)</span>
            <span className="text-[#ffbd2e] font-bold">Uptime</span>
            <span className="text-white">3 years (Experience)</span>
            <span className="text-[#a371f7] font-bold">Packages</span>
            <span className="text-white">847 (npm)</span>
            <span className="text-[#E95420] font-bold">Shell</span>
            <span className="text-white">bash 5.1.16</span>
            <span className="text-[#39d353] font-bold">Resolution</span>
            <span className="text-white">1920x1080</span>
            <span className="text-[#e94560] font-bold">DE</span>
            <span className="text-white">GNOME-Portfolio</span>
            <span className="text-[#ffbd2e] font-bold">WM</span>
            <span className="text-white">Framer-Motion</span>
            <span className="text-[#a371f7] font-bold">Theme</span>
            <span className="text-white">Ubuntu Dark [GTK2/3]</span>
            <span className="text-[#E95420] font-bold">Terminal</span>
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
            <span className="text-[#E95420] font-bold">Location</span>
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
            <span className="text-[#E95420] font-bold">LinkedIn</span>
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

          <div className="mb-4 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm p-4">
            <div className="text-white/90 font-bold mb-3">Skills snapshot</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {skillGroups.map(([group, items]) => (
                <div key={group} className="rounded-xl border border-white/10 bg-black/10 p-3">
                  <div className="text-xs uppercase tracking-wider text-white/60">{group}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {(items || []).slice(0, 8).map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">
                        {s}
                      </span>
                    ))}
                    {(items || []).length > 8 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                        +{(items || []).length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {certifications.length > 0 && (
            <div className="mb-4 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm p-4">
              <div className="text-white/90 font-bold mb-2">Certifications</div>
              <ul className="list-disc pl-5 space-y-1 text-[#8b949e]">
                {certifications.slice(0, 6).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-1 mt-6">
            {["#300a24", "#E95420", "#77216f", "#f0a30a", "#27AE60", "#3468d5", "#8e44ad", "#ffffff"].map((c) => (
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

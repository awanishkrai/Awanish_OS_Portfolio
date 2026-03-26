import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "../../constants/portfolioData";
import { asciiArt } from "./asciiArt";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Linkedin, Mail, Terminal, 
  Cpu, Monitor, MapPin, Briefcase, 
  ExternalLink, Code2, Server, Database, Globe, Zap
} from "lucide-react";

export default function About({ isDarkMode }) {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};
  const skills = PORTFOLIO_DATA?.skills ?? {};
  const certifications = PORTFOLIO_DATA?.certifications ?? [];
  const profileSrc = `${import.meta.env.BASE_URL}profile.png`;

  const skillGroups = Object.entries(skills);

  const bgClass = isDarkMode ? "bg-[#0a0a0a] text-[#8b949e]" : "bg-slate-50 text-slate-800";
  const cardBg = isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-black/[0.02] border-black/5";
  const hoverCardBg = isDarkMode ? "hover:bg-white/[0.04] hover:border-white/10" : "hover:bg-black/[0.04] hover:border-black/10";
  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-white/60" : "text-slate-500";
  
  const linkClass = "hover:text-[#E95420] transition-colors duration-300";

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const fallback = e.target.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className={`w-full h-full p-4 md:p-8 font-mono text-sm leading-relaxed overflow-auto ${bgClass} selection:bg-[#E95420]/30 selection:text-[#E95420]`}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col xl:flex-row gap-8 items-start max-w-6xl mx-auto mt-4 pb-12"
      >
        {/* Left Column: Avatar & ASCII */}
        <motion.div variants={itemVariants} className="w-full xl:w-72 flex flex-col items-center gap-6 shrink-0 z-10">
          <div className="relative group mt-2" style={{ perspective: "1000px" }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-linear-to-r from-[#E95420] via-[#77216f] to-[#E95420] rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"
            />
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl transform transition-all duration-500 group-hover:scale-[1.02]">
              <img
                src={profileSrc}
                alt={personal.name || "Profile"}
                className="w-full h-full object-cover p-1.5 rounded-3xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                onError={handleImageError}
              />
              <div
                className="absolute inset-0 m-1.5 rounded-2xl bg-linear-to-tr from-[#E95420]/80 to-[#77216f]/80 flex flex-col items-center justify-center text-6xl font-black text-white"
                style={{ display: "none" }}
              >
                {(personal.name || "A").charAt(0)}
              </div>
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-3 -right-3 px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl flex items-center gap-2.5 shadow-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Online</span>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`w-full rounded-2xl border ${cardBg} p-5 text-center backdrop-blur-sm relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#E95420]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"/>
            <div className={`text-xl font-black tracking-tight ${textPrimary}`}>{personal.name || "Awanish Kumar Rai"}</div>
            <div className="text-[#E95420] font-semibold text-xs mt-1.5 uppercase tracking-wider">{personal.subtitle || "Software Engineer | Competitive Programmer"}</div>
            
            <div className="flex justify-center gap-3 mt-5 relative z-10">
              <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl border ${cardBg} ${hoverCardBg} text-white/60 hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5`}>
                <Github className="w-4 h-4" />
              </a>
              <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl border ${cardBg} ${hoverCardBg} text-white/60 hover:text-[#0a66c2] transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0a66c2]/20`}>
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={"mailto:" + (personal.email || "awanish420@gmail.com")} className={`p-2.5 rounded-xl border ${cardBg} ${hoverCardBg} text-white/60 hover:text-[#ea4335] transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ea4335]/20`}>
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <pre className="text-[#E95420] font-black leading-[1.1] hidden xl:block text-[10.5px] opacity-70 hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(233,84,32,0.4)] mt-4">
            {asciiArt}
          </pre>
        </motion.div>

        {/* Right Column: Details & Stats */}
        <div className="flex-1 w-full space-y-6 z-10">
          {/* Main Intro */}
          <motion.div variants={itemVariants} className={`rounded-3xl border ${cardBg} backdrop-blur-md p-7 md:p-8 relative overflow-hidden group shadow-2xl shadow-black/20`}>
            <div className="absolute top-0 right-0 p-32 bg-linear-to-bl from-[#E95420]/5 via-transparent to-transparent rounded-bl-[100px] pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 p-24 bg-linear-to-tr from-[#77216f]/5 via-transparent to-transparent rounded-tr-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-5 w-fit px-4 py-2 rounded-xl bg-black/20 border border-white/5">
              <span className="text-[#E95420] font-bold">visitor</span>
              <span className="text-white/40">@</span>
              <span className="text-white font-bold font-sans tracking-wide">awanish-os</span>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#E95420]/10 text-[#E95420] border border-[#E95420]/20">ROOT</span>
            </div>

            <div className={`text-sm md:text-base leading-relaxed ${textSecondary}`}>
              <span className="text-white/90 font-semibold text-lg inline-block mb-1 group-hover:text-[#E95420] transition-colors">Hey, I'm {personal.name?.split(' ')[0] || "Awanish"}.</span> <br/>
              I’m a {personal.title || "Computer Science Undergraduate"} who enjoys shipping fast, reliable products with a strong foundation in DSA, OS, and networking. I like building interfaces that feel “snappy”, and backend systems that are simple to maintain.
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Server, title: "Backend Systems", desc: "APIs, Node, DB Architectures", color: "text-[#39d353]", borderHover: "hover:border-[#39d353]/30" },
                { icon: Code2, title: "Competitive Prog", desc: "DSA, Algorithm Optimization", color: "text-[#ffbd2e]", borderHover: "hover:border-[#ffbd2e]/30" },
                { icon: Terminal, title: "Linux & Ops", desc: "SysAdmin, CI/CD, Scripting", color: "text-[#a371f7]", borderHover: "hover:border-[#a371f7]/30" }
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl border ${cardBg} ${item.borderHover} p-4 flex flex-col gap-3 ${hoverCardBg} transition-all duration-300 group/card bg-black/10`}>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/card:bg-white/10 transition-colors`}>
                    <item.icon className={`w-5 h-5 ${item.color} group-hover/card:scale-110 transition-transform`} />
                  </div>
                  <div>
                    <div className="text-white/90 font-bold text-sm tracking-tight mb-1">{item.title}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Neofetch Core Stats */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 w-full">
            <div className={`rounded-3xl border ${cardBg} backdrop-blur-md p-6 bg-black/10 hover:bg-black/20 transition-colors`}>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-[#E95420]/10 border border-[#E95420]/20">
                  <Monitor className="w-4 h-4 text-[#E95420]" />
                </div>
                <span className="font-bold text-white/90 uppercase tracking-widest text-xs">System Info</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3 text-xs">
                <span className="text-[#E95420] font-bold">OS</span><span className="text-white/80 truncate">Ubuntu 24.04 LTS x86_64</span>
                <span className="text-[#39d353] font-bold">Host</span><span className="text-white/80 truncate">React-Vite Machine</span>
                <span className="text-[#e94560] font-bold">Kernel</span><span className="text-white/80 truncate">10.0.1 (Web)</span>
                <span className="text-[#ffbd2e] font-bold">Uptime</span><span className="text-white/80 truncate">3 years (Experience)</span>
                <span className="text-[#a371f7] font-bold">Packages</span><span className="text-white/80 truncate">847 (npm)</span>
                <span className="text-[#E95420] font-bold">Shell</span><span className="text-white/80 truncate">bash 5.1.16</span>
              </div>
            </div>

            <div className={`rounded-3xl border ${cardBg} backdrop-blur-md p-6 bg-black/10 hover:bg-black/20 transition-colors`}>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-[#a371f7]/10 border border-[#a371f7]/20">
                  <Briefcase className="w-4 h-4 text-[#a371f7]" />
                </div>
                <span className="font-bold text-white/90 uppercase tracking-widest text-xs">User Identity</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3 text-xs">
                <span className="text-[#E95420] font-bold">Name</span><span className="text-white/80 truncate">{personal.name || "Awanish Kumar Rai"}</span>
                <span className="text-[#39d353] font-bold">Role</span><span className="text-white/80 truncate">{personal.title || "CS Engineer"}</span>
                <span className="text-[#e94560] font-bold">Location</span><span className="text-white/80 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-white/50"/> {personal.location || "India"}</span>
                <span className="text-[#ffbd2e] font-bold">CF</span><a href={socials.codeforces || "#"} className={`text-[#ffbd2e] truncate hover:underline underline-offset-4 decoration-white/20`}>{(socials.codeforces || "").replace(/^https?:\/\//, '').replace(/\/$/, '') || "codeforces.com"}</a>
                <span className="text-[#a371f7] font-bold">CodeChef</span><a href={socials.codechef || "#"} className={`text-[#a371f7] truncate hover:underline underline-offset-4 decoration-white/20`}>{(socials.codechef || "").replace(/^https?:\/\//, '').replace(/\/$/, '') || "codechef.com"}</a>
                <span className="text-[#E95420] font-bold">Editor</span><span className="text-white/80 truncate">Neovim btw</span>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className={`rounded-3xl border ${cardBg} backdrop-blur-md p-7`}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-white/90 font-bold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ffbd2e]/10 border border-[#ffbd2e]/20">
                  <Zap className="w-5 h-5 text-[#ffbd2e]" /> 
                </div>
                <span className="text-lg">Tech Stack</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillGroups.map(([group, items], i) => (
                <div key={group} className={`rounded-2xl border ${cardBg} ${hoverCardBg} p-5 transition-all duration-300 group/skill bg-black/10`}>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#E95420] font-bold mb-4 flex items-center justify-between">
                    {group}
                    <div className="h-px bg-white/5 flex-1 ml-4 group-hover/skill:bg-[#E95420]/30 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {(items || []).map((s) => (
                      <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/70 hover:text-white hover:bg-[#E95420]/20 hover:border-[#E95420]/30 hover:scale-105 transition-all cursor-default relative overflow-hidden group/tag shadow-sm">
                        <span className="relative z-10">{s}</span>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/tag:animate-[shimmer_1.5s_infinite]" />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications (If any) */}
          {certifications.length > 0 && (
            <motion.div variants={itemVariants} className={`rounded-3xl border ${cardBg} backdrop-blur-md p-7`}>
              <div className="text-white/90 font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#39d353]/10 border border-[#39d353]/20">
                  <Globe className="w-5 h-5 text-[#39d353]" /> 
                </div>
                <span className="text-lg">Credentials & Certifications</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-2">
                {certifications.slice(0, 6).map((c) => (
                  <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" 
                    className={`flex items-center justify-between p-4 rounded-2xl border ${cardBg} hover:bg-white/[0.06] hover:border-white/20 group/cert transition-all duration-300 relative overflow-hidden bg-black/10`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#39d353]/50 scale-y-0 group-hover/cert:scale-y-100 transition-transform origin-top" />
                    <span className="text-white/80 group-hover/cert:text-white text-xs md:text-sm font-semibold pr-4 truncate z-10">{c.name}</span>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover/cert:text-[#39d353] transition-colors shrink-0 z-10" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Color Palettes Mini Footer */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2 pt-6 items-center lg:items-end opacity-50 hover:opacity-100 transition-opacity duration-500 w-full pr-2">
            <div className="flex gap-1.5 cursor-crosshair">
              {["#0d1117", "#ff7b72", "#3fb950", "#d29922", "#58a6ff", "#bc8cff", "#39c5cf", "#b1bac4"].map((c) => (
                <div key={c} className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:scale-125 transition-transform shadow-sm" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
            <div className="flex gap-1.5 cursor-crosshair">
              {["#484f58", "#ffa198", "#56d364", "#e3b341", "#79c0ff", "#d2a8ff", "#56d4dd", "#f0f6fc"].map((c) => (
                <div key={c} className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:scale-125 transition-transform shadow-sm" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

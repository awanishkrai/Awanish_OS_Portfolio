import React, { useState, useRef, useEffect } from "react";

const Terminal = ({ isDarkMode }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to Awanish OS Terminal",
    'Type "help" for commands',
    "",
  ]);
  const terminalRef = useRef(null);

  const commands = {
    whoami: () => "awanish",
    projects: () =>
      "Adhyay | OS-Room-Booking-System | Smart-Photo-Editor",
    skills: () =>
      "Python, C++, React, Django, PostgreSQL, MongoDB, TailwindCSS, and more...",
    socials: () =>
      "GitHub: github.com/awanishkrai | LinkedIn: linkedin.com/in/awanish-rai-9296ab221",
    contact: () =>
      "Email: awanish420@gmail.com | Phone: +91-6283642238",
    about: () =>
      "Hey, I'm Awanish Kumar Rai — a Computer Science Engineer passionate about building AI-powered systems, full-stack apps, and automation tools.",
    motto: () => "Code. Create. Conquer.",
    quote: () =>
      '"The best way to predict the future is to build it." — Alan Kay',
    date: () => new Date().toString(),
    osinfo: () => `Awanish OS 1.0
Kernel: React 18.3 + Vite 7
Shell: bash.js
Desktop: FramerMotion UI
Theme: Ubuntu Dark`,
    ls: () =>
      "Desktop  Documents  Downloads  Pictures  Videos  Projects  Resume.pdf",
    pwd: () => "/home/awanish",
    hostname: () => "ubuntu-machine",
    uname: () =>
      "Linux ubuntu-machine 6.8.12-arch #1 SMP PREEMPT x86_64 GNU/Linux",
    version: () =>
      "Awanish OS version 1.0 (built with React, Tailwind, Framer Motion, Vite)",
    help: () => `Available commands:
whoami     → display current user
projects   → list major projects
skills     → show skillset
socials    → show social profiles
contact    → contact information
about      → short bio
date       → current system date/time
osinfo     → system information
ls         → list directories
pwd        → show current directory
uname      → kernel info
version    → show OS version
clear      → clear the screen
help       → show this help menu`,
    clear: "CLEAR",
  };

  const handleCommand = () => {
    const cmd = input.toLowerCase().trim();
    const newOutput = [...output, `$ ${input}`];

    if (cmd === "clear") {
      setOutput([]);
    } else if (commands[cmd]) {
      const result =
        typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd];
      setOutput([...newOutput, result, ""]);
    } else if (cmd) {
      setOutput([...newOutput, `command not found: ${cmd}`, ""]);
    }

    setInput("");

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-slate-950" : "bg-slate-100"
      } text-green-400 p-4 h-full flex flex-col font-mono text-sm`}
    >
      <div ref={terminalRef} className="flex-1 overflow-auto mb-2 space-y-1">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex gap-1 text-green-400">
        <span>$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
          autoFocus
          className="bg-transparent outline-none flex-1 text-green-400"
        />
      </div>
    </div>
  );
};

export default Terminal;

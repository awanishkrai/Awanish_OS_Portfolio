import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Terminal = ({ isDarkMode }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to Awanish OS Terminal', 'Type "help" for commands', '']);
  const terminalRef = useRef(null);

  const commands = {
    whoami: 'Awanish Kumar Rai',
    projects: 'Adhyay | OS-Room-Booking-System | Smart-Photo-Editor',
    skills: 'Python, C++, React, Django, PostgreSQL, MongoDB, and more...',
    socials: 'GitHub: github.com/awanishkrai | LinkedIn: linkedin.com/in/awanish-rai-9296ab221',
    help: 'Available commands: whoami, projects, skills, socials, clear, help, contact',
    contact: 'Email: awanish420@gmail.com | Phone: +91-6283642238',
    clear: 'CLEAR',
  };

  const handleCommand = () => {
    const cmd = input.toLowerCase().trim();
    const newOutput = [...output, `$ ${input}`];

    if (cmd === 'clear') {
      setOutput([]);
    } else if (commands[cmd]) {
      newOutput.push(commands[cmd]);
    } else if (cmd) {
      newOutput.push(`command not found: ${cmd}`);
    }

    newOutput.push('');
    setOutput(newOutput);
    setInput('');

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  return (
    <div className="bg-slate-950 text-green-400 p-4 h-full flex flex-col font-mono text-sm">
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
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
          autoFocus
          className="bg-transparent outline-none flex-1 text-green-400"
        />
      </div>
    </div>
  );
};
export default Terminal;
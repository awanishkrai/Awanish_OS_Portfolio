import React, { useState, useRef, useEffect } from "react";

const Terminal = ({ isDarkMode }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to PortfolioOS Terminal v1.0.0",
    "Type 'help' to see a list of available commands.",
    ""
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isWiping, setIsWiping] = useState(false);
  const terminalRef = useRef(null);

  const fileSystem = {
    "resume.md": "Awanish Kumar Rai\\nComputer Science Engineer\\n...",
    "projects.txt": "1. PortfolioOS\\n2. Adhyay\\n3. Smart-Photo-Editor",
    "contact.txt": "Email: awanish420@gmail.com\\nPhone: +91-6283642238"
  };

  const handleCommand = () => {
    if (isWiping) return;

    let cmdString = input.trim();
    if (!cmdString) return;

    // Add to history
    const newHistory = [...history, cmdString];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length);

    let newOutput = [...output, `visitor@awanish-os:~$ ${cmdString}`];
    
    // Parse command
    const args = cmdString.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case "help":
        newOutput.push(
          "Available commands:",
          "  whoami      - display current user",
          "  pwd         - print working directory",
          "  ls          - list directory contents",
          "  cd <dir>    - change directory (mock)",
          "  cat <file>  - print generic files",
          "  echo <text> - print text",
          "  git log     - show mock commit history",
          "  vim         - open text editor",
          "  curl <url>  - fetch URL",
          "  ssh <user>  - connect to remote host",
          "  clear       - clear terminal screen",
          "  sudo        - execute command as superuser"
        );
        break;
      case "whoami":
        newOutput.push("visitor");
        break;
      case "pwd":
        newOutput.push("/home/visitor");
        break;
      case "ls":
        newOutput.push("resume.md   projects.txt   contact.txt   src   package.json");
        break;
      case "cd":
        if (args[1]) {
          newOutput.push(`bash: cd: ${args[1]}: Not a real directory. We are stuck in /home/visitor forever.`);
        } else {
          newOutput.push("");
        }
        break;
      case "cat":
        if (!args[1]) {
          newOutput.push("cat: missing operand");
        } else if (fileSystem[args[1]]) {
          fileSystem[args[1]].split('\\n').forEach(line => newOutput.push(line));
        } else {
          newOutput.push(`cat: ${args[1]}: No such file or directory`);
        }
        break;
      case "echo":
        newOutput.push(args.slice(1).join(" "));
        break;
      case "git":
        if (args[1] === "log") {
          newOutput.push(
            "commit 8f2a99c (HEAD -> main)",
            "Author: Awanish Kumar Rai <awanish420@gmail.com>",
            "Date:   Today",
            "",
            "    Initial mock commit for PortfolioOS",
            "",
            "commit 1a2b3c4",
            "Author: Awanish Kumar Rai <awanish420@gmail.com>",
            "Date:   Yesterday",
            "",
            "    Added deep space background and scanlines"
          );
        } else {
          newOutput.push("Try 'git log'");
        }
        break;
      case "vim":
      case "vi":
      case "nvim":
        newOutput.push("Starting Neovim...");
        window.dispatchEvent(new CustomEvent('app-request', { detail: 'resume' }));
        break;
      case "curl":
        if (args[1] === "alex.dev/resume" || args[1] === "awanish.dev/resume") {
          newOutput.push("Fetching resume...", "301 Moved Permanently", "Redirecting to GUI App...");
          window.dispatchEvent(new CustomEvent('app-request', { detail: 'resume' }));
        } else {
          newOutput.push(`curl: (6) Could not resolve host: ${args[1] || ''}`);
        }
        break;
      case "ssh":
        if (args[1]) {
          if (args[1].includes("@")) {
            newOutput.push(`Connecting to ${args[1]}...`, "Connection established.");
            window.location.href = `mailto:${args[1]}`;
          } else {
            newOutput.push("ssh: Could not resolve hostname");
          }
        } else {
          newOutput.push("usage: ssh user@host");
        }
        break;
      case "sudo":
        if (args[1] === "rm" && args[2] === "-rf" && args[3] === "/") {
          setIsWiping(true);
          startWipeAnimation();
          return; // Exit handleCommand early so we don't clear input text yet
        } else {
          newOutput.push("visitor is not in the sudoers file. This incident will be reported.");
        }
        break;
      case "konami":
        newOutput.push("Cheat code activated! 🎮 (Easter Egg)");
        document.body.style.filter = "hue-rotate(180deg) invert(10%)";
        setTimeout(() => { document.body.style.filter = ""; }, 5000);
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      default:
        newOutput.push(`bash: ${cmd}: command not found`);
    }

    setOutput(newOutput);
    setInput("");
  };

  const startWipeAnimation = () => {
    let outputLines = [...output, "visitor@awanish-os:~$ sudo rm -rf /"];
    setOutput(outputLines);
    setInput("");
    
    const dirs = ["/boot", "/bin", "/dev", "/etc", "/home", "/lib", "/mnt", "/opt", "/root", "/sbin", "/sys", "/tmp", "/usr", "/var", "/portfolio", "/skills", "/memories"];
    let i = 0;
    
    const wipeInterval = setInterval(() => {
      if (i < 50) {
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const file = Math.random().toString(36).substring(7);
        outputLines = [...outputLines, `rm: removing '${dir}/${file}'`];
        // Keep only last 50 lines to avoid lagging
        if (outputLines.length > 50) outputLines = outputLines.slice(-50);
        setOutput([...outputLines]);
        i++;
      } else {
        clearInterval(wipeInterval);
        outputLines = [...outputLines, "", "System completely wiped. Just kidding. Reloading virtual OS interface..."];
        setOutput([...outputLines]);
        setTimeout(() => {
          setIsWiping(false);
          setOutput(["Welcome to PortfolioOS Terminal v1.0.0", "System restored from snapshot."]);
        }, 3000);
      }
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(history.length);
        setInput("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={`w-full h-full p-4 font-mono text-sm flex flex-col ${isDarkMode ? "bg-[#0d1117] text-[#39d353]" : "bg-[#f8f9fa] text-[#24292e]"}`} onClick={() => document.getElementById("terminal-input")?.focus()}>
      <div ref={terminalRef} className="flex-1 overflow-auto whitespace-pre-wrap break-words">
        {output.map((line, i) => (
          <div key={i} className="min-h-[20px]">{line}</div>
        ))}
        {!isWiping && (
          <div className="flex">
            <span className="mr-2">visitor@awanish-os:~$</span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-inherit shadow-none"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;

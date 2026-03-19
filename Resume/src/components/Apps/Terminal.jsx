import React, { useState, useRef, useEffect, useCallback } from "react";
import { PORTFOLIO_DATA } from "../../constants/portfolioData";

const Terminal = ({ isDarkMode }) => {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};
  const projects = PORTFOLIO_DATA?.projects ?? [];
  const skills = PORTFOLIO_DATA?.skills ?? {};
  const education = PORTFOLIO_DATA?.education ?? {};
  const cp = PORTFOLIO_DATA?.competitiveProgramming ?? [];
  const certs = PORTFOLIO_DATA?.certifications ?? [];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { text: `Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)`, color: "white" },
    { text: "" },
    { text: " * Documentation:  https://help.ubuntu.com", color: "dim" },
    { text: " * Management:     https://landscape.canonical.com", color: "dim" },
    { text: " * Support:        https://ubuntu.com/pro", color: "dim" },
    { text: "" },
    { text: "Last login: " + new Date().toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) + " on pts/0", color: "dim" },
    { text: `Type 'help' for available commands, 'neofetch' for system info.`, color: "dim" },
    { text: "" },
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cwd, setCwd] = useState("~");
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const USER = "visitor";
  const HOST = "ubuntu";

  // ── Virtual File System ──
  const fileSystem = {
    "~": {
      type: "dir",
      children: {
        "Desktop": { type: "dir", children: {
          "Resume.pdf": { type: "file", content: `${personal.name}\n${personal.title}\n${personal.subtitle}\nLocation: ${personal.location}\nEmail: ${personal.email}\nPhone: ${personal.phone}` },
        }},
        "Documents": { type: "dir", children: {
          "projects.md": { type: "file", content: projects.map((p, i) => `## ${i+1}. ${p.name}\n${p.description}\nTech: ${p.technologies}\n`).join("\n") },
          "certifications.txt": { type: "file", content: certs.map((c, i) => `${i+1}. ${c}`).join("\n") },
        }},
        "Downloads": { type: "dir", children: {} },
        ".bashrc": { type: "file", content: "# ~/.bashrc\nexport PS1='\\u@\\h:\\w\\$ '\nalias ll='ls -la'\nalias la='ls -A'\nalias grep='grep --color=auto'" },
        ".profile": { type: "file", content: "# ~/.profile\n# executed by the command interpreter for login shells" },
        "contact.txt": { type: "file", content: `Email: ${personal.email}\nPhone: ${personal.phone}\nGitHub: ${socials.github}\nLinkedIn: ${socials.linkedin}` },
        "skills.json": { type: "file", content: JSON.stringify(skills, null, 2) },
        "README.md": { type: "file", content: `# ${personal.name}\n\n${personal.subtitle}\n\n## Quick Links\n- GitHub: ${socials.github}\n- LinkedIn: ${socials.linkedin}\n- Email: ${personal.email}` },
      }
    }
  };

  const resolvePath = (path) => {
    let resolved = path;
    if (resolved === "~" || resolved === "") return "~";
    if (resolved.startsWith("~/")) resolved = resolved;
    else if (!resolved.startsWith("~")) resolved = cwd === "~" ? `~/${resolved}` : `${cwd}/${resolved}`;
    // Remove trailing slash
    if (resolved.endsWith("/") && resolved.length > 1) resolved = resolved.slice(0, -1);
    // Handle ..
    const parts = resolved.split("/");
    const stack = [];
    for (const p of parts) {
      if (p === "..") { if (stack.length > 1) stack.pop(); }
      else if (p !== ".") stack.push(p);
    }
    return stack.join("/") || "~";
  };

  const getNode = (path) => {
    if (path === "~") return fileSystem["~"];
    const parts = path.split("/").filter(Boolean);
    let node = fileSystem;
    for (const p of parts) {
      if (node[p]) node = node[p];
      else if (node.children && node.children[p]) node = node.children[p];
      else return null;
    }
    return node;
  };

  const promptStr = `${USER}@${HOST}:${cwd}$`;

  const line = (text, color) => ({ text: text ?? "", color });
  const green = (t) => line(t, "green");
  const orange = (t) => line(t, "orange");
  const cyan = (t) => line(t, "cyan");
  const red = (t) => line(t, "red");
  const yellow = (t) => line(t, "yellow");
  const dim = (t) => line(t, "dim");
  const bold = (t) => line(t, "bold");
  const plain = (t) => line(t, "white");

  // ── Neofetch ──
  const neofetchOutput = () => {
    const logo = [
      "            .-/+oossssoo+/-.            ",
      "        `:+ssssssssssssssssss+:`        ",
      "      -+ssssssssssssssssssyyssss+-      ",
      "    .ossssssssssssssssssd" + "MMMNy" + "sssso.    ",
      "   /sssssssssss" + "hdmmNNmmyNMMMMh" + "ssssss/   ",
      "  +sssssssss" + "hmydMMMMMMMNddddy" + "ssssssss+  ",
      " /ssssssss" + "hNMMMyhhyyyyhmNMMMNh" + "ssssssss/ ",
      ".ssssssss" + "dMMMNh" + "ssssssssss" + "hNMMMd" + "ssssssss.",
      "+ssss" + "hhhyNMMNy" + "ssssssssssss" + "yNMMMy" + "sssssss+",
      "oss" + "yNMMMNyMMh" + "ssssssssssssss" + "hmmmh" + "ssssssso",
      "oss" + "yNMMMNyMMh" + "sssssssssssssssmh" + "ssssssssso",
      "+ssss" + "hhhyNMMNy" + "ssssssssssssss" + "yNMMMy" + "sssssss+",
      ".ssssssss" + "dMMMNh" + "ssssssssss" + "hNMMMd" + "ssssssss.",
      " /ssssssss" + "hNMMMyhhyyyyhdNMMMNh" + "ssssssss/ ",
      "  +sssssssss" + "dmydMMMMMMMMddddy" + "ssssssss+  ",
      "   /sssssssssss" + "hdmNNNNmyNMMMMh" + "ssssss/   ",
      "    .ossssssssssssssssss" + "dMMMNy" + "sssso.    ",
      "      -+sssssssssssssssss" + "yyy" + "ssss+-      ",
      "        `:+ssssssssssssssssss+:`        ",
      "            .-/+oossssoo+/-.            ",
    ];

    const info = [
      [`${USER}@${HOST}`, "title"],
      ["─".repeat(20), "dim"],
      ["OS", "Ubuntu 24.04 LTS x86_64"],
      ["Host", "React-Vite Machine"],
      ["Kernel", "6.8.0-generic"],
      ["Uptime", `${Math.floor(Math.random() * 5 + 1)} hours, ${Math.floor(Math.random() * 59)} mins`],
      ["Packages", "847 (npm)"],
      ["Shell", "bash 5.2.21"],
      ["Resolution", `${window.innerWidth}x${window.innerHeight}`],
      ["DE", "GNOME 46.0"],
      ["WM", "Mutter"],
      ["Theme", "Yaru-dark [GTK3]"],
      ["Icons", "Yaru [GTK3]"],
      ["Terminal", "gnome-terminal"],
      ["CPU", `Human Brain (1) @ ${(2 + Math.random()).toFixed(1)}GHz`],
      ["Memory", `${Math.floor(Math.random() * 4000 + 2000)}MiB / 16384MiB`],
    ];

    const lines = [];
    const maxLogo = Math.max(logo.length, info.length + 2);

    for (let i = 0; i < maxLogo; i++) {
      const logoLine = i < logo.length ? logo[i] : " ".repeat(40);
      if (i < info.length) {
        const entry = info[i];
        if (entry[1] === "title") {
          lines.push({ text: `${logoLine}  ${entry[0]}`, color: "neofetch" });
        } else if (entry[1] === "dim") {
          lines.push({ text: `${logoLine}  ${entry[0]}`, color: "dim" });
        } else {
          lines.push({ text: `${logoLine}  `, parts: [
            { text: entry[0], color: "orange" },
            { text: ": ", color: "white" },
            { text: entry[1], color: "white" },
          ]});
        }
      } else if (i === info.length) {
        // Color blocks
        lines.push({ text: `${logoLine}  `, parts: [
          { text: "███", color: "#2c001e" }, { text: "███", color: "#E95420" },
          { text: "███", color: "#77216f" }, { text: "███", color: "#f0a30a" },
          { text: "███", color: "#27AE60" }, { text: "███", color: "#3468d5" },
          { text: "███", color: "#8e44ad" }, { text: "███", color: "#ffffff" },
        ]});
      } else {
        lines.push({ text: logoLine, color: "ubuntu" });
      }
    }
    return lines;
  };

  // ── Tab completion ──
  const handleTab = useCallback(() => {
    const parts = input.split(" ");
    const allCommands = [
      "help", "whoami", "pwd", "ls", "cd", "cat", "echo", "clear", "neofetch",
      "date", "uptime", "uname", "hostname", "history", "grep", "find", "tree",
      "man", "git", "vim", "vi", "nvim", "nano", "curl", "wget", "ssh", "ping",
      "sudo", "apt", "htop", "skills", "projects", "contact", "open", "fortune",
      "cowsay", "matrix", "exit",
    ];

    if (parts.length === 1) {
      const matches = allCommands.filter(c => c.startsWith(parts[0]));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) {
        setOutput(prev => [
          ...prev,
          line(`${promptStr} ${input}`, "white"),
          line(matches.join("  "), "dim"),
        ]);
      }
    } else {
      // File completion
      const node = getNode(cwd);
      if (node?.children) {
        const partial = parts[parts.length - 1];
        const matches = Object.keys(node.children).filter(f => f.toLowerCase().startsWith(partial.toLowerCase()));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setInput(parts.join(" "));
        } else if (matches.length > 1) {
          setOutput(prev => [...prev, line(`${promptStr} ${input}`, "white"), line(matches.join("  "), "cyan")]);
        }
      }
    }
  }, [input, cwd, promptStr]);

  // ── Command handler ──
  const handleCommand = () => {
    if (isAnimating) return;

    let cmdString = input.trim();
    if (!cmdString) { setOutput(prev => [...prev, line(`${promptStr} `, "white")]); return; }

    const newHistory = [...history, cmdString];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length);

    let newLines = [line(`${promptStr} ${cmdString}`, "prompt")];
    const args = cmdString.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case "help":
        newLines.push(
          bold("Available commands:"),
          plain(""),
          orange("  Navigation & Files"),
          dim("    ls [path]       List directory contents"),
          dim("    cd <dir>        Change directory"),
          dim("    pwd             Print working directory"),
          dim("    cat <file>      Read file contents"),
          dim("    tree            Show directory tree"),
          dim("    find <name>     Search for files"),
          plain(""),
          orange("  System"),
          dim("    whoami          Current user info"),
          dim("    neofetch        System information"),
          dim("    uname -a        Kernel information"),
          dim("    hostname        Display hostname"),
          dim("    uptime          System uptime"),
          dim("    date            Current date/time"),
          dim("    htop            Process viewer"),
          dim("    history         Command history"),
          plain(""),
          orange("  Portfolio"),
          dim("    skills          List technical skills"),
          dim("    projects        Show project list"),
          dim("    contact         Contact information"),
          dim("    open <app>      Launch an application"),
          plain(""),
          orange("  Tools"),
          dim("    echo <text>     Print text"),
          dim("    grep <pat> <f>  Search in file"),
          dim("    git log         Git commit history"),
          dim("    vim / nano      Open text editor"),
          dim("    curl <url>      Fetch a URL"),
          dim("    ping <host>     Test connectivity"),
          dim("    ssh <user@host> Remote connect"),
          dim("    apt install     Package manager"),
          plain(""),
          orange("  Fun"),
          dim("    fortune         Random wisdom"),
          dim("    cowsay <text>   ASCII cow"),
          dim("    matrix          Matrix rain"),
          dim("    sudo rm -rf /   🔥"),
          dim("    clear           Clear terminal"),
          dim("    exit            Close terminal"),
        );
        break;

      case "whoami":
        newLines.push(plain(USER));
        break;

      case "id":
        newLines.push(plain(`uid=1000(${USER}) gid=1000(${USER}) groups=1000(${USER}),4(adm),27(sudo)`));
        break;

      case "pwd":
        newLines.push(plain(cwd === "~" ? `/home/${USER}` : cwd.replace("~", `/home/${USER}`)));
        break;

      case "hostname":
        newLines.push(plain(HOST));
        break;

      case "uname":
        if (args.includes("-a")) {
          newLines.push(plain(`Linux ${HOST} 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`));
        } else {
          newLines.push(plain("Linux"));
        }
        break;

      case "date":
        newLines.push(plain(new Date().toString()));
        break;

      case "uptime":
        const hrs = Math.floor(Math.random() * 8 + 1);
        const mins = Math.floor(Math.random() * 59);
        newLines.push(plain(` ${new Date().toLocaleTimeString("en-US", {hour12: false})} up ${hrs}:${String(mins).padStart(2,"0")}, 1 user, load average: 0.${Math.floor(Math.random()*50)}, 0.${Math.floor(Math.random()*30)}, 0.${Math.floor(Math.random()*20)}`));
        break;

      case "ls": {
        const targetPath = args[1] ? resolvePath(args[1]) : cwd;
        const node = getNode(targetPath);
        if (!node) { newLines.push(red(`ls: cannot access '${args[1]}': No such file or directory`)); break; }
        if (node.type === "file") { newLines.push(plain(args[1])); break; }
        const children = node.children || {};
        const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al");
        const showLong = args.includes("-l") || args.includes("-la") || args.includes("-al");
        let entries = Object.keys(children);
        if (showAll) entries = [".", "..", ...entries];

        if (showLong) {
          newLines.push(dim(`total ${entries.length * 4}`));
          entries.forEach(name => {
            const isDir = name === "." || name === ".." || (children[name] && children[name].type === "dir");
            const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
            const size = isDir ? "4096" : String((children[name]?.content?.length || 0)).padStart(4);
            const dateStr = "Mar 18 12:00";
            const displayName = isDir ? name + "/" : name;
            newLines.push({
              text: `${perms}  1 ${USER} ${USER}  ${size} ${dateStr} `,
              parts: [{ text: displayName, color: isDir ? "blue" : name.startsWith(".") ? "dim" : "white" }]
            });
          });
        } else {
          const display = entries.map(name => {
            const isDir = name === "." || name === ".." || (children[name] && children[name].type === "dir");
            return { name: isDir ? name + "/" : name, color: isDir ? "blue" : name.startsWith(".") ? "dim" : "white" };
          });
          newLines.push({ text: "", parts: display.map(d => ({ text: d.name + "  ", color: d.color })) });
        }
        break;
      }

      case "cd": {
        if (!args[1] || args[1] === "~") { setCwd("~"); break; }
        if (args[1] === "..") {
          if (cwd !== "~") {
            const parts = cwd.split("/");
            parts.pop();
            setCwd(parts.join("/") || "~");
          }
          break;
        }
        const target = resolvePath(args[1]);
        const node = getNode(target);
        if (!node) { newLines.push(red(`bash: cd: ${args[1]}: No such file or directory`)); break; }
        if (node.type !== "dir") { newLines.push(red(`bash: cd: ${args[1]}: Not a directory`)); break; }
        setCwd(target);
        break;
      }

      case "cat": {
        if (!args[1]) { newLines.push(red("cat: missing operand")); break; }
        const target = resolvePath(args[1]);
        const node = getNode(target);
        if (!node) { newLines.push(red(`cat: ${args[1]}: No such file or directory`)); break; }
        if (node.type === "dir") { newLines.push(red(`cat: ${args[1]}: Is a directory`)); break; }
        (node.content || "").split("\n").forEach(l => newLines.push(plain(l)));
        break;
      }

      case "tree": {
        const targetPath = args[1] ? resolvePath(args[1]) : cwd;
        const node = getNode(targetPath);
        if (!node || node.type !== "dir") { newLines.push(red("Not a directory")); break; }
        newLines.push(cyan(targetPath === "~" ? "." : targetPath));
        const buildTree = (n, prefix) => {
          const entries = Object.keys(n.children || {});
          entries.forEach((name, i) => {
            const isLast = i === entries.length - 1;
            const connector = isLast ? "└── " : "├── ";
            const child = n.children[name];
            const color = child.type === "dir" ? "blue" : "white";
            newLines.push({ text: prefix + connector, parts: [{ text: name, color }] });
            if (child.type === "dir") buildTree(child, prefix + (isLast ? "    " : "│   "));
          });
        };
        buildTree(node, "");
        const countAll = (n) => { let c = 0; Object.values(n.children || {}).forEach(v => { c++; if (v.type === "dir") c += countAll(v); }); return c; };
        newLines.push(dim(`\n${countAll(node)} entries`));
        break;
      }

      case "find": {
        if (!args[1]) { newLines.push(red("find: missing argument")); break; }
        const query = args[1].toLowerCase();
        const results = [];
        const search = (node, path) => {
          Object.entries(node.children || {}).forEach(([name, child]) => {
            const full = `${path}/${name}`;
            if (name.toLowerCase().includes(query)) results.push(full);
            if (child.type === "dir") search(child, full);
          });
        };
        search(getNode("~"), ".");
        if (results.length) results.forEach(r => newLines.push(cyan(r)));
        else newLines.push(dim("No matching files found."));
        break;
      }

      case "grep": {
        if (args.length < 3) { newLines.push(red("Usage: grep <pattern> <file>")); break; }
        const pattern = args[1].toLowerCase();
        const node = getNode(resolvePath(args[2]));
        if (!node || node.type !== "file") { newLines.push(red(`grep: ${args[2]}: No such file`)); break; }
        const matches = (node.content || "").split("\n").filter(l => l.toLowerCase().includes(pattern));
        if (matches.length) matches.forEach(m => {
          const idx = m.toLowerCase().indexOf(pattern);
          newLines.push({ text: "", parts: [
            { text: m.substring(0, idx), color: "white" },
            { text: m.substring(idx, idx + pattern.length), color: "red" },
            { text: m.substring(idx + pattern.length), color: "white" },
          ]});
        });
        else newLines.push(dim("(no matches)"));
        break;
      }

      case "echo":
        newLines.push(plain(args.slice(1).join(" ")));
        break;

      case "history":
        history.forEach((h, i) => newLines.push(dim(`  ${String(i + 1).padStart(4)}  ${h}`)));
        break;

      case "skills": {
        newLines.push(bold("Technical Skills:"), plain(""));
        Object.entries(skills).forEach(([cat, items]) => {
          newLines.push({ text: "  ", parts: [
            { text: cat, color: "orange" }, { text: ": ", color: "white" },
            { text: (items || []).join(", "), color: "white" },
          ]});
        });
        break;
      }

      case "projects": {
        newLines.push(bold("Projects:"), plain(""));
        projects.forEach((p, i) => {
          newLines.push(orange(`  ${i + 1}. ${p.name}`));
          newLines.push(dim(`     ${p.description}`));
          newLines.push(cyan(`     Tech: ${p.technologies}`));
          newLines.push(plain(""));
        });
        break;
      }

      case "contact":
        newLines.push(bold("Contact Information:"), plain(""));
        newLines.push({ text: "  ", parts: [{ text: "Email", color: "orange" }, { text: `: ${personal.email}`, color: "white" }] });
        newLines.push({ text: "  ", parts: [{ text: "Phone", color: "orange" }, { text: `: ${personal.phone}`, color: "white" }] });
        newLines.push({ text: "  ", parts: [{ text: "GitHub", color: "orange" }, { text: `: ${socials.github}`, color: "cyan" }] });
        newLines.push({ text: "  ", parts: [{ text: "LinkedIn", color: "orange" }, { text: `: ${socials.linkedin}`, color: "cyan" }] });
        break;

      case "neofetch":
        newLines.push(...neofetchOutput());
        break;

      case "htop": {
        newLines.push(bold("  PID USER     PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command"));
        const procs = [
          [1, "root", 20, 0, "169M", "13M", "8M", "S", 0.0, 0.1, "0:02.1", "/sbin/init"],
          [142, "root", 20, 0, "45M", "6M", "5M", "S", 0.0, 0.0, "0:00.4", "/usr/lib/systemd"],
          [287, USER, 20, 0, "1.2G", "180M", "45M", "S", 12.3, 1.1, "3:42.7", "node vite dev"],
          [301, USER, 20, 0, "720M", "95M", "32M", "S", 5.6, 0.6, "1:18.3", "react-scripts"],
          [445, USER, 20, 0, "2.1G", "340M", "80M", "S", 8.9, 2.1, "5:07.9", "firefox"],
          [512, USER, 20, 0, "450M", "60M", "25M", "S", 2.1, 0.4, "0:44.2", "gnome-terminal"],
        ];
        procs.forEach(p => {
          newLines.push(dim(`${String(p[0]).padStart(5)} ${String(p[1]).padEnd(8)} ${p[2]}  ${String(p[3]).padStart(2)}  ${String(p[4]).padStart(5)} ${String(p[5]).padStart(5)} ${String(p[6]).padStart(4)} ${p[7]} ${String(p[8]).padStart(4)} ${String(p[9]).padStart(4)} ${String(p[10]).padStart(8)} ${p[11]}`));
        });
        newLines.push(plain(""));
        newLines.push(dim("Press 'q' to quit (just kidding, this is a mock htop)"));
        break;
      }

      case "git":
        if (args[1] === "log") {
          const commits = [
            { hash: "a8f3e2c", msg: "feat: add neofetch with Ubuntu ASCII art", date: "2 hours ago" },
            { hash: "7b2d1a9", msg: "style: apply Yaru icon theme to desktop", date: "5 hours ago" },
            { hash: "3c9f4b8", msg: "refactor: move dock to left side (GNOME layout)", date: "1 day ago" },
            { hash: "1e5a7d2", msg: "feat: implement virtual file system in terminal", date: "2 days ago" },
            { hash: "9d4c6f1", msg: "init: initial commit — Ubuntu PortfolioOS", date: "3 days ago" },
          ];
          commits.forEach(c => {
            newLines.push({ text: "", parts: [{ text: `commit ${c.hash}`, color: "yellow" }] });
            newLines.push(dim(`Author: ${personal.name} <${personal.email}>`));
            newLines.push(dim(`Date:   ${c.date}`));
            newLines.push(plain(`    ${c.msg}`));
            newLines.push(plain(""));
          });
        } else if (args[1] === "status") {
          newLines.push(green("On branch main"));
          newLines.push(plain("Your branch is up to date with 'origin/main'."));
          newLines.push(plain("nothing to commit, working tree clean"));
        } else {
          newLines.push(dim(`git: '${args[1] || ""}' is not a git command. Try 'git log' or 'git status'.`));
        }
        break;

      case "vim": case "vi": case "nvim": case "nano":
        newLines.push(dim(`Opening ${cmd}...`));
        window.dispatchEvent(new CustomEvent("app-request", { detail: "resume" }));
        break;

      case "open": {
        const appMap = { about: "about", projects: "projects", terminal: "terminal", resume: "resume", browser: "browser", firefox: "browser", settings: "settings", certificates: "certificates", skills: "skills", education: "education", contact: "contact", cp: "cp" };
        const target = appMap[(args[1] || "").toLowerCase()];
        if (target) {
          newLines.push(dim(`Opening ${args[1]}...`));
          window.dispatchEvent(new CustomEvent("app-request", { detail: target }));
        } else {
          newLines.push(red(`open: application '${args[1] || ""}' not found. Try: ${Object.keys(appMap).join(", ")}`));
        }
        break;
      }

      case "curl":
        if (args[1]) {
          newLines.push(dim(`  % Total    % Received % Xferd  Average Speed   Time`));
          newLines.push(dim(`100  1256  100  1256    0     0   4186      0 --:--:-- --:--:--`));
          newLines.push(plain(`<!DOCTYPE html><html><head><title>${personal.name}</title></head></html>`));
        } else {
          newLines.push(red("curl: try 'curl <url>'"));
        }
        break;

      case "wget":
        if (args[1]) {
          newLines.push(dim(`--${new Date().toISOString()}--  ${args[1]}`));
          newLines.push(dim("Resolving... connecting... HTTP request sent."));
          newLines.push(green(`'index.html' saved [1256/1256]`));
        } else {
          newLines.push(red("wget: missing URL"));
        }
        break;

      case "ping": {
        if (!args[1]) { newLines.push(red("ping: missing destination")); break; }
        for (let i = 0; i < 4; i++) {
          const ms = (Math.random() * 30 + 5).toFixed(1);
          newLines.push(plain(`64 bytes from ${args[1]}: icmp_seq=${i+1} ttl=64 time=${ms} ms`));
        }
        newLines.push(dim(`--- ${args[1]} ping statistics ---`));
        newLines.push(dim("4 packets transmitted, 4 received, 0% packet loss"));
        break;
      }

      case "ssh":
        if (args[1]?.includes("@")) {
          newLines.push(dim(`Connecting to ${args[1]}...`));
          newLines.push(green("Connection established. Welcome!"));
        } else {
          newLines.push(red("usage: ssh user@host"));
        }
        break;

      case "apt":
        if (args[1] === "install") {
          newLines.push(dim("E: Could not open lock file - open (13: Permission denied)"));
          newLines.push(red("E: Unable to lock the administration directory. Are you root?"));
        } else if (args[1] === "update") {
          newLines.push(dim("Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease"));
          newLines.push(dim("Hit:2 http://security.ubuntu.com/ubuntu noble-security InRelease"));
          newLines.push(green("All packages are up to date."));
        } else {
          newLines.push(dim(`apt: try 'apt update' or 'apt install <package>'`));
        }
        break;

      case "sudo":
        if (args[1] === "rm" && args[2] === "-rf" && args[3] === "/") {
          setIsAnimating(true);
          startWipeAnimation();
          setInput("");
          return;
        } else if (args[1] === "apt" && args[2] === "install") {
          newLines.push(dim(`Reading package lists... Done`));
          newLines.push(dim(`Building dependency tree... Done`));
          newLines.push(green(`${args[3] || "package"} is already the newest version.`));
          newLines.push(dim(`0 upgraded, 0 newly installed, 0 to remove.`));
        } else {
          newLines.push(yellow(`[sudo] password for ${USER}: `));
          newLines.push(red(`${USER} is not in the sudoers file. This incident will be reported.`));
        }
        break;

      case "fortune": {
        const fortunes = [
          "\"The best way to predict the future is to implement it.\" — David Heinemeier Hansson",
          "\"First, solve the problem. Then, write the code.\" — John Johnson",
          "\"Code is like humor. When you have to explain it, it's bad.\" — Cory House",
          "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" — Martin Fowler",
          "\"Talk is cheap. Show me the code.\" — Linus Torvalds",
          "\"It works on my machine. ¯\\_(ツ)_/¯\"",
          `\"Hire ${personal.name}. Your future self will thank you.\" — Fortune Cookie`,
        ];
        newLines.push(green(fortunes[Math.floor(Math.random() * fortunes.length)]));
        break;
      }

      case "cowsay": {
        const msg = args.slice(1).join(" ") || "Moo! Hire me!";
        const border = "-".repeat(msg.length + 2);
        newLines.push(plain(` ${border}`));
        newLines.push(plain(`< ${msg} >`));
        newLines.push(plain(` ${border}`));
        newLines.push(plain("        \\   ^__^"));
        newLines.push(plain("         \\  (oo)\\_______"));
        newLines.push(plain("            (__)\\       )\\/\\"));
        newLines.push(plain("                ||----w |"));
        newLines.push(plain("                ||     ||"));
        break;
      }

      case "matrix":
        newLines.push(green("Entering the matrix..."));
        document.body.style.filter = "hue-rotate(90deg) saturate(200%)";
        setTimeout(() => { document.body.style.filter = ""; }, 4000);
        break;

      case "exit":
        newLines.push(dim("Closing terminal..."));
        setTimeout(() => { window.dispatchEvent(new CustomEvent("app-request", { detail: "close-terminal" })); }, 500);
        break;

      case "clear":
        setOutput([]);
        setInput("");
        return;

      case "man":
        if (args[1]) {
          newLines.push(bold(`${args[1].toUpperCase()}(1)   User Commands   ${args[1].toUpperCase()}(1)`));
          newLines.push(plain(""));
          newLines.push(bold("NAME"));
          newLines.push(plain(`       ${args[1]} - a simulated command in Ubuntu PortfolioOS`));
          newLines.push(plain(""));
          newLines.push(bold("DESCRIPTION"));
          newLines.push(plain(`       This is a mock terminal. Type 'help' for actual available commands.`));
        } else {
          newLines.push(red("What manual page do you want? Try 'man <command>'"));
        }
        break;

      default:
        newLines.push(red(`Command '${cmd}' not found. Type 'help' for available commands.`));
        newLines.push(dim(`Try: sudo apt install ${cmd}`));
    }

    setOutput(prev => [...prev, ...newLines]);
    setInput("");
  };

  // ── sudo rm -rf / animation ──
  const startWipeAnimation = () => {
    let lines = [line(`${promptStr} sudo rm -rf /`, "prompt")];
    setOutput(prev => [...prev, ...lines]);
    setInput("");

    const dirs = ["/boot","/bin","/dev","/etc","/home","/lib","/mnt","/opt","/root","/sbin","/sys","/tmp","/usr","/var","/portfolio","/skills"];
    let i = 0;
    const interval = setInterval(() => {
      if (i < 40) {
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const file = Math.random().toString(36).substring(7);
        setOutput(prev => {
          const next = [...prev, red(`rm: removing '${dir}/${file}'`)];
          return next.length > 60 ? next.slice(-60) : next;
        });
        i++;
      } else {
        clearInterval(interval);
        setOutput(prev => [...prev, plain(""), yellow("System wiped. Just kidding — restoring from snapshot...") ]);
        setTimeout(() => {
          setIsAnimating(false);
          setOutput([
            green("System restored successfully."),
            dim("Welcome back to Ubuntu 24.04 LTS."),
            plain(""),
          ]);
        }, 2500);
      }
    }, 60);
  };

  // ── Key handler ──
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
    } else if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) { const i = historyIndex - 1; setHistoryIndex(i); setInput(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) { const i = historyIndex + 1; setHistoryIndex(i); setInput(history[i]); }
      else { setHistoryIndex(history.length); setInput(""); }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
    }
  };

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  // ── Color mapper ──
  const colorMap = {
    green: "#27AE60", orange: "#E95420", cyan: "#3eb8d4", red: "#e74c3c",
    yellow: "#f0a30a", blue: "#3468d5", dim: "#6c7a89", white: "#d3d7cf",
    bold: "#ffffff", ubuntu: "#E95420", prompt: "#d3d7cf", neofetch: "#E95420",
    title: "#E95420",
  };

  const renderLine = (entry, i) => {
    if (!entry) return <div key={i} className="h-[20px]" />;
    if (entry.parts) {
      return (
        <div key={i} className="min-h-[20px] flex flex-wrap">
          {entry.text && <span>{entry.text}</span>}
          {entry.parts.map((p, j) => (
            <span key={j} style={{ color: colorMap[p.color] || p.color || "#d3d7cf" }}>{p.text}</span>
          ))}
        </div>
      );
    }
    if (entry.color === "prompt") {
      // Color the prompt portion
      const dollar = entry.text.indexOf("$");
      if (dollar > -1) {
        const promptPart = entry.text.substring(0, dollar + 1);
        const cmdPart = entry.text.substring(dollar + 1);
        return (
          <div key={i} className="min-h-[20px]">
            <span style={{ color: "#27AE60", fontWeight: 700 }}>{promptPart}</span>
            <span style={{ color: "#d3d7cf" }}>{cmdPart}</span>
          </div>
        );
      }
    }
    return (
      <div key={i} className="min-h-[20px]" style={{ color: colorMap[entry.color] || "#d3d7cf", fontWeight: entry.color === "bold" ? 700 : 400 }}>
        {entry.text}
      </div>
    );
  };

  return (
    <div
      className="w-full h-full font-mono text-sm flex flex-col"
      style={{ background: "#300a24", color: "#d3d7cf" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal content */}
      <div ref={terminalRef} className="flex-1 overflow-auto whitespace-pre-wrap break-words p-3 pb-1">
        {output.map((entry, i) => renderLine(entry, i))}

        {!isAnimating && (
          <div className="flex items-center">
            <span className="mr-1 font-bold" style={{ color: "#27AE60" }}>{promptStr}</span>
            <span className="relative flex-1">
              <input
                ref={inputRef}
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none border-none shadow-none"
                style={{ color: "#d3d7cf", caretColor: "#d3d7cf" }}
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;

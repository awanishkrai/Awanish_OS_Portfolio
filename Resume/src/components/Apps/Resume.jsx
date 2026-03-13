import React from "react";
import { FileText } from "lucide-react";

const Resume = ({ isDarkMode }) => {
  return (
    <div
      className={`flex flex-col w-full h-full font-mono ${isDarkMode ? "bg-[#1e1e1e] text-[#d4d4d4]" : "bg-[#fffffe] text-[#333333]"}`}
    >
      {/* PDF viewer */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <iframe
          src="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
          title="Resume PDF"
          className="flex-1 w-full border-0 min-h-0"
        />
      </div>

      {/* Vim-style status bar */}
      <div
        className={`h-6 flex-shrink-0 flex items-center justify-between px-2 select-none text-xs font-bold ${
          isDarkMode ? "bg-[#007acc] text-white" : "bg-gray-200 text-black border-t border-gray-300"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <FileText size={12} />
            resume.pdf
          </span>
          <span className="opacity-80">pdf</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`opacity-80 hover:opacity-100 underline ${isDarkMode ? "text-white" : "text-black"}`}
            onClick={(e) => e.stopPropagation()}
          >
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;

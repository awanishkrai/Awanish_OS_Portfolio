import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';
import { Folder, FileText, Home, Download, Github as GithubIcon, HardDrive, FileJson, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Projects = ({ isDarkMode }) => {
  const { projects } = PORTFOLIO_DATA || { projects: [] };
  const [currentPath, setCurrentPath] = useState('/home/visitor/Projects');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [viewingReadme, setViewingReadme] = useState(false);

  const handleOpenFolder = (project) => {
    setSelectedFolder(project);
    setCurrentPath(`/home/visitor/Projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleNavigateUp = () => {
    if (viewingReadme) {
      setViewingReadme(false);
      const folderName = selectedFolder.name.toLowerCase().replace(/\s+/g, '-');
      setCurrentPath(`/home/visitor/Projects/${folderName}`);
      return;
    }
    setSelectedFolder(null);
    setCurrentPath('/home/visitor/Projects');
  };

  const handleOpenReadme = (project) => {
    setViewingReadme(true);
    const folderName = project.name.toLowerCase().replace(/\s+/g, '-');
    setCurrentPath(`/home/visitor/Projects/${folderName}/README.md`);
  };

  return (
    <div className={`flex w-full h-full select-none font-ubuntu text-sm ${isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800'}`}>
      {/* Sidebar */}
      <div className={`w-48 shrink-0 flex flex-col border-r ${isDarkMode ? 'border-white/10 bg-[#161b22]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Places</div>
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer text-slate-400">
            <Home size={16} /> Home
          </div>
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${isDarkMode ? 'bg-[#E95420]/20 text-[#E95420]' : 'bg-blue-100 text-blue-700'}`} onClick={handleNavigateUp}>
            <Folder size={16} /> Projects
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer text-slate-400">
            <Download size={16} /> Downloads
          </div>
        </div>

        <div className="p-3 mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Network</div>
        <div className="flex flex-col gap-1 px-2">
          <a href={PORTFOLIO_DATA?.socials?.github || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer text-slate-400">
            <GithubIcon size={16} /> GitHub
          </a>
        </div>

        <div className="mt-auto p-4 flex items-center gap-3 text-slate-400 text-xs border-t border-white/5">
          <HardDrive size={24} className="text-[#39d353]" />
          <div>
            <div className="font-semibold text-slate-300">File System</div>
            <div>24 GB free</div>
          </div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className={`h-12 flex items-center px-4 border-b gap-4 ${isDarkMode ? 'border-white/10 bg-[#0d1117]' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2">
            <button onClick={handleNavigateUp} disabled={!selectedFolder} className={`p-1.5 rounded hover:bg-white/10 transition-colors ${!selectedFolder ? 'opacity-30 cursor-not-allowed' : ''}`}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button disabled className="p-1.5 rounded hover:bg-white/10 transition-colors opacity-30 cursor-not-allowed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          {/* Address Bar */}
          <div className={`flex-1 flex items-center px-3 py-1.5 rounded border ${isDarkMode ? 'bg-[#161b22] border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300'}`}>
            <span className="text-[#39d353] mr-1">~</span>{currentPath.replace('/home/visitor', '')}
          </div>
        </div>

        {/* Files Area */}
        <div className="flex-1 p-6 overflow-auto">
          {!selectedFolder ? (
            // Projects View
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
              {projects.map((project, idx) => (
                <div 
                  key={idx}
                  onDoubleClick={() => handleOpenFolder(project)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 cursor-pointer group"
                >
                  <Folder size={48} className="text-[#E95420] group-hover:scale-110 transition-transform fill-[#E95420]/20" strokeWidth={1} />
                  <span className="text-center text-xs font-medium truncate w-full text-slate-300 group-hover:text-white">
                    {project.name}
                  </span>
                </div>
              ))}
            </div>
          ) : viewingReadme ? (
            // Readme View
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-white'}`}>
              <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedFolder.readme || "_No README provided._"}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            // Inside Folder View
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-wrap gap-6">
                <div 
                  onDoubleClick={() => handleOpenReadme(selectedFolder)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 cursor-pointer group w-24"
                >
                  <FileText size={48} className="text-[#ffbd2e] group-hover:scale-110 transition-transform" strokeWidth={1} />
                  <span className="text-center text-xs font-medium truncate w-full text-slate-300 group-hover:text-white">
                    README.md
                  </span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 cursor-pointer group w-24">
                  <Code size={48} className="text-[#E95420] group-hover:scale-110 transition-transform fill-[#E95420]/20" strokeWidth={1} />
                  <span className="text-center text-xs font-medium truncate w-full text-slate-300 group-hover:text-white">
                    src/
                  </span>
                </div>

                <a
                  href={selectedFolder.github || PORTFOLIO_DATA?.socials?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 cursor-pointer group w-24"
                >
                  <GithubIcon size={48} className="text-[#a371f7] group-hover:scale-110 transition-transform" strokeWidth={1} />
                  <span className="text-center text-xs font-medium truncate w-full text-slate-300 group-hover:text-white">
                    GitHub
                  </span>
                </a>
              </div>

              <div className="flex-1 min-w-[220px] rounded-xl border border-white/10 bg-black/10 p-4 space-y-2">
                <div className="text-sm font-semibold text-white/90">
                  {selectedFolder.name}
                </div>
                <div className="text-xs text-slate-300">
                  {selectedFolder.description}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  <span className="font-semibold text-slate-200">Tech:</span>{" "}
                  {selectedFolder.technologies}
                </div>
                {selectedFolder.highlights && (
                  <ul className="mt-2 list-disc pl-4 text-xs text-slate-300 space-y-1">
                    {selectedFolder.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className={`h-8 flex items-center px-4 text-xs border-t ${isDarkMode ? 'border-white/5 bg-[#161b22] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
          {!selectedFolder ? `${projects.length} items` : '3 items'} • Free space: 24.1 GB
        </div>
      </div>
    </div>
  );
};

export default Projects;
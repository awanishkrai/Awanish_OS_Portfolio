import React from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Projects = ({ isDarkMode }) => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div className={`p-8 space-y-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-2">Projects</h2>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          A selection of work I'm proud of
        </p>
      </div>

      <div className="space-y-5">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 hover:border-orange-500'
                : 'bg-white border-slate-200 hover:border-orange-400'
            }`}
          >
            <h3 className="text-xl font-bold text-orange-500 mb-2">{project.name}</h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {project.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.technologies.split(', ').map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-slate-700 text-orange-300'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Highlights:</p>
              <ul className="text-sm space-y-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Projects;
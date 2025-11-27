import React, { useState, useEffect } from 'react';
import { GitHubRepo } from '../../types';
import { Star, GitBranch, ExternalLink, Loader2, AlertTriangle, FolderGit2 } from 'lucide-react';

const ProjectsApp: React.FC = () => {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USERNAME = 'SwastikShetty06';
  const PORTFOLIO_TOPIC = 'portfolio-showcase';

  useEffect(() => {
    const GITHUB_API_URL = `https://api.github.com/search/repositories?q=user:${GITHUB_USERNAME}+topic:${PORTFOLIO_TOPIC}&sort=stars&order=desc`;

    const fetchProjects = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        const data = await response.json();

        if (response.ok) {
          if (data.items && data.items.length > 0) {
              setProjects(data.items.slice(0, 6));
          } else {
             setProjects([]); 
             setError('No repositories found with topic: portfolio-showcase');
          }
        } else {
          setError(data.message || 'Failed to fetch GitHub projects.');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="animate-spin text-gray-500" size={32} />
        <p className="font-sans text-sm text-gray-500 font-medium">Connecting to GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-8 text-center m-4 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle size={32} className="mb-2 text-red-500" />
        <p className="font-bold text-gray-800 mb-1">Connection Error</p>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans p-4 bg-gray-50 min-h-full">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="text-xs text-gray-500 font-medium">
            Sources: GitHub API • {projects.length} Items
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                    <FolderGit2 size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <h3 className="text-lg font-bold text-gray-800 truncate max-w-[200px]">{project.name}</h3>
                </div>
                <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                    <Star size={12} className="mr-1 fill-current" />
                    <span className="text-xs font-bold">{project.stargazers_count}</span>
                </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10 leading-relaxed">
                {project.description || "No description available."}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                    {project.language && (
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                            {project.language}
                        </span>
                    )}
                </div>

                <a 
                    href={project.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border border-blue-700 px-3 py-1.5 rounded shadow-sm active:shadow-inner"
                >
                    <span>Source</span>
                    <ExternalLink size={12} />
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
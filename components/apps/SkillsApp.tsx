import React from 'react';
import { skills } from '../../constants';
import { Terminal, Database, Code, Cpu, Smartphone, Wrench, Layers } from 'lucide-react';

const SkillsApp: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'LANGUAGES': return <Code size={18} />;
      case 'FRONTEND': return <Layers size={18} />;
      case 'BACKEND': return <Terminal size={18} />;
      case 'DATABASES': return <Database size={18} />;
      case 'AI TOOLS': return <Cpu size={18} />;
      case 'MOBILE': return <Smartphone size={18} />;
      case 'TOOLS': return <Wrench size={18} />;
      default: return <Code size={18} />;
    }
  };

  return (
    <div className="font-sans p-4">
        <div className="grid grid-cols-1 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
                        <div className="text-blue-600">
                             {getIcon(category)}
                        </div>
                        <span className="font-bold text-gray-700 text-sm">{category}</span>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                            <div key={skill} className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:border-blue-300 transition-colors">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SkillsApp;
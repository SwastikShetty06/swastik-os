import React from 'react';
import { summaryData } from '../../constants';
import { User, FileText, Mail } from 'lucide-react';
import { AppId } from '../../types';

interface AboutAppProps {
  openApp: (id: AppId) => void;
}

const AboutApp: React.FC<AboutAppProps> = ({ openApp }) => {
  return (
    <div className="font-sans text-gray-900 p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-6 border-b border-gray-300 pb-6">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border border-gray-300 shadow-md flex-shrink-0 flex items-center justify-center">
           <User size={48} className="text-gray-400 md:w-16 md:h-16" />
        </div>
        <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">Swastik Shetty</h1>
            <p className="text-base md:text-lg text-blue-600 font-medium mb-3">Full Stack Developer & Problem Solver</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                 <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600 border border-gray-300">Mumbai, India</span>
                 <span className="px-3 py-1 bg-green-100 rounded-full text-xs font-semibold text-green-700 border border-green-200">Open to Work</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center md:justify-start gap-3 mt-2">
                <button 
                  onClick={() => openApp(AppId.RESUME)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-b from-white to-gray-100 border border-gray-300 rounded shadow-sm text-sm font-semibold text-gray-700 hover:from-gray-50 hover:to-gray-200 active:shadow-inner active:scale-95 transition-all"
                >
                  <FileText size={14} className="text-gray-500" />
                  View Resume
                </button>
                <button 
                  onClick={() => openApp(AppId.CONTACT)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 rounded shadow-sm text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 active:shadow-inner active:scale-95 transition-all"
                >
                  <Mail size={14} className="text-blue-100" />
                  Contact Me
                </button>
            </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {summaryData.summary.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-gray-700 text-sm md:text-base">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
         <p className="font-medium text-blue-800 text-sm">Welcome to my digital workspace. Feel free to explore using the Dock below.</p>
      </div>
    </div>
  );
};

export default AboutApp;
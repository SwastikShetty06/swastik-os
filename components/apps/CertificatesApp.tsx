import React from 'react';
import { certificates } from '../../constants';
import { Award, CheckCircle } from 'lucide-react';

const CertificatesApp: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 font-sans p-4">
      {certificates.map((cert, index) => (
        <div key={index} className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
            {/* Decorative gloss effect */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Award size={64} />
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <Award size={20} className="text-yellow-500" />
                        <h3 className="font-bold text-base text-gray-800">{cert.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">{cert.year}</span>
                </div>
                
                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                    Issued by {cert.provider}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
                
                <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, sIndex) => (
                    <span key={sIndex} className="text-xs font-medium bg-gray-50 text-gray-700 px-2 py-1 rounded-full border border-gray-200 flex items-center space-x-1">
                        <CheckCircle size={10} className="text-green-500" />
                        <span>{skill}</span>
                    </span>
                    ))}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CertificatesApp;
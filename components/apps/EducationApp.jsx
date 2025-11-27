import React from 'react';
import { educationData } from '../../constants';
import { GraduationCap, Calendar } from 'lucide-react';

const EducationApp = () => {
    return (
        <div className="space-y-4 font-sans p-4">
            {educationData.map((edu, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-1">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 leading-tight">{edu.degree}</h3>
                                <p className="text-gray-600 font-medium">{edu.institution}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 self-start">
                            <Calendar size={12} className="text-gray-500" />
                            <span className="text-xs font-semibold text-gray-600">{edu.period}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EducationApp;

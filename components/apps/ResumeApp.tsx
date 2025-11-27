import React from 'react';
import { Download, AlertCircle, ExternalLink } from 'lucide-react';

const ResumeApp: React.FC = () => {
  const RAW_RESUME_URL = "https://raw.githubusercontent.com/SwastikShetty06/portfolio/main/public/swastikshettyresume.pdf";
  const GITHUB_BLOB_URL = "https://github.com/SwastikShetty06/portfolio/blob/main/public/swastikshettyresume.pdf";

  // Using Google Docs Viewer for reliable embedding of external PDFs
  const GOOGLE_DOCS_VIEWER = `https://docs.google.com/gview?url=${RAW_RESUME_URL}&embedded=true`;

  const downloadResume = () => {
    // Create a temporary link to trigger the download/open action
    const link = document.createElement('a');
    link.href = RAW_RESUME_URL;
    link.target = '_blank'; // Open in new tab since it's a cross-origin PDF
    link.download = 'Swastik_Shetty_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 font-sans">
      {/* Toolbar */}
      <div className="h-10 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 flex items-center justify-between px-4">
        <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
             <span>Previewing:</span>
             <span className="text-gray-800 font-bold">swastikshettyresume.pdf</span>
        </div>
        <div className="flex gap-2">
            <a href={GITHUB_BLOB_URL} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View on GitHub <ExternalLink size={10} />
            </a>
        </div>
      </div>

      {/* Main Content (PDF Viewer) */}
      <div className="flex-1 bg-gray-500 relative overflow-hidden">
        <iframe 
            src={GOOGLE_DOCS_VIEWER} 
            className="w-full h-full border-0"
            title="Resume Preview"
        >
            <div className="flex flex-col items-center justify-center h-full text-white">
                <AlertCircle size={48} className="mb-2" />
                <p>Unable to load preview.</p>
                <button onClick={downloadResume} className="mt-4 px-4 py-2 bg-white text-gray-800 rounded shadow">Download Instead</button>
            </div>
        </iframe>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-end px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <button 
            onClick={downloadResume}
            className="flex items-center gap-2 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-md shadow-sm border border-blue-700 active:shadow-inner active:scale-95 transition-all font-semibold text-sm"
        >
            <Download size={16} />
            <span>Download Resume</span>
        </button>
      </div>
    </div>
  );
};

export default ResumeApp;
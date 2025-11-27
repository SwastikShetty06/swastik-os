import React, { useRef } from 'react';

const DesktopIcon = ({ label, icon: Icon, onClick }) => {
    const iconRef = useRef(null);

    const handleClick = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            onClick(rect);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-start w-24 mb-4 cursor-pointer group select-none active:brightness-75 transition-all"
            onClick={handleClick}
        >
            <div ref={iconRef} className="w-16 h-16 mb-1 relative flex items-center justify-center">
                {/* Render component directly without styling overrides */}
                <div className="w-full h-full drop-shadow-2xl">
                    <Icon className="w-full h-full" />
                </div>
            </div>
            <span className="text-white font-medium text-[12px] px-2 py-0.5 rounded-md border border-transparent 
            icon-text-shadow text-center leading-tight break-words w-full
            group-hover:bg-black/20 group-hover:border-white/20 group-active:bg-blue-600 group-active:border-blue-700">
                {label}
            </span>
        </div>
    );
};

export default DesktopIcon;

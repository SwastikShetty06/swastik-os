import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AppId } from '../types';
import { FinderIcon, DictionaryIcon, TerminalIcon, SafariIcon, CertificateIcon, AddressBookIcon, ResumeIcon } from './MacIcons';

// Updated app list with new Icons
const apps = [
    { id: AppId.ABOUT, label: 'About', icon: FinderIcon },
    { id: AppId.EDUCATION, label: 'Education', icon: DictionaryIcon },
    { id: AppId.SKILLS, label: 'Skills', icon: TerminalIcon },
    { id: AppId.PROJECTS, label: 'Projects', icon: SafariIcon },
    { id: AppId.CERTIFICATES, label: 'Certificates', icon: CertificateIcon },
    { id: AppId.RESUME, label: 'Resume', icon: ResumeIcon },
    { id: AppId.CONTACT, label: 'Contact', icon: AddressBookIcon },
];

const Dock = ({ openWindow }) => {
    const mouseX = useMotionValue(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`fixed bottom-0 left-0 right-0 flex justify-center z-50 pointer-events-none 
      ${isMobile ? 'pb-0' : 'pb-2'}`}>

            {/* Container */}
            <div className={`relative pointer-events-auto ${isMobile ? 'w-full' : ''}`}>

                {/* Dock Background - Conditional rendering based on device */}
                {isMobile ? (
                    // Mobile: Flat Bar
                    <div className="absolute bottom-0 left-0 right-0 h-20 w-full bg-white/20 backdrop-blur-xl border-t border-white/30 shadow-lg"></div>
                ) : (
                    // Desktop: 3D Glass Shelf
                    <div className="absolute bottom-0 left-0 right-0 h-16 w-full transform translate-y-4 origin-bottom scale-x-110">
                        <div className="w-full h-full bg-white/20 backdrop-blur-md border-t border-white/30 
                          shadow-[0_-5px_10px_rgba(0,0,0,0.2)]"
                            style={{
                                transform: 'perspective(100px) rotateX(20deg) scale(0.9)',
                                borderRadius: '4px 4px 0 0'
                            }}>
                        </div>
                    </div>
                )}

                {/* Dock Items Container */}
                <div
                    className={`flex items-end px-4 relative 
            ${isMobile
                            ? 'justify-around w-full pb-3 pt-2 overflow-x-auto no-scrollbar gap-2'
                            : 'space-x-3 py-2'
                        }`}
                    onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
                    onMouseLeave={() => !isMobile && mouseX.set(null)}
                >
                    {apps.map((app) => (
                        <DockItem
                            key={app.id}
                            mouseX={mouseX}
                            app={app}
                            isMobile={isMobile}
                            onClick={(rect) => openWindow(app.id, rect)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DockItem = ({ mouseX, app, isMobile, onClick }) => {
    const ref = useRef(null);

    // Desktop: Calculate distance for fish-eye effect
    const distance = useTransform(mouseX, (val) => {
        if (isMobile) return Infinity; // Disable effect on mobile
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val !== null ? val - bounds.x - bounds.width / 2 : Infinity;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const handleClick = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            onClick(rect);
        }
    }

    return (
        <div className={`flex flex-col items-center justify-end relative group ${isMobile ? '' : 'mb-2'}`}>
            {/* Tooltip - Desktop Only */}
            {!isMobile && (
                <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-[#f2f2f2]/90 border border-gray-400 text-black text-xs font-semibold px-3 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-20">
                    {app.label}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#f2f2f2]/90 border-r border-b border-gray-400 rotate-45"></div>
                </div>
            )}

            <motion.div
                ref={ref}
                style={{
                    width: isMobile ? 48 : width, // Fixed size on mobile
                    height: isMobile ? 48 : width
                }}
                onClick={handleClick}
                className="flex items-center justify-center cursor-pointer relative"
            >
                {/* The Icon */}
                <div className={`w-full h-full relative z-10 transition-transform duration-100 active:brightness-75 active:scale-95
                  ${!isMobile ? 'reflect-below' : 'drop-shadow-md'}`}>
                    <app.icon className="w-full h-full" />
                </div>

                {/* Active Indicator */}
                <div className={`absolute -bottom-2 w-1.5 h-1.5 bg-black/60 rounded-full blur-[1px] 
                  ${isMobile ? 'bg-black/40' : 'group-hover:bg-blue-400 group-hover:blur-[2px]'} 
                  transition-all hidden group-active:block`}></div>
            </motion.div>

            {/* Mobile Label (Optional, showing active/pressed state could include text, but keeping minimal for dock look) */}
            {isMobile && (
                <span className="text-[9px] text-gray-800 font-medium mt-1 opacity-80 truncate max-w-[50px]">{app.label}</span>
            )}
        </div>
    );
};

export default Dock;

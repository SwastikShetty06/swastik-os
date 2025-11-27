import React, { useState } from 'react';
import TopBar from './components/TopBar';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Dock from './components/Dock';
import BootScreen from './components/BootScreen';
import { AppId } from './types';
import { HDIcon, BlueFolderIcon, ResumeIcon } from './components/MacIcons';
import { AnimatePresence, motion } from 'framer-motion';

// Apps
import AboutApp from './components/apps/AboutApp';
import EducationApp from './components/apps/EducationApp';
import CertificatesApp from './components/apps/CertificatesApp';
import SkillsApp from './components/apps/SkillsApp';
import ProjectsApp from './components/apps/ProjectsApp';
import ContactApp from './components/apps/ContactApp';
import ResumeApp from './components/apps/ResumeApp';

const App = () => {
    const [isBooting, setIsBooting] = useState(true);

    const [windows, setWindows] = useState({
        [AppId.ABOUT]: { id: AppId.ABOUT, isOpen: true, zIndex: 1, position: { x: 100, y: 80 }, isMaximized: false },
        [AppId.EDUCATION]: { id: AppId.EDUCATION, isOpen: false, zIndex: 1, position: { x: 140, y: 120 }, isMaximized: false },
        [AppId.CERTIFICATES]: { id: AppId.CERTIFICATES, isOpen: false, zIndex: 1, position: { x: 180, y: 160 }, isMaximized: false },
        [AppId.SKILLS]: { id: AppId.SKILLS, isOpen: false, zIndex: 1, position: { x: 220, y: 200 }, isMaximized: false },
        [AppId.PROJECTS]: { id: AppId.PROJECTS, isOpen: false, zIndex: 1, position: { x: 260, y: 240 }, isMaximized: false },
        [AppId.CONTACT]: { id: AppId.CONTACT, isOpen: false, zIndex: 1, position: { x: 300, y: 280 }, isMaximized: false },
        [AppId.RESUME]: { id: AppId.RESUME, isOpen: false, zIndex: 1, position: { x: 340, y: 100 }, isMaximized: false },
    });

    const [activeWindowId, setActiveWindowId] = useState(AppId.ABOUT);
    const [maxZIndex, setMaxZIndex] = useState(1);

    const openWindow = (id, originRect) => {
        // Convert DOMRect to simple object for state
        const origin = originRect ? {
            x: originRect.left,
            y: originRect.top,
            w: originRect.width,
            h: originRect.height
        } : null;

        setWindows((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                zIndex: maxZIndex + 1,
                origin: origin // Store origin
            },
        }));
        setActiveWindowId(id);
        setMaxZIndex(maxZIndex + 1);
    };

    const closeWindow = (id) => {
        setWindows((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: false,
            },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const focusWindow = (id) => {
        if (activeWindowId === id) return;
        setWindows((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                zIndex: maxZIndex + 1,
                origin: prev[id].origin // Preserve origin
            },
        }));
        setActiveWindowId(id);
        setMaxZIndex(maxZIndex + 1);
    };

    const minimizeWindow = (id) => {
        closeWindow(id);
    }

    const renderAppContent = (id) => {
        switch (id) {
            case AppId.ABOUT: return <AboutApp openApp={openWindow} />;
            case AppId.EDUCATION: return <EducationApp />;
            case AppId.CERTIFICATES: return <CertificatesApp />;
            case AppId.SKILLS: return <SkillsApp />;
            case AppId.PROJECTS: return <ProjectsApp />;
            case AppId.CONTACT: return <ContactApp />;
            case AppId.RESUME: return <ResumeApp />;
            default: return null;
        }
    };

    const getAppTitle = (id) => {
        switch (id) {
            case AppId.ABOUT: return "About Me";
            case AppId.EDUCATION: return "Education History";
            case AppId.CERTIFICATES: return "Certificates";
            case AppId.SKILLS: return "Technical Skills";
            case AppId.PROJECTS: return "Projects & Works";
            case AppId.CONTACT: return "Contact Info";
            case AppId.RESUME: return "Resume Preview";
            default: return "App";
        }
    }

    return (
        <>
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        key="boot-screen"
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                        className="fixed inset-0 z-[9999]"
                    >
                        <BootScreen onComplete={() => setIsBooting(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-screen w-screen aurora-bg font-sans overflow-hidden relative selection:bg-blue-300 selection:text-black">

                <TopBar />

                {/* Desktop Area */}
                <div className="pt-8 h-full w-full relative">

                    {/* Desktop Icons (Aligned Top-Right) */}
                    <div className="absolute top-4 right-4 flex flex-col items-end space-y-4 z-0">
                        <DesktopIcon
                            label="Macintosh HD"
                            icon={HDIcon}
                            onClick={(rect) => { }}
                        />
                        <DesktopIcon
                            label="Swastik's Portfolio"
                            icon={BlueFolderIcon}
                            onClick={(rect) => openWindow(AppId.ABOUT, rect)}
                        />
                        {/* Resume Icon replaces Network */}
                        <DesktopIcon
                            label="Resume"
                            icon={ResumeIcon}
                            onClick={(rect) => openWindow(AppId.RESUME, rect)}
                        />
                    </div>

                    {/* Windows */}
                    {Object.values(windows).map((window) => (
                        <Window
                            key={window.id}
                            id={window.id}
                            title={getAppTitle(window.id)}
                            isOpen={window.isOpen}
                            isActive={activeWindowId === window.id}
                            zIndex={window.zIndex}
                            initialPosition={window.position}
                            origin={window.origin}
                            onClose={closeWindow}
                            onFocus={focusWindow}
                            onMinimize={minimizeWindow}
                        >
                            {renderAppContent(window.id)}
                        </Window>
                    ))}
                </div>

                {/* The Dock */}
                <Dock openWindow={openWindow} />
            </div>
        </>
    );
};

export default App;

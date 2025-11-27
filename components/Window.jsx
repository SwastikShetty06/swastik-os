import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const Window = ({
    id,
    title,
    children,
    isOpen,
    isActive,
    zIndex,
    initialPosition,
    origin,
    onClose,
    onFocus,
    onMinimize,
    icon: Icon
}) => {
    const [isMaximized, setIsMaximized] = useState(false);
    // Initial default, will be updated by useEffect on mount
    const [size, setSize] = useState({ width: 1024, height: 720 });
    const [isMobile, setIsMobile] = useState(false);
    const windowRef = useRef(null);
    const resizeRef = useRef(false);
    const dragControls = useDragControls();

    // Set initial size and detect mobile
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => {
                const mobile = window.innerWidth < 640;
                setIsMobile(mobile);

                // On mobile, set size to nearly full screen minus some padding
                if (mobile) {
                    setSize({
                        width: window.innerWidth * 0.94,
                        height: window.innerHeight * 0.75
                    });
                } else {
                    // Desktop defaults - Increased size for better PC experience
                    setSize({
                        width: Math.min(1024, window.innerWidth * 0.9),
                        height: Math.min(720, window.innerHeight * 0.85)
                    });
                }
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
        onFocus(id);
    }

    // Resize Handlers
    const initResize = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent drag from parent
        resizeRef.current = true;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchmove', handleTouchResize, { passive: false });
        document.addEventListener('touchend', stopResize);
    };

    const handleResize = (e) => {
        if (!resizeRef.current) return;
        setSize(prev => ({
            width: Math.max(400, prev.width + e.movementX), // Increased min width
            height: Math.max(300, prev.height + e.movementY) // Increased min height
        }));
    };

    // Basic touch resize support (simplified)
    const handleTouchResize = (e) => {
        // Complex to handle without previous touch position state in this simplified example
        // Skipping specific touch resize implementation for now as mobile usually doesn't need resize
    };

    const stopResize = () => {
        resizeRef.current = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchmove', handleTouchResize);
        document.removeEventListener('touchend', stopResize);
    };

    // Clean up listeners if component unmounts
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        }
    }, []);

    // Calculate coordinates for animation logic
    // On mobile, force center X and a reasonable Y
    const mobileX = typeof window !== 'undefined' ? (window.innerWidth - size.width) / 2 : 0;

    const currentX = isMaximized ? 0 : (isMobile ? mobileX : initialPosition.x);
    const currentY = isMaximized ? 24 : (isMobile ? 60 : initialPosition.y); // Start a bit lower on mobile

    // Window Variants for animation
    const variants = {
        hidden: (custom) => {
            if (custom?.origin) {
                return {
                    opacity: 0,
                    x: custom.origin.x - custom.final.x + (custom.origin.w / 2) - (size.width / 2),
                    y: custom.origin.y - custom.final.y + (custom.origin.h / 2) - (size.height / 2),
                    scale: 0.1,
                };
            }
            return { opacity: 0, scale: 0.8, y: 20 };
        },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        },
        exit: (custom) => {
            if (custom?.origin) {
                return {
                    opacity: 0,
                    scale: 0.1,
                    x: custom.origin.x - custom.final.x + (custom.origin.w / 2) - (size.width / 2),
                    y: custom.origin.y - custom.final.y + (custom.origin.h / 2) - (size.height / 2),
                    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
                };
            }
            return { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } };
        }
    };

    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <motion.div
                    key={id}
                    ref={windowRef}
                    custom={{ origin, final: { x: currentX, y: currentY } }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    drag={!isMaximized}
                    dragControls={dragControls}
                    dragListener={false}
                    dragMomentum={false}
                    onDragStart={() => onFocus(id)}
                    className={`absolute flex flex-col overflow-hidden rounded-t-lg rounded-b-md
            ${isActive ? 'shadow-[0px_20px_50px_rgba(0,0,0,0.5)]' : 'shadow-xl'} 
            transition-shadow duration-200 border border-gray-400/50 ring-1 ring-white/20`}
                    style={{
                        zIndex,
                        left: currentX,
                        top: currentY,
                        width: isMaximized ? '100vw' : size.width,
                        height: isMaximized ? 'calc(100vh - 24px - 80px)' : size.height, // Subtract dock height on mobile if maximized
                        backgroundColor: '#ececec',
                    }}
                    onMouseDown={() => onFocus(id)}
                    onTouchStart={() => onFocus(id)}
                >
                    {/* Aqua Title Bar */}
                    <div
                        className={`h-8 flex items-center justify-between px-3 select-none cursor-default touch-none
                bg-gradient-to-b from-[#e8e8e8] to-[#b0b0b0] border-b border-[#959595] rounded-t-lg`}
                        onDoubleClick={toggleMaximize}
                        onPointerDown={(e) => dragControls.start(e)}
                    >
                        {/* Traffic Lights */}
                        <div className="flex items-center space-x-2 group">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(id); }}
                                className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] shadow-inner flex items-center justify-center active:brightness-75"
                            >
                                <div className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-[#4d0000]">x</div>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                                className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner flex items-center justify-center active:brightness-75"
                            >
                                <div className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-[#5c3e00]">-</div>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                                className="w-3 h-3 rounded-full bg-[#28C940] border border-[#1AAB29] shadow-inner flex items-center justify-center active:brightness-75"
                            >
                                <div className="opacity-0 group-hover:opacity-100 text-[6px] font-bold text-[#0e3f14]">+</div>
                            </button>
                        </div>

                        {/* Title - Removed as per request */}
                        <div className="flex-1 flex items-center justify-center text-center font-semibold text-gray-700 text-sm drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] truncate px-2">
                            {/* Content removed */}
                        </div>

                        {/* Spacer for centering */}
                        <div className="w-12"></div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto bg-[#f6f6f6] relative text-gray-900 overscroll-contain">
                        <div className="h-full flex flex-col">
                            {children}
                        </div>
                    </div>

                    {/* Metal Status Bar */}
                    <div className="h-6 bg-gradient-to-b from-[#e0e0e0] to-[#c7c7c7] border-t border-[#b0b0b0] flex items-center justify-between px-2 rounded-b-md relative select-none">
                        <div className="text-[10px] text-gray-600">
                            {isActive ? 'Active' : 'Background'}
                        </div>

                        {/* Resize Gripper - Only visible when not maximized AND not mobile */}
                        {!isMaximized && !isMobile && (
                            <div
                                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize flex items-end justify-end pr-1 pb-1 z-50 group"
                                onMouseDown={initResize}
                            >
                                {/* Visual Grip Lines */}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50 group-hover:opacity-80 transition-opacity">
                                    <line x1="12" y1="4" x2="4" y2="12" stroke="#666" strokeWidth="1" />
                                    <line x1="12" y1="8" x2="8" y2="12" stroke="#666" strokeWidth="1" />
                                </svg>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Window;

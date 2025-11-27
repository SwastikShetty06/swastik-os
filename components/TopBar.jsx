import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Search, Battery } from 'lucide-react';

const TopBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatDay = (date) => {
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const menuItems = ['Finder', 'File', 'Edit', 'View', 'History', 'Bookmarks', 'Window', 'Help'];

    return (
        <div className="h-6 w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 select-none
        bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] border-b border-[#a0a0a0] shadow-md text-sm text-gray-800 backdrop-blur-sm bg-opacity-95">

            <div className="flex items-center space-x-4">
                <div className="text-black drop-shadow-sm cursor-pointer hover:opacity-70 transition-opacity">
                    {/* Filled Apple Logo */}
                    <Apple size={16} fill="currentColor" />
                </div>

                <div className="flex space-x-4 font-semibold text-[13px]">
                    <span className="font-bold">Swastik OS</span>
                    {menuItems.slice(1).map((item) => (
                        <button
                            key={item}
                            className="hidden sm:block hover:bg-black/5 rounded px-2 transition-colors cursor-default"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4 text-[13px] font-medium text-gray-700">
                <Battery size={16} className="text-gray-600" />
                <Wifi size={16} className="text-gray-600" />
                <Search size={16} className="text-gray-600" />

                <div className="flex items-center space-x-2">
                    <span className="hidden md:inline">{formatDay(time)}</span>
                    <span>{formatTime(time)}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;

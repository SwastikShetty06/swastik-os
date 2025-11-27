import React, { useEffect, useState } from 'react';
import { Apple } from 'lucide-react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate boot loading process
    const duration = 2500; // 2.5 seconds total boot time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Wait a bit after 100% before transition
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#efefef] z-[9999] flex flex-col items-center justify-center select-none cursor-wait font-sans">
      <div className="flex flex-col items-center">
        {/* Apple Logo */}
        <div className="mb-12 opacity-80">
          <Apple size={96} fill="#555555" className="text-[#555555]" />
        </div>
      

        {/* Loading Spinner/Bar */}
        <div className="w-48 h-1.5 bg-gray-300 rounded-full overflow-hidden shadow-inner mb-6">
          <motion.div 
            className="h-full bg-gray-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Welcome Text */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-500 font-medium text-sm tracking-wider"
        >
            Welcome to Swastik OS
        </motion.div>
      </div>
    </div>
  );
};

export default BootScreen;
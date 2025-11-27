import React from 'react';

// Common Gradients
const Gradients = () => (
  <defs>
    <linearGradient id="gloss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="white" stopOpacity="0.8" />
      <stop offset="50%" stopColor="white" stopOpacity="0.1" />
      <stop offset="51%" stopColor="white" stopOpacity="0" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#e0e0e0" />
      <stop offset="100%" stopColor="#999999" />
    </linearGradient>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#4facfe" />
      <stop offset="100%" stopColor="#00f2fe" />
    </linearGradient>
    <linearGradient id="leather" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#5D2906" />
    </linearGradient>
  </defs>
);

export const FinderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <Gradients />
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
      <feOffset dx="0" dy="2" result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <g filter="url(#dropShadow)">
      {/* Base Face Shape */}
      <rect x="10" y="10" width="80" height="80" rx="15" fill="#e0e0e0" />
      {/* Left Blue Face */}
      <path d="M10,25 Q10,10 25,10 L50,10 L50,90 L25,90 Q10,90 10,75 Z" fill="#007aff" />
      {/* Right Light Blue Face */}
      <path d="M50,10 L75,10 Q90,10 90,25 L90,75 Q90,90 75,90 L50,90 Z" fill="#5ac8fa" />
      
      {/* Face Lines */}
      <path d="M50,10 L50,90" stroke="#005bb5" strokeWidth="1" />
      
      {/* Eyes */}
      <rect x="25" y="30" width="8" height="20" rx="4" fill="#1a1a1a" />
      <rect x="67" y="30" width="8" height="20" rx="4" fill="#1a1a1a" />
      
      {/* Smile */}
      <path d="M25,65 Q50,85 75,65" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
      
      {/* Gloss Overlay */}
      <path d="M10,25 Q10,10 25,10 L75,10 Q90,10 90,25 L90,50 Q50,60 10,50 Z" fill="url(#gloss)" opacity="0.4" />
    </g>
  </svg>
);

export const TerminalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.4))">
      {/* Main Box */}
      <rect x="5" y="15" width="90" height="70" rx="6" fill="#1a1a1a" />
      {/* Top Bar */}
      <path d="M5,15 Q5,15 11,15 L89,15 Q95,15 95,21 L95,30 L5,30 L5,21 Q5,15 5,15 Z" fill="#d1d1d1" />
      {/* Controls */}
      <circle cx="15" cy="22" r="3" fill="#ff5f56" />
      <circle cx="25" cy="22" r="3" fill="#ffbd2e" />
      <circle cx="35" cy="22" r="3" fill="#27c93f" />
      {/* Content */}
      <text x="15" y="55" fontFamily="monospace" fontSize="14" fill="#33ff00" fontWeight="bold">&gt;_</text>
      <rect x="38" y="45" width="8" height="14" fill="#33ff00" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
      </rect>
      <text x="50" y="26" fontSize="8" fill="#555" textAnchor="middle" fontFamily="sans-serif">Terminal</text>
      
      {/* Glass Reflection */}
      <path d="M5,30 L95,30 L95,85 L5,50 Z" fill="white" opacity="0.05" />
    </g>
  </svg>
);

export const SafariIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 5px 5px rgba(0,0,0,0.3))">
      {/* Background */}
      <circle cx="50" cy="50" r="45" fill="#f0f0f0" />
      <circle cx="50" cy="50" r="40" fill="url(#blueGradient)" />
      <circle cx="50" cy="50" r="40" fill="#1e90ff" opacity="0.8" />
      
      {/* Ticks */}
      <g stroke="white" strokeWidth="2">
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="20" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      
      {/* Needle */}
      <g transform="rotate(45 50 50)">
        <path d="M45,50 L50,15 L55,50 Z" fill="#ff3b30" />
        <path d="M45,50 L50,85 L55,50 Z" fill="#e0e0e0" />
        <circle cx="50" cy="50" r="3" fill="#8e8e93" />
      </g>
      
      {/* Glass Dome */}
      <circle cx="50" cy="50" r="40" fill="url(#gloss)" opacity="0.6" />
    </g>
  </svg>
);

export const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.3))">
      {/* Stamp Edge */}
      <rect x="10" y="15" width="80" height="70" fill="white" rx="2" />
      
      {/* Stamp Blue Content */}
      <rect x="15" y="20" width="70" height="60" fill="#4a90e2" />
      
      {/* Eagle/bird abstract */}
      <path d="M25,50 Q50,20 75,50 L50,70 Z" fill="white" opacity="0.9" />
      
      {/* Postmark text */}
      <text x="50" y="70" fontSize="8" fill="white" textAnchor="middle" opacity="0.8">MAIL</text>
      
      {/* Gloss */}
      <path d="M15,20 L85,20 L85,50 L15,35 Z" fill="white" opacity="0.2" />
    </g>
  </svg>
);

export const AddressBookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <Gradients />
    <g filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.4))">
      {/* Book Cover */}
      <rect x="15" y="10" width="75" height="85" rx="3" fill="url(#leather)" />
      
      {/* Spine / Binding Area Shadow */}
      <rect x="15" y="10" width="12" height="85" fill="#3E1D04" opacity="0.3" rx="1" />
      
      {/* Silhouette / Icon on cover */}
      <circle cx="55" cy="40" r="14" fill="#D2B48C" opacity="0.9" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.2))" />
      <path d="M35,75 Q55,45 75,75" fill="#D2B48C" opacity="0.9" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.2))" />
      
      {/* Binding Rings */}
      <g fill="#C0C0C0" stroke="#666" strokeWidth="0.5">
         {[...Array(6)].map((_, i) => (
             <rect key={i} x="12" y={20 + i * 11} width="8" height="4" rx="2" />
         ))}
      </g>
      
      {/* Gloss */}
       <path d="M27,10 L90,10 L90,95 L27,95 Z" fill="white" opacity="0.05" />
    </g>
  </svg>
);

export const DictionaryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <defs>
      <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f6d365" />
        <stop offset="100%" stopColor="#fda085" />
      </linearGradient>
    </defs>
    <g filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.3))">
      {/* Back Pages */}
      <path d="M15,10 L85,10 L90,90 L20,90 Z" fill="#f0f0f0" />
      <path d="M18,12 L83,12 L88,88 L23,88 Z" fill="#fff" />
      
      {/* Cover */}
      <path d="M10,10 L80,10 L80,90 L10,90 Z" fill="url(#bookCover)" />
      
      {/* Spine */}
      <rect x="10" y="10" width="10" height="80" fill="#e67e22" />
      
      {/* Text hint */}
      <rect x="30" y="25" width="40" height="4" rx="2" fill="white" opacity="0.6" />
      <rect x="30" y="35" width="30" height="4" rx="2" fill="white" opacity="0.6" />
      
      {/* 'A' letter */}
      <text x="45" y="70" fontSize="30" fontWeight="bold" fill="white" opacity="0.8" fontFamily="serif">Aa</text>
    </g>
  </svg>
);

export const CertificateIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
     <g filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.2))">
        {/* Paper */}
        <rect x="20" y="10" width="60" height="80" fill="#fdfbf7" rx="2" />
        {/* Text Lines */}
        <rect x="25" y="20" width="50" height="2" fill="#d1d1d1" />
        <rect x="25" y="25" width="50" height="2" fill="#d1d1d1" />
        
        {/* Gold Seal */}
        <circle cx="50" cy="55" r="12" fill="#f1c40f" stroke="#e67e22" strokeWidth="2" />
        <path d="M50,55 L55,65 L45,65 Z" fill="#e67e22" />
        
        {/* Ribbon */}
        <path d="M50,67 L58,80 L50,75 L42,80 Z" fill="#c0392b" />
     </g>
  </svg>
);

export const HDIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))">
      {/* Drive Body */}
      <rect x="15" y="20" width="70" height="60" rx="4" fill="url(#silver)" />
      
      {/* Label Area */}
      <rect x="25" y="30" width="50" height="30" fill="white" rx="2" opacity="0.8" />
      
      {/* Orange Indicator */}
      <rect x="20" y="50" width="60" height="20" fill="#ff9500" rx="2" opacity="0.9" />
      <path d="M20,50 L80,50 L80,60 L20,60 Z" fill="white" opacity="0.3" />
      
      {/* Apple logo hint */}
      <circle cx="50" cy="45" r="5" fill="#999" opacity="0.5" />
    </g>
  </svg>
);

export const BlueFolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.4))">
        {/* Back Tab */}
        <path d="M10,20 L40,20 L45,25 L90,25 L90,80 L10,80 Z" fill="#007aff" />
        
        {/* Front Flap */}
        <path d="M10,35 L90,35 L90,80 L10,80 Z" fill="#5ac8fa" />
        
        {/* Gloss on Front */}
        <path d="M10,35 L90,35 L90,50 Q50,60 10,50 Z" fill="white" opacity="0.3" />
        
        {/* Paper inside hint */}
        <rect x="15" y="25" width="70" height="15" fill="white" />
    </g>
  </svg>
);

export const ResumeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.4))">
      {/* Paper Document */}
      <path d="M25,10 L65,10 L75,20 L75,90 L25,90 Z" fill="#fcfcfc" />
      
      {/* Folded Corner */}
      <path d="M65,10 L65,20 L75,20 Z" fill="#d1d1d1" />
      
      {/* Text Lines */}
      <g fill="#d1d1d1">
         <rect x="32" y="30" width="36" height="3" />
         <rect x="32" y="38" width="36" height="3" />
         <rect x="32" y="46" width="25" height="3" />
      </g>
      
      {/* Green Download Arrow Circle */}
      <circle cx="50" cy="70" r="12" fill="#28C940" stroke="#1AAB29" strokeWidth="1" />
      
      {/* Arrow Icon */}
      <path d="M50,64 L50,76 M45,72 L50,77 L55,72" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

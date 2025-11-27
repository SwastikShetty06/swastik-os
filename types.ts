export interface Certificate {
  title: string;
  provider: string;
  year: string;
  description: string;
  skills: string[];
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
}

export interface ContactLink {
  channel: string;
  value: string;
  href: string;
  icon: string;
}

export interface Skills {
  LANGUAGES: string[];
  FRONTEND: string[];
  BACKEND: string[];
  DATABASES: string[];
  "AI TOOLS": string[];
  MOBILE: string[];
  TOOLS: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  topics: string[];
  language: string;
}

export enum AppId {
  ABOUT = 'about',
  EDUCATION = 'education',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CERTIFICATES = 'certificates',
  CONTACT = 'contact',
  RESUME = 'resume'
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  isMaximized: boolean;
  origin?: { x: number; y: number; w: number; h: number } | null;
}
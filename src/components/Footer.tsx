import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100 border-t border-slate-200 dark:bg-dark-950 dark:border-emerald-500/10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left — monogram + copyright */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-slate-900 dark:text-[#F5F0E8] tracking-widest">YMS</span>
            <span className="w-px h-4 bg-slate-300 dark:bg-white/10" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-500">
              © {currentYear} Yashwanth M S. All rights reserved.
            </span>
          </div>

          {/* Center — social icons */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#F5F0E8] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#F5F0E8] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.contactEmail}`}
              aria-label="Email"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#F5F0E8] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right — back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

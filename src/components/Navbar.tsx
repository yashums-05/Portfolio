import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Terminal, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
}

const navLinks = [
  { name: 'About',          href: '#about'          },
  { name: 'Skills',         href: '#skills'         },
  { name: 'Projects',       href: '#projects'       },
  { name: 'Experience',     href: '#experience'     },
  { name: 'Education',      href: '#education'      },
  { name: 'Achievements',   href: '#achievements'   },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact',        href: '#contact'        },
];

const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'certifications', 'contact'];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection,  setActiveSection]  = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollY = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 border-b'
            : 'py-5'
        }`}
        style={isScrolled ? {
          backdropFilter:         'blur(16px)',
          WebkitBackdropFilter:   'blur(16px)',
          backgroundColor:        isDark ? 'rgba(5, 5, 8, 0.88)' : 'rgba(248, 250, 252, 0.88)',
          borderBottomColor:      isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)',
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">

            {/* ── YMS Lettermark ── */}
            <a
              href="#hero"
              onClick={() => sound.playClick()}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 rounded-sm"
              aria-label="Back to top"
            >
              <span
                className="font-display font-bold text-xl tracking-[-0.04em] transition-colors duration-200 text-slate-900 dark:text-[#F5F0E8]"
              >
                YMS
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full ml-1 mb-1 align-middle"
                  style={{ background: '#00D084', animation: 'pulseDot 1.8s ease-in-out infinite' }}
                />
              </span>
            </a>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-7" aria-label="Primary">
              {navLinks.map(({ name, href }) => {
                const id       = href.substring(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={name}
                    href={href}
                    onClick={() => sound.playClick()}
                    className={`relative text-xs lg:text-[13px] font-medium tracking-wide transition-colors duration-200 focus:outline-none ${!isActive ? 'hover-gradient-text' : ''}`}
                    style={{ color: isActive ? '#00D084' : (isDark ? '#8B9BB4' : '#64748B') }}
                  >
                    {name}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[1px] rounded-full"
                        style={{ background: '#00D084' }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Theme Toggle (Light / Dark) */}
              <button
                onClick={() => { sound.playClick(); toggleTheme(); }}
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle color theme"
                className="p-2 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none border border-slate-300/80 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/[0.12] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-amber-400"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {onOpenTerminal && (
                <button
                  onClick={() => { sound.playPop(); onOpenTerminal(); }}
                  title="Launch Terminal (~)"
                  className="flex items-center gap-1.5 text-[12px] font-mono font-medium transition-colors duration-200 cursor-pointer focus:outline-none text-emerald-700 dark:text-[#BFFF00] hover:opacity-80"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI</span>
                </button>
              )}

              <button
                onClick={() => { sound.playPop(); onOpenResume(); }}
                title="View & Download Resume"
                className="flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer focus:outline-none text-slate-800 bg-slate-100 border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 dark:text-[#F5F0E8] dark:bg-white/[0.04] dark:border-white/[0.12] dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>Resume</span>
              </button>
            </div>

            {/* ── Mobile Hamburger & Theme Toggle ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => { sound.playClick(); toggleTheme(); }}
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle color theme"
                className="p-2 rounded-md focus:outline-none transition-colors border border-slate-300/80 bg-slate-100 text-slate-700 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-amber-400"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => { sound.playClick(); setMobileMenuOpen(o => !o); }}
                aria-label="Toggle menu"
                className="p-2 rounded-md focus:outline-none transition-colors duration-200 text-slate-700 dark:text-[#8B9BB4]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Width Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{
            background:           isDark ? 'rgba(5,5,8,0.97)' : 'rgba(248,250,252,0.98)',
            backdropFilter:       'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Close row */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-200/80 dark:border-white/[0.06]">
            <span className="font-display font-bold text-xl tracking-[-0.04em] text-slate-900 dark:text-[#F5F0E8]">YMS</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { sound.playClick(); toggleTheme(); }}
                className="p-2 rounded-md text-slate-700 dark:text-amber-400"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => { sound.playClick(); closeMobile(); }}
                className="p-2 rounded-md text-slate-600 dark:text-[#8B9BB4]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map(({ name, href }, i) => {
              const id = href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={name}
                  href={href}
                  onClick={() => { sound.playClick(); closeMobile(); }}
                  className={`flex items-center justify-between py-4 text-2xl font-display font-bold tracking-tight border-b border-slate-200/60 dark:border-white/[0.04] transition-colors duration-200 ${
                    isActive ? 'text-emerald-500' : 'text-slate-800 dark:text-[#F5F0E8]'
                  }`}
                  style={{
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span>{name}</span>
                  <span className="font-mono text-xs text-slate-500 dark:text-[#8B9BB4]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-8 pb-10 pt-6 flex flex-col gap-3 border-t border-slate-200/80 dark:border-white/[0.06]">
            {onOpenTerminal && (
              <button
                onClick={() => { sound.playPop(); closeMobile(); onOpenTerminal(); }}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-mono font-medium rounded-md text-emerald-800 bg-emerald-50 border border-emerald-300 dark:text-[#BFFF00] dark:bg-[rgba(191,255,0,0.06)] dark:border-[rgba(191,255,0,0.15)]"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch CLI</span>
              </button>
            )}
            <button
              onClick={() => { sound.playPop(); closeMobile(); onOpenResume(); }}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium rounded-md text-slate-900 bg-slate-100 border border-slate-300 dark:text-[#F5F0E8] dark:bg-[rgba(0,208,132,0.08)] dark:border-[rgba(0,208,132,0.22)]"
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

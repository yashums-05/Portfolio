import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { personalInfo, projectsData, skillCategories } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface HackerTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const HackerTerminalModal: React.FC<HackerTerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.init --developer-profile',
      output: (
        <div className="text-lime-400">
          [KERNEL 6.1.0] Yashwanth M S Profile Virtual Machine initialized.<br />
          Type <span className="text-white font-bold underline">help</span> to list available commands.
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    sound.playClick(800, 0.05);

    if (trimmed) {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-lime-400 font-bold mb-1">Available System Commands:</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">whoami</span> - Display biographical identity</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">cgpa</span> - Inspect academic distinction at MCE</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">projects</span> - Query featured engineering systems</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">skills</span> - List Java, AI/ML &amp; database competencies</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">resume</span> - Trigger resume download &amp; preview</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">contact</span> - Retrieve email, LinkedIn &amp; GitHub links</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">theme</span> - Toggle or set theme [light / dark]</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">clear</span> - Clear terminal session logs</div>
            <div><span className="text-lime-300 font-mono w-24 inline-block">exit</span> - Close terminal view</div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-slate-300 leading-relaxed">
            <span className="text-white font-bold">{personalInfo.name}</span><br />
            {personalInfo.role}<br />
            Institution: {personalInfo.institution}<br />
            Location: {personalInfo.location}<br />
            Graduation: {personalInfo.graduationYear} (Expected)
          </div>
        );
        break;

      case 'cgpa':
        output = (
          <div className="p-2.5 rounded-lg bg-lime-500/10 border border-lime-500/30 text-lime-400 font-mono">
            <strong>ACADEMIC MERIT:</strong> {personalInfo.cgpa} / 10.0<br />
            Malnad College of Engineering, Hassan &middot; Top Tier Distinction.
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <div className="text-lime-400 font-bold">Featured Projects Repository:</div>
            {projectsData.map((p, i) => (
              <div key={p.id} className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                <div className="text-white font-bold">{i + 1}. {p.title} <span className="text-xs text-lime-400 font-normal">[{p.status}]</span></div>
                <div className="text-xs text-slate-400">{p.tagline}</div>
                <div className="text-[11px] text-lime-300 font-mono mt-0.5">Stack: {p.technologies.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            {skillCategories.map((c) => (
              <div key={c.category}>
                <span className="text-lime-400 font-semibold">{c.category}:</span>{' '}
                <span className="text-slate-300">{c.skills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'resume':
        sound.playSuccess();
        onOpenResume();
        output = <div className="text-lime-400">Opening printable resume modal and triggering /resume.pdf download...</div>;
        break;

      case 'contact':
        output = (
          <div className="text-slate-300 space-y-1">
            <div>Email: <a href={`mailto:${personalInfo.contactEmail}`} className="text-lime-400 underline">{personalInfo.contactEmail}</a></div>
            <div>GitHub: <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="text-lime-400 underline">{personalInfo.socialLinks.github}</a></div>
            <div>LinkedIn: <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-lime-400 underline">{personalInfo.socialLinks.linkedin}</a></div>
          </div>
        );
        break;

      case 'theme':
      case 'theme toggle':
        toggleTheme();
        output = <div className="text-lime-400">Switched portfolio theme to: {theme === 'dark' ? 'light' : 'dark'} mode.</div>;
        break;

      case 'theme light':
        setTheme('light');
        output = <div className="text-lime-400">Theme set to light mode.</div>;
        break;

      case 'theme dark':
        setTheme('dark');
        output = <div className="text-lime-400">Theme set to dark mode.</div>;
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      case '':
        return;

      default:
        output = (
          <div className="text-rose-400">
            Command not recognized: "{cmd}". Type <span className="text-white font-bold underline">help</span> for commands.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl h-[620px] max-h-[85vh] bg-[#05070d] border border-lime-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 font-mono"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] border-b border-lime-500/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block animate-pulse"></span>
              <span className="ml-2 text-xs text-lime-400 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                yashwanth@mce-hassan:~$ (CLI Mode)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 hidden sm:inline">Press ESC or type 'exit'</span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-lime-400 font-bold">➜</span>
                  <span className="text-emerald-300 font-semibold">~</span>
                  <span className="text-white">{log.command}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="p-3 bg-[#0a0f1d] border-t border-lime-500/20 flex items-center gap-2 text-xs">
            <span className="text-lime-400 font-bold text-sm">➜</span>
            <span className="text-emerald-300 font-semibold">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'projects', 'cgpa' or 'resume'..."
              className="flex-1 bg-transparent text-white outline-none font-mono"
            />
            <button
              onClick={() => {
                handleCommand(input);
                setInput('');
              }}
              className="p-1 text-lime-400 hover:text-lime-300"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

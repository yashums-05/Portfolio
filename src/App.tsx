import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { SpotlightEffect } from './components/SpotlightEffect';
import { InteractiveScrollBackground } from './components/InteractiveScrollBackground';
import { HackerTerminalModal } from './components/HackerTerminalModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { KineticMarquee } from './components/KineticMarquee';
import { PersistentBackgroundPortrait } from './components/PersistentBackgroundPortrait';
import { ThemeProvider } from './context/ThemeContext';
import type { Project } from './types';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Global hotkeys: Ctrl+K or Cmd+K (Command Palette), `~` (Terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '`' && !isInput && !(e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-studio-ink text-slate-800 dark:text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-white relative transition-colors duration-300">
        {/* Dynamic Top Scroll Progress Laser */}
        <ScrollProgressBar />

        {/* Interactive Fluid Custom Cursor with Spring Physics */}
        <CustomCursor />

        {/* Interactive Image & Blueprint Canvas with Scroll Parallax & Velocity Physics */}
        <InteractiveScrollBackground />

        {/* Ambient Mouse Spotlight Light Mesh */}
        <SpotlightEffect />

        {/* Sticky Top Navigation */}
        <Navbar 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Persistent Background Portrait constant across Hero and About */}
        <PersistentBackgroundPortrait />

        {/* Main Content Sections */}
        <main className="flex-1 relative z-10">
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
          
          {/* Kinetic Ribbon 1 — Fast Leftward Motion */}
          <KineticMarquee direction="left" speed="normal" />

          <AboutSection />
          <SkillsSection />
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

          {/* Kinetic Ribbon 2 — Research & Scholarly Momentum */}
          <KineticMarquee 
            direction="right" 
            speed="slow" 
            items={[
              'EXPLAINABLE AI (XAI)',
              'ADAPTIVE DEEP LEARNING',
              'MULTI-AGENT SYSTEMS',
              'SUSTAINABLE COMPUTING',
              'PROXIMAL POLICY OPTIMIZATION',
              'BIG DATA STREAM PIPELINES',
              'MALNAD COLLEGE OF ENGINEERING'
            ]}
            accentText="★"
          />

          <ExperienceSection />
          <EducationSection />
          <AchievementsSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Interactive Command Palette (Ctrl + K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Hacker Terminal CLI Modal (`~` or click) */}
        <HackerTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Interactive Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Printable & Downloadable Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

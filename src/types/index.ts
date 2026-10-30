export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack & Java' | 'AI & Machine Learning' | 'Research & Systems';
  status: 'Completed' | 'Research in Progress' | 'Proposed Architecture' | 'Active Prototype';
  featured: boolean;
  technologies: string[];
  keyFeatures: string[];
  metricsOrHighlight?: string;
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  isComingSoon?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    iconName?: string;
    isPrimary?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  type: 'LEADERSHIP' | 'EVENT OPERATIONS' | 'INTERNAL AFFAIRS' | 'TECHNICAL TRAINING' | 'HACKATHON & EVENTS' | string;
  description: string[];
  coreCompetencies: string[];
  statusBadge?: string;
  photoUrl?: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
  tags: string[];
}

export interface ResearchPublication {
  id: string;
  title: string;
  authors: string[];
  venueOrContext: string;
  year: string;
  status: 'Research in Progress' | 'Under Review' | 'Accepted' | 'Published' | 'Concept Proposal';
  abstract: string;
  keywords: string[];
  doi?: string;
  paperLink?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  scoreLabel: string;
  scoreValue: string;
  highlights: string[];
  coursework: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Technical' | 'Academics' | 'Leadership';
  issuer: string;
  date: string;
  description: string;
  badgeText: string;
  verificationUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  description: string;
  badgeText: string;
  skills: string[];
  verificationUrl?: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  headline: string;
  role: string;
  institution: string;
  graduationYear: number;
  cgpa: string;
  primaryLanguage: string;
  availabilityStatus: string;
  location: string;
  bioSummary: string;
  extendedBio: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  contactEmail: string;
  formResponseEmail: string;
  web3FormsAccessKey?: string;
  emailjs?: {
    serviceId: string;
    templateInquiryId: string;
    publicKey: string;
  };
  phone?: string;
  objective?: string;
  spokenLanguages?: string[];
  certifications?: string[];
  avatarUrl?: string;
  campusPhotoUrl?: string;
  galleryPhotos?: {
    id: string;
    url: string;
    title: string;
    caption: string;
    tag: string;
  }[];
}

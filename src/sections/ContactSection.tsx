import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Mail, Copy, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { SectionHeader } from '../components/SectionHeader';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Disposable and throwaway email domains blacklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com', '10minutemail.com', 'mailinator.com', 'guerrillamail.com',
  'throwawaymail.com', 'yopmail.com', 'sharklasers.com', 'getnada.com',
  'dispostable.com', 'burnermail.io', 'fakeinbox.com', 'trashmail.com',
  'temp-mail.org', 'fakemailgenerator.com', 'inboxkitten.com', 'mohmal.com',
  'crazymailing.com', 'nada.ltd', 'mytemp.email', 'tempail.com', 'dropmail.me',
  'maildrop.cc', 'generator.email', 'tempmailo.com', 'disposablemail.com'
]);

// Known dummy / fake email addresses or usernames
const DUMMY_USERNAMES = new Set([
  'test', 'tester', 'testing', 'fake', 'dummy', 'spam', 'noreply', 'no-reply',
  'admin', 'administrator', 'root', 'support', 'info', 'sample', 'example',
  'demo', 'temp', 'trash', 'throwaway', 'user', 'username', 'abcd', 'abc',
  'xyz', 'null', 'void', 'anon', 'anonymous', 'nobody', 'someone', 'asdf',
  'asdfgh', 'qwerty', '1234', '12345', '123456', 'aaaa', 'bbbb', 'cccc', 'xxxx'
]);

// Checks for keyboard mash, sequential patterns, or repetitive characters
const isPatternOrGibberish = (str: string): boolean => {
  // 3 or more repeated identical characters (e.g. "aaa", "111", "xxx")
  if (/(.)\1{2,}/.test(str)) return true;

  // Alphabetical sequences (forward & reverse)
  const alphaSequences = [
    'abcd', 'bcde', 'cdef', 'defg', 'efgh', 'fghi', 'ghij', 'hijk', 'ijkl', 'jklm',
    'klmn', 'lmno', 'mnop', 'nopq', 'opqr', 'pqrs', 'qrst', 'rstu', 'stuv', 'tuvw',
    'uvwx', 'vwxy', 'wxyz', 'dcba', 'edcb', 'fedc', 'gfed', 'hgfe', 'ihgf', 'jihg'
  ];
  for (const seq of alphaSequences) {
    if (str.includes(seq)) return true;
  }

  // Numeric sequences
  const numSequences = ['1234', '2345', '3456', '4567', '5678', '6789', '4321', '5432', '6543', '7654', '8765', '9876'];
  for (const seq of numSequences) {
    if (str.includes(seq)) return true;
  }

  // Keyboard walks
  const keyboardWalks = ['asdf', 'qwer', 'zxcv', 'qwerty', 'azerty', 'poiuy', 'lkjh', 'mnbv'];
  for (const walk of keyboardWalks) {
    if (str.includes(walk)) return true;
  }

  return false;
};

// Common domain typos with suggestion
const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
};

// Strict Name validator
const validateNameInput = (name: string): { valid: boolean; reason?: string } => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, reason: 'Please enter your full name.' };
  }
  if (trimmed.length < 2) {
    return { valid: false, reason: 'Name must be at least 2 characters.' };
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return { valid: false, reason: 'Name should only contain letters and spaces.' };
  }
  const lower = trimmed.toLowerCase();
  if (DUMMY_USERNAMES.has(lower) || isPatternOrGibberish(lower)) {
    return { valid: false, reason: 'Please provide your actual name.' };
  }
  return { valid: true };
};

// Strict, robust email validator
const validateEmailAddress = (email: string): { valid: boolean; reason?: string } => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return { valid: false, reason: 'Email address is required.' };
  }

  // RFC 5322 compliant regex check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed) || trimmed.includes('..') || trimmed.includes('@@')) {
    return { valid: false, reason: 'Please enter a valid email format (e.g. name@domain.com).' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { valid: false, reason: 'Invalid email format.' };
  }

  const [localPart, domainPart] = parts;

  // Local part length and boundary checks
  if (localPart.length < 2) {
    return { valid: false, reason: 'Email username must be at least 2 characters.' };
  }
  if (/^[._+-]|[._+-]$/.test(localPart)) {
    return { valid: false, reason: 'Email cannot start or end with a special character.' };
  }

  // Reject placeholder prefixes or keyboard mash / sequential walks (e.g. abcd, asdf, 1234)
  if (DUMMY_USERNAMES.has(localPart) || isPatternOrGibberish(localPart)) {
    return {
      valid: false,
      reason: `"${localPart}@..." appears to be a test/dummy address. Please provide your real email.`,
    };
  }

  // Domain & TLD validation
  const domainParts = domainPart.split('.');
  if (domainParts.length < 2) {
    return { valid: false, reason: 'Please provide a complete domain with an extension (e.g. .com, .in).' };
  }

  const sld = domainParts[0]; // e.g. gmail, outlook
  const tld = domainParts[domainParts.length - 1]; // e.g. com, in, org

  if (sld.length < 2) {
    return { valid: false, reason: 'Domain name is too short to be a valid mail server.' };
  }

  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return { valid: false, reason: 'Please provide a valid domain extension (e.g. .com, .org, .edu, .in).' };
  }

  // Reject disposable / temporary email domains
  if (
    DISPOSABLE_EMAIL_DOMAINS.has(domainPart) ||
    DISPOSABLE_EMAIL_DOMAINS.has(domainParts.slice(-2).join('.'))
  ) {
    return { valid: false, reason: 'Temporary or disposable email services are not accepted.' };
  }

  // Helpful typo detection
  if (DOMAIN_TYPOS[domainPart]) {
    return { valid: false, reason: `Did you mean @${DOMAIN_TYPOS[domainPart]}?` };
  }

  return { valid: true };
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors]                     = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage]         = useState('');
  const [copiedEmail, setCopiedEmail]           = useState(false);

  const targetEmail = personalInfo.formResponseEmail || personalInfo.contactEmail;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};

    const nameCheck = validateNameInput(formData.name);
    if (!nameCheck.valid) {
      e.name = nameCheck.reason;
    }

    const emailCheck = validateEmailAddress(formData.email);
    if (!emailCheck.valid) {
      e.email = emailCheck.reason;
    }

    if (!formData.subject.trim()) {
      e.subject = 'Please specify a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors(prev => ({ ...prev, [name]: undefined }));
    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
      setErrorMessage('');
    }
  };

  const handleNameBlur = () => {
    if (formData.name.trim()) {
      const check = validateNameInput(formData.name);
      if (!check.valid) {
        setErrors(prev => ({ ...prev, name: check.reason }));
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      const check = validateEmailAddress(formData.email);
      if (!check.valid) {
        setErrors(prev => ({ ...prev, email: check.reason }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmissionStatus('submitting');
    setErrorMessage('');

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanName = formData.name.trim();
    const cleanSubject = formData.subject.trim();
    const cleanMessage = formData.message.trim();

    let delivered = false;

    // 0. If EmailJS is configured, send both the inquiry to Yashwanth AND an automated Thank You to the visitor!
    if (personalInfo.emailjs?.serviceId && personalInfo.emailjs?.publicKey) {
      try {
        const templateParams = {
          user_name: cleanName,
          user_email: cleanEmail,
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject || 'Portfolio Inquiry',
          message: cleanMessage,
          to_name: 'Yashwanth M S',
          reply_to: cleanEmail,
        };

        // Dispatch via EmailJS (automatically triggers inquiry + built-in Auto-Reply)
        if (personalInfo.emailjs.templateInquiryId) {
          await emailjs.send(
            personalInfo.emailjs.serviceId,
            personalInfo.emailjs.templateInquiryId,
            templateParams,
            personalInfo.emailjs.publicKey
          );
          delivered = true;
        }
      } catch (err) {
        console.error('EmailJS transmission error:', err);
      }
    }

    // 1. If Web3Forms Access Key is configured, use it for direct inbox delivery without any dashboard
    if (!delivered && personalInfo.web3FormsAccessKey) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: personalInfo.web3FormsAccessKey,
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject ? `[Portfolio] ${cleanSubject}` : `[Portfolio Message from ${cleanName}]`,
            message: cleanMessage,
            from_name: cleanName,
            botcheck: '',
          }),
        });

        if (w3Res.ok) {
          const w3Data = await w3Res.json().catch(() => ({ success: true }));
          if (w3Data.success === true) {
            delivered = true;
          }
        }
      } catch {
        // Fall through to other providers
      }
    }

    // 2. Direct background transmission via ShipMyForm
    if (!delivered) {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('name', cleanName);
        bodyFormData.append('email', cleanEmail);
        bodyFormData.append('subject', cleanSubject);
        bodyFormData.append('message', cleanMessage);
        bodyFormData.append('_replyto', cleanEmail);
        bodyFormData.append('_gotcha', ''); // Anti-spam honeypot (empty verifies human interaction)

        const response = await fetch(`https://shipmyform.com/to/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: bodyFormData,
        });

        if (response.ok) {
          const data = await response.json().catch(() => ({ ok: true }));
          if (data.ok === true || data.success === true) {
            delivered = true;
          }
        }
      } catch {
        // Primary background attempt failed, fall through to secondary
      }
    }

    // 3. Secondary background attempt via FormSubmit
    if (!delivered) {
      try {
        const fsResponse = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            _replyto: cleanEmail,
            _subject: `[Portfolio Message from ${cleanName}] ${cleanSubject}`,
            message: cleanMessage,
            _captcha: 'false',
          }),
        });

        if (fsResponse.ok) {
          const fsData = await fsResponse.json().catch(() => ({ success: true }));
          if (fsData.success === 'true' || fsData.success === true) {
            delivered = true;
          }
        }
      } catch {
        // Both background services failed
      }
    }

    if (delivered) {
      setSubmissionStatus('success');
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      } catch { /* noop */ }
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmissionStatus('error');
      setErrorMessage('Could not deliver message right now. Please check your connection and try again.');
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all font-mono backdrop-blur-sm dark:bg-[#090D16]/50 dark:text-[#F5F0E8] dark:placeholder-slate-600';
  const inputOk   = 'border-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/10 dark:border-white/[0.08]';
  const inputErr  = 'border-rose-500/50 focus:ring-rose-500/20';

  return (
    <section id="contact" className="pt-6 sm:pt-10 pb-12 sm:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <SectionHeader
          number="08"
          title="Have an idea? Let's build something meaningful."
          subtitle="Whether you have an internship opportunity, a research collaboration, or an ambitious technical project, my inbox is always open."
          badge="Direct Contact"
          className="mb-8 sm:mb-10"
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Direct Contact Channels (Matching User Reference) */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-slate-200/90 shadow-2xl dark:bg-[#090D16]/45 dark:border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl space-y-6 transition-colors duration-300"
          >
            {/* Header */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                Direct Contact Channels
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed transition-colors duration-300">
                Feel free to email me directly or connect through professional networks.
              </p>
            </div>

            {/* PRIMARY EMAIL full-width card */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-cyan-500/40 dark:bg-[#0F1626]/50 dark:border-white/[0.08] dark:hover:border-cyan-500/30 p-4 sm:p-4.5 flex items-center justify-between gap-3 transition-all duration-300 group backdrop-blur-sm shadow-sm">
              <a
                href={`mailto:${personalInfo.contactEmail}`}
                className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all duration-300">
                  <Mail className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    PRIMARY EMAIL
                  </p>
                  <p className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate group-hover-gradient-text transition-all duration-300">
                    {personalInfo.contactEmail}
                  </p>
                </div>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 dark:border-slate-700/60 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-all shrink-0 cursor-pointer active:scale-95"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn & GitHub 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-500/40 dark:bg-[#0F1626]/50 dark:border-white/[0.08] p-4 flex items-center gap-3.5 transition-all duration-300 group hover:-translate-y-0.5 backdrop-blur-sm shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0 group-hover:scale-105 group-hover:border-blue-400/50 transition-all duration-300">
                  <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                    LinkedIn
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Connect · Network
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-purple-500/40 dark:bg-[#0F1626]/50 dark:border-white/[0.08] p-4 flex items-center gap-3.5 transition-all duration-300 group hover:-translate-y-0.5 backdrop-blur-sm shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0 group-hover:scale-105 group-hover:border-purple-400/50 transition-all duration-300">
                  <GithubIcon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
                    GitHub
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Code · Repos
                  </p>
                </div>
              </a>
            </div>

            {/* Availability & Location Footer in Card */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-mono text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                  {personalInfo.availabilityStatus}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Hassan, Karnataka, India
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Send a Message Card (Matching Reference Design) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-white border border-slate-200/90 shadow-2xl dark:bg-[#090D16]/45 dark:border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl space-y-6 transition-colors duration-300"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-cyan-500 dark:text-cyan-400 stroke-[2.2] shrink-0" />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                  Send a Message
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed transition-colors duration-300">
                Fill out the details below to initiate direct correspondence.
              </p>
            </div>

            {submissionStatus === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-sm">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-300 block">Message Delivered Successfully!</span>
                  <span className="text-emerald-400/80 text-xs">
                    Thank you! Your message has been sent to my inbox, and an automated confirmation copy was dispatched to your email. I will reply soon.
                  </span>
                </div>
              </div>
            )}

            {submissionStatus === 'error' && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-semibold text-rose-300 block">Could not send message</span>
                  <span className="text-rose-400/80 text-xs">
                    {errorMessage || 'Unable to deliver message right now. Please try again.'}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="name" className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                      Your Name <span className="text-rose-400 font-bold">*</span>
                    </label>
                    {formData.name && !errors.name && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid name
                      </span>
                    )}
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleNameBlur}
                    placeholder="e.g. Alex Sharma"
                    autoComplete="name"
                    className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="email" className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                      Your Email <span className="text-rose-400 font-bold">*</span>
                    </label>
                    {formData.email && !errors.email && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid email
                      </span>
                    )}
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="alex@domain.com"
                    autoComplete="email"
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
                  Subject <span className="text-rose-400 font-bold">*</span>
                </label>
                <input
                  id="subject" name="subject" type="text"
                  value={formData.subject} onChange={handleChange}
                  placeholder="e.g. Internship Inquiry / Project Collaboration"
                  className={`${inputBase} ${errors.subject ? inputErr : inputOk}`}
                />
                {errors.subject && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
                  Message <span className="text-rose-400 font-bold">*</span>
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your organization, project idea, or discussion topic..."
                  className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
                />
                {errors.message && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer shadow-lg shadow-emerald-950/30"
              >
                {submissionStatus === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Sending to Inbox...</span>
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

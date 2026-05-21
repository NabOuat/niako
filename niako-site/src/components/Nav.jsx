import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NiakoLogo from './NiakoLogo';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { label: 'Produits',     href: '#produits'    },
  { label: 'Réalisations', href: '#réalisations' },
  { label: 'Comment on travaille', href: '#apropos' },
];

// Sections surveillées pour l'active state
const SECTION_IDS = ['produits', 'réalisations', 'apropos'];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="btn-icon relative flex items-center justify-center w-9 h-9 rounded-full border"
      style={{ borderColor: 'var(--outline-variant)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg key="sun" width="15" height="15" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            style={{ color: 'var(--on-surface-variant)' }}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
          </motion.svg>
        ) : (
          <motion.svg key="moon" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: 'var(--on-surface)' }}
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [activeSection, setActive] = useState('');

  // Scroll → fond + active state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Détecte la section courante par intersection
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const h = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--surface-container-lowest)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--outline-variant)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-card)' : 'none',
      }}
    >
      <div className="max-w-container mx-auto px-5 md:px-12 flex items-center justify-between h-16">
        <a href="/" aria-label="NIAKO — Accueil">
          <NiakoLogo size="md" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a key={label} href={href}
                className={`nav-link relative font-mono text-[11px] font-semibold tracking-widest uppercase${isActive ? ' active' : ''}`}
              >
                {label}
                {/* Indicateur actif — trait bleu sous le lien */}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                    style={{ background: 'var(--primary-container)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact"
            className="btn-nav-contact hidden md:inline-flex font-mono text-[11px] font-semibold tracking-widest uppercase px-5 py-2 rounded border"
          >
            Contact
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {[{ y: -4 }, { opacity: 1 }, { y: 4 }].map((_, i) => (
              <motion.span key={i}
                className="block w-5 h-px rounded-full absolute"
                style={{ background: 'var(--on-surface-variant)' }}
                animate={
                  i === 0 ? (open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }) :
                  i === 1 ? (open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }) :
                  (open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 })
                }
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden backdrop-blur-xl border-b"
            style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}
          >
            <div className="px-5 py-6 space-y-5">
              {LINKS.map(({ label, href }) => (
                <a key={label} href={href}
                  className="link-hover-primary block font-mono text-[11px] font-semibold tracking-widest uppercase"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href="#contact"
                className="inline-flex font-mono text-[11px] font-semibold tracking-widest uppercase px-5 py-2 rounded border"
                style={{ color: 'var(--primary)', borderColor: 'var(--primary-container)' }}
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

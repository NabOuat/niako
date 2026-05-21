import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';
import LottieIcon from './LottieIcon';
import { useTrack } from '../hooks/useTrack';

const HEADLINE = [
  { text: 'Des logiciels qui font', amber: false },
  { text: 'le travail. Vraiment.',  amber: true  },
];

const STATS = [
  { value: '+20', label: 'systèmes livrés', amber: true  },
  { value: '<24h', label: 'délai de réponse', amber: false },
  { value: '100%', label: 'sur mesure',     amber: false },
];

// Icônes animées légères sur les domaines — jouées au hover
const DOMAIN_LOTTIES = {
  'GIS':    'https://assets9.lottiefiles.com/packages/lf20_myejiggj.json',
  'Métier': 'https://assets7.lottiefiles.com/packages/lf20_bdlrkrqv.json',
  'Mobile': 'https://assets3.lottiefiles.com/packages/lf20_uu0x8lqv.json',
  'Web':    'https://assets6.lottiefiles.com/packages/lf20_atippmse.json',
};

export default function Hero() {
  const { trackCTA, trackWhatsApp } = useTrack();
  return (
    <section className="relative min-h-screen flex items-center px-5 md:px-12 pt-16 overflow-hidden">

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[15%] right-[10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 65%)' }} />
      </div>

      <div className="max-w-container mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center py-24">

        {/* ── Texte 60% ── */}
        <div className="lg:col-span-3 space-y-8">

          {/* Domaines — avec icônes Lottie au hover */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap gap-2"
          >
            {Object.entries(DOMAIN_LOTTIES).map(([label, src]) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border group"
                style={{
                  color: 'var(--primary)',
                  borderColor: 'var(--outline-variant)',
                  background: 'var(--surface-container)',
                }}
              >
                <LottieIcon src={src} size={14} loop={false} triggerOnHover />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <h1 className="font-syne font-extrabold leading-[1.05] tracking-[-0.04em]">
            {HEADLINE.map((line, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <span className={`block text-[44px] md:text-[58px] lg:text-[72px] ${line.amber ? 'text-amber-gradient' : 'text-on-surface'}`}>
                  {line.text}
                </span>
              </motion.div>
            ))}
          </h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="font-dm text-[18px] leading-[1.65] max-w-md"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            Votre équipe perd du temps sur des tâches qu'un système
            bien conçu règle en secondes. On construit ce système.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.52 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <a href="#réalisations" className="btn-primary" onClick={() => trackCTA('voir_realisations')}>
              Voir nos réalisations
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact"
              onClick={() => trackWhatsApp('hero')}
              className="btn-outline font-mono text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 rounded-lg border"
            >
              Écrire à NIAKO →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.68 }}
            className="flex items-end gap-8 pt-2"
          >
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-syne font-extrabold text-[32px] leading-none tracking-tight"
                  style={{ color: s.amber ? 'var(--amber)' : 'var(--proof-color)' }}>
                  {s.value}
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--on-surface-variant)' }}>
                  {s.label}
                </span>
              </div>
            ))}
            <div className="hidden md:block h-10 w-px ml-2" style={{ background: 'var(--amber)', opacity: 0.25 }} />
            <p className="hidden md:block font-mono text-[10px] tracking-wider max-w-[120px] leading-relaxed"
              style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>
              depuis Abidjan,<br />pour le monde
            </p>
          </motion.div>
        </div>

        {/* ── Mockup 40% — avec personnage assis dessus ── */}
        <motion.div className="lg:col-span-2 relative"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Personnage — positionné au-dessus du coin haut-droit du mockup */}
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{
              top: '-22%',
              right: '-8%',
              width: '55%',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Légère animation flottante — donne vie au personnage */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LottieIcon
                src="https://assets1.lottiefiles.com/packages/lf20_fcfjwiyb.json"
                size="100%"
                loop
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <DashboardMockup />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--outline-variant)' }}>
          <motion.div className="w-1 h-2 rounded-full"
            style={{ background: 'var(--primary)' }}
            animate={{ opacity: [0.7, 0.15, 0.7], y: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

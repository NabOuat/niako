import { motion } from 'framer-motion';
import NiakoLogo from './NiakoLogo';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center relative overflow-hidden"
      style={{ background: 'var(--surface-container-lowest)' }}
    >
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 65%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 max-w-lg"
      >
        <a href="/" aria-label="Retour à l'accueil">
          <NiakoLogo size="md" />
        </a>

        {/* 404 géant */}
        <div className="relative">
          <span
            className="font-syne font-extrabold select-none"
            style={{
              fontSize: 'clamp(96px, 20vw, 180px)',
              lineHeight: 1,
              color: 'var(--primary-container)',
              opacity: 0.08,
              letterSpacing: '-0.05em',
            }}
          >
            404
          </span>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-mono text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: 'var(--primary)',
                borderColor: 'var(--primary-container)',
                background: 'var(--primary-glow)',
              }}>
              Page introuvable
            </span>
          </motion.div>
        </div>

        <div className="space-y-3">
          <h1 className="font-syne font-extrabold text-[28px] md:text-[36px] leading-tight tracking-tight"
            style={{ color: 'var(--on-surface)' }}>
            Cette page n'existe pas.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed"
            style={{ color: 'var(--on-surface-variant)' }}>
            Elle a peut-être été déplacée, ou l'URL contient une erreur.
            <br />Retournez à l'accueil — tout y est.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a href="/" className="btn-primary">
            ← Retour à l'accueil
          </a>
          <a href="#contact"
            className="font-mono text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 rounded-lg border transition-all duration-200"
            style={{ color: 'var(--on-surface-variant)', borderColor: 'var(--outline-variant)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-surface)'; e.currentTarget.style.borderColor = 'var(--outline)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; }}
          >
            Nous contacter
          </a>
        </div>

        <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'var(--on-surface-variant)', opacity: 0.35 }}>
          niako.tech
        </p>
      </motion.div>
    </div>
  );
}

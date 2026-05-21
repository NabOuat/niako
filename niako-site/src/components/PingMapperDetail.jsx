import { motion } from 'framer-motion';

const STACK = ['Flutter', 'OpenStreetMap', 'SQLite', 'Python', 'REST API'];
const RESULTS = [
  { value: '0', unit: 'Mo réseau', label: 'requis sur le terrain' },
  { value: '6', unit: 'semaines', label: 'de la spec à la prod' },
  { value: '100%', unit: 'offline', label: 'sync différée automatique' },
];

export default function PingMapperDetail({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-12 px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.article
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header avec glow */}
        <div className="relative p-8 pb-6 border-b" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="absolute top-0 right-0 w-64 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)' }} />

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="btn-icon absolute top-5 right-5 w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ borderColor: 'var(--outline-variant)', color: 'var(--on-surface-variant)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>

          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--primary)', borderColor: 'var(--primary-container)', background: 'var(--primary-glow)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
                Projet phare
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>
                Mobile · GIS
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-[32px] leading-tight tracking-tight"
              style={{ color: 'var(--on-surface)' }}>
              Ping Mapper
            </h2>
            <p className="font-dm text-[15px] leading-relaxed max-w-lg"
              style={{ color: 'var(--on-surface-variant)' }}>
              Application mobile offline-first de collecte et visualisation de points géolocalisés sur OpenStreetMap — conçue pour des équipes terrain sans accès internet stable.
            </p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Problème */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>
              // Le problème
            </h3>
            <p className="font-dm text-[15px] leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}>
              Des équipes terrain devaient collecter des coordonnées GPS dans des zones sans réseau mobile. Les solutions existantes nécessitaient une connexion permanente — les données étaient perdues ou saisies manuellement sur papier puis re-saisies au bureau.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>
              // La solution
            </h3>
            <p className="font-dm text-[15px] leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}>
              Une app Flutter avec stockage local SQLite, carte OpenStreetMap en cache, et sync différée automatique dès qu'une connexion est détectée. Les agents terrain collectent normalement — la synchronisation se fait en arrière-plan.
            </p>
          </div>

          {/* Résultats */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--amber)' }}>
              // Résultats
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {RESULTS.map((r, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-lg border text-center"
                  style={{ borderColor: 'var(--outline-variant)', background: 'var(--surface-container)' }}>
                  <span className="font-syne font-extrabold text-[28px] leading-none"
                    style={{ color: 'var(--amber)' }}>
                    {r.value}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wide"
                    style={{ color: 'var(--primary)' }}>
                    {r.unit}
                  </span>
                  <span className="font-dm text-[11px]"
                    style={{ color: 'var(--on-surface-variant)' }}>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>
              // Stack technique
            </h3>
            <div className="flex flex-wrap gap-2">
              {STACK.map(s => (
                <span key={s}
                  className="font-mono text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full border"
                  style={{
                    color: 'var(--primary)',
                    borderColor: 'var(--primary-container)',
                    background: 'var(--primary-glow)',
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t flex items-center justify-between gap-4"
            style={{ borderColor: 'var(--outline-variant)' }}>
            <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--on-surface-variant)', opacity: 0.4 }}>
              Vous avez un besoin similaire ?
            </p>
            <a href="https://wa.me/2250749435171" target="_blank" rel="noopener noreferrer"
              className="btn-primary">
              En discuter →
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

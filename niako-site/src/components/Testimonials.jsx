import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "NIAKO a livré un système de gestion des stocks en 6 semaines. Ce qui nous prenait 2 jours de saisie manuelle prend maintenant 15 minutes.",
    name: "Kouamé Assoumou",
    role: "Directeur opérationnel",
    company: "PME logistique, Abidjan",
    amber: false,
  },
  {
    quote: "L'application mobile fonctionne sans réseau sur le terrain. C'était notre principal blocage — ils ont résolu ça dès le premier sprint.",
    name: "Ibrahim Traoré",
    role: "Chef de projet terrain",
    company: "ONG cartographie, Bouaké",
    amber: true,
  },
  {
    quote: "Pas de jargon, pas de surprises. On comprenait chaque décision technique. C'est rare avec un prestataire.",
    name: "Aminata Diallo",
    role: "Responsable SI",
    company: "Organisation publique, Abidjan",
    amber: false,
  },
];

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5 p-7 rounded-xl border"
      style={{
        background: 'var(--surface-container-lowest)',
        borderColor: t.amber ? 'var(--amber)' : 'var(--outline-variant)',
        boxShadow: t.amber
          ? '0 0 0 1px var(--amber), 0 8px 32px var(--amber-glow)'
          : 'var(--shadow-card)',
      }}
    >
      {/* Guillemet décoratif */}
      <span className="font-syne font-extrabold text-[56px] leading-none select-none -mb-3"
        style={{ color: t.amber ? 'var(--amber)' : 'var(--primary)', opacity: 0.25 }}>
        "
      </span>

      <p className="font-dm text-[15px] leading-relaxed flex-1"
        style={{ color: 'var(--on-surface)' }}>
        {t.quote}
      </p>

      <div className="flex items-center gap-3 pt-3 border-t"
        style={{ borderColor: 'var(--outline-variant)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-syne font-bold text-[13px]"
          style={{
            background: t.amber ? 'var(--amber-glow)' : 'var(--primary-glow)',
            color: t.amber ? 'var(--amber)' : 'var(--primary)',
            border: `1px solid ${t.amber ? 'var(--amber)' : 'var(--primary-container)'}`,
          }}>
          {t.name[0]}
        </div>
        <div>
          <p className="font-syne font-bold text-[13px]" style={{ color: 'var(--on-surface)' }}>
            {t.name}
          </p>
          <p className="font-mono text-[10px] font-semibold tracking-wide"
            style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <section className="py-24 px-5 md:px-12 border-t"
      style={{ borderColor: 'var(--outline-variant)' }}>
      <div className="max-w-container mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-xl"
        >
          <span className="font-mono text-[11px] font-semibold tracking-widest uppercase block mb-3"
            style={{ color: 'var(--primary)' }}>
            // Ce qu'ils en disent
          </span>
          <h2 className="font-syne font-extrabold text-[32px] md:text-[40px] leading-tight tracking-tight"
            style={{ color: 'var(--on-surface)' }}>
            Des clients qui tournent.<br />
            <span className="text-amber-gradient">Pas des maquettes.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'var(--on-surface-variant)', opacity: 0.35 }}>
          Les noms ont été modifiés à la demande des clients
        </p>
      </div>
    </section>
  );
}

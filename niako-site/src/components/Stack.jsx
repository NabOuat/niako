import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LottieIcon from './LottieIcon';

const ARGS = [
  {
    num: '01',
    title: 'Zéro générique.',
    body: "On ne part pas d'un template. Chaque système est conçu pour votre flux exact — vos données, vos utilisateurs, vos contraintes terrain. Ce que votre équipe utilise vraiment, pas ce qu'on lui impose.",
    accent: 'blue',
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_uu0x8lqv.json',
  },
  {
    num: '02',
    title: 'Vous voyez tout, tout le temps.',
    body: 'Démo toutes les 2 semaines. Aucune boîte noire. Vous pouvez corriger le tir avant que ça coûte cher — pas au moment de la recette.',
    accent: 'amber',
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  },
  {
    num: '03',
    title: '3 mois après la livraison.',
    body: "Les vrais bugs d'intégration arrivent au mois 2, pas à la recette. On reste disponibles 3 mois post-prod avec les mêmes développeurs. Pas une hotline — un vrai suivi.",
    accent: 'blue',
    lottie: 'https://assets6.lottiefiles.com/packages/lf20_atippmse.json',
  },
];

function ArgCard({ arg, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isAmber = arg.accent === 'amber';

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-5 p-7 rounded-xl"
      style={{
        background: 'var(--surface-container)',
        border: `1px solid ${isAmber ? 'var(--amber)' : 'var(--outline-variant)'}`,
        boxShadow: isAmber
          ? '0 0 0 1px var(--amber), 0 8px 32px var(--amber-glow)'
          : 'var(--shadow-card)',
        opacity: isAmber ? undefined : undefined,
      }}
    >
      {/* Barre accent en haut */}
      <div className="absolute top-0 left-7 right-7 h-px rounded-full"
        style={{ background: isAmber ? 'var(--amber)' : 'var(--primary-container)', opacity: isAmber ? 0.6 : 0.3 }} />

      {/* Icône Lottie — jouée au hover uniquement */}
      <LottieIcon
        src={arg.lottie}
        size={44}
        loop={false}
        triggerOnHover
        className="opacity-60"
      />

      <span className="font-mono text-[11px] font-semibold tracking-widest"
        style={{ color: isAmber ? 'var(--amber)' : 'var(--primary)' }}>
        {arg.num}
      </span>
      <h3 className="font-syne font-extrabold text-[22px] leading-tight tracking-tight"
        style={{ color: 'var(--on-surface)' }}>
        {arg.title}
      </h3>
      <p className="font-dm text-[15px] leading-relaxed"
        style={{ color: 'var(--on-surface-variant)' }}>
        {arg.body}
      </p>
    </motion.div>
  );
}

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      {/* ── Section respiration — un seul message, beaucoup d'espace ── */}
      <section
        id="produits"
        className="py-28 px-5 md:px-12 text-center border-t"
        style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <p className="font-mono text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--amber)' }}>
            Basé à Abidjan · Opérations mondiales
          </p>
          <p className="font-syne font-bold text-[28px] md:text-[36px] leading-tight tracking-tight"
            style={{ color: 'var(--on-surface)' }}>
            On a probablement déjà résolu<br />
            <span style={{ color: 'var(--primary)' }}>un problème comme le vôtre.</span>
          </p>
          <p className="font-dm text-[17px] leading-relaxed"
            style={{ color: 'var(--on-surface-variant)' }}>
            GIS pour des ONG en zone rurale, stock pour des PME sans IT, apps terrain sans internet.
            20 systèmes livrés — aucun identique.
          </p>
        </motion.div>
      </section>

      {/* ── 3 arguments décisifs ── */}
      <section
        className="py-24 px-5 md:px-12 border-t"
        style={{ borderColor: 'var(--outline-variant)' }}
      >
        <div className="max-w-container mx-auto">
          <motion.div ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-14"
          >
            <span className="font-mono text-[11px] font-semibold tracking-widest uppercase block mb-3"
              style={{ color: 'var(--primary)' }}>
              // Ce qui compte vraiment
            </span>
            <h2 className="font-syne font-extrabold text-[32px] md:text-[40px] leading-tight tracking-tight"
              style={{ color: 'var(--on-surface)' }}>
              Trois engagements.<br />
              <span className="text-amber-gradient">Vérifiables, projet après projet.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ARGS.map((arg, i) => <ArgCard key={arg.num} arg={arg} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

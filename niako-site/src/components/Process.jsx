import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LottieIcon from './LottieIcon';

const STEPS = [
  {
    num: '01',
    title: 'Comprendre',
    desc: "On travaille avec vous avant d'écrire du code. Cartographie des flux, identification des vrais points de friction — pas ceux qu'on suppose depuis un bureau.",
    proof: 'Note de cadrage validée ensemble',
    amberProof: false,
    lottie: 'https://assets7.lottiefiles.com/packages/lf20_bdlrkrqv.json',
  },
  {
    num: '02',
    title: 'Concevoir',
    desc: "Architecture et stack choisis pour votre cas. On explique chaque décision — vous comprenez ce qu'on construit et pourquoi, pas juste ce que ça coûte.",
    proof: 'Maquettes validées ensemble',
    amberProof: false,
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_uu0x8lqv.json',
  },
  {
    num: '03',
    title: 'Construire',
    desc: "Sprints de 2 semaines, démo à chaque fin. Vous voyez le produit grandir et corrigez tôt. Pas de surprise au bout de 6 mois.",
    proof: 'Démo toutes les 2 semaines',
    amberProof: false,
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  },
  {
    num: '04',
    title: 'Livrer & Rester',
    desc: "Déploiement, formation équipe, documentation complète. 3 mois de suivi post-prod inclus — parce que les vrais problèmes d'intégration arrivent après.",
    proof: '3 mois de suivi inclus — sans surcoût',
    amberProof: true,
    lottie: 'https://assets6.lottiefiles.com/packages/lf20_atippmse.json',
  },
];

function Step({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300"
      style={{
        background: 'var(--surface-container-lowest)',
        borderColor: 'var(--outline-variant)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--primary-container)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--outline-variant)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Icône Lottie + numéro côte à côte */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[44px] font-semibold leading-none select-none"
          style={{ color: 'var(--primary-container)', opacity: 0.15 }}>
          {step.num}
        </span>
        <LottieIcon
          src={step.lottie}
          size={40}
          loop={false}
          triggerOnHover
          className="opacity-60"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-syne font-bold text-[20px] leading-tight tracking-tight"
          style={{ color: 'var(--on-surface)' }}>
          {step.title}
        </h3>
        <p className="font-dm text-[14px] leading-relaxed"
          style={{ color: 'var(--on-surface-variant)' }}>
          {step.desc}
        </p>
      </div>

      <div className="mt-auto pt-3 border-t flex items-center gap-2"
        style={{ borderColor: 'var(--outline-variant)' }}>
        <span className="text-[12px]" style={{ color: step.amberProof ? 'var(--amber)' : 'var(--primary)' }}>✓</span>
        <span className="font-mono text-[11px] font-semibold tracking-wide"
          style={{ color: step.amberProof ? 'var(--amber)' : 'var(--primary)' }}>
          {step.proof}
        </span>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const titleRef = useRef(null);
  const lineRef  = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isLineInView  = useInView(lineRef, { once: true, margin: '-80px' });

  return (
    <section id="apropos" className="py-24 border-t px-5 md:px-12"
      style={{ background: 'var(--section-alt)', borderColor: 'var(--outline-variant)' }}>
      <div className="max-w-container mx-auto">
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-xl"
        >
          <span className="font-mono text-[11px] font-semibold tracking-widest uppercase block mb-3"
            style={{ color: 'var(--primary)' }}>
            // Comment on travaille
          </span>
          <h2 className="font-syne font-extrabold text-[32px] md:text-[40px] leading-tight tracking-tight mb-4"
            style={{ color: 'var(--on-surface)' }}>
            De l'idée à la mise en prod.<br />
            <span className="text-gradient">Sans surprise.</span>
          </h2>
          <p className="font-dm text-[17px] leading-relaxed"
            style={{ color: 'var(--on-surface-variant)' }}>
            Pas de méthode générique — chaque projet a ses contraintes.
            Terrain sans Wi-Fi, base legacy, équipe non-technique. On s'adapte.
          </p>
        </motion.div>

        <div ref={lineRef} className="hidden lg:block mb-4 px-8">
          <svg className="w-full" height="2" preserveAspectRatio="none">
            <motion.line x1="0" y1="1" x2="100%" y2="1"
              stroke="var(--primary-container)"
              strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5 8"
              initial={{ pathLength: 0 }}
              animate={isLineInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => <Step key={step.num} step={step} index={i} />)}
        </div>
      </div>
    </section>
  );
}

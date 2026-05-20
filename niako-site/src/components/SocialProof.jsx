import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import LottieIcon from './LottieIcon';

// URLs vérifiées et fonctionnelles
const STAT_ICONS = [
  'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json',
  'https://assets9.lottiefiles.com/packages/lf20_myejiggj.json',
  'https://assets3.lottiefiles.com/packages/lf20_uu0x8lqv.json',
  'https://assets6.lottiefiles.com/packages/lf20_atippmse.json',
];

const STATS = [
  { target: 20,  prefix: '+', suffix: '',  label: 'Systèmes livrés',   sub: 'depuis 2020',                  amber: true  },
  { target: 100, prefix: '',  suffix: '%', label: 'Sur mesure',        sub: 'zéro template, zéro générique', amber: false },
  { target: 3,   prefix: '',  suffix: '',  label: 'Mois de suivi',     sub: 'inclus post-livraison',         amber: false },
  { target: 24,  prefix: '<', suffix: 'h', label: 'Délai de réponse', sub: 'première approche garantie',    amber: false },
];

function Counter({ target, suffix, prefix, amber }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    const steps = Math.round((1600 / 1000) * 60);
    let frame = 0, rafId;
    function tick() {
      frame++;
      const p = Math.min(frame / steps, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return (
    <span ref={ref}
      className="font-syne font-extrabold leading-none tabular-nums"
      style={{
        fontSize: 'clamp(44px, 5vw, 64px)',
        color: amber ? 'var(--amber)' : 'var(--proof-color)',
      }}
    >
      {prefix}{count}{suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-16 px-5 md:px-12"
      style={{ background: 'var(--section-alt)', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}
    >
      <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i}
            className="flex flex-col items-center md:items-start py-8 md:py-0 md:px-10 gap-2"
            style={{ borderRight: i < STATS.length - 1 ? '1px solid var(--outline-variant)' : 'none' }}
          >
            {/* Icône Lottie animée en haut de chaque stat */}
            <LottieIcon
              src={STAT_ICONS[i]}
              size={36}
              loop
              className="mb-1 opacity-70"
            />
            {s.amber && (
              <div className="hidden md:block w-8 h-0.5 rounded-full"
                style={{ background: 'var(--amber)' }} />
            )}
            <Counter {...s} />
            <span className="font-syne font-bold text-[15px] leading-tight mt-1"
              style={{ color: 'var(--on-surface)' }}>
              {s.label}
            </span>
            <span className="font-dm text-[12px] leading-snug"
              style={{ color: 'var(--on-surface-variant)' }}>
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

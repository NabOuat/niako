import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTrack } from '../hooks/useTrack';
import LottieIcon from './LottieIcon';

// Icône WhatsApp
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { trackWhatsApp, trackEmail } = useTrack();

  return (
    <section id="contact" className="py-24 px-5 md:px-12 border-t"
      style={{ background: 'var(--section-alt)', borderColor: 'var(--outline-variant)' }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-container mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden py-20 px-8 md:px-24 text-center border"
          style={{
            background: 'var(--surface-container-lowest)',
            borderColor: 'var(--outline-variant)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Grille de points */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, var(--outline-variant) 1px, transparent 0)',
              backgroundSize: '32px 32px',
              opacity: 0.5,
            }} />

          <motion.div
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%)' }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -top-8 right-[15%] w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-8">
            <div className="space-y-5">
              {/* Icône animée centrée au-dessus du titre */}
              <div className="flex justify-center">
                <LottieIcon
                  src="https://assets9.lottiefiles.com/packages/lf20_myejiggj.json"
                  size={64}
                  loop
                  className="opacity-80"
                />
              </div>

              <span className="font-mono text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--amber)' }}>
                On a probablement déjà résolu ce problème
              </span>

              <h2 className="font-syne font-extrabold text-[32px] md:text-[44px] leading-tight tracking-tight"
                style={{ color: 'var(--on-surface)' }}>
                Décrivez-nous votre problème.{' '}
                <span className="text-gradient">On revient avec une approche,</span>{' '}
                pas un devis.
              </h2>

              <p className="font-dm text-[17px] leading-relaxed"
                style={{ color: 'var(--on-surface-variant)' }}>
                Pas de démo commerciale. Une conversation de 15 minutes —
                vous repartez avec des idées concrètes.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              {/* WhatsApp — canal principal en CIV */}
              <motion.a
                href="https://wa.me/2250749435171"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={() => trackWhatsApp('cta_section')}
              >
                <WhatsAppIcon />
                Écrire sur WhatsApp
              </motion.a>

              {/* Email — secondaire */}
              <a href="mailto:contact@niako.tech"
                className="link-hover-primary font-mono text-[12px]"
                onClick={() => trackEmail('cta_section')}
              >
                contact@niako.tech
              </a>

              <div className="flex items-center gap-2 mt-1">
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--amber)' }} />
                <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>
                  Réponse sous 24h · Abidjan, Côte d'Ivoire
                </p>
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--amber)' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

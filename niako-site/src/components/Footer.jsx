import NiakoLogo from './NiakoLogo';
import LottieIcon from './LottieIcon';
import { useTrack } from '../hooks/useTrack';

const PRODUITS   = ['GIS & Géomatique', 'Applications Métier', 'Mobile & Terrain', 'Secteur Public'];
const ENTREPRISE = ['À propos', 'Réalisations', 'Comment on travaille', 'Mentions légales'];

function IconWhatsApp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer() {
  const { trackWhatsApp, trackEmail } = useTrack();
  return (
    <footer className="border-t px-5 md:px-12 pt-16 pb-10"
      style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}>
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Colonne 1 — Identité + icône trophée animée */}
          <div className="space-y-5">
            <NiakoLogo size="md" />
            <div className="flex items-center gap-3">
              <LottieIcon
                src="https://assets4.lottiefiles.com/packages/lf20_touohxv0.json"
                size={32}
                loop
                className="opacity-70 flex-shrink-0"
              />
              <p className="font-syne font-bold text-[17px] leading-snug tracking-tight"
                style={{ color: 'var(--on-surface)' }}>
                Logiciels sur mesure.<br />
                <span style={{ color: 'var(--amber)' }}>Résultats mesurables.</span>
              </p>
            </div>
            <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>
              Abidjan, Côte d'Ivoire
            </p>
          </div>

          {/* Produits */}
          <div className="space-y-5">
            <h5 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>Produits</h5>
            <ul className="space-y-3">
              {PRODUITS.map((link) => (
                <li key={link}>
                  <a href="#" className="link-hover-amber font-dm text-[14px]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="space-y-5">
            <h5 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>Entreprise</h5>
            <ul className="space-y-3">
              {ENTREPRISE.map((link) => (
                <li key={link}>
                  <a href="#" className="link-hover-amber font-dm text-[14px]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h5 className="font-mono text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}>Contact</h5>

            <a href="https://wa.me/2250749435171"
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWhatsApp('footer')}
              className="link-hover-amber inline-flex items-center gap-2 font-dm text-[14px] font-medium"
            >
              <IconWhatsApp />
              +225 07 49 43 51 71
            </a>

            <a href="mailto:contact@niako.tech"
              onClick={() => trackEmail('footer')}
              className="link-hover-email block font-mono text-[12px] font-semibold"
            >
              contact@niako.tech
            </a>

            <div className="space-y-2.5 pt-1">
              <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--on-surface-variant)', opacity: 0.45 }}>
                Présence
              </p>
              <a href="https://www.facebook.com/profile.php?id=61584227738448"
                target="_blank" rel="noopener noreferrer"
                className="link-hover-surface inline-flex items-center gap-2 font-dm text-[14px]"
              >
                <IconFacebook />
                Facebook
              </a>
              <a href="#" className="link-hover-surface block font-dm text-[14px]">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--outline-variant)' }}>
          <p className="font-mono text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--on-surface-variant)', opacity: 0.35 }}>
            © 2026 NIAKO · Logiciels · Automatisation · Systèmes
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--amber)', opacity: 0.6 }} />
            <span className="font-mono text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--on-surface-variant)', opacity: 0.35 }}>
              Abidjan, Côte d'Ivoire
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

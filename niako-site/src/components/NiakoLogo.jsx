/**
 * NiakoLogo — PNG originaux fournis par Nabaga
 *
 * light → /logo-light.png  symbole bleu + wordmark navy sombre, fond blanc
 * dark  → /logo-dark.png   symbole + wordmark blancs outline, fond transparent/sombre
 *
 * Dimensions source : 1536×1024 — logo occupe ~30% hauteur, ~45% largeur
 * On affiche à taille cible via objectFit: contain
 */
import { useTheme } from '../context/ThemeContext';

const SOURCES = {
  light: '/logo-light.png',
  dark:  '/logo-dark.png',
};

const SIZES = {
  sm: { h: 28, w: 100 },
  md: { h: 36, w: 128 },
  lg: { h: 48, w: 170 },
};

export default function NiakoLogo({ size = 'md', className = '' }) {
  const { theme } = useTheme();
  const dim = SIZES[size] || SIZES.md;
  const src = SOURCES[theme] || SOURCES.dark;

  return (
    <img
      src={src}
      alt="NIAKO"
      draggable={false}
      className={`transition-opacity duration-300 ${className}`}
      style={{
        height:     dim.h,
        width:      dim.w,
        objectFit:  'contain',
        display:    'block',
        flexShrink: 0,
      }}
    />
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // contrôlé par ThemeContext via html.dark / html.light
  theme: {
    extend: {
      colors: {
        // ── Surfaces dark (valeurs par défaut) ──
        'surface-container-lowest': 'var(--surface-container-lowest)',
        'surface-container-low':    'var(--surface-container-low)',
        'surface':                  'var(--surface)',
        'surface-dim':              'var(--surface-dim)',
        'surface-container':        'var(--surface-container)',
        'surface-container-high':   'var(--surface-container-high)',
        'surface-container-highest':'var(--surface-container-highest)',
        'surface-bright':           'var(--surface-bright)',
        'surface-variant':          'var(--surface-variant)',
        // ── Contenu ──
        'on-surface':               'var(--on-surface)',
        'on-surface-variant':       'var(--on-surface-variant)',
        // ── Bordures ──
        'outline':                  'var(--outline)',
        'outline-variant':          'var(--outline-variant)',
        // ── Primary — Bleu Niako ──
        'primary':                  'var(--primary)',
        'primary-container':        'var(--primary-container)',
        'on-primary':               'var(--on-primary)',
        'on-primary-container':     'var(--on-primary-container)',
        // ── Secondary — Ambre Sahel ──
        'secondary':                'var(--secondary)',
        'secondary-container':      'var(--secondary-container)',
        // ── Background ──
        'background':               'var(--background)',
        'on-background':            'var(--on-background)',
        // ── Section alternée ──
        'section-alt':              'var(--section-alt)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm:   ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display':            ['64px',  { lineHeight: '1.1',  letterSpacing: '-0.04em', fontWeight: '800' }],
        'headline-lg':        ['40px',  { lineHeight: '1.2',  letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-lg-mobile': ['32px',  { lineHeight: '1.2',  letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-md':        ['24px',  { lineHeight: '1.3',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'body-lg':            ['18px',  { lineHeight: '1.6',  fontWeight: '400' }],
        'body-md':            ['15px',  { lineHeight: '1.5',  fontWeight: '400' }],
        'code-sm':            ['13px',  { lineHeight: '1.4',  fontWeight: '400' }],
        'label-caps':         ['11px',  { lineHeight: '1.0',  letterSpacing: '0.1em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm:      '0.25rem',
        md:      '0.75rem',
        lg:      '1rem',
        xl:      '1.25rem',
        '2xl':   '1.5rem',
        full:    '9999px',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        gutter: '16px',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}

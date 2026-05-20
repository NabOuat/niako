import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const DATA_BLUE  = '#2d5ce8';
const DATA_AMBER = '#e89500';
const DATA_GREEN = '#16a34a';

// Notifications qui arrivent en boucle
const NOTIFS = [
  { icon: '📍', text: 'Point collecté · Zone A', color: DATA_BLUE },
  { icon: '✓',  text: 'Sync complète · 847 pts', color: DATA_GREEN },
  { icon: '⚡', text: 'Export shapefile prêt',   color: DATA_AMBER },
  { icon: '📍', text: 'Nouveau relevé · Zone B',  color: DATA_BLUE },
];

// Valeurs du graphique qui changent
const CHART_SETS = [
  [40, 65, 55, 80, 70, 90, 75],
  [60, 45, 80, 55, 95, 65, 85],
  [75, 85, 60, 70, 50, 88, 72],
];

function LiveChart({ active }) {
  const [setIdx, setSetIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSetIdx(i => (i + 1) % CHART_SETS.length), 2800);
    return () => clearInterval(id);
  }, [active]);

  const vals = CHART_SETS[setIdx];
  const max = 100;
  const w = 12, gap = 4, h = 36;

  return (
    <svg width={(w + gap) * vals.length} height={h}>
      {vals.map((v, i) => {
        const barH = (v / max) * h;
        return (
          <motion.rect
            key={`${setIdx}-${i}`}
            x={i * (w + gap)}
            y={h - barH}
            width={w}
            height={barH}
            rx={2}
            fill={i === vals.length - 1 ? DATA_AMBER : DATA_BLUE}
            fillOpacity={i === vals.length - 1 ? 0.9 : 0.5}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </svg>
  );
}

function NotifToast({ notif }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-1.5 px-2 py-1 rounded border"
      style={{
        background: 'var(--surface-container)',
        borderColor: 'var(--outline-variant)',
        fontSize: 8,
      }}
    >
      <span style={{ fontSize: 9 }}>{notif.icon}</span>
      <span style={{ color: notif.color, fontFamily: 'monospace', letterSpacing: '0.03em' }}>
        {notif.text}
      </span>
    </motion.div>
  );
}

function MapNode({ x, y, size = 3, color, delay = 0 }) {
  return (
    <motion.circle cx={x} cy={y} r={size} fill={color}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
    />
  );
}

const MAP_NODES = [
  { x: 55,  y: 65, c: DATA_BLUE,  d: 0.9 },
  { x: 82,  y: 72, c: DATA_BLUE,  d: 1.1 },
  { x: 70,  y: 55, c: DATA_GREEN, d: 1.3 },
  { x: 115, y: 55, c: DATA_AMBER, d: 1.5 },
  { x: 130, y: 65, c: DATA_BLUE,  d: 1.7 },
  { x: 100, y: 75, c: DATA_GREEN, d: 1.9 },
  { x: 45,  y: 80, c: DATA_BLUE,  d: 2.1 },
  { x: 140, y: 48, c: DATA_AMBER, d: 2.2 },
];

export default function DashboardMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const [notifIdx, setNotifIdx] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [pointCount, setPointCount] = useState(847);
  const [syncPulse, setSyncPulse] = useState(true);

  // Notifications en boucle
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setShowNotif(true);
      setNotifIdx(i => (i + 1) % NOTIFS.length);
      setPointCount(n => n + Math.floor(Math.random() * 3) + 1);
      setTimeout(() => setShowNotif(false), 2200);
    }, 3500);
    return () => clearInterval(id);
  }, [isInView]);

  // Pulse sync indicator
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setSyncPulse(v => !v), 1500);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={ref}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
      style={{
        background: 'var(--surface-container)',
        border: '1px solid var(--outline-variant)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Barre titre */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,95,87,0.7)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,188,46,0.7)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(40,201,64,0.7)' }} />
        <div className="ml-4 flex items-center gap-1.5">
          <div className="h-3.5 w-20 rounded-sm" style={{ background: 'var(--surface-container-high)' }} />
          <div className="h-3.5 w-16 rounded-sm border"
            style={{ background: 'var(--primary-glow)', borderColor: 'var(--primary-container)' }} />
          <div className="h-3.5 w-14 rounded-sm" style={{ background: 'var(--surface-container-high)' }} />
        </div>
        {/* Notification toast en haut à droite de la barre */}
        <div className="ml-auto">
          <AnimatePresence mode="wait">
            {showNotif && <NotifToast key={notifIdx} notif={NOTIFS[notifIdx]} />}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-8 border-r flex flex-col items-center py-3 gap-3"
          style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}>
          {[
            { d: 'M4 8h8M4 12h8M4 16h8', active: true  },
            { d: 'M4 6l4 4-4 4M10 6l4 4-4 4', active: false },
            { d: 'M6 6h4v4H6zM10 10h4v4h-4z', active: false },
          ].map(({ d, active }, i) => (
            <div key={i}
              className="w-5 h-5 rounded-sm flex items-center justify-center"
              style={{ background: active ? 'var(--primary-glow)' : 'transparent' }}>
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none"
                stroke={active ? DATA_BLUE : 'var(--on-surface-variant)'} strokeWidth="1.5">
                <path d={d} strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>

        {/* Carte GIS */}
        <div className="flex-1 relative" style={{ background: 'var(--surface-container)' }}>
          {/* Grille */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
            {[0.2, 0.4, 0.6, 0.8].map((f) => (
              <g key={f}>
                <line x1={`${f*100}%`} y1="0" x2={`${f*100}%`} y2="100%"
                  stroke="var(--outline)" strokeWidth="0.5" strokeDasharray="3 6" />
                <line x1="0" y1={`${f*100}%`} x2="100%" y2={`${f*100}%`}
                  stroke="var(--outline)" strokeWidth="0.5" strokeDasharray="3 6" />
              </g>
            ))}
          </svg>

          {/* Zones GIS */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path d="M30,60 L70,45 L110,55 L130,80 L100,100 L60,95 Z"
              fill={DATA_BLUE + '18'} stroke={DATA_BLUE} strokeWidth="1" strokeOpacity="0.45"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
            />
            <motion.path d="M100,40 L145,35 L160,60 L145,85 L115,80 L95,65 Z"
              fill={DATA_AMBER + '14'} stroke={DATA_AMBER} strokeWidth="1" strokeOpacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            />
            {MAP_NODES.map((n, i) => <MapNode key={i} {...n} color={n.c} />)}

            {/* Ligne de traçé animée en boucle */}
            <motion.polyline
              points="45,80 55,65 70,55 82,72 100,75 115,55 130,65 140,48"
              fill="none" stroke={DATA_BLUE} strokeWidth="1" strokeOpacity="0.35"
              strokeDasharray="4 3"
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.5, 0.8, 1], repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />

            {/* Point "en cours" qui pulse */}
            <motion.circle cx={140} cy={48} r={6}
              fill="none" stroke={DATA_AMBER} strokeWidth="1"
              animate={{ r: [4, 9, 4], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          </svg>

          {/* Tooltip */}
          <motion.div
            className="absolute top-3 right-3 rounded-sm px-2.5 py-1.5 border"
            style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.3 }}
          >
            <p className="font-mono text-[9px]" style={{ color: 'var(--primary)' }}>EPSG:4326 · WGS84</p>
            <motion.p className="font-mono text-[9px]" style={{ color: 'var(--on-surface-variant)' }}
              key={pointCount}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {pointCount} points collectés
            </motion.p>
          </motion.div>

          {/* Barre status */}
          <div
            className="absolute bottom-0 left-0 right-0 border-t px-3 py-1 flex items-center gap-3"
            style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)', opacity: 0.9 }}
          >
            <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: DATA_GREEN }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px]" style={{ color: 'var(--on-surface-variant)' }}>
              Sync active · {syncPulse ? '2s' : '1s'}
            </span>
            <div className="ml-auto font-mono text-[9px]" style={{ color: 'var(--primary)' }}>
              NIAKO Ping Mapper
            </div>
          </div>
        </div>

        {/* Panel droit */}
        <div className="w-24 border-l flex flex-col p-2 gap-2"
          style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--outline-variant)' }}>
          <p className="font-mono text-[8px] font-semibold tracking-wider uppercase"
            style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>Couches</p>
          {[
            { label: 'Zone A', color: DATA_BLUE,  active: true  },
            { label: 'Zone B', color: DATA_AMBER, active: true  },
            { label: 'Réseau', color: DATA_GREEN, active: false },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ background: l.active ? l.color : 'transparent', border: `1px solid ${l.color}`, opacity: l.active ? 1 : 0.35 }} />
              <span className="font-mono text-[8px] truncate" style={{ color: 'var(--on-surface-variant)' }}>
                {l.label}
              </span>
            </div>
          ))}

          <div className="h-px my-1" style={{ background: 'var(--outline-variant)' }} />

          {/* Graphique live */}
          <p className="font-mono text-[8px] font-semibold tracking-wider uppercase"
            style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>Activité</p>
          <LiveChart active={isInView} />

          <div className="h-px my-1" style={{ background: 'var(--outline-variant)' }} />

          <p className="font-mono text-[8px] font-semibold tracking-wider uppercase"
            style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>Stats</p>
          {[
            { label: 'Points',    value: pointCount },
            { label: 'Surface',   value: '2.3km²'  },
            { label: 'Précision', value: '±1m'      },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-mono text-[8px]" style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}>{s.label}</p>
              <motion.p className="font-mono text-[9px] font-semibold"
                style={{ color: 'var(--primary-container)' }}
                key={s.value}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {s.value}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)' }} />
    </div>
  );
}

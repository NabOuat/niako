import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PingMapperDetail from './PingMapperDetail';

const projects = [
  // PROJET PHARE — affiché en format large (featured)
  {
    featured: true,
    category: 'Mobile',
    tag: 'Mobile · GIS',
    title: 'Ping Mapper',
    description: 'Application mobile offline-first de collecte et visualisation de points géolocalisés sur OpenStreetMap.',
    details: ['Offline-first', 'OpenStreetMap', 'Flutter', 'Sync différée'],
  },
  {
    featured: false,
    category: 'GIS',
    tag: 'GIS · Python',
    title: 'Génération de Shapefiles',
    description: 'Création, manipulation et export de fichiers géospatiaux avec contrôle qualité topologique intégré.',
    details: [],
  },
  {
    featured: false,
    category: 'GIS',
    tag: 'GIS · OCR',
    title: 'Extraction OCR Coordonnées',
    description: 'Extraction automatique de coordonnées depuis des fichiers Excel via reconnaissance optique.',
    details: [],
  },
  {
    featured: false,
    category: 'GIS',
    tag: 'GIS · Python',
    title: 'Projection de Shapefiles',
    description: 'Reprojection et transformation de données géospatiales — systèmes de coordonnées multiples.',
    details: [],
  },
  {
    featured: false,
    category: 'GIS',
    tag: 'GIS · QC',
    title: 'Contrôle Qualité Shapefiles',
    description: 'Détection et correction automatique d\'erreurs topologiques dans les données géospatiales.',
    details: [],
  },
  {
    featured: false,
    category: 'Métier',
    tag: 'Métier · Stock',
    title: 'Gestion de Stock',
    description: 'Système complet de gestion d\'inventaire pour PME : flux, alertes de seuil, rapports automatisés.',
    details: [],
  },
  {
    featured: false,
    category: 'Métier',
    tag: 'Métier · ERP',
    title: 'Suite Gestion PME',
    description: 'Suite opérationnelle intégrée pour PME : CRM, facturation, reporting en un seul outil.',
    details: [],
  },
  {
    featured: false,
    category: 'Métier',
    tag: 'Métier · RH',
    title: 'Gestion RH & Employés',
    description: 'Suivi des ressources humaines, contrats, congés et paie pour équipes distribuées.',
    details: [],
  },
  {
    featured: false,
    category: 'Mobile',
    tag: 'Mobile · Terrain',
    title: 'Suivi Déploiement Mobiliers',
    description: 'Traçabilité et suivi du déploiement de mobiliers terrain avec reporting temps réel.',
    details: [],
  },
  {
    featured: false,
    category: 'Public',
    tag: 'Public · Formation',
    title: 'Gestion Formation',
    description: 'Planification et suivi de sessions de formation et sensibilisation pour organisations publiques.',
    details: [],
  },
  {
    featured: false,
    category: 'Public',
    tag: 'Public · Web',
    title: 'Interpeche CI',
    description: 'Site institutionnel pour acteur du secteur halieutique ivoirien : présentation, actualités, contact.',
    details: [],
  },
];

// Tags taxonomiquement cohérents : Domaine · Techno/Type — pas de mélange avec secteurs
const filters = ['Tous', 'GIS', 'Métier', 'Mobile', 'Public'];

function FeaturedCard({ project, onDetail }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card-hover md:col-span-2 group relative rounded-md overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--surface-container) 0%, var(--surface-container-low) 100%)' }}
    >
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,111,240,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 p-7 flex flex-col gap-5 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            {/* Badge projet phare */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/15 border border-primary-container/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              <span className="font-mono text-label-caps text-primary">Projet phare</span>
            </div>
            <span className="block font-mono text-label-caps text-primary/60">{project.tag}</span>
            <h3 className="font-syne font-bold text-[28px] leading-tight tracking-tight text-on-surface">
              {project.title}
            </h3>
          </div>
          {/* Icône mobile */}
          <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 flex-shrink-0 opacity-30" stroke="currentColor" strokeWidth="1.5">
            <rect x="10" y="4" width="20" height="32" rx="3" />
            <path d="M18 33h4" strokeLinecap="round" />
          </svg>
        </div>

        <p className="font-dm text-body-md text-on-surface-variant leading-relaxed max-w-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {project.details.map((d) => (
            <span key={d} className="font-mono text-label-caps text-primary/80 border border-primary-container/25 px-2.5 py-1 rounded-full" style={{ background: 'rgba(59,111,240,0.10)' }}>
              {d}
            </span>
          ))}
          <button
            onClick={onDetail}
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-label-caps px-3 py-1.5 rounded-full border opacity-100 hover:opacity-75 transition-opacity duration-200"
            style={{ color: 'var(--amber)', borderColor: 'var(--amber)', background: 'var(--amber-glow)' }}
          >
            Case study
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="card-hover group rounded-md p-6 flex flex-col gap-4"
      style={{ background: 'var(--surface-container-low)' }}
    >
      <span className="self-start font-mono text-label-caps text-primary/70 bg-primary-container/10 border border-primary-container/20 px-2.5 py-1 rounded-full">
        {project.tag}
      </span>
      <h3 className="font-syne font-bold text-headline-md text-on-surface leading-tight">
        {project.title}
      </h3>
      <p className="font-dm text-body-md text-on-surface-variant leading-relaxed">
        {project.description}
      </p>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('Tous');
  const [showDetail, setShowDetail] = useState(false);

  const allFiltered = active === 'Tous' ? projects : projects.filter((p) => p.category === active);
  const featured = allFiltered.find((p) => p.featured);
  const rest = allFiltered.filter((p) => !p.featured);

  return (
    <section id="réalisations" className="py-24 px-5 md:px-12">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-2">
            <span className="font-mono text-label-caps text-primary/60 uppercase">// Portfolio</span>
            <h2 className="font-syne font-bold text-headline-lg text-on-surface leading-tight">
              Nos Réalisations
            </h2>
            <p className="font-dm text-body-md text-on-surface-variant max-w-sm">
              Des systèmes livrés, en production, qui tournent.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par domaine">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className="font-mono text-label-caps px-4 py-2 rounded border transition-all duration-200"
                style={active === f ? {
                  background: 'var(--primary-container)',
                  color: 'var(--on-primary-container)',
                  borderColor: 'var(--primary-container)',
                  boxShadow: 'var(--shadow-button)',
                } : {
                  background: 'transparent',
                  color: 'var(--on-surface-variant)',
                  borderColor: 'var(--outline-variant)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {featured && (
              <FeaturedCard
                key="featured"
                project={featured}
                onDetail={() => setShowDetail(true)}
              />
            )}
            {rest.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDetail && <PingMapperDetail onClose={() => setShowDetail(false)} />}
      </AnimatePresence>
    </section>
  );
}

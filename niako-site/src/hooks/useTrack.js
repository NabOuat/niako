import { track } from '@vercel/analytics';

export function useTrack() {
  return {
    trackWhatsApp: (source) => track('whatsapp_click', { source }),
    trackEmail:    (source) => track('email_click',    { source }),
    trackProject:  (name)   => track('project_view',   { name }),
    trackCTA:      (label)  => track('cta_click',      { label }),
  };
}

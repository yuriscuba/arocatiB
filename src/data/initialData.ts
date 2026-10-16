import { DiveLog, AdBannerConfig } from '../types';

// Pre-generated digital signature vector data URL for sample preview
const SAMPLE_SIGNATURE_DATA_URL_1 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120" viewBox="0 0 300 120"><path d="M 30 70 Q 50 20 80 45 T 120 75 Q 160 30 190 65 Q 230 100 270 50 M 60 90 L 250 85" fill="none" stroke="%230284c7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const SAMPLE_SIGNATURE_DATA_URL_2 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120" viewBox="0 0 300 120"><path d="M 40 80 C 70 30, 90 20, 110 50 C 130 80, 140 30, 170 40 C 200 50, 220 80, 260 70 M 90 95 Q 160 85 240 90" fill="none" stroke="%230ea5e9" stroke-width="3.5" stroke-linecap="round"/></svg>';

export const initialDives: DiveLog[] = [];

export const initialAdConfig: AdBannerConfig = {
  id: 'ad-yuri-scuba-photographer',
  sponsorName: 'YURI SCUBA PHOTOGRAPHER',
  headline: 'Fotografía Subacuática Profesional',
  subtext: 'Inmortaliza tus mejores inmersiones con fotos y vídeos de alta resolución en arrecifes y cenotes.',
  ctaText: 'Ver Portafolio',
  targetUrl: 'http://portal.yuriscuba.com/photographer',
  imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
  badgeText: 'FOTOGRAFÍA PRO',
  isActive: true,
};

export type DiveCategory = 'instruction' | 'recreational';

export type WaterType = 'salt' | 'fresh';

export type SuitType = 
  | 'rashguard'
  | 'shorty_2mm'
  | 'wetsuit_3mm'
  | 'wetsuit_5mm'
  | 'wetsuit_7mm'
  | 'semidry'
  | 'drysuit';

export type VisibilityRating = 'poor' | 'fair' | 'good' | 'excellent';

export interface DivePhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface DiveLog {
  id: string;
  diveNumber: number;
  category: DiveCategory;
  date: string; // YYYY-MM-DD
  timeIn: string; // HH:MM
  timeOut: string; // HH:MM
  siteName: string;
  location: string;
  maxDepth: number; // in meters (or feet)
  bottomTime: number; // in minutes
  waterType: WaterType;
  temperature: number; // in °C
  weight: number; // in kg (lastre)
  suitType: SuitType;
  visibility: number; // in meters
  visibilityRating?: VisibilityRating;
  
  // Equipment / Tank
  startingPressure?: number; // bar
  endingPressure?: number; // bar
  gasMix?: string; // 'Air 21%', 'Nitrox 32%', etc.
  
  // Validation (Instructor / Guide)
  instructorName: string;
  instructorNumber: string; // e.g. PADI DM-12345, SSI #6789
  instructorSignature: string; // Data URL PNG
  signatureDate?: string;
  
  // Course info if instruction
  courseName?: string; // e.g., 'Open Water Diver', 'Advanced Deep Dive'
  
  // Media & Notes
  photos: DivePhoto[];
  notes: string;
  buddies?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface AdBannerConfig {
  id: string;
  sponsorName: string;
  headline: string;
  subtext: string;
  ctaText: string;
  targetUrl: string;
  imageUrl?: string;
  badgeText: string;
  isActive: boolean;
}

export type SupportedLanguage = 'es' | 'en' | 'fr';

export type UnitSystem = 'metric' | 'imperial';

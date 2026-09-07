import { SupportedLanguage } from '../types';

export const translations = {
  es: {
    appTitle: 'Bitácora de Buceo',
    appSubtitle: 'Registro digital para buceo recreativo y formativo',
    
    // Categories
    allDives: 'Todos los Buceos',
    instructional: 'Buceos de Instrucción',
    instructionalShort: 'Instrucción',
    instructionalDesc: 'Cursos, especialidades y certificaciones oficiales',
    recreational: 'Buceos Recreacionales',
    recreationalShort: 'Recreacional',
    recreationalDesc: 'Buceo de placer, exploración y vida marina',
    
    // Actions
    addNewDive: 'Añadir nuevo buceo',
    saveDive: 'Guardar Registro',
    editDive: 'Editar Buceo',
    deleteDive: 'Eliminar',
    viewDetails: 'Ver Detalles',
    cancel: 'Cancelar',
    close: 'Cerrar',
    editAd: 'Editar Publicidad',
    saveAd: 'Guardar Banner',
    clearSignature: 'Limpiar Firma',
    saveSignature: 'Confirmar Firma',
    viewCode: 'Código Móvil (Flutter / React Native)',
    viewApp: 'Ver Aplicación',
    filterAll: 'Todos',
    searchPlaceholder: 'Buscar por sitio, ubicación, curso o instructor...',
    exportData: 'Exportar JSON',
    importData: 'Importar',
    
    // Stats
    totalDives: 'Total Buceos',
    totalBottomTime: 'Tiempo de Fondo',
    maxDepthReached: 'Profundidad Máx.',
    avgDepth: 'Profundidad Prom.',
    hoursMin: 'horas',
    minutesShort: 'min',
    metersShort: 'm',
    feetShort: 'ft',
    poundsShort: 'lbs',
    psiShort: 'psi',
    barShort: 'bar',

    // Unit System
    unitSystem: 'Sistema de Unidades',
    metricSystem: 'Sistema Métrico',
    imperialSystem: 'Sistema Imperial',
    metric: 'Métrico',
    imperial: 'Imperial',
    metricUnitsHint: 'm, °C, kg, bar',
    imperialUnitsHint: 'ft, °F, lbs, psi',
    
    // Form fields & labels
    generalInfo: 'Información General',
    diveNumber: 'Buceo N.º',
    category: 'Categoría',
    date: 'Fecha',
    timeIn: 'Hora de Entrada',
    timeOut: 'Hora de Salida',
    siteName: 'Nombre del Punto de Buceo',
    siteNamePlaceholder: 'Ej. Gran Cenote, Arrecife Palancar',
    location: 'Ubicación / Región',
    locationPlaceholder: 'Ej. Cozumel, México / Roatán, Honduras',
    courseName: 'Nombre del Curso / Certificación',
    courseNamePlaceholder: 'Ej. PADI Advanced Open Water - Navegación',
    
    // Dive profile & physics
    profileAndConditions: 'Perfil y Condiciones de Inmersión',
    maxDepth: 'Profundidad Máxima',
    bottomTime: 'Tiempo de Fondo (min)',
    waterType: 'Tipo de Agua',
    saltWater: 'Agua Salada (Mar)',
    freshWater: 'Agua Dulce (Cenote/Lago)',
    temperature: 'Temperatura del Agua',
    ballastWeight: 'Lastre',
    suitType: 'Tipo de Traje',
    visibility: 'Visibilidad',
    tankPressure: 'Presión de Tanque',
    startPressure: 'Presión Inicial',
    endPressure: 'Presión Final',
    gasMix: 'Mezcla de Gas',
    airMix: 'Aire 21%',
    nitrox32: 'Nitrox EAN32',
    nitrox36: 'Nitrox EAN36',
    
    // Suit types
    rashguard: 'Licra / Rashguard',
    shorty_2mm: 'Shorty 2mm / 3mm',
    wetsuit_3mm: 'Húmedo 3mm completo',
    wetsuit_5mm: 'Húmedo 5mm',
    wetsuit_7mm: 'Húmedo 7mm',
    semidry: 'Semiseco 7mm',
    drysuit: 'Traje Seco',
    
    // Validation
    validationAndSignature: 'Validación del Instructor / Guía',
    instructorName: 'Nombre del Instructor o Guía',
    instructorNamePlaceholder: 'Ej. Carlos Mendez',
    instructorNumber: 'N.º de Instructor / Certificación',
    instructorNumberPlaceholder: 'Ej. PADI MSDT-489210 / SSI #76543',
    signatureInstruction: 'Dibuja con el dedo o puntero la firma digital en el recuadro:',
    signatureRequired: 'Firma requerida para validar la inmersión',
    signatureCaptured: 'Firma capturada y validada',
    verifiedStamp: 'CERTIFICADO & FIRMADO',
    verifiedBy: 'Validado por',
    
    // Photos
    divePhotos: 'Fotos Exclusivas del Buceo',
    photosDesc: 'Sube fotografías de flora, fauna o equipo durante esta inmersión',
    uploadPhotoBtn: 'Añadir Fotos',
    dragDropText: 'Arrastra imágenes aquí o haz clic para seleccionar',
    noPhotosYet: 'No se han añadido fotos para este buceo aún.',
    
    // Notes & observations
    notesTitle: 'Notas y Observaciones',
    notesPlaceholder: 'Escribe sobre la fauna avistada (tiburones, tortugas, corales), corrientes, ejercicios realizados...',
    buddiesTitle: 'Compañeros de Buceo (Buddies)',
    buddiesPlaceholder: 'Nombres de tus compañeros de inmersión...',
    
    // Empty states
    noDivesFound: 'No se encontraron registros de buceo.',
    startLogging: 'Comienza agregando tu primera inmersión.',
    
    // Ad banner
    sponsored: 'Patrocinado',
    customizeAd: 'Configurar Banner de Publicidad',
    sponsorName: 'Nombre del Patrocinador',
    adHeadline: 'Titular del Anuncio',
    adSubtext: 'Texto Secundario',
    adCtaText: 'Texto del Botón (CTA)',
    adTargetUrl: 'URL de Destino',
    adImageUrl: 'URL de Imagen (Opcional)',
    adActive: 'Banner Activo',
    
    // Mobile Code Viewer
    codeTabTitle: 'Arquitectura Móvil',
    flutterTab: 'Flutter (Dart)',
    reactNativeTab: 'React Native (TSX)',
    copyCode: 'Copiar Código',
    codeCopied: '¡Código copiado al portapapeles!',
    structureTitle: 'Estructura del Proyecto',
    explanationNote: 'Código nativo listo para compilar en iOS y Android con Flutter o React Native.',
    
    // Simulator
    phoneFrame: 'Modo Celular',
    expandedFrame: 'Modo Expandido',
  },
  
  en: {
    appTitle: 'Dive Logbook',
    appSubtitle: 'Digital diving log for recreational and instructional dives',
    
    // Categories
    allDives: 'All Dives',
    instructional: 'Instructional Dives',
    instructionalShort: 'Instruction',
    instructionalDesc: 'Courses, specialties and official certifications',
    recreational: 'Recreational Dives',
    recreationalShort: 'Recreational',
    recreationalDesc: 'Leisure diving, exploration and marine wildlife',
    
    // Actions
    addNewDive: 'Add New Dive',
    saveDive: 'Save Dive Log',
    editDive: 'Edit Dive',
    deleteDive: 'Delete',
    viewDetails: 'View Details',
    cancel: 'Cancel',
    close: 'Close',
    editAd: 'Edit Ad Banner',
    saveAd: 'Save Banner',
    clearSignature: 'Clear Signature',
    saveSignature: 'Confirm Signature',
    viewCode: 'Mobile Code (Flutter / React Native)',
    viewApp: 'View Application',
    filterAll: 'All',
    searchPlaceholder: 'Search by site, location, course or instructor...',
    exportData: 'Export JSON',
    importData: 'Import',
    
    // Stats
    totalDives: 'Total Dives',
    totalBottomTime: 'Bottom Time',
    maxDepthReached: 'Max Depth',
    avgDepth: 'Avg Depth',
    hoursMin: 'hours',
    minutesShort: 'min',
    metersShort: 'm',
    feetShort: 'ft',
    poundsShort: 'lbs',
    psiShort: 'psi',
    barShort: 'bar',

    // Unit System
    unitSystem: 'Unit System',
    metricSystem: 'Metric System',
    imperialSystem: 'Imperial System',
    metric: 'Metric',
    imperial: 'Imperial',
    metricUnitsHint: 'm, °C, kg, bar',
    imperialUnitsHint: 'ft, °F, lbs, psi',
    
    // Form fields & labels
    generalInfo: 'General Information',
    diveNumber: 'Dive #',
    category: 'Category',
    date: 'Date',
    timeIn: 'Time In',
    timeOut: 'Time Out',
    siteName: 'Dive Site Name',
    siteNamePlaceholder: 'e.g. Gran Cenote, Palancar Reef',
    location: 'Location / Region',
    locationPlaceholder: 'e.g. Cozumel, Mexico / Roatan, Honduras',
    courseName: 'Course / Specialty Name',
    courseNamePlaceholder: 'e.g. PADI Advanced Open Water - Navigation',
    
    // Dive profile & physics
    profileAndConditions: 'Dive Profile & Environmental Conditions',
    maxDepth: 'Max Depth',
    bottomTime: 'Bottom Time (min)',
    waterType: 'Water Type',
    saltWater: 'Salt Water (Ocean)',
    freshWater: 'Fresh Water (Cenote/Lake)',
    temperature: 'Water Temperature',
    ballastWeight: 'Ballast / Weight',
    suitType: 'Suit Type',
    visibility: 'Visibility',
    tankPressure: 'Tank Pressure',
    startPressure: 'Start Pressure',
    endPressure: 'End Pressure',
    gasMix: 'Gas Mix',
    airMix: 'Air 21%',
    nitrox32: 'Nitrox EAN32',
    nitrox36: 'Nitrox EAN36',
    
    // Suit types
    rashguard: 'Rashguard / Swimwear',
    shorty_2mm: 'Shorty 2mm / 3mm',
    wetsuit_3mm: 'Full Wetsuit 3mm',
    wetsuit_5mm: 'Full Wetsuit 5mm',
    wetsuit_7mm: 'Full Wetsuit 7mm',
    semidry: 'Semi-dry 7mm',
    drysuit: 'Drysuit',
    
    // Validation
    validationAndSignature: 'Instructor / Guide Validation',
    instructorName: 'Instructor or Guide Name',
    instructorNamePlaceholder: 'e.g. Carlos Mendez',
    instructorNumber: 'Instructor / Certification #',
    instructorNumberPlaceholder: 'e.g. PADI MSDT-489210 / SSI #76543',
    signatureInstruction: 'Draw digital signature with finger or pointer in the box:',
    signatureRequired: 'Signature required to validate the dive',
    signatureCaptured: 'Signature captured and validated',
    verifiedStamp: 'CERTIFIED & SIGNED',
    verifiedBy: 'Verified by',
    
    // Photos
    divePhotos: 'Exclusive Dive Photos',
    photosDesc: 'Upload photographs of marine life, scenery or gear for this dive',
    uploadPhotoBtn: 'Add Photos',
    dragDropText: 'Drag images here or click to select',
    noPhotosYet: 'No photos attached to this dive yet.',
    
    // Notes & observations
    notesTitle: 'Notes & Observations',
    notesPlaceholder: 'Note down wildlife sightings (sharks, rays, turtles), currents, skills practiced...',
    buddiesTitle: 'Dive Buddies',
    buddiesPlaceholder: 'Names of your dive buddies...',
    
    // Empty states
    noDivesFound: 'No dive records found.',
    startLogging: 'Start by recording your first underwater adventure.',
    
    // Ad banner
    sponsored: 'Sponsored',
    customizeAd: 'Customize Ad Banner',
    sponsorName: 'Sponsor Name',
    adHeadline: 'Ad Headline',
    adSubtext: 'Subtext / Description',
    adCtaText: 'Call to Action (CTA)',
    adTargetUrl: 'Target URL',
    adImageUrl: 'Image URL (Optional)',
    adActive: 'Banner Active',
    
    // Mobile Code Viewer
    codeTabTitle: 'Mobile Architecture',
    flutterTab: 'Flutter (Dart)',
    reactNativeTab: 'React Native (TSX)',
    copyCode: 'Copy Code',
    codeCopied: 'Code copied to clipboard!',
    structureTitle: 'Project Structure',
    explanationNote: 'Native production code ready to run on iOS and Android via Flutter or React Native.',
    
    // Simulator
    phoneFrame: 'Mobile Frame',
    expandedFrame: 'Expanded View',
  },
  
  fr: {
    appTitle: 'Carnet de Plongée',
    appSubtitle: 'Journal numérique pour plongées récréatives et de formation',
    
    // Categories
    allDives: 'Toutes les plongées',
    instructional: 'Plongées de Formation',
    instructionalShort: 'Formation',
    instructionalDesc: 'Cours, spécialités et certifications officielles',
    recreational: 'Plongées Récréatives',
    recreationalShort: 'Récréatif',
    recreationalDesc: 'Plongée loisir, exploration et vie marine',
    
    // Actions
    addNewDive: 'Ajouter une plongée',
    saveDive: 'Enregistrer la plongée',
    editDive: 'Modifier',
    deleteDive: 'Supprimer',
    viewDetails: 'Voir Détails',
    cancel: 'Annuler',
    close: 'Fermer',
    editAd: 'Modifier la Publicité',
    saveAd: 'Enregistrer la Bannière',
    clearSignature: 'Effacer la Signature',
    saveSignature: 'Confirmer la Signature',
    viewCode: 'Code Mobile (Flutter / React Native)',
    viewApp: 'Voir l\'Application',
    filterAll: 'Tous',
    searchPlaceholder: 'Rechercher par site, lieu, cours ou instructeur...',
    exportData: 'Exporter JSON',
    importData: 'Importer',
    
    // Stats
    totalDives: 'Total Plongées',
    totalBottomTime: 'Temps d\'Immersion',
    maxDepthReached: 'Prof. Maximale',
    avgDepth: 'Prof. Moyenne',
    hoursMin: 'heures',
    minutesShort: 'min',
    metersShort: 'm',
    feetShort: 'ft',
    poundsShort: 'lbs',
    psiShort: 'psi',
    barShort: 'bar',

    // Unit System
    unitSystem: 'Système d\'Unités',
    metricSystem: 'Système Métrique',
    imperialSystem: 'Système Impérial',
    metric: 'Métrique',
    imperial: 'Impérial',
    metricUnitsHint: 'm, °C, kg, bar',
    imperialUnitsHint: 'ft, °F, lbs, psi',
    
    // Form fields & labels
    generalInfo: 'Informations Générales',
    diveNumber: 'Plongée N°',
    category: 'Catégorie',
    date: 'Date',
    timeIn: 'Heure d\'Immersion',
    timeOut: 'Heure de Sortie',
    siteName: 'Nom du Site de Plongée',
    siteNamePlaceholder: 'Ex. Grand Cénoté, Récif Palancar',
    location: 'Lieu / Région',
    locationPlaceholder: 'Ex. Cozumel, Mexique / Roatan, Honduras',
    courseName: 'Nom du Cours / Spécialité',
    courseNamePlaceholder: 'Ex. PADI Advanced Open Water - Navigation',
    
    // Dive profile & physics
    profileAndConditions: 'Profil et Conditions de Plongée',
    maxDepth: 'Profondeur Maximale',
    bottomTime: 'Temps de Fond (min)',
    waterType: 'Type d\'Eau',
    saltWater: 'Eau Salée (Mer)',
    freshWater: 'Eau Douce (Cénote/Lac)',
    temperature: 'Température de l\'Eau',
    ballastWeight: 'Lestage',
    suitType: 'Type de Combinaison',
    visibility: 'Visibilité',
    tankPressure: 'Pression Bouteille',
    startPressure: 'Pression Initiale',
    endPressure: 'Pression Finale',
    gasMix: 'Mélange de Gaz',
    airMix: 'Air 21%',
    nitrox32: 'Nitrox EAN32',
    nitrox36: 'Nitrox EAN36',
    
    // Suit types
    rashguard: 'Top UV / Lycra',
    shorty_2mm: 'Shorty 2mm / 3mm',
    wetsuit_3mm: 'Humide 3mm intégrale',
    wetsuit_5mm: 'Humide 5mm',
    wetsuit_7mm: 'Humide 7mm',
    semidry: 'Semi-étanche 7mm',
    drysuit: 'Combinaison Étanche',
    
    // Validation
    validationAndSignature: 'Validation de l\'Instructeur / Guide',
    instructorName: 'Nom de l\'Instructeur ou Guide',
    instructorNamePlaceholder: 'Ex. Jean-Luc Costeau',
    instructorNumber: 'N° d\'Instructeur / Certification',
    instructorNumberPlaceholder: 'Ex. PADI MSDT-489210 / CMAS 3*',
    signatureInstruction: 'Dessinez la signature numérique avec le doigt ou la souris :',
    signatureRequired: 'Signature requise pour valider la plongée',
    signatureCaptured: 'Signature enregistrée et validée',
    verifiedStamp: 'CERTIFIÉ ET SIGNÉ',
    verifiedBy: 'Validé par',
    
    // Photos
    divePhotos: 'Photos Exclusives de la Plongée',
    photosDesc: 'Téléchargez des photos de la faune, du paysage ou de votre équipement',
    uploadPhotoBtn: 'Ajouter des Photos',
    dragDropText: 'Glissez des images ici ou cliquez pour choisir',
    noPhotosYet: 'Aucune photo enregistrée pour cette plongée.',
    
    // Notes & observations
    notesTitle: 'Notes & Observations',
    notesPlaceholder: 'Notez les observations (requins, tortues, coraux), le courant, les exercices réalisés...',
    buddiesTitle: 'Binômes de Plongée',
    buddiesPlaceholder: 'Noms de vos binômes...',
    
    // Empty states
    noDivesFound: 'Aucune plongée trouvée.',
    startLogging: 'Commencez par enregistrer votre première exploration sous-marine.',
    
    // Ad banner
    sponsored: 'Sponsorisé',
    customizeAd: 'Configurer la Bannière Publicitaire',
    sponsorName: 'Nom du Sponsor',
    adHeadline: 'Titre Publicitaire',
    adSubtext: 'Texte Secondaire',
    adCtaText: 'Bouton d\'Appel (CTA)',
    adTargetUrl: 'URL Cible',
    adImageUrl: 'URL Image (Optionnelle)',
    adActive: 'Bannière Active',
    
    // Mobile Code Viewer
    codeTabTitle: 'Architecture Mobile',
    flutterTab: 'Flutter (Dart)',
    reactNativeTab: 'React Native (TSX)',
    copyCode: 'Copier le Code',
    codeCopied: 'Code copié dans le presse-papiers !',
    structureTitle: 'Structure du Projet',
    explanationNote: 'Code natif de production prêt pour iOS et Android avec Flutter ou React Native.',
    
    // Simulator
    phoneFrame: 'Vue Mobile',
    expandedFrame: 'Vue Élargie',
  }
};

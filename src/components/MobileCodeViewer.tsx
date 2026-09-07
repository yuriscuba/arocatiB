import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  FolderTree, 
  Smartphone, 
  FileCode2, 
  Layers, 
  Terminal, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface MobileCodeViewerProps {
  language: SupportedLanguage;
}

export const MobileCodeViewer: React.FC<MobileCodeViewerProps> = ({ language }) => {
  const t = translations[language];
  const [platform, setPlatform] = useState<'flutter' | 'react-native'>('flutter');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeFile, setActiveFile] = useState<string>('model');

  const copyToClipboard = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  // FLUTTER CODE SNIPPETS
  const flutterFiles: Record<string, { name: string; path: string; code: string; desc: string }> = {
    structure: {
      name: 'Estructura Flutter',
      path: 'dive_logbook_flutter/',
      desc: 'Árbol de carpetas estándar para producción (Clean Architecture)',
      code: `dive_logbook/
├── android/
│   └── app/src/main/AndroidManifest.xml   # Permisos de cámara y fotos
├── ios/
│   └── Runner/Info.plist                  # NSCameraUsageDescription, NSPhotoLibraryUsageDescription
├── lib/
│   ├── main.dart                          # Inicialización de la app & Providers
│   ├── models/
│   │   ├── dive_model.dart                # Modelo de datos con serialización JSON
│   │   └── ad_config_model.dart           # Modelo del banner publicitario
│   ├── screens/
│   │   ├── dive_list_screen.dart          # Pantalla principal con pestañas Instrucción/Recreacional
│   │   ├── dive_form_screen.dart          # Formulario de registro completo
│   │   └── dive_detail_screen.dart        # Vista detallada e inspección de firma
│   ├── widgets/
│   │   ├── tactile_signature_pad.dart     # Canvas táctil para firma del instructor
│   │   ├── multi_photo_uploader.dart      # Selector de múltiples fotos
│   │   └── customizable_ad_banner.dart    # Banner de publicidad dinámico y editable
│   └── l10n/
│       ├── app_es.arb                     # Traducciones Español
│       ├── app_en.arb                     # Traducciones Inglés
│       └── app_fr.arb                     # Traducciones Francés
└── pubspec.yaml                           # Dependencias (signature, image_picker, provider)`
    },
    model: {
      name: 'dive_model.dart',
      path: 'lib/models/dive_model.dart',
      desc: 'Modelo de datos en Dart con categorías, perfiles y firma digital',
      code: `enum DiveCategory { instruction, recreational }
enum WaterType { salt, fresh }
enum SuitType { rashguard, shorty, wetsuit3mm, wetsuit5mm, wetsuit7mm, semidry, drysuit }

class DiveLog {
  final String id;
  final int diveNumber;
  final DiveCategory category;
  final DateTime date;
  final String timeIn;
  final String timeOut;
  final String siteName;
  final String location;
  final double maxDepth;        // en metros
  final int bottomTime;         // en minutos
  final WaterType waterType;
  final double temperature;     // en °C
  final double weight;          // en kg
  final SuitType suitType;
  final double visibility;      // en metros
  final String? courseName;     // ej. PADI Advanced Open Water
  
  // Validación Instructor / Guía
  final String instructorName;
  final String instructorNumber;
  final String? signatureBase64Png; // Firma táctil capturada en PNG Base64
  
  // Galería de fotos del buceo
  final List<String> photoUrls;
  final String notes;
  final String buddies;

  DiveLog({
    required this.id,
    required this.diveNumber,
    required this.category,
    required this.date,
    required this.timeIn,
    required this.timeOut,
    required this.siteName,
    required this.location,
    required this.maxDepth,
    required this.bottomTime,
    required this.waterType,
    required this.temperature,
    required this.weight,
    required this.suitType,
    required this.visibility,
    this.courseName,
    required this.instructorName,
    required this.instructorNumber,
    this.signatureBase64Png,
    this.photoUrls = const [],
    this.notes = '',
    this.buddies = '',
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'diveNumber': diveNumber,
    'category': category.name,
    'date': date.toIso8601String(),
    'timeIn': timeIn,
    'timeOut': timeOut,
    'siteName': siteName,
    'location': location,
    'maxDepth': maxDepth,
    'bottomTime': bottomTime,
    'waterType': waterType.name,
    'temperature': temperature,
    'weight': weight,
    'suitType': suitType.name,
    'visibility': visibility,
    'courseName': courseName,
    'instructorName': instructorName,
    'instructorNumber': instructorNumber,
    'signatureBase64Png': signatureBase64Png,
    'photoUrls': photoUrls,
    'notes': notes,
    'buddies': buddies,
  };

  factory DiveLog.fromJson(Map<String, dynamic> json) => DiveLog(
    id: json['id'],
    diveNumber: json['diveNumber'],
    category: DiveCategory.values.byName(json['category']),
    date: DateTime.parse(json['date']),
    timeIn: json['timeIn'],
    timeOut: json['timeOut'],
    siteName: json['siteName'],
    location: json['location'],
    maxDepth: (json['maxDepth'] as num).toDouble(),
    bottomTime: json['bottomTime'],
    waterType: WaterType.values.byName(json['waterType']),
    temperature: (json['temperature'] as num).toDouble(),
    weight: (json['weight'] as num).toDouble(),
    suitType: SuitType.values.byName(json['suitType']),
    visibility: (json['visibility'] as num).toDouble(),
    courseName: json['courseName'],
    instructorName: json['instructorName'] ?? '',
    instructorNumber: json['instructorNumber'] ?? '',
    signatureBase64Png: json['signatureBase64Png'],
    photoUrls: List<String>.from(json['photoUrls'] ?? []),
    notes: json['notes'] ?? '',
    buddies: json['buddies'] ?? '',
  );
}`
    },
    listScreen: {
      name: 'dive_list_screen.dart',
      path: 'lib/screens/dive_list_screen.dart',
      desc: 'Pantalla con pestañas de Instrucción y Recreacional + Banner publicitario editable',
      code: `import 'package:flutter/material.dart';
import '../models/dive_model.dart';
import '../widgets/customizable_ad_banner.dart';
import 'dive_form_screen.dart';

class DiveListScreen extends StatefulWidget {
  const DiveListScreen({Key? key}) : super(key: key);

  @override
  State<DiveListScreen> createState() => _DiveListScreenState();
}

class _DiveListScreenState extends State<DiveListScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<DiveLog> _dives = []; // Persistible con SharedPreferences o Hive

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF020617), // Deep Ocean Dark
      appBar: AppBar(
        title: const Text('Bitácora de Buceo', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
        actions: [
          IconButton(
            icon: const Icon(Icons.language),
            tooltip: 'Cambiar idioma (ES/EN/FR)',
            onPressed: () => _showLanguagePicker(context),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: const Color(0xFF06B6D4), // Cyan Accent
          indicatorWeight: 3,
          labelColor: const Color(0xFF38BDF8),
          unselectedLabelColor: Colors.slate400,
          tabs: const [
            Tab(icon: Icon(Icons.school), text: 'Buceos de Instrucción'),
            Tab(icon: Icon(Icons.scuba_diving), text: 'Buceos Recreacionales'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Banner de Publicidad editable y dinámico
          const CustomizableAdBanner(),

          // Listas filtradas por categoría
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildDiveCategoryList(DiveCategory.instruction),
                _buildDiveCategoryList(DiveCategory.recreational),
              ],
            ),
          ),
        ],
      ),
      // Botón flotante siempre visible para añadir buceos ilimitados
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: const Color(0xFF06B6D4),
        foregroundColor: const Color(0xFF020617),
        icon: const Icon(Icons.add, size: 22),
        label: const Text('Añadir nuevo buceo', style: TextStyle(fontWeight: FontWeight.bold)),
        onPressed: () {
          final currentCategory = _tabController.index == 0 
              ? DiveCategory.instruction 
              : DiveCategory.recreational;
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (ctx) => DiveFormScreen(defaultCategory: currentCategory),
            ),
          );
        },
      ),
    );
  }

  Widget _buildDiveCategoryList(DiveCategory category) {
    final filtered = _dives.where((d) => d.category == category).toList();
    if (filtered.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(category == DiveCategory.instruction ? Icons.school_outlined : Icons.scuba_diving, 
                 size: 56, color: Colors.slate700),
            const SizedBox(height: 12),
            Text(
              category == DiveCategory.instruction 
                  ? 'No hay buceos de instrucción registrados' 
                  : 'No hay buceos recreacionales registrados',
              style: const TextStyle(color: Colors.slate400),
            ),
          ],
        ),
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: filtered.length,
      itemBuilder: (ctx, i) => _DiveCard(dive: filtered[i]),
    );
  }
}`
    },
    signatureWidget: {
      name: 'tactile_signature_pad.dart',
      path: 'lib/widgets/tactile_signature_pad.dart',
      desc: 'Panel táctil de dibujo en Flutter con exportación a PNG Base64',
      code: `import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class TactileSignaturePad extends StatefulWidget {
  final Function(String base64Signature) onSignatureCaptured;

  const TactileSignaturePad({Key? key, required this.onSignatureCaptured}) : super(key: key);

  @override
  State<TactileSignaturePad> createState() => _TactileSignaturePadState();
}

class _TactileSignaturePadState extends State<TactileSignaturePad> {
  late SignatureController _controller;

  @override
  void initState() {
    super.initState();
    _controller = SignatureController(
      penStrokeWidth: 3,
      penColor: const Color(0xFF0284C7), // Ink Blue
      exportBackgroundColor: Colors.transparent,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _exportSignature() async {
    if (_controller.isNotEmpty) {
      final bytes = await _controller.toPngBytes();
      if (bytes != null) {
        final base64String = 'data:image/png;base64,\${base64Encode(bytes)}';
        widget.onSignatureCaptured(base64String);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Firma del instructor capturada con éxito')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        border: Border.all(color: const Color(0xFF334155)),
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              const Text(
                'Firma Táctil del Instructor / Guía',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
              ),
              IconButton(
                icon: const Icon(Icons.refresh, color: Colors.roseAccent, size: 20),
                tooltip: 'Borrar firma',
                onPressed: () => _controller.clear(),
              ),
            ],
          ),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Signature(
              controller: _controller,
              height: 140,
              backgroundColor: const Color(0xFF020617),
            ),
          ),
          const SizedBox(height: 8),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0284C7)),
            icon: const Icon(Icons.check, size: 16),
            label: const Text('Validar Firma'),
            onPressed: _exportSignature,
          ),
        ],
      ),
    );
  }
}`
    },
    pubspec: {
      name: 'pubspec.yaml',
      path: 'pubspec.yaml',
      desc: 'Dependencias de Flutter para i18n, firma y cámara',
      code: `name: dive_logbook
description: "Bitácora móvil de buceo profesional para Android e iOS"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.19.0
  signature: ^5.4.0         # Captura de firma táctil digital
  image_picker: ^1.1.2      # Múltiples fotos de galería y cámara
  shared_preferences: ^2.3.2 # Almacenamiento local persistente
  url_launcher: ^6.3.0      # Abrir enlaces de publicidad
  provider: ^6.1.2          # Manejo de estado

flutter:
  generate: true
  uses-material-design: true`
    }
  };

  // REACT NATIVE CODE SNIPPETS
  const rnFiles: Record<string, { name: string; path: string; code: string; desc: string }> = {
    structure: {
      name: 'Estructura React Native',
      path: 'DiveLogbookRN/',
      desc: 'Arquitectura React Native (Expo o Bare CLI) con TypeScript',
      code: `DiveLogbookRN/
├── android/
│   └── app/src/main/AndroidManifest.xml
├── ios/
│   └── DiveLogbookRN/Info.plist
├── src/
│   ├── types/
│   │   └── dive.ts                 # Interfaces TypeScript completas
│   ├── screens/
│   │   ├── DiveListScreen.tsx      # Pestañas Buceo Instrucción & Recreacional
│   │   ├── DiveFormScreen.tsx      # Formulario con todos los campos solicitados
│   │   └── DiveDetailScreen.tsx    # Vista completa con firma digital
│   ├── components/
│   │   ├── SignatureCanvas.tsx     # Canvas táctil react-native-signature-canvas
│   │   ├── MultiPhotoPicker.tsx    # Subida de múltiples fotos
│   │   └── EditableAdBanner.tsx    # Banner de publicidad configurable
│   ├── i18n/
│   │   ├── index.ts                # Configuración i18next
│   │   └── locales/
│   │       ├── es.json             # Español
│   │       ├── en.json             # Inglés
│   │       └── fr.json             # Francés
│   └── storage/
│       └── diveStorage.ts          # AsyncStorage / MMKV
├── App.tsx                         # Navegación con React Navigation
└── package.json                    # Dependencias nativas`
    },
    model: {
      name: 'types/dive.ts',
      path: 'src/types/dive.ts',
      desc: 'Modelos TypeScript completos para DiveLog y AdBanner',
      code: `export type DiveCategory = 'instruction' | 'recreational';

export type WaterType = 'salt' | 'fresh';

export type SuitType = 
  | 'rashguard' 
  | 'shorty_2mm' 
  | 'wetsuit_3mm' 
  | 'wetsuit_5mm' 
  | 'wetsuit_7mm' 
  | 'semidry' 
  | 'drysuit';

export interface DivePhoto {
  id: string;
  uri: string;
  caption?: string;
}

export interface DiveLog {
  id: string;
  diveNumber: number;
  category: DiveCategory;
  date: string;
  timeIn: string;
  timeOut: string;
  siteName: string;
  location: string;
  maxDepth: number;         // metros
  bottomTime: number;       // minutos
  waterType: WaterType;
  temperature: number;      // °C
  weight: number;           // kg de lastre
  suitType: SuitType;
  visibility: number;       // metros
  courseName?: string;      // ej. PADI Rescue Diver
  
  // Validación Instructor / Guía
  instructorName: string;
  instructorNumber: string;
  instructorSignature: string; // Base64 Data URL
  
  photos: DivePhoto[];
  notes: string;
  buddies?: string;
  createdAt: string;
}

export interface AdBannerConfig {
  sponsorName: string;
  headline: string;
  subtext: string;
  ctaText: string;
  targetUrl: string;
  imageUrl?: string;
  isActive: boolean;
}`
    },
    listScreen: {
      name: 'DiveListScreen.tsx',
      path: 'src/screens/DiveListScreen.tsx',
      desc: 'Pantalla principal en React Native con tabs y botón de añadir buceos ilimitados',
      code: `import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DiveLog, DiveCategory } from '../types/dive';
import { EditableAdBanner } from '../components/EditableAdBanner';

export const DiveListScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<DiveCategory>('recreational');
  const [dives, setDives] = useState<DiveLog[]>([]);

  const filteredDives = dives.filter((d) => d.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Banner de Publicidad configurable */}
      <EditableAdBanner />

      {/* Selector de Categorías (Instrucción vs Recreacional) */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectedCategory === 'instruction' && styles.activeTab]}
          onPressed={() => setSelectedCategory('instruction')}
        >
          <Text style={[styles.tabText, selectedCategory === 'instruction' && styles.activeTabText]}>
            Buceos de Instrucción
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedCategory === 'recreational' && styles.activeTab]}
          onPressed={() => setSelectedCategory('recreational')}
        >
          <Text style={[styles.tabText, selectedCategory === 'recreational' && styles.activeTabText]}>
            Buceos Recreacionales
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Registros */}
      <FlatList
        data={filteredDives}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('DiveDetail', { dive: item })}
          >
            <Text style={styles.diveTitle}>#{item.diveNumber} - {item.siteName}</Text>
            <Text style={styles.diveSubtitle}>{item.maxDepth}m · {item.bottomTime} min · {item.location}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Sin inmersiones en esta categoría.</Text>
          </View>
        }
      />

      {/* Botón visible de "Añadir nuevo buceo" en ambas secciones */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('DiveForm', { category: selectedCategory })}
      >
        <Text style={styles.fabText}>+ Añadir nuevo buceo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  tabBar: { flexDirection: 'row', backgroundColor: '#0f172a', padding: 4, margin: 12, borderRadius: 12 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#0284c7' },
  tabText: { color: '#94a3b8', fontWeight: '600', fontSize: 12 },
  activeTabText: { color: '#ffffff' },
  card: { backgroundColor: '#0f172a', marginHorizontal: 12, marginBottom: 8, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#1e293b' },
  diveTitle: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  diveSubtitle: { color: '#38bdf8', fontSize: 12, marginTop: 4 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#64748b', fontSize: 13 },
  fabButton: { position: 'absolute', bottom: 24, right: 16, left: 16, backgroundColor: '#06b6d4', paddingVertical: 14, borderRadius: 28, alignItems: 'center', elevation: 4 },
  fabText: { color: '#020617', fontWeight: 'bold', fontSize: 15 },
});`
    },
    signatureCanvas: {
      name: 'SignatureCanvas.tsx',
      path: 'src/components/SignatureCanvas.tsx',
      desc: 'Componente táctil para capturar la firma digital del instructor en React Native',
      code: `import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface SignatureCanvasProps {
  onSaveSignature: (signatureDataUrl: string) => void;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSaveSignature }) => {
  const ref = useRef<SignatureViewRef>(null);

  const handleOK = (signature: string) => {
    onSaveSignature(signature);
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Firma Táctil del Instructor / Guía:</Text>
      <View style={styles.canvasContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          penColor="#0284c7"
          webStyle={\`
            .m-signature-pad { box-shadow: none; border: none; background-color: #020617; }
            .m-signature-pad--body { border: none; }
            .m-signature-pad--footer { display: none; }
          \`}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn} onPress={() => ref.current?.readSignature()}>
          <Text style={styles.confirmText}>Guardar Firma</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  label: { color: '#e2e8f0', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  canvasContainer: { height: 160, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#334155' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 8 },
  clearBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#334155', borderRadius: 6 },
  clearText: { color: '#fca5a5', fontSize: 12 },
  confirmBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#0284c7', borderRadius: 6 },
  confirmText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
});`
    }
  };

  const currentFiles = platform === 'flutter' ? flutterFiles : rnFiles;
  const currentFile = currentFiles[activeFile] || currentFiles['structure'];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden my-4" id="mobile-code-viewer-panel">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {t.codeTabTitle} (Android & iOS)
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
              Nativo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.explanationNote}
          </p>
        </div>

        {/* Platform Selector Switch */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setPlatform('flutter');
              setActiveFile('structure');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              platform === 'flutter'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Flutter (Dart)
          </button>
          <button
            type="button"
            onClick={() => {
              setPlatform('react-native');
              setActiveFile('structure');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              platform === 'react-native'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            React Native (TSX)
          </button>
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto text-xs">
        {Object.entries(currentFiles).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveFile(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap transition-colors ${
              activeFile === key
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            {item.name}
          </button>
        ))}
      </div>

      {/* Code Header Bar with Copy Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono">{currentFile.path}</span>
          <span className="text-slate-400 hidden sm:inline">&bull; {currentFile.desc}</span>
        </div>

        <button
          type="button"
          onClick={() => copyToClipboard(currentFile.code, currentFile.name)}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md border border-slate-700 text-xs font-medium transition-colors"
          id="copy-mobile-code-btn"
        >
          {copiedFile === currentFile.name ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copyCode}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Preview Box */}
      <div className="relative p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-[500px]">
        <pre className="leading-relaxed whitespace-pre font-mono">
          {currentFile.code}
        </pre>
      </div>
    </div>
  );
};

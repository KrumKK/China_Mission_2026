/* ═══════════════════════════════════════════════════════════
   MISIÓN CHINA 2026 — LIZARTE
   App Logic
═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────
   DATA — Logística (hoteles, ciudades, salidas)
   Actualizar cuando confirméis reservas.
────────────────────────────────────────────── */
const TRIP_LOGISTICS = [
  {
    id: 'beijing',
    cityEs: 'Pekín (Beijing)',
    cityZh: '北京',
    dateRange: '21–23 jun 2026 · 2 noches',
    hotel: {
      nameEs: 'Beijing Liangmahe Hotel',
      nameZh: '北京亮马河饭店',
      addressEs: null,
      addressZh: null,
      phone: null
    },
    departureTime: null,
    departureNote: 'Check-out 23 jun · vuelo a Shenzhen 20:15',
    notes: 'Feria CISCE · llegada internacional 21 jun (06:00)'
  },
  {
    id: 'shenzhen',
    cityEs: 'Shenzhen · Longhua',
    cityZh: '深圳 · 龙华',
    dateRange: '23–28 jun 2026 · 5 noches',
    hotel: {
      nameEs: 'Grand Madison LongHua Yujing Shenzhen',
      nameZh: '深圳格兰云天龙华观澜酒店',
      addressEs: null,
      addressZh: null,
      phone: null
    },
    departureTime: null,
    departureNote: 'Hora de salida del hotel — pendiente de confirmar',
    notes: 'Habitación superior · misión PIN · distrito Longhua'
  },
  {
    id: 'guangzhou',
    cityEs: 'Guangzhou',
    cityZh: '广州',
    cityBadge: {
      label: 'GUANGZHOU',
      color: '#E67E22'
    },
    dateRange: '25–26 jun 2026 · 1 noche',
    hotel: {
      nameEs: 'MaxX by Steigenberger Guangzhou Zhujiang New Town',
      nameZh: '广州珠江新城华轩美仑美奂酒店',
      addressEs: '5th Floor (Front Desk), No. 62, Jinsui Road, Zhujiang New Town, Distrito de Tianhe, Guangzhou, Cantón',
      addressZh: null,
      phone: '+86-20-28306688-0 / +86-15116459261'
    },
    checkIn: 'Jueves 25 junio 2026 — después de las 14:00',
    checkOut: 'Viernes 26 junio 2026 — antes de las 12:00',
    nightsBadge: '1 NOCHE',
    departureTime: null,
    departureNote: null,
    notes: 'Estancia para reuniones ICEX Cantón'
  },
  {
    id: 'interpreter-selina',
    cityEs: '🗣️ INTÉRPRETE',
    cityZh: '',
    dateRange: 'Plan de trabajo · 24–27 jun 2026',
    interpreter: {
      name: 'Selina',
      role: 'Intérprete',
      email: '',
      schedule: [
        { date: 'Mié 24 junio', task: 'Quedamos a las 17:00. Cena.' },
        { date: 'Jue 25 junio', task: 'Acompaña a FinDreams/BYD (Shenzhen) + XPENG (Guangzhou)' },
        { date: 'Vie 26 junio', task: 'Acompaña a GAC Group y GAC Components (Guangzhou) + Kuayue Autopart (Guangzhou)' },
        {
          date: 'Sáb 27 junio',
          task: 'Acompaña a reuniones en el International Automotive Electronics Industry Summit (Shenzhen)'
        }
      ],
      costs: [
        '3 días: 3.400 RMB (todo incluido)',
        'Hotel 24 junio: 220 RMB',
        'Hotel 26 junio: 220 RMB',
        'Descuento: 1 noche de hotel bonificada',
        'Transporte: pendiente de confirmar'
      ]
    }
  }
];

/* ──────────────────────────────────────────────
   DATA — Arrival Cards (documentos de llegada)
────────────────────────────────────────────── */
const ARRIVAL_CARDS = [
  {
    id: 'krum',
    name: 'Krum Kovachev',
    file: 'arrival-card-krum.pdf'
  },
  {
    id: 'oscar',
    name: 'Óscar Huarte',
    file: 'arrival-card-oscar.pdf'
  }
];

/* ──────────────────────────────────────────────
   DATA — Vuelos
────────────────────────────────────────────── */
const FLIGHTS = [
  {
    id: 'mad-pek',
    type: 'ida',
    title: 'Vuelo de ida',
    routeLabel: 'Madrid – Pekín',
    from: {
      code: 'MAD',
      city: 'Madrid',
      airport: 'Aeropuerto Adolfo Suárez Madrid-Barajas',
      terminal: 'T1'
    },
    to: {
      code: 'PEK',
      city: 'Pekín',
      airport: 'Aeropuerto Internacional de Pekín-Capital',
      terminal: 'T3'
    },
    date: '2026-06-20',
    dateLabel: 'Sáb 20 jun',
    departTime: '12:55',
    arriveTime: '06:00',
    arriveDateLabel: 'Dom 21 jun',
    duration: '11h 05m',
    note: 'Todos los horarios en hora local'
  },
  {
    id: 'pek-szx',
    type: 'ida',
    title: 'Vuelo de ida',
    routeLabel: 'Pekín – Shenzhen',
    from: {
      code: 'PEK',
      city: 'Pekín',
      airport: 'Aeropuerto Internacional de Pekín-Capital',
      terminal: 'T3'
    },
    to: {
      code: 'SZX',
      city: 'Shenzhen',
      airport: "Aeropuerto Internacional de Shenzhen-Bao'an",
      terminal: 'T3'
    },
    date: '2026-06-23',
    dateLabel: 'Mar 23 jun',
    departTime: '20:15',
    arriveTime: '23:35',
    arriveDateLabel: 'Mar 23 jun',
    duration: '3h 20m',
    note: 'Todos los horarios en hora local'
  }
];

/* ──────────────────────────────────────────────
   DATA — Resumen diario maestro (General)
────────────────────────────────────────────── */
const TRIP_DAILY_SUMMARY = [
  {
    id: 'jun-21',
    title: 'Domingo 21 junio — Beijing',
    summaryLine: 'Domingo 21 — Beijing (1 evento)',
    location: '📍 Beijing',
    slots: [
      {
        time: '18:00',
        label: 'Cena bienvenida CISCE',
        detail: 'Punto de encuentro: vestíbulo hotel 17:00'
      }
    ]
  },
  {
    id: 'jun-22',
    title: 'Lunes 22 junio — Beijing / CISCE',
    summaryLine: 'Lunes 22 — Beijing / CISCE (5 eventos)',
    location: '📍 Beijing',
    slots: [
      { time: '09:30', label: 'Ceremonia inauguración CISCE' },
      { time: '12:00', label: 'Almuerzo inauguración' },
      { time: '14:30', label: 'Conferencia Anhui + MOU', warning: 'confirmar' },
      { time: '16:00', label: 'Mesa redonda Cámaras Comercio', warning: 'confirmar' },
      { time: '19:00', label: 'Cena delegación Navarra' }
    ]
  },
  {
    id: 'jun-23',
    title: 'Martes 23 junio — Beijing → Shenzhen',
    summaryLine: 'Martes 23 — Beijing → Shenzhen (vuelo noche)',
    location: '📍 Beijing (mañana) → ✈️ Shenzhen (noche)',
    slots: [
      { time: '09:30', label: 'Sesión intercambio Chongqing (E201)' },
      { time: '11:00', label: 'Evento Día de Navarra' },
      { time: '14:00', label: 'Visita guiada sala exposiciones CISCE' },
      { time: '', label: '✈️ Vuelo Beijing → Shenzhen (llega 23:35)', flight: true }
    ]
  },
  {
    id: 'jun-24',
    title: 'Miércoles 24 junio — Shenzhen / Foro',
    summaryLine: 'Miércoles 24 — Shenzhen / Foro Longhua (10 eventos)',
    location: '📍 Shenzhen',
    slots: [
      { time: '09:30', label: 'Visita Longhua International Cooperation Center' },
      { time: '10:00', label: '(FORO) Apertura Institucional' },
      { time: '10:30', label: '(FORO) Presentaciones empresas' },
      { time: '12:00', label: '(FORO) Almuerzo de trabajo' },
      { time: '13:30', label: '(FORO) B2B Matchmaking' },
      { time: '15:00', label: '(FORO) Foto de grupo' },
      { time: '16:00', label: 'Visita Hongmeng', confirmed: true },
      { time: '17:00', label: '🗣️ Quedamos con intérprete Selina a las 17:00' },
      { time: '17:30', label: 'Visita Meituan', confirmed: true }
    ]
  },
  {
    id: 'jun-25',
    title: 'Jueves 25 junio — ⚠️ DÍA PARTIDO',
    summaryLine: 'Jueves 25 — ⚠️ Día partido: ICEX Lizarte + Grupo',
    conflict: true,
    location: '📍 Shenzhen + Guangzhou',
    dayNotes: ['🗣️ Intérprete Selina'],
    groups: [
      {
        heading: 'LIZARTE (separados del grupo)',
        slots: [
          { time: '09:30', label: 'FinDreams / BYD (Shenzhen) — ICEX', lizarte: true },
          { travel: true, label: 'Desplazamiento Shenzhen → Guangzhou' },
          { time: '15:00', label: 'XPENG (Guangzhou) — ICEX', lizarte: true },
          { time: '', label: '🏨 Hotel MaxX Steigenberger Guangzhou (check-in 14:00)' }
        ]
      },
      {
        heading: 'GRUPO NAVARRA (sin Lizarte)',
        slots: [
          { time: '10:00', label: 'Visita Hithium' },
          { time: '11:30', label: 'Centro Nacional Dispositivos Médicos' },
          { time: '15:00', label: 'Ye Sun Technology Park' },
          { time: '19:30', label: 'Cena' }
        ]
      }
    ]
  },
  {
    id: 'jun-26',
    title: 'Viernes 26 junio — ⚠️ DÍA PARTIDO',
    summaryLine: 'Viernes 26 — ⚠️ Día partido: ICEX Lizarte + Grupo',
    conflict: true,
    location: '📍 Guangzhou + Shenzhen',
    dayNotes: ['🗣️ Intérprete Selina'],
    groups: [
      {
        heading: 'LIZARTE (separados del grupo)',
        slots: [
          { time: '10:00', label: 'GAC Group + GAC Component (Guangzhou) — ICEX', lizarte: true },
          { time: '', label: '🏨 Check-out hotel Guangzhou (antes 12:00)' },
          { time: 'Tarde', label: 'Kuayue Autopart (Guangzhou) — ICEX', lizarte: true },
          { travel: true, label: 'Desplazamiento Guangzhou → Shenzhen' }
        ]
      },
      {
        heading: 'GRUPO NAVARRA (sin Lizarte)',
        slots: [
          { time: '10:00', label: 'Reunión empresas SIF' },
          { time: '14:00', label: 'Huaqiangbei' },
          { time: '15:00', label: 'Tax Free shopping' },
          { time: '16:00', label: 'Proyección película', warning: 'pendiente' },
          { time: '18:30', label: 'Cena' },
          { time: '', label: '✈️ Aeropuerto', flight: true }
        ]
      }
    ]
  },
  {
    id: 'jun-27',
    title: 'Sábado 27 junio — Shenzhen / Summit',
    summaryLine: 'Sábado 27 — Summit Automotive Electronics + Dare Auto',
    location: '📍 Shenzhen — Hilton Hotel',
    dayNotes: ['🗣️ Intérprete Selina'],
    slots: [
      {
        time: 'Todo el día',
        label: '15th International Automotive Electronics Industry Summit',
        lizarte: true
      },
      { time: '08:00', label: 'Check-in' },
      { time: '09:00', label: 'Apertura' },
      { time: '12:00', label: 'Almuerzo' },
      { time: '14:00', label: 'Sesiones tarde' },
      { time: '16:20', label: 'Ceremonia premios' },
      { time: '18:30', label: 'Networking Dinner' },
      { time: '', label: 'Reunión: Dare Auto', lizarte: true }
    ]
  }
];

/* ──────────────────────────────────────────────
   DATA — Delegaciones (Eventos · CISCE / Shenzhen)
────────────────────────────────────────────── */
const TRIP_DELEGATIONS = {
  cisce: {
    institutional: [
      { org: 'GN.', person: 'Mikel Irujo', role: 'Consejero de Industria y de Transición Ecológica y Digital' },
      { org: 'GN.', person: 'Iñigo Arruti', role: 'Director General de Fomento Empresarial e Infraestructuras' },
      { org: 'GN.', person: 'Miren Ausín', role: 'Directora del Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Mila García', role: 'Representante comercial, Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Alex González', role: 'Becario, Servicio de Proyección Internacional en Shanghái' },
      { org: 'GN.', person: 'Victoria Iracheta', role: 'Becaria, Servicio de Proyección Internacional en Pekín' },
      { org: 'SODENA.', person: 'Unai Irigoyen', role: 'Técnico de Proyectos de Captación de Inversiones' },
      { org: 'SODENA.', person: 'Miguel de la Ossa', role: 'Técnico' }
    ],
    companies: [
      { org: 'CENER.', person: 'Eduardo Aznar', role: 'Director de Desarrollo de Negocio' },
      { org: 'CEIN.', person: 'Uxue Itoiz', role: 'Directora Gerente' },
      { org: 'CEIN.', person: 'Víctor Fernández', role: 'Responsable de Comunicación' },
      { org: 'NHC.', person: 'Laura Corcuera', role: 'Directora Gerente' },
      { org: 'ATANA.', person: 'Cristina García', role: 'Gerente' },
      { org: 'iCONS.', person: 'Íñigo Porres', role: 'Gerente' },
      { org: 'CLAVNA.', person: 'Arturo Cisneros', role: 'Director Gerente' },
      { org: 'LIZARTE.', person: 'Óscar Huarte', role: 'Consejero Delegado / CEO', highlight: true },
      { org: 'LIZARTE.', person: 'Krum Kovachev', role: 'Director de Innovación', highlight: true },
      { org: 'GURPEA.', person: 'Pablo Ayestarán', role: 'Director de Ventas' },
      { org: 'GURPEA.', person: 'Pedro Odériz', role: 'Director Gerente' }
    ]
  },
  shenzhen: {
    institutional: [
      { org: 'GN.', person: 'Mikel Irujo', role: 'Consejero de Industria y de Transición Ecológica y Digital' },
      { org: 'GN.', person: 'Iñigo Arruti', role: 'Director General de Fomento Empresarial e Infraestructuras' },
      { org: 'GN.', person: 'Miren Ausín', role: 'Directora del Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Laura Tella', role: 'Comunicación del Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Estela Cerdán', role: 'Técnica del Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Mila García', role: 'Representante comercial Servicio de Proyección Internacional' }
    ],
    companies: [
      { org: 'LUARTECHNOLOGY S.L.', person: 'Paula Camaces', role: 'Project Manager' },
      { org: 'LUARTECHNOLOGY S.L.', person: 'Luis González', role: 'CEO' },
      { org: 'INNOUP FARMA.', person: 'Maite Agüeros', role: 'CEO' },
      { org: 'INNOUP FARMA.', person: 'Ferran Capdevila', role: 'Clinical advisor' },
      { org: 'NAIR CENTER.', person: 'Gorka García Rodero', role: 'Director Gerente' },
      { org: 'NAIR CENTER.', person: 'Angela Bernardini', role: 'Responsable de Innovación y Transferencia Tecnológica' },
      { org: 'LIZARTE SA.', person: 'Óscar Huarte', role: 'Consejero Delegado / CEO', highlight: true },
      { org: 'LIZARTE SA.', person: 'Krum Kovachev', role: 'Director de Innovación', highlight: true },
      { org: 'NR ELECTRÓNICA.', person: 'Mikel Alonso Taniñe', role: 'Project Design Manager' },
      { org: 'NR ELECTRÓNICA.', person: 'Iosu Alonso Taniñe', role: 'Manager Gestión y Finanzas' },
      { org: 'GURPEA SYSTEMS, S.L.U.', person: 'Pablo Ayestarán', role: 'Dirección de Ventas' },
      { org: 'GURPEA SYSTEMS, S.L.U.', person: 'Pedro Odériz', role: 'Director Gerente' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Ion Arrizabalaga', role: 'Coordinador' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Gonzalo Ordóñez', role: 'Director de Medicina Personalizada y Laboratorios' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Antonio Pineda', role: 'Director Científico de CIMA' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Inés Ibáñez Sala', role: 'Innovación Terapéutica CIMA' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Luis Campos Iturralde', role: 'Director Gerente' },
      { org: 'POLO IRIS / NASERTIC.', person: 'Juan Narro', role: 'Especialista TIC' },
      { org: 'FUNDACIÓN CENER.', person: 'Eduardo Aznar', role: 'Director de Desarrollo de Negocio' },
      { org: 'DAS-NANO TECH SL.', person: 'Jürgen Schreiner', role: 'Global Business Development Director' },
      { org: 'CEIN.', person: 'Uxue Itoiz', role: 'Directora Gerente' },
      { org: 'CEIN.', person: 'Víctor Fernández', role: 'Responsable de Comunicación' },
      { org: 'ARANDOVO.', person: 'Estefanía Erro', role: 'CEO' },
      { org: 'HR MOTOR.', person: 'Emilio Hernandez Royo', role: 'CEO' }
    ]
  }
};

/* ──────────────────────────────────────────────
   DATA — Summit Automotive Electronics (ICEX Cantón · 27 jun)
────────────────────────────────────────────── */
const AUTOMOTIVE_SUMMIT = {
  title: '15th International Automotive Electronics Industry Summit 2026',
  theme: 'AI Smart Driving Pioneers · Chip & Chain Co-Upgrades · Building a New-Quality Industrial Ecosystem',
  dateBadge: '27 junio 2026',
  venueBadge: 'Hilton Hotel, Shenzhen',
  sections: [
    {
      label: 'MAÑANA',
      slots: [
        { time: '08:00-09:00', activity: 'Check-in' },
        { time: '09:00-09:30', activity: 'Opening Remarks' },
        { time: '09:30-09:50', activity: 'Guest Address' },
        {
          time: '09:50-10:00',
          activity: 'Keynote: Empowering with AI, Upholding Integrity and Innovation',
          speaker: 'Yang Hong – Pres. Shenzhen Automotive Electronics Industry Assoc. / Chairman Hangsheng Electronics'
        },
        {
          time: '10:00-10:15',
          activity: "Development Trends of China's Intelligent & Connected Vehicles",
          speaker: 'Ye Shengli – Chief Engineer, CAAM'
        },
        {
          time: '10:15-10:30',
          activity: 'Sunlord Electronics: Innovation of Intelligent Cockpit',
          speaker: 'Jin Zekun – Engineering & Marketing Manager'
        },
        { time: '10:30-10:40', activity: 'Tea Break ☕', break: true },
        {
          time: '10:40-11:00',
          activity: 'In-Vehicle Communication & Cockpit via R&D',
          speaker: 'Fang Lijun – Neoway Technology'
        },
        {
          time: '11:00-11:20',
          activity: 'Internet Meets AI – Intelligent Revolution',
          speaker: 'Geely Automobile'
        },
        {
          time: '11:20-11:40',
          activity: 'Evolution of Automotive Storage',
          speaker: 'Longsys'
        },
        {
          time: '11:40-12:00',
          activity: 'AI and Storage Power Autonomous Driving',
          speaker: 'Silicon Motion'
        }
      ]
    },
    {
      label: 'ALMUERZO',
      slots: [
        { time: '12:00-14:00', activity: 'Self-service Lunch 🍽️', meal: true }
      ]
    },
    {
      label: 'TARDE',
      slots: [
        {
          time: '14:00-14:20',
          activity: 'Intelligent Automotive Trends in the AI Era',
          speaker: 'Por confirmar'
        },
        {
          time: '14:20-14:40',
          activity: 'Flash Memory Chip Market for ICV',
          speaker: 'Chen Jian – Hikvision Storage Technology'
        },
        {
          time: '14:40-15:00',
          activity: 'Por confirmar',
          speaker: 'China Academy of Information and Communications Technology'
        },
        { time: '15:00-15:20', activity: 'Tea Break ☕', break: true },
        {
          time: '15:20-15:40',
          activity: 'AI-Enabled Intelligent Technologies',
          speaker: 'Por confirmar'
        },
        {
          time: '15:40-16:00',
          activity: 'AI-enabled Intelligent Vehicles',
          speaker: 'Ethiopia'
        },
        {
          time: '16:00-16:20',
          activity: 'Automotive Industry in Malaysia & ASEAN',
          speaker: "Dato' Khoo Chong Boon"
        },
        { time: '16:20-18:00', activity: 'Automotive Electronics S&T Award Ceremony 🏆' },
        { time: '18:30-20:30', activity: 'Networking Dinner 🍷', meal: true }
      ]
    }
  ]
};

const SUMMIT_SEED_COMPANIES = [
  {
    id: 'summit-01',
    name: 'Dare Auto',
    nameZh: ''
  }
];

const SUMMIT_COMPANY_MAP = new Map();
SUMMIT_SEED_COMPANIES.forEach(c => SUMMIT_COMPANY_MAP.set(c.id, c));

const NAVARRA_DAY_EVENT = {
  subtitle: 'Día de Navarra',
  title: 'Navarra: your innovative, agile and efficient partner in Europe',
  dateBadge: '23 junio 2026',
  venueBadge: 'Sala E201, CISCE Beijing',
  langBadge: 'Inglés',
  capacityBadge: '~50 personas',
  sections: [
    {
      label: 'Programa',
      slots: [
        {
          time: '11:00 - 11:05',
          activity: 'Apertura de la actividad',
          speaker: 'Wang Yongjiao (INA WANG), Vicepresidenta de ACIIEC',
          details: 'Bienvenida a invitados chinos y españoles, presentación de la delegación de Navarra.'
        },
        {
          time: '11:05 - 11:15',
          activity: 'Navarra y su estrategia industrial',
          speaker: 'Mikel Irujo, Consejero de Industria, Transición Ecológica y Digitalización, Comunidad Foral de Navarra',
          talkTitle: 'Navarra: your innovative, agile and efficient partner in Europe',
          details: 'Estrategia de promoción internacional, sectores estratégicos, inversiones de empresas chinas.'
        },
        {
          time: '11:15 - 11:25',
          activity: 'Entorno de inversión y servicios para implantación de proyectos en Navarra',
          speaker: 'Iñigo Arruti, Director General de Promoción Empresarial e Infraestructuras, Comunidad Foral de Navarra',
          talkTitle: 'Desde la intención de inversión hasta la implantación del proyecto: el sistema de servicios integral de Navarra',
          details: 'Recursos de suelo, parques industriales, tramitación, garantías energéticas, RRHH, coordinación gubernamental, servicios de inversión y financiación.'
        },
        {
          time: '11:25 - 11:30',
          activity: 'Ecosistema de innovación de Navarra',
          speaker: 'Uxue Itoiz (CEIN)',
          talkTitle: 'A determinar por CEIN'
        },
        {
          time: '11:30 - 11:55',
          activity: 'Sectores estratégicos de Navarra',
          speaker: 'CENER, NHC, iCONS, CLAVNA, ATANA',
          talkTitle: 'Oportunidades de colaboración con los sectores estratégicos de Navarra'
        },
        {
          time: '11:55 - 12:00',
          activity: 'Intercambio interactivo e invitación a la cooperación',
          speaker: 'Moderadora: Wang Yongjiao',
          details: 'Turno de preguntas de empresas chinas, publicación de demandas de cooperación, invitación a visitas de inspección en Navarra.'
        }
      ]
    }
  ]
};

/* ──────────────────────────────────────────────
   DATA — Contactos (editar / ampliar con vuestro doc)
────────────────────────────────────────────── */
/* Fuente: Contactos_Oficinas_China_v5_Final_KKK.docx (25/05/2026) */
const CONTACTS = [
  { group: 'ICEX — Oficina de Shanghái', flag: '🇨🇳', initials: 'RM', color: 'icex', name: 'Raúl Merchán', role: 'Agregado Comercial', details: ['✉ raul.merchan@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Shanghái', flag: '🇨🇳', initials: 'YT', color: 'icex', name: 'Yuming (Tu)', role: 'Analista, Depto. Industrial', details: ['✉ ytu@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Shanghái', flag: '🇨🇳', initials: 'YZ', color: 'icex', name: 'Yolanda Zhu y Diego Domínguez Escudero', role: 'Firma buzón general', details: ['✉ shanghai@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Shanghái', flag: '🇨🇳', initials: 'SH', color: 'icex', name: 'Buzón general oficina', role: 'Contacto general', details: ['✉ shanghai@comercio.mineco.es'] },

  { group: 'ICEX — Oficina de Cantón (área Shenzhen)', flag: '🇨🇳', initials: 'AS', color: 'icex', name: 'Amy Su', role: 'Analista de Mercado', details: ['✉ ASU@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Cantón (área Shenzhen)', flag: '🇨🇳', initials: 'JW', color: 'icex', name: 'Javier Dong Wu', role: 'Oficina Cantón', details: ['✉ javier.dong@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Cantón (área Shenzhen)', flag: '🇨🇳', initials: 'JL', color: 'icex', name: 'Jaime Lorenzo Garcia-ormaechea', role: 'Oficina Cantón', details: ['✉ jlorenzo@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Cantón (área Shenzhen)', flag: '🇨🇳', initials: 'CT', color: 'icex', name: 'Buzón general oficina', role: 'Contacto general', details: ['✉ canton@comercio.mineco.es'] },

  { group: 'ICEX — Oficina de Pekín', flag: '🇨🇳', initials: 'LM', color: 'icex', name: 'Leire Motrico', role: 'Trade Officer', details: ['✉ leire.motrico@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Pekín', flag: '🇨🇳', initials: 'SJ', color: 'icex', name: 'Sun Zhang, Jian', role: 'Oficina Pekín', details: ['✉ jian.sun@comercio.mineco.es'] },
  { group: 'ICEX — Oficina de Pekín', flag: '🇨🇳', initials: 'BJ', color: 'icex', name: 'Buzón general oficina', role: 'Contacto general', details: ['✉ pekin@comercio.mineco.es'] },

  { group: 'CCPIT', flag: '🇨🇳', initials: 'IN', color: 'ccpit', name: 'Ina', role: 'CCPIT', details: ['✉ inaservice408@gmail.com'] },
  { group: 'CCPIT', flag: '🇨🇳', initials: 'AM', color: 'ccpit', name: 'Amancio', role: 'CCPIT', details: ['✉ njyzzt@163.com'] },

  { group: 'Gobierno de Navarra — España', flag: '🇪🇸', initials: 'MG', color: 'navarra', name: 'Mila García Val', role: 'Representante Comercial Plan Internacional', details: ['✉ mila.garcia.val@navarra.es'] },
  { group: 'Gobierno de Navarra — España', flag: '🇪🇸', initials: 'EC', color: 'navarra', name: 'Estela Cerdán García', role: 'Servicio de Proyección Internacional', details: ['✉ estela.cerdan.garcia@navarra.es'] },
  { group: 'Gobierno de Navarra — España', flag: '🇪🇸', initials: 'PI', color: 'navarra', name: 'Buzón general', role: 'Plan Internacional de Navarra', details: ['✉ planinternacional@navarra.es'] },

  { group: 'Consultora — Herrera Zhang', flag: '🏢', initials: 'AH', color: 'lizarte', name: 'Andrés Herrera-Feligreras 鐵男', role: 'Socio Director', details: ['✉ a.herrera@herrerazhang.com', '📞 +34 633 706 713'] },
  { group: 'Consultora — Herrera Zhang', flag: '🏢', initials: 'RG', color: 'lizarte', name: 'Rita Gimenez', role: 'Consultora', details: ['✉ rita@dpublicd.com'] }
];

/* ──────────────────────────────────────────────
   DATA — Tarjetas QR Lizarte (Contactos)
────────────────────────────────────────────── */
const QR_CONTACT_CARDS = [
  {
    id: 'krum',
    name: 'Krum Kovachev',
    role: 'Innovation Director · 3rd Gen Family Business',
    vcardN: 'Kovachev;Krum;;;',
    vcardTitle: 'Innovation Director / 3rd Generation Family Business',
    org: 'Lizarte S.A.',
    url: 'https://www.lizarte.com',
    adr: ';;Pol. Industrial Agustinos, c/B;Pamplona;Navarra;31013;Spain',
    vcardQr: 'vcard-qr-krum.png',
    wechatQr: 'wechat-qr-krum.png',
    phone: '+34606629317',
    phoneDisplay: '+34 606629317',
    email: 'krum@lizarte.com'
  },
  {
    id: 'oscar',
    name: 'Óscar Huarte',
    role: 'CEO · 2nd Gen Family Business',
    vcardN: 'Huarte;Óscar;;;',
    vcardTitle: 'CEO / 2nd Generation Family Business',
    org: 'Lizarte S.A.',
    url: 'https://www.lizarte.com',
    adr: ';;Pol. Industrial Agustinos, c/B;Pamplona;Navarra;31013;Spain',
    vcardQr: 'vcard-qr-oscar.png',
    wechatQr: null,
    phone: '+34677424250',
    phoneDisplay: '+34 677424250',
    email: 'oscar@lizarte.com'
  }
];

function buildVcardPayload(person) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${person.vcardN || ''}`,
    `FN:${person.name || ''}`,
    `ORG:${person.org || 'Lizarte S.A.'}`,
    `TITLE:${person.vcardTitle || person.role || ''}`,
    `TEL;TYPE=CELL:${person.phoneDisplay || person.phone || ''}`,
    `EMAIL;TYPE=WORK:${person.email || ''}`
  ];
  if (person.url) lines.push(`URL:${person.url}`);
  if (person.adr) lines.push(`ADR;TYPE=WORK:${person.adr}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

/* ──────────────────────────────────────────────
   DATA — Agendas por evento (timeline)
────────────────────────────────────────────── */
const EVENT_AGENDA = {
  cisce: {
    heroTag: 'Pekín',
    heroTitle: 'Feria CISCE',
    heroDesc: 'China International Supply Chain Expo · Beijing · junio 2026',
    cityMarker: '北京',
    cityClass: 'city-beijing',
    days: [
      {
        date: '2026-06-21',
        dateLabel: 'Domingo 21 junio',
        slots: [
          {
            time: '18:00-20:00',
            label: 'Cena oficial de bienvenida de la CISCE',
            detail: 'Punto de encuentro: vestíbulo del hotel a las 17:00'
          }
        ]
      },
      {
        date: '2026-06-22',
        dateLabel: 'Lunes 22 junio',
        slots: [
          {
            time: '09:30-11:30',
            label: 'Ceremonia de inauguración de la CISCE',
            detail: 'Asistirán todos los miembros de la delegación de Navarra',
            institutional: true
          },
          {
            time: '12:00',
            label: 'Almuerzo de inauguración de la CISCE'
          },
          {
            time: '14:30-15:30',
            label: 'Conferencia de promoción temática de la provincia de Anhui y reunión de negociación sobre cooperación en la cadena de suministro global y firma de MOU Anhui-Navarra',
            detail: 'Lugar: Pabellones W1-2',
            statusBadge: 'por-confirmar'
          },
          {
            time: '16:00-17:00',
            label: 'Mesa redonda de la Alianza de Cámaras de Comercio Internacionales del Nuevo Corredor Comercial Terrestre-Marítimo Internacional',
            detail: 'Lugar: Jardín Oeste, Centro Internacional de Exposiciones de China (Pabellón Shunyi). El Consejero pronunciará un discurso e intercambiará ideas con los empresarios.',
            statusBadge: 'por-confirmar',
            institutional: true
          },
          {
            time: '19:00',
            label: 'Cena de la delegación de Navarra',
            detail: 'Lugar: Tienda Siji Minfu Shuangjing'
          }
        ]
      },
      {
        date: '2026-06-23',
        dateLabel: 'Martes 23 junio',
        slots: [
          {
            time: '09:30-11:00',
            label: 'Sesión de intercambio y networking sobre cooperación industrial con la Comisión de Economía e Información de Chongqing y delegación de empresarios de Chongqing',
            detail: 'Lugar: E201. Asisten el Consejero y todos los miembros de la delegación.',
            institutional: true
          },
          {
            time: '11:00-12:30',
            label: 'Evento de promoción del Día de Navarra',
            institutional: true
          },
          {
            time: '14:00-15:00',
            label: 'Visita guiada a la sala de exposiciones',
            detail: 'El Consejero y todos los miembros de la delegación de Navarra',
            institutional: true
          }
        ]
      }
    ],
    footerNote: 'Hotel Beijing Liangmahe (21–23 jun). Llegada internacional 21 jun 06:00.',
    footerAlert: 'Día de Navarra: aportar al PIN los contactos a invitar (nombre, cargo, email y teléfono).'
  },
  shenzhen: {
    heroTag: 'Shenzhen',
    heroTitle: 'Misión Shenzhen',
    heroDesc: 'Foro Navarra–Longhua · visitas empresariales · junio 2026',
    cityMarker: '深圳',
    cityClass: 'city-shenzhen',
    days: [
      {
        date: '2026-06-23',
        dateLabel: 'Martes 23 junio',
        slots: [
          {
            time: '09:00',
            label: 'Llegada de parte de la delegación, recogida en aeropuerto y repaso de agenda para el miércoles',
            detail: 'Vuelo llega a las 07:10h'
          },
          {
            time: '17:30',
            label: 'Llegada de una persona de la delegación',
            detail: 'Vuelo de Jürgen llega a las 17:40h'
          },
          {
            time: '19:30',
            label: 'Llegada de parte de la delegación',
            detail: 'Vuelo de Beijing llega a las 23:35h'
          }
        ]
      },
      {
        date: '2026-06-24',
        dateLabel: 'Miércoles 24 junio',
        slots: [
          { time: '09:00', travel: true, label: 'Desplazamiento' },
          { time: '09:30', label: 'Visita a Longhua International Cooperation Center', visit: true },
          { time: '10:00', label: '(FORO) Apertura Institucional' },
          { time: '10:30', label: '(FORO) Presentaciones de las empresas', statusBadge: 'confirmado' },
          { time: '12:00', label: '(FORO) Almuerzo de trabajo' },
          { time: '13:30', label: '(FORO) B2B Matchmaking' },
          { time: '15:00', label: '(FORO) Foto de grupo' },
          { time: '15:30', travel: true, label: 'Desplazamiento' },
          { time: '16:00', label: 'Visita a Hongmeng', visit: true, statusBadge: 'confirmada' },
          { time: '17:00', travel: true, label: 'Desplazamiento' },
          { time: '17:30', label: 'Visita a Meituan', visit: true, statusBadge: 'confirmada' },
          { time: '18:30', travel: true, label: 'Desplazamiento' },
          { time: '19:00', label: 'Cena' },
          { time: '19:30', label: 'Regreso al hotel' }
        ]
      },
      {
        date: '2026-06-25',
        dateLabel: 'Jueves 25 junio',
        slots: [
          { time: '09:30', travel: true, label: 'Desplazamiento' },
          { time: '10:00', label: 'Visita a Hithium', visit: true, statusBadge: 'confirmada' },
          { time: '11:00', travel: true, label: 'Desplazamiento' },
          {
            time: '11:30',
            label: 'Visita al Centro Nacional de Dispositivos Médicos',
            visit: true,
            statusBadge: 'confirmada'
          },
          { time: '13:00', travel: true, label: 'Desplazamiento' },
          { time: '13:30', label: 'Almuerzo' },
          { time: '14:30', travel: true, label: 'Desplazamiento' },
          { time: '15:00', label: 'Visita a Ye Sun Technology Park', visit: true, statusBadge: 'cambiada' },
          { time: '16:30', travel: true, label: 'Desplazamiento' },
          {
            time: '17:30',
            label: 'Tiempo de descanso',
            detail: 'Con los participantes que quieran, podemos ir a visitar el parque de la Estación de Shenzhen Norte (cerca del hotel)'
          },
          { time: '19:30', label: 'Cena y regreso al hotel' }
        ]
      },
      {
        date: '2026-06-26',
        dateLabel: 'Viernes 26 junio',
        slots: [
          { time: '09:30', travel: true, label: 'Desplazamiento en coche' },
          {
            time: '10:00',
            label: 'Reunión con empresas en la Shenzhen International Foundation',
            visit: true,
            statusBadge: 'pendiente',
            detail: 'Han tenido algunos cambios internos y nos están gestionando la información más lentamente de lo esperado. Actualizo lo más pronto posible.'
          },
          { time: '12:00', travel: true, label: 'Desplazamiento' },
          { time: '12:30', label: 'Almuerzo' },
          { time: '13:30', travel: true, label: 'Desplazamiento' },
          { time: '14:00', label: 'Huaqiangbei', statusBadge: 'confirmada' },
          { time: '15:00', label: 'Tax Free shopping' },
          { time: '15:30', travel: true, label: 'Desplazamiento' },
          {
            time: '16:00',
            label: 'Proyección película',
            statusBadge: 'pendiente',
            detail: 'Falta una segunda aprobación gubernamental. Estamos trabajando en plan B por si finalmente no hay proyección.'
          },
          { time: '18:00', travel: true, label: 'Desplazamiento' },
          { time: '18:30', label: 'Cena' },
          { time: '19:00', label: 'Tiempo de descanso y organización de maletas' },
          { time: '', travel: true, label: 'Desplazamiento' },
          { time: '', label: 'Aeropuerto ✈️' }
        ]
      }
    ],
    footerNote: 'Hotel Grand Madison LongHua Yujing (23–27 jun).'
  }
};

/* ──────────────────────────────────────────────
   DATA — Oficinas ICEX y empresas (fichas editables)
────────────────────────────────────────────── */
const PHOTOS_PER_USER = 5;

const ICEX_CANTON_LEGACY_ID = 'icex-canton-06';
const ICEX_CANTON_FINDREAMS_ID = 'icex-canton-01';
const ICEX_CANTON_SUMMIT_ID = 'icex-canton-05';

const ICEX_CANTON_SCHEDULE = [
  {
    dayLabel: 'Jueves 25 junio',
    daySub: 'Día 1',
    items: [
      { type: 'slot', slot: 'morning', slotLabel: 'MAÑANA', companyId: 'icex-canton-01', meetingTime: '09:30' },
      { type: 'travel', text: '🚗 Desplazamiento Shenzhen → Guangzhou' },
      { type: 'slot', slot: 'afternoon', slotLabel: 'TARDE', companyId: 'icex-canton-02', meetingTime: '15:00' }
    ]
  },
  {
    dayLabel: 'Viernes 26 junio',
    daySub: 'Día 2',
    items: [
      { type: 'slot', slot: 'morning', slotLabel: 'MAÑANA', companyId: 'icex-canton-03', meetingTime: '10:00' },
      { type: 'slot', slot: 'afternoon', slotLabel: 'TARDE', companyId: 'icex-canton-04', meetingTime: '14:30' },
      { type: 'travel', text: '🚗 Desplazamiento Guangzhou → Shenzhen' }
    ]
  },
  {
    dayLabel: 'Sábado 27 junio',
    daySub: 'Día 3',
    items: [
      { type: 'slot', slot: 'event', slotLabel: 'EVENTO', companyId: ICEX_CANTON_SUMMIT_ID, summit: true }
    ]
  }
];

const ICEX_CANTON_MEETING_DETAILS = {
  'icex-canton-01': {
    meetingTime: '09:30',
    hotelDeparture: '08:15',
    companyName: 'FinDreams Technology Co., Ltd. (BYD)',
    companyNameZh: '弗迪科技有限公司 (比亚迪)',
    contactName: 'Sr. Fei HU, Gerente Comercial',
    contactNameZh: '胡斐 商务经理',
    mobile: '+86 159 8696 7127',
    venue: 'Sede central de BYD, No. 3009, BYD Road, Maluan Street, Pingshan District, Shenzhen',
    venueZh: '比亚迪总部 六角大楼礼宾楼 深圳市坪山区马峦街道比亚迪路3009号',
    participants: [
      {
        name: 'Xianhua LIU',
        role: 'Director General Adjunto Dpto. 15 y Director de Planta de la Fábrica de Chasis',
        roleZh: '刘先华 第十五部副总经理 车架工厂总厂厂长'
      },
      {
        name: 'Peng HE',
        role: 'Gerente Dpto. Producto II y Director de Producto de Dirección',
        roleZh: '何鹏 产品二部经理 转向产品总监'
      },
      {
        name: 'Yuanfei WANG',
        role: 'Director de Proyectos Internacionales',
        roleZh: '王远飞 海外项目总监'
      },
      {
        name: 'Fei HU',
        role: 'Gerente Comercial',
        roleZh: '胡斐 商务经理'
      },
      {
        name: 'Deyin HUANG',
        role: 'Director de Calidad de Producto de Dirección',
        roleZh: '黄德银 转向产品 品质总监'
      }
    ]
  },
  'icex-canton-02': {
    meetingTime: '15:00',
    companyName: 'XPENG GROUP',
    companyNameZh: '小鹏集团',
    contactName: 'Shi CAO, Gerente Dpto. Compras de Componentes en el Extranjero',
    contactNameZh: '曹识 海外零部件采购组采购经理',
    mobile: '+86 135 3970 5046',
    venue: 'Xiaopeng Technology Park, T2 North Gate, 120 m SW of Yuhui Creative Industry Center, Changxing Street, Tianhe District, Guangzhou',
    venueZh: '小鹏科技园T2北门（广州市天河区长兴街道裕晖创意产业中心西南120米）',
    participants: [
      {
        name: 'Zhichao XIE',
        role: 'Jefe Dpto. Compras Componentes Extranjero',
        roleZh: '夏志超 海外零部件采购组负责人'
      },
      {
        name: 'Shi CAO',
        role: 'Gerente Dpto. Compras',
        roleZh: '曹识 海外零部件采购组采购经理'
      },
      {
        name: 'Wanli ZOU',
        role: 'Gerente Dpto. Compras',
        roleZh: '邹万里 海外零部件采购组采购经理'
      }
    ]
  },
  'icex-canton-03': {
    meetingTime: '10:00',
    hotelDeparture: '09:00',
    companyName: 'Guangzhou Automobile Group (GAC) / GAC Component Co., Ltd.',
    companyNameZh: '广汽集团 / 广汽零部件有限公司',
    contactName: 'Jason WU, Gerente de Compras Internacionales, GAC Group',
    contactNameZh: '吴宜杰 广汽集团采购本部国际采购经理',
    mobile: '+86 136 7629 0020',
    venue: 'Guangzhou GAC Research Institute, No. 668, Jinshan Avenue East, Hualong Town, Panyu District, Guangzhou',
    venueZh: '广汽研究院（广州番禺区化龙镇金山大道东668号）',
    participants: [
      {
        name: 'Jason WU',
        role: 'Gerente Compras Internacionales, GAC Group',
        roleZh: '吴宜杰 广汽集团采购本部国际采购经理'
      },
      {
        name: 'Fu WANG',
        role: 'Director Dpto. Negocios Internacionales, GAC Components',
        roleZh: '王甫 广汽部件国际业务部部长'
      },
      {
        name: 'Yuanfang LAI',
        role: 'Gerente Comercial, Dpto. Negocios Internacionales, GAC Components',
        roleZh: '来远芳 广汽部件国际业务部业务经理'
      }
    ]
  },
  'icex-canton-04': {
    meetingTime: '14:30',
    companyName: 'Guangzhou Kuayue Auto Parts Industry & Trade Co., Ltd.',
    companyNameZh: '广州市跨越汽车零部件工贸有限公司',
    contactName: 'Ping TONG, Director Administrativo',
    contactNameZh: '童平 行政总监',
    mobile: '+86 139 2890 8626',
    venue: 'No. 2, Lane 1, Qicai New Village, Nanhang Avenue, Shiling Town, Huadu District, Guangzhou',
    venueZh: '广州市花都区狮岭镇南航大道奇才新村自编一巷2号',
    participants: [
      {
        name: 'Zhenquan LI',
        role: 'Director General',
        roleZh: '李振全 总经理'
      },
      {
        name: 'Shuxing LU',
        role: 'Director de Planta',
        roleZh: '卢书兴 厂长'
      },
      {
        name: 'Wanfang ZOU',
        role: 'Administración Contable',
        roleZh: '邹婉芳 财务'
      },
      {
        name: 'Ping TONG',
        role: 'Director de Administración',
        roleZh: '童平 行政总监'
      }
    ]
  },
  'icex-canton-05': {
    receptionTime: '08:30',
    hotelDeparture: '07:45',
    contactName: 'Hailin CHEN',
    contactNameZh: '陈海林',
    contactNote: 'Contacto por WeChat',
    venue: 'Hilton Shenzhen World Exhibition & Convention Center, Bao\'an District, Shenzhen',
    venueZh: '深圳国际会展中心希尔顿酒店（宝安区，深圳国际会展中心大道）'
  }
};

function isIcexCantonFichaId(companyId) {
  return String(companyId || '').indexOf('icex-canton-') === 0;
}

function getIcexCantonMeetingDetails(companyId) {
  return ICEX_CANTON_MEETING_DETAILS[String(companyId || '')] || null;
}

function icexCantonTelHref(mobile) {
  const href = String(mobile || '').replace(/[^\d+]/g, '');
  return href ? 'tel:' + href : '';
}

function buildIcexCantonMeetingDetailsHtml(details) {
  if (!details) return '';

  const blocks = [];

  if (details.meetingTime) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">🕐 HORA DE REUNIÓN</span>
        <div class="field-readonly">${escapeHtml(details.meetingTime)}</div>
      </div>`);
  }
  if (details.receptionTime) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">🕐 RECEPCIÓN</span>
        <div class="field-readonly">${escapeHtml(details.receptionTime)}</div>
      </div>`);
  }
  if (details.hotelDeparture) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">🚗 SALIDA DEL HOTEL</span>
        <div class="field-readonly">${escapeHtml(details.hotelDeparture)}</div>
      </div>`);
  }
  if (details.companyName) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">🏢 EMPRESA</span>
        <div class="field-readonly">
          <p class="icex-meeting-line">${escapeHtml(details.companyName)}</p>
          ${details.companyNameZh ? `<p class="icex-meeting-line icex-meeting-line--zh">${escapeHtml(details.companyNameZh)}</p>` : ''}
        </div>
      </div>`);
  }
  if (details.contactName || details.contactNameZh) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">📞 CONTACTO</span>
        <div class="field-readonly">
          ${details.contactName ? `<p class="icex-meeting-line">${escapeHtml(details.contactName)}</p>` : ''}
          ${details.contactNameZh ? `<p class="icex-meeting-line icex-meeting-line--zh">${escapeHtml(details.contactNameZh)}</p>` : ''}
          ${details.contactNote ? `<p class="icex-meeting-line icex-meeting-line--note">${escapeHtml(details.contactNote)}</p>` : ''}
        </div>
      </div>`);
  }
  if (details.mobile) {
    const tel = icexCantonTelHref(details.mobile);
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">📱 MÓVIL</span>
        <div class="field-readonly">
          <a class="icex-meeting-mobile" href="${escapeHtml(tel)}">${escapeHtml(details.mobile)}</a>
        </div>
      </div>`);
  }
  if (details.venue || details.venueZh) {
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">📍 LUGAR DE REUNIÓN</span>
        <div class="field-readonly">
          ${details.venue ? `<p class="icex-meeting-line">${escapeHtml(details.venue)}</p>` : ''}
          ${details.venueZh ? `<p class="icex-meeting-line icex-meeting-line--zh">${escapeHtml(details.venueZh)}</p>` : ''}
        </div>
      </div>`);
  }
  if (details.participants && details.participants.length) {
    const listHtml = details.participants.map(person => `
      <li class="icex-meeting-participant">
        <p class="icex-meeting-line">${escapeHtml(person.name)} — ${escapeHtml(person.role || '')}</p>
        ${person.roleZh ? `<p class="icex-meeting-line icex-meeting-line--zh">${escapeHtml(person.roleZh)}</p>` : ''}
      </li>`).join('');
    blocks.push(`
      <div class="icex-meeting-block">
        <span class="field-label">👥 PARTICIPANTES</span>
        <div class="field-readonly">
          <ul class="icex-meeting-participants">${listHtml}</ul>
        </div>
      </div>`);
  }

  return blocks.join('');
}

function fillIcexCantonMeetingSection(companyId) {
  const section = document.getElementById('company-modal-icex-canton');
  const container = document.getElementById('company-icex-meeting-details');
  const details = getIcexCantonMeetingDetails(companyId);
  const show = isIcexCantonFichaId(companyId) && !!details;

  if (section) section.hidden = !show;
  if (!container) return;
  container.innerHTML = show ? buildIcexCantonMeetingDetailsHtml(details) : '';
}

const ICEX_OFFICES = [
  {
    id: 'icex-canton',
    tabLabel: 'ICEX Cantón',
    heroTag: 'Shenzhen · Cantón',
    heroTitle: 'ICEX Cantón',
    heroDesc: '5 reuniones · 25–27 junio 2026',
    cityMarker: '粤',
    cityClass: 'city-shenzhen',
    scheduleLayout: true,
    companies: [
      {
        id: 'icex-canton-01',
        name: 'FinDreams / BYD',
        nameZh: '弗迪科技有限公司 (比亚迪)',
        city: 'Shenzhen'
      },
      {
        id: 'icex-canton-02',
        name: 'XPENG',
        nameZh: '小鹏集团',
        city: 'Guangzhou'
      },
      {
        id: 'icex-canton-03',
        name: 'GAC Group + GAC Component',
        nameZh: '广汽集团 / 广汽零部件有限公司',
        city: 'Guangzhou'
      },
      {
        id: 'icex-canton-04',
        name: 'Kuayue Autopart',
        nameZh: '广州市跨越汽车零部件工贸有限公司',
        city: 'Guangzhou'
      },
      {
        id: ICEX_CANTON_SUMMIT_ID,
        name: '15th International Automotive Electronics Industry Summit 2026',
        nameZh: '',
        city: 'Shenzhen'
      }
    ]
  },
  {
    id: 'icex-shanghai',
    tabLabel: 'ICEX Shanghai',
    heroTag: 'Shanghái',
    heroTitle: 'ICEX Shanghai',
    heroDesc: 'Pendiente de confirmar empresas',
    cityMarker: '沪',
    cityClass: 'city-shanghai',
    companies: []
  },
  {
    id: 'icex-pekin',
    tabLabel: 'ICEX Pekín',
    heroTag: 'Pekín',
    heroTitle: 'ICEX Pekín',
    heroDesc: 'Pendiente de confirmar empresas',
    cityMarker: '京',
    cityClass: 'city-beijing',
    companies: []
  }
];

const ICEX_COMPANY_MAP = new Map();
ICEX_OFFICES.forEach(office => {
  office.companies.forEach(c => ICEX_COMPANY_MAP.set(c.id, { ...c, officeId: office.id, officeLabel: office.heroTitle }));
});

let _cisceCompanyMapCache = null;

function getCisceCompanyMap() {
  const jv = window.CISCE_JV || [];
  const div = window.CISCE_DIV || [];
  const apoyo = window.CISCE_APOYO || [];
  if (_cisceCompanyMapCache && _cisceCompanyMapCache.size > 0) {
    return _cisceCompanyMapCache;
  }
  const map = new Map();
  jv.forEach(c => map.set(c.id, Object.assign({}, c, { cisceSection: 'jv' })));
  div.forEach(c => map.set(c.id, Object.assign({}, c, { cisceSection: 'div' })));
  apoyo.forEach(c => map.set(c.id, Object.assign({}, c, { cisceSection: 'apoyo' })));
  if (map.size > 0) _cisceCompanyMapCache = map;
  return map;
}

function getCisceFeriaSections() {
  return [
    { id: 'jv', prefix: 'cisce-jv-', label: 'Joint Venture', emoji: '🤝', seeds: window.CISCE_JV || [] },
    { id: 'div', prefix: 'cisce-div-', label: 'Diversificación', emoji: '📦', seeds: window.CISCE_DIV || [] },
    { id: 'apoyo', prefix: 'cisce-apoyo-', label: 'Apoyo / Contexto', emoji: '🧭', seeds: window.CISCE_APOYO || [] }
  ];
}

const VALID_MEETING_TYPES = ['b2b', 'visita'];

function normalizeMeetingType(value) {
  return VALID_MEETING_TYPES.includes(value) ? value : '';
}

function meetingTypeLabel(type) {
  if (type === 'b2b') return 'B2B';
  if (type === 'visita') return 'Visita';
  return 'Sin asignar';
}

function meetingTypeBadgeHtml(type) {
  if (type === 'b2b') return '<span class="company-badge badge-b2b">🤝 B2B</span>';
  if (type === 'visita') return '<span class="company-badge badge-visita">🏭 Visita</span>';
  return '<span class="company-badge badge-unset">Sin asignar</span>';
}

function buildMeetingTypePickerHtml(companyId, activeType, extraClass) {
  const cls = extraClass ? ' ' + extraClass : '';
  return `
    <div class="meeting-type-picker${cls}" data-company-id="${escapeHtml(companyId)}" role="group" aria-label="Tipo de reunión">
      <button type="button" class="meeting-type-btn${activeType === 'b2b' ? ' active' : ''}" data-type="b2b">🤝 B2B</button>
      <button type="button" class="meeting-type-btn${activeType === 'visita' ? ' active' : ''}" data-type="visita">🏭 Visita</button>
    </div>`;
}

function syncMeetingTypePickerButtons(pickerEl, activeType) {
  if (!pickerEl) return;
  pickerEl.querySelectorAll('.meeting-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === activeType);
  });
}

async function loadAllIcexRecords() {
  await loadAllRemoteFichas();
  const companies = ICEX_OFFICES.flatMap(o => o.companies);
  return companies.map(company => {
    const seed = ICEX_COMPANY_MAP.get(company.id);
    const office = seed ? ICEX_OFFICES.find(o => o.id === seed.officeId) : null;
    const ficha = getCachedFicha(company.id);
    return { company, ficha, office };
  });
}

function aggregateMeetings(entries) {
  let b2b = 0;
  let visita = 0;
  let unset = 0;
  const byOffice = ICEX_OFFICES.map(office => ({
    office,
    b2b: 0,
    visita: 0,
    unset: 0,
    items: []
  }));
  const officeIndex = new Map(byOffice.map((o, i) => [o.office.id, i]));

  entries.forEach(({ company, ficha, office }) => {
    const type = normalizeMeetingType(ficha.meetingType);
    const seed = ICEX_COMPANY_MAP.get(company.id);
    const officeId = seed ? seed.officeId : office && office.id;
    const bucket = officeIndex.has(officeId) ? byOffice[officeIndex.get(officeId)] : null;
    const item = { company, ficha, type, office };

    if (type === 'b2b') b2b += 1;
    else if (type === 'visita') visita += 1;
    else unset += 1;

    if (bucket) {
      if (type === 'b2b') bucket.b2b += 1;
      else if (type === 'visita') bucket.visita += 1;
      else bucket.unset += 1;
      if (type) bucket.items.push(item);
    }
  });

  return {
    total: b2b + visita,
    b2b,
    visita,
    unset,
    totalCompanies: entries.length,
    byOffice
  };
}

/* ──────────────────────────────────────────────
   FICHAS ICEX — SharePoint (caché en memoria de sesión)
────────────────────────────────────────────── */
let remoteFichaMap = new Map();
let remoteFichaMapLoaded = false;

let activeCompanyId = null;
let activePhotoSlot = null;
let activeModalFicha = null;
let activeManualDraft = false;
let companyModalBound = false;
let modalFormSnapshot = null;
let activeUserName = '';

/* IndexedDB — solo migración dev */
const COMPANY_DB_NAME = 'mision-china-companies-v1';
const COMPANY_DB_VERSION = 1;
const COMPANY_STORE = 'records';
let companyDbPromise = null;

function userIdToDisplayName(userId) {
  if (userId === 'krum') return 'Krum';
  if (userId === 'oscar') return 'Óscar';
  return userId || '';
}

function userBrandProfile(userId) {
  const id = String(userId || '').toLowerCase();
  if (id === 'krum') return { name: 'Krum Kovachev', role: 'Innovation Director' };
  if (id === 'oscar') return { name: 'Óscar Huarte', role: 'CEO' };
  return { name: userIdToDisplayName(id) || id, role: '' };
}

function setActiveUser(userIdOrName) {
  const raw = userIdOrName || (typeof window.getCurrentUser === 'function' ? window.getCurrentUser() : '');
  activeUserName = userIdToDisplayName(raw) || raw || '';
  window.__ACTIVE_USER__ = activeUserName;

  const chip = document.getElementById('active-user-chip');
  if (!chip) return;

  const profile = userBrandProfile(raw);
  const nameEl = chip.querySelector('.app-brand-user-name');
  const sepEl = chip.querySelector('.app-brand-user-sep');
  const roleEl = chip.querySelector('.app-brand-user-role');

  if (nameEl) nameEl.textContent = profile.name;
  if (roleEl) roleEl.textContent = profile.role;

  const hasRole = !!profile.role;
  if (sepEl) sepEl.hidden = !hasRole;
  if (roleEl) roleEl.hidden = !hasRole;

  chip.hidden = !profile.name;
}

window.setActiveUser = setActiveUser;

function isAppOnline() {
  return typeof navigator.onLine !== 'boolean' || navigator.onLine;
}

function sharePointOfflineMessage() {
  return 'Sin conexión — los cambios no se guardarán en SharePoint';
}

function connectionErrorMessage() {
  if (!isAppOnline()) return sharePointOfflineMessage();
  return 'Sin conexión, reintenta cuando tengas VPN';
}

function updateConnectionStatus() {
  const chip = document.getElementById('connection-status-chip');
  const online = isAppOnline();
  if (chip) {
    chip.textContent = online ? '🟢 Online' : '🔴 Offline';
    chip.className = 'connection-status-chip connection-status-chip--' + (online ? 'online' : 'offline');
    chip.setAttribute('aria-label', online ? 'Conectado a internet' : 'Sin conexión a internet');
  }
  document.body.classList.toggle('app-offline', !online);
  updateSharePointControlsForConnection();
}

function updateSharePointControlsForConnection() {
  const online = isAppOnline();
  const offlineMsg = sharePointOfflineMessage();

  const saveBtn = document.getElementById('company-btn-save');
  if (saveBtn) {
    if (!online) {
      saveBtn.disabled = true;
      saveBtn.title = offlineMsg;
    } else {
      saveBtn.removeAttribute('title');
      updateManualSaveButtonState();
    }
  }

  ['btn-generar-resumen-dia', 'btn-generar-resumen-total', 'btn-migrate-local'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = !online;
    if (!online) btn.title = offlineMsg;
    else btn.removeAttribute('title');
  });
}

function setResumenOfflineStatus() {
  const el = document.getElementById('resumen-dia-status');
  if (!el) return;
  el.textContent = sharePointOfflineMessage();
  el.classList.add('resumen-dia-status--error');
}

function initConnectionStatus() {
  updateConnectionStatus();
  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);

  ['btn-generar-resumen-dia', 'btn-generar-resumen-total'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn || btn.dataset.offlineGuard === '1') return;
    btn.dataset.offlineGuard = '1';
    btn.addEventListener('click', event => {
      if (isAppOnline()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setResumenOfflineStatus();
    }, true);
  });
}

window.isAppOnline = isAppOnline;

function setFichasInitChip(text, visible) {
  const el = document.getElementById('fichas-init-chip');
  if (!el) return;
  if (!visible) {
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.textContent = text;
  el.hidden = false;
}

async function migrateIcexCantonLegacyFicha(existing) {
  if (!existing.has(ICEX_CANTON_LEGACY_ID)) return;
  if (typeof getRemoteFicha !== 'function' || typeof putRemoteFicha !== 'function') return;

  try {
    const legacyRaw = await getRemoteFicha(ICEX_CANTON_LEGACY_ID);
    if (!legacyRaw) return;

    const targetRaw = await getRemoteFicha(ICEX_CANTON_FINDREAMS_ID);
    const meta = companyMetaFromSeed(ICEX_CANTON_FINDREAMS_ID);

    function fichaHasUserData(raw) {
      if (!raw || !raw.userEntries) return false;
      return ['krum', 'oscar'].some(uid => {
        const entry = raw.userEntries[uid];
        if (!entry) return false;
        if (entry.description || entry.contacts || entry.notes) return true;
        return Array.isArray(entry.photos) && entry.photos.some(p => p && p.dataBase64);
      });
    }

    if (!fichaHasUserData(targetRaw) || fichaHasUserData(legacyRaw)) {
      const merged = normalizeRemoteFicha(legacyRaw, ICEX_CANTON_FINDREAMS_ID, meta);
      merged.id = ICEX_CANTON_FINDREAMS_ID;
      merged.name = meta.name || merged.name;
      merged.nameZh = meta.nameZh || merged.nameZh;
      applyIcexSeedContacts(merged, ICEX_CANTON_FINDREAMS_ID);
      await putRemoteFicha(ICEX_CANTON_FINDREAMS_ID, merged);
      setCachedFicha(ICEX_CANTON_FINDREAMS_ID, merged);
    }

    if (typeof deleteRemoteFicha === 'function') {
      await deleteRemoteFicha(ICEX_CANTON_LEGACY_ID);
    }
    remoteFichaMap.delete(ICEX_CANTON_LEGACY_ID);
    existing.delete(ICEX_CANTON_LEGACY_ID);
  } catch (err) {
    console.warn('Migración icex-canton-06 → 01:', err);
  }
}

async function initIcexFichasInSharePoint() {
  if (!CONFIG || !CONFIG.driveId) return;
  if (typeof listRemoteFichaIds !== 'function' || typeof putRemoteFicha !== 'function') return;
  if (typeof defaultRemoteFicha !== 'function') return;

  setFichasInitChip('Preparando fichas…', true);

  try {
    const existingIds = await listRemoteFichaIds();
    const existing = new Set(existingIds);
    await migrateIcexCantonLegacyFicha(existing);
    const toCreate = [];
    ICEX_COMPANY_MAP.forEach((seed, companyId) => {
      if (!existing.has(companyId)) toCreate.push({ id: companyId, type: 'icex' });
    });
    getCisceCompanyMap().forEach((seed, companyId) => {
      if (!existing.has(companyId)) toCreate.push({ id: companyId, type: 'cisce' });
    });
    SUMMIT_COMPANY_MAP.forEach((seed, companyId) => {
      if (!existing.has(companyId)) toCreate.push({ id: companyId, type: 'summit' });
    });

    if (!toCreate.length) return;

    await Promise.allSettled(
      toCreate.map(async item => {
        if (item.type === 'cisce' && typeof defaultCisceRemoteFicha === 'function') {
          await putRemoteFicha(item.id, defaultCisceRemoteFicha(item.id));
          return;
        }
        if (item.type === 'summit') {
          const meta = summitMetaFromSeed(item.id);
          await putRemoteFicha(item.id, defaultRemoteFicha(item.id, meta));
          return;
        }
        const meta = companyMetaFromSeed(item.id);
        const ficha = defaultRemoteFicha(item.id, meta);
        applyIcexSeedContacts(ficha, item.id);
        await putRemoteFicha(item.id, ficha);
      })
    );
  } catch (_) {
    /* reintento en próxima apertura */
  } finally {
    setFichasInitChip('', false);
  }
}

function readModalField(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function snapshotPhotosForCompare(photos) {
  return (photos || [])
    .filter(p => p && p.dataBase64)
    .map(p => ({
      name: p.name || '',
      mime: p.mime || 'image/jpeg',
      len: String(p.dataBase64 || '').length
    }));
}

function buildModalSnapshotObject() {
  if (!activeModalFicha) return null;
  const uid = getCurrentUser();
  const entry = activeModalFicha.userEntries[uid] || emptyUserEntry();
  const editable = isEditableFicha(activeModalFicha);
  const snap = {
    desc: readModalField('company-field-desc'),
    contacts: readModalField('company-field-contacts'),
    notes: readModalField('company-field-notes'),
    photos: snapshotPhotosForCompare(entry.photos)
  };
  if (editable) {
    snap.manual = {
      name: readModalField('company-manual-name'),
      nameZh: readModalField('company-manual-name-zh'),
      contactPerson: readModalField('company-manual-contact'),
      role: readModalField('company-manual-role')
    };
    if (isSummitFicha(activeModalFicha)) {
      snap.temas = readModalField('company-field-temas');
    }
  } else if (isCiscePrecargadaFicha(activeModalFicha)) {
    snap.precarga = {
      contactPerson: readModalField('company-precarga-contact'),
      role: readModalField('company-precarga-role')
    };
  }
  return snap;
}

function captureModalFormSnapshot() {
  const snap = buildModalSnapshotObject();
  modalFormSnapshot = snap ? JSON.stringify(snap) : null;
}

function isModalFormDirty() {
  if (!modalFormSnapshot || !activeModalFicha) return false;
  const current = buildModalSnapshotObject();
  if (!current) return false;
  return modalFormSnapshot !== JSON.stringify(current);
}

function showCompanyUnsavedModal(isDraft) {
  const modal = document.getElementById('company-unsaved-modal');
  const title = document.getElementById('company-unsaved-title');
  const text = document.getElementById('company-unsaved-text');
  if (!modal) return;

  if (title) {
    title.textContent = isDraft ? 'Ficha sin guardar' : 'Cambios sin guardar';
  }
  if (text) {
    text.textContent = isDraft
      ? 'Esta ficha no se ha guardado y se perderá.'
      : 'Tienes cambios sin guardar. ¿Guardar antes de cerrar?';
  }

  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('company-unsaved-open');
}

function hideCompanyUnsavedModal() {
  const modal = document.getElementById('company-unsaved-modal');
  if (modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('company-unsaved-open');
}

function requestCloseCompanyModal() {
  if (!activeCompanyId) return;

  if (activeManualDraft) {
    showCompanyUnsavedModal(true);
    return;
  }

  if (!isModalFormDirty()) {
    closeCompanyModal();
    return;
  }

  showCompanyUnsavedModal(false);
}

function initCompanyUnsavedModal() {
  const modal = document.getElementById('company-unsaved-modal');
  if (!modal || modal.dataset.bound === '1') return;
  modal.dataset.bound = '1';

  const backdrop = document.getElementById('company-unsaved-backdrop');
  const btnSave = document.getElementById('company-unsaved-save');
  const btnDiscard = document.getElementById('company-unsaved-discard');
  const btnCancel = document.getElementById('company-unsaved-cancel');

  const cancel = () => hideCompanyUnsavedModal();

  if (backdrop) backdrop.addEventListener('click', cancel);
  if (btnCancel) btnCancel.addEventListener('click', cancel);
  if (btnDiscard) {
    btnDiscard.addEventListener('click', () => {
      hideCompanyUnsavedModal();
      closeCompanyModal();
    });
  }
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      hideCompanyUnsavedModal();
      saveCompanyModal({ closeOnSuccess: true });
    });
  }
}

function companyMetaFromSeed(companyId) {
  const seed = ICEX_COMPANY_MAP.get(companyId);
  if (!seed) return { companyId };
  return {
    companyId,
    name: seed.name,
    nameZh: seed.nameZh,
    contactPerson: seed.contactPerson,
    role: seed.role,
    icexOffice: seed.officeLabel
  };
}

function icexSeedContactsText(seed) {
  if (!seed) return '';
  if (seed.krumContactsSeed) return seed.krumContactsSeed;
  if (seed.contactPerson) return seed.contactPerson + ' — ' + seed.role;
  return '';
}

function applyIcexSeedContacts(ficha, companyId) {
  if (!ficha || !companyId) return ficha;
  const seed = ICEX_COMPANY_MAP.get(companyId);
  const seedText = icexSeedContactsText(seed);
  if (!seedText) return ficha;

  ['krum', 'oscar'].forEach(userId => {
    const entry = ficha.userEntries && ficha.userEntries[userId];
    if (entry && !trimText(entry.contacts)) {
      entry.contacts = seedText;
    }
  });
  return ficha;
}

function isManualFichaId(companyId) {
  return String(companyId || '').indexOf('otras-') === 0;
}

function isSummitFichaId(companyId) {
  return String(companyId || '').indexOf('summit-') === 0;
}

function isSummitSeedId(companyId) {
  return SUMMIT_COMPANY_MAP.has(companyId);
}

function isSummitFicha(ficha) {
  if (!ficha) return false;
  return ficha.isSummit === true || isSummitFichaId(ficha.id);
}

function summitMetaFromSeed(companyId) {
  const seed = SUMMIT_COMPANY_MAP.get(companyId);
  return {
    companyId,
    name: seed ? seed.name : '',
    nameZh: seed ? (seed.nameZh || '') : '',
    contactPerson: '',
    role: '',
    temas: '',
    icexOffice: 'Auto Electronics',
    isManual: true
  };
}

function isCisceFichaId(companyId) {
  if (typeof window.isCisceFichaId === 'function' && window.isCisceFichaId !== isCisceFichaId) {
    return window.isCisceFichaId(companyId);
  }
  const id = String(companyId || '');
  return id.indexOf('cisce-jv-') === 0 || id.indexOf('cisce-div-') === 0 || id.indexOf('cisce-apoyo-') === 0;
}

function isCiscePrecargadaId(companyId) {
  if (typeof window.isCiscePrecargadaId === 'function' && window.isCiscePrecargadaId !== isCiscePrecargadaId) {
    return window.isCiscePrecargadaId(companyId);
  }
  return getCisceCompanyMap().has(companyId);
}

function isCiscePrecargadaFicha(ficha) {
  if (!ficha) return false;
  return ficha.isCiscePrecargada === true || isCiscePrecargadaId(ficha.id);
}

function getCisceFichaSection(companyId) {
  const id = String(companyId || '');
  if (id.indexOf('cisce-jv-') === 0) return 'jv';
  if (id.indexOf('cisce-div-') === 0) return 'div';
  if (id.indexOf('cisce-apoyo-') === 0) return 'apoyo';
  return '';
}

function isCisceFicha(ficha) {
  if (!ficha) return false;
  return isCisceFichaId(ficha.id) || !!ficha.cisceSection;
}

function buildCisceFichaView(raw, seed) {
  const remote = typeof normalizeCisceRemoteFicha === 'function'
    ? normalizeCisceRemoteFicha(raw, seed.id)
    : (typeof defaultCisceRemoteFicha === 'function' ? defaultCisceRemoteFicha(seed.id) : null);

  const block = userId => ({
    description: (remote[userId] && remote[userId].descripcion) || '',
    contacts: (remote[userId] && remote[userId].personasContacto) || '',
    notes: (remote[userId] && remote[userId].notas) || '',
    photos: [],
    updatedAt: null
  });

  const hasZonaOverride = remote && Object.prototype.hasOwnProperty.call(remote, 'zonaOverride');

  return {
    id: seed.id,
    isCiscePrecargada: true,
    cisceSection: seed.cisceSection || getCisceFichaSection(seed.id),
    name: seed.name,
    nameZh: seed.nameZh || '',
    potencial: seed.potencial || '',
    fuente: seed.fuente || '',
    encaje: seed.encaje || '',
    queHace: seed.queHace || '',
    veredicto: seed.veredicto || '',
    zonaOverride: hasZonaOverride ? remote.zonaOverride : undefined,
    zona: hasZonaOverride ? String(remote.zonaOverride || '').trim() : getDefaultCisceZona(seed),
    contactPerson: remote.contacto || '',
    role: remote.rol || '',
    meetingType: remote.tipoReunion || null,
    userEntries: {
      krum: block('krum'),
      oscar: block('oscar')
    }
  };
}

const CISCE_ZONA_JV = 'Smart Vehicle · 智能汽车链';
const CISCE_ZONA_DIV = 'Advanced Manufacturing · 先进制造链';

const CISCE_ZONA_BY_ID = {
  'cisce-jv-12': 'Clean Energy · 清洁能源链',
  'cisce-jv-17': 'Digital Technology · 数智科技链',
  'cisce-div-09': 'Healthy Life · 健康生活链',
  'cisce-apoyo-01': 'Advanced Manufacturing · 先进制造链',
  'cisce-apoyo-02': 'Supply Chain Service · 供应链服务展区',
  'cisce-apoyo-03': 'Advanced Manufacturing · 先进制造链',
  'cisce-apoyo-04': 'Digital Technology · 数智科技链',
  'cisce-apoyo-05': 'Advanced Manufacturing · 先进制造链',
  'cisce-apoyo-06': 'Advanced Manufacturing · 先进制造链',
  'cisce-apoyo-07': 'Digital Technology · 数智科技链'
};

function getDefaultCisceZona(seed) {
  const id = (seed && seed.id) || '';
  if (CISCE_ZONA_BY_ID[id]) return CISCE_ZONA_BY_ID[id];
  const section = (seed && seed.cisceSection) || getCisceFichaSection(id);
  if (section === 'jv') return CISCE_ZONA_JV;
  if (section === 'div') return CISCE_ZONA_DIV;
  return '';
}

function resolveCisceZona(ficha, seed) {
  if (ficha && Object.prototype.hasOwnProperty.call(ficha, 'zonaOverride')) {
    return String(ficha.zonaOverride || '').trim();
  }
  if (ficha && ficha.zona) return String(ficha.zona).trim();
  return getDefaultCisceZona(seed);
}

const CISCE_EXPOSITOR_CONFIRMADO_IDS = new Set([
  'cisce-jv-01',
  'cisce-jv-07',
  'cisce-jv-08',
  'cisce-jv-15'
]);

const CISCE_PARTNER_BADGE = {
  'cisce-jv-07': '★ Official Partner CISCE',
  'cisce-div-07': '★ Partner CISCE'
};

function cisceExpositorConfirmadoBadgeHtml() {
  return '<span class="cisce-badge cisce-expositor-confirmado" title="Verificado en match.cisce.org.cn">Expositor confirmado ✓</span>';
}

function ciscePartnerBadgeHtml(label) {
  return `<span class="cisce-badge cisce-partner">${escapeHtml(label)}</span>`;
}

function cisceZonaBadgeHtml(zona) {
  if (!zona) return '';
  return `<span class="cisce-badge cisce-zona">📍 ${escapeHtml(zona)}</span>`;
}

function buildCisceCardBadgesHtml(ficha, seed, meetingType) {
  const id = (seed && seed.id) || (ficha && ficha.id) || '';
  const zona = resolveCisceZona(ficha, seed);
  const parts = [
    potencialBadgeHtml((seed && seed.potencial) || (ficha && ficha.potencial)),
    veredictoBadgeHtml((seed && seed.veredicto) || (ficha && ficha.veredicto))
  ];
  if (CISCE_EXPOSITOR_CONFIRMADO_IDS.has(id)) parts.push(cisceExpositorConfirmadoBadgeHtml());
  if (CISCE_PARTNER_BADGE[id]) parts.push(ciscePartnerBadgeHtml(CISCE_PARTNER_BADGE[id]));
  const zonaBadge = cisceZonaBadgeHtml(zona);
  if (zonaBadge) parts.push(zonaBadge);
  if (meetingType === 'b2b' || meetingType === 'visita') {
    parts.push(meetingTypeBadgeHtml(meetingType));
  }
  const photos = countPhotosInFicha(ficha);
  if (photos.total > 0) {
    parts.push(`<span class="company-badge badge-photos">📷 ${photos.total}</span>`);
  }
  return parts.join('\n          ');
}

function potencialBadgeClass(potencial) {
  const key = String(potencial || '').trim();
  const map = {
    'Alto': 'cisce-potencial--alto',
    'Medio-Alto': 'cisce-potencial--medio-alto',
    'Medio': 'cisce-potencial--medio',
    'Medio-Bajo': 'cisce-potencial--medio-bajo',
    'Bajo-Medio': 'cisce-potencial--medio-bajo',
    'Bajo': 'cisce-potencial--bajo',
    'Apoyo': 'cisce-potencial--apoyo'
  };
  return map[key] || 'cisce-potencial--default';
}

function veredictoBadgeClass(veredicto) {
  const key = String(veredicto || '').trim().toUpperCase();
  if (key === 'CONFIRMADO') return 'cisce-veredicto--confirmado';
  if (key === 'AJUSTADO') return 'cisce-veredicto--ajustado';
  if (key === 'POR REVISAR') return 'cisce-veredicto--revisar';
  return 'cisce-veredicto--default';
}

function potencialBadgeHtml(potencial) {
  return `<span class="cisce-badge cisce-potencial ${potencialBadgeClass(potencial)}">${escapeHtml(potencial || '—')}</span>`;
}

function veredictoBadgeHtml(veredicto) {
  return `<span class="cisce-badge cisce-veredicto ${veredictoBadgeClass(veredicto)}">${escapeHtml(veredicto || '—')}</span>`;
}

function buildCisceFeriaCardHtml(ficha, seed) {
  const meetingType = normalizeMeetingType(ficha && ficha.meetingType);
  const lizarteClass = isLizarteCompanyName(seed.name) ? ' company-card--lizarte' : '';
  const nameZhHtml = seed.nameZh
    ? `<span class="cisce-card-name-zh">${escapeHtml(seed.nameZh)}</span>`
    : '';
  const preview = truncateText(seed.queHace || '', 60);

  return `
    <article class="company-card cisce-feria-card${lizarteClass}" data-company-id="${escapeHtml(seed.id)}" role="button" tabindex="0" aria-label="Abrir ficha de ${escapeHtml(seed.name)}">
      <div class="cisce-card-header">
        <div class="cisce-card-title-row">
          <span class="company-name">${escapeHtml(seed.name)}</span>
          ${nameZhHtml}
        </div>
        <div class="cisce-card-badges">
          ${buildCisceCardBadgesHtml(ficha, seed, meetingType)}
        </div>
      </div>
      <p class="cisce-card-preview">${escapeHtml(preview)}${seed.queHace && seed.queHace.length > 60 ? '…' : ''}</p>
    </article>`;
}

function isEditableFichaId(companyId) {
  return isManualFichaId(companyId) || isCisceFichaId(companyId) || isSummitFichaId(companyId);
}

function isEditableFicha(ficha) {
  if (!ficha) return false;
  if (isCiscePrecargadaFicha(ficha)) return false;
  if (isSummitFicha(ficha)) return true;
  if (isCisceFicha(ficha)) return true;
  return isManualFicha(ficha);
}

function isLizarteCompanyName(name) {
  return String(name || '').toUpperCase().indexOf('LIZARTE') !== -1;
}

function isIcexCompanyId(companyId) {
  return ICEX_COMPANY_MAP.has(companyId);
}

function isManualFicha(ficha) {
  if (!ficha) return false;
  return ficha.isManual === true || isManualFichaId(ficha.id);
}

function metaFromFicha(ficha, companyId) {
  if (isCisceFicha(ficha) || isCisceFichaId(companyId)) {
    return {
      companyId,
      name: (ficha && ficha.name) || '',
      nameZh: (ficha && ficha.nameZh) || '',
      contactPerson: (ficha && ficha.contactPerson) || '',
      role: (ficha && ficha.role) || '',
      icexOffice: 'CISCE Feria',
      isManual: true,
      cisceSection: getCisceFichaSection(companyId || (ficha && ficha.id))
    };
  }
  if (isManualFicha(ficha) || isManualFichaId(companyId)) {
    return {
      companyId,
      name: (ficha && ficha.name) || '',
      nameZh: (ficha && ficha.nameZh) || '',
      contactPerson: (ficha && ficha.contactPerson) || '',
      role: (ficha && ficha.role) || '',
      icexOffice: '',
      isManual: true
    };
  }
  if (isSummitFichaId(companyId) || isSummitFicha(ficha)) {
    const seed = SUMMIT_COMPANY_MAP.get(companyId || (ficha && ficha.id));
    return {
      companyId: companyId || (ficha && ficha.id),
      name: (ficha && ficha.name) || (seed && seed.name) || '',
      nameZh: (ficha && ficha.nameZh) || (seed && seed.nameZh) || '',
      contactPerson: (ficha && ficha.contactPerson) || '',
      role: (ficha && ficha.role) || '',
      temas: (ficha && ficha.temas) || '',
      icexOffice: 'Auto Electronics',
      isManual: true
    };
  }
  return companyMetaFromSeed(companyId);
}

function createManualFichaDraft() {
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : 'user';
  return {
    id: 'otras-' + uid + '-' + Date.now(),
    isManual: true,
    name: '',
    nameZh: '',
    contactPerson: '',
    role: '',
    icexOffice: '',
    meetingType: null,
    userEntries: {
      krum: emptyUserEntry(),
      oscar: emptyUserEntry()
    }
  };
}

function createCisceFichaDraft(sectionId) {
  const sections = getCisceFeriaSections();
  const section = sections.find(item => item.id === sectionId) || sections[0];
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : 'user';
  return {
    id: section.prefix + uid + '-' + Date.now(),
    isManual: true,
    cisceSection: section.id,
    name: '',
    nameZh: '',
    contactPerson: '',
    role: '',
    temas: '',
    icexOffice: 'CISCE Feria',
    meetingType: null,
    userEntries: {
      krum: emptyUserEntry(),
      oscar: emptyUserEntry()
    }
  };
}

function nextSummitFichaId() {
  const existing = new Set();
  remoteFichaMap.forEach((_, id) => {
    if (isSummitFichaId(id)) existing.add(id);
  });
  SUMMIT_COMPANY_MAP.forEach((_, id) => existing.add(id));
  for (let n = 2; n < 100; n++) {
    const id = 'summit-' + String(n).padStart(2, '0');
    if (!existing.has(id)) return id;
  }
  return 'summit-' + Date.now();
}

function createSummitFichaDraft() {
  return {
    id: nextSummitFichaId(),
    isManual: true,
    name: '',
    nameZh: '',
    contactPerson: '',
    role: '',
    temas: '',
    icexOffice: 'Auto Electronics',
    meetingType: null,
    userEntries: {
      krum: emptyUserEntry(),
      oscar: emptyUserEntry()
    }
  };
}

function getSummitFichasFromCache() {
  const cards = [];
  SUMMIT_SEED_COMPANIES.forEach(seed => {
    cards.push({
      seed,
      ficha: getCachedFicha(seed.id),
      manual: false
    });
  });
  remoteFichaMap.forEach((ficha, id) => {
    if (!isSummitFichaId(id) || SUMMIT_COMPANY_MAP.has(id)) return;
    cards.push({
      seed: {
        id,
        name: ficha.name || 'Sin nombre',
        nameZh: ficha.nameZh || ''
      },
      ficha,
      manual: true
    });
  });
  cards.sort((a, b) => {
    if (!a.manual && b.manual) return -1;
    if (a.manual && !b.manual) return 1;
    return String(a.seed.name || a.seed.id).localeCompare(
      String(b.seed.name || b.seed.id),
      'es',
      { sensitivity: 'base' }
    );
  });
  return cards;
}

function refreshAfterFichaChange(companyId) {
  if (isSummitFichaId(companyId) || isSummitFicha(getCachedFicha(companyId))) {
    renderAutoElectronics().catch(err => console.warn('Auto Electronics:', err));
    return;
  }
  if (isCisceFichaId(companyId) || isCisceFicha(getCachedFicha(companyId))) {
    renderCisceFeria().catch(err => console.warn('CISCE Feria:', err));
    return;
  }
  if (isManualFichaId(companyId) || isManualFicha(getCachedFicha(companyId))) {
    renderOtrasReuniones().catch(err => console.warn('Otras:', err));
  } else {
    refreshIcexCompanyCard(companyId);
  }
}

function otherUserId(currentUser) {
  return currentUser === 'krum' ? 'oscar' : 'krum';
}

function countUserPhotos(entry) {
  if (!entry || !Array.isArray(entry.photos)) return 0;
  return entry.photos.filter(p => p && p.dataBase64).length;
}

function countPhotosInFicha(ficha) {
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
  if (!ficha || !ficha.userEntries) return { mine: 0, other: 0, total: 0 };
  const mine = countUserPhotos(ficha.userEntries[uid] || {});
  const otherId = otherUserId(uid);
  const other = countUserPhotos(ficha.userEntries[otherId] || {});
  return { mine, other, total: mine + other };
}

function photoDataUrl(photo) {
  if (!photo || !photo.dataBase64) return '';
  return 'data:' + (photo.mime || 'image/jpeg') + ';base64,' + photo.dataBase64;
}

async function loadAllRemoteFichas(force) {
  if (remoteFichaMapLoaded && !force) return remoteFichaMap;
  const companies = ICEX_OFFICES.flatMap(o => o.companies);
  const results = await Promise.all(
    companies.map(async c => {
      try {
        const raw = await getRemoteFicha(c.id);
        const ficha = normalizeRemoteFicha(raw, c.id, companyMetaFromSeed(c.id));
        return [c.id, ficha];
      } catch (err) {
        console.warn('Ficha', c.id, err);
        return [c.id, normalizeRemoteFicha(null, c.id, companyMetaFromSeed(c.id))];
      }
    })
  );
  remoteFichaMap = new Map(results);

  try {
    const cisceResults = await Promise.all(
      [...getCisceCompanyMap().keys()].map(async id => {
        try {
          const raw = await getRemoteFicha(id);
          const seed = getCisceCompanyMap().get(id);
          return [id, buildCisceFichaView(raw, seed)];
        } catch (err) {
          console.warn('Ficha CISCE', id, err);
          const seed = getCisceCompanyMap().get(id);
          return [id, buildCisceFichaView(null, seed)];
        }
      })
    );
    cisceResults.forEach(([id, ficha]) => remoteFichaMap.set(id, ficha));
  } catch (err) {
    console.warn('Fichas CISCE:', err);
  }

  try {
    const summitResults = await Promise.all(
      [...SUMMIT_COMPANY_MAP.keys()].map(async id => {
        try {
          const raw = await getRemoteFicha(id);
          const ficha = normalizeRemoteFicha(raw, id, summitMetaFromSeed(id));
          return [id, ficha];
        } catch (err) {
          console.warn('Ficha summit', id, err);
          return [id, normalizeRemoteFicha(null, id, summitMetaFromSeed(id))];
        }
      })
    );
    summitResults.forEach(([id, ficha]) => remoteFichaMap.set(id, ficha));
  } catch (err) {
    console.warn('Fichas summit:', err);
  }

  try {
    const allIds = await listRemoteFichaIds();
    const manualIds = allIds.filter(id => {
      if (isManualFichaId(id)) return true;
      if (isSummitFichaId(id) && !isSummitSeedId(id)) return true;
      return isCisceFichaId(id) && !isCiscePrecargadaId(id);
    });
    const manualResults = await Promise.allSettled(
      manualIds.map(async id => {
        const raw = await getRemoteFicha(id);
        const ficha = normalizeRemoteFicha(raw, id, metaFromFicha(raw, id));
        return [id, ficha];
      })
    );
    manualResults.forEach(result => {
      if (result.status === 'fulfilled') {
        remoteFichaMap.set(result.value[0], result.value[1]);
      }
    });
  } catch (err) {
    console.warn('Fichas manuales:', err);
  }

  remoteFichaMapLoaded = true;
  return remoteFichaMap;
}

function getCachedFicha(companyId) {
  let ficha;
  if (remoteFichaMap.has(companyId)) {
    ficha = remoteFichaMap.get(companyId);
  } else if (isCiscePrecargadaId(companyId)) {
    const seed = getCisceCompanyMap().get(companyId);
    ficha = buildCisceFichaView(null, seed);
  } else if (isManualFichaId(companyId) || isCisceFichaId(companyId)) {
    ficha = normalizeRemoteFicha(null, companyId, metaFromFicha(null, companyId));
  } else if (isSummitFichaId(companyId)) {
    ficha = normalizeRemoteFicha(null, companyId, summitMetaFromSeed(companyId));
  } else {
    ficha = normalizeRemoteFicha(null, companyId, companyMetaFromSeed(companyId));
  }
  return applyIcexSeedContacts(ficha, companyId);
}

function getManualFichasFromCache() {
  const list = [];
  remoteFichaMap.forEach((ficha, id) => {
    if (isCisceFichaId(id)) return;
    if (isSummitFichaId(id)) return;
    if (isManualFicha(ficha) || isManualFichaId(id)) {
      list.push(ficha);
    }
  });
  list.sort((a, b) => String(a.name || a.id || '').localeCompare(
    String(b.name || b.id || ''),
    'es',
    { sensitivity: 'base' }
  ));
  return list;
}

function getCisceFichasForSection(section) {
  const seeds = section.seeds || [];
  const cards = seeds.map(seed => {
    const ficha = getCachedFicha(seed.id);
    return { seed, ficha };
  });
  getCisceFichasFromCache(section.id).forEach(ficha => {
    if (isCiscePrecargadaId(ficha.id)) return;
    cards.push({
      seed: {
        id: ficha.id,
        name: ficha.name || 'Sin nombre',
        nameZh: ficha.nameZh || '',
        potencial: ficha.potencial || '',
        veredicto: ficha.veredicto || '',
        queHace: ficha.queHace || '',
        zona: resolveCisceZona(ficha, { id: ficha.id, cisceSection: section.id }),
        encaje: ficha.encaje || ''
      },
      ficha,
      manual: true
    });
  });
  return cards;
}

function getCisceFichasFromCache(sectionId) {
  const list = [];
  remoteFichaMap.forEach((ficha, id) => {
    if (!isCisceFichaId(id)) return;
    const section = getCisceFichaSection(id);
    if (sectionId && section !== sectionId) return;
    list.push(ficha);
  });
  list.sort((a, b) => String(a.name || a.id || '').localeCompare(
    String(b.name || b.id || ''),
    'es',
    { sensitivity: 'base' }
  ));
  return list;
}

function setCachedFicha(companyId, ficha) {
  remoteFichaMap.set(companyId, ficha);
  remoteFichaMapLoaded = true;
}

function openCompanyDatabase() {
  if (companyDbPromise) return companyDbPromise;
  companyDbPromise = new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB no disponible'));
      return;
    }
    const req = indexedDB.open(COMPANY_DB_NAME, COMPANY_DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(COMPANY_STORE)) {
        db.createObjectStore(COMPANY_STORE, { keyPath: 'companyId' });
      }
    };
  });
  return companyDbPromise;
}

function normalizeLegacyIndexedDbRecord(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const photos = [];
  if (Array.isArray(raw.photos)) {
    raw.photos.forEach(p => {
      if (p && p.blob instanceof Blob) {
        photos.push({
          blob: p.blob,
          name: typeof p.name === 'string' ? p.name : 'foto.jpg',
          addedAt: p.addedAt || null,
          addedBy: typeof p.addedBy === 'string' ? p.addedBy : ''
        });
      }
    });
  }
  return {
    companyId: raw.companyId,
    meetingType: raw.meetingType || '',
    description: typeof raw.description === 'string' ? raw.description : '',
    contacts: typeof raw.contacts === 'string' ? raw.contacts : '',
    notes: typeof raw.notes === 'string' ? raw.notes : '',
    photos
  };
}

async function getAllRecordsFromDatabase() {
  const db = await openCompanyDatabase();
  const rows = await new Promise((resolve, reject) => {
    const tx = db.transaction(COMPANY_STORE, 'readonly');
    const req = tx.objectStore(COMPANY_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
  return rows.map(normalizeLegacyIndexedDbRecord).filter(Boolean);
}

async function setCompanyMeetingType(companyId, meetingType) {
  if (!isAppOnline()) {
    if (activeCompanyId === companyId) {
      setCompanySaveStatus(sharePointOfflineMessage(), true);
    }
    throw new Error(sharePointOfflineMessage());
  }
  const ficha = getCachedFicha(companyId);
  const meta = metaFromFicha(ficha, companyId);
  const next = normalizeMeetingType(meetingType);
  const formState = {
    meta,
    meetingType: next || ''
  };
  if (isManualFicha(ficha)) {
    formState.name = ficha.name || '';
    formState.nameZh = ficha.nameZh || '';
    formState.contactPerson = ficha.contactPerson || '';
    formState.role = ficha.role || '';
    formState.isManual = true;
    formState.icexOffice = '';
  } else if (isSummitFicha(ficha)) {
    formState.name = ficha.name || '';
    formState.nameZh = ficha.nameZh || '';
    formState.contactPerson = ficha.contactPerson || '';
    formState.role = ficha.role || '';
    formState.temas = ficha.temas || '';
    formState.isManual = true;
    formState.icexOffice = 'Auto Electronics';
  }
  try {
    const merged = await saveFichaAtomic(companyId, formState);
    setCachedFicha(companyId, merged);
    refreshAfterFichaChange(companyId);
    renderMeetingsSummary();
    return merged;
  } catch (err) {
    console.warn(err);
    setCompanySaveStatus(connectionErrorMessage(), true);
    throw err;
  }
}

async function ensureReadableBlob(blob) {
  if (!(blob instanceof Blob)) {
    throw new Error('Archivo de foto no disponible');
  }
  try {
    const buffer = await blob.arrayBuffer();
    return new Blob([buffer], { type: blob.type || 'image/jpeg' });
  } catch (_) {
    return blob;
  }
}

function blobToBase64(blob) {
  return ensureReadableBlob(blob).then(readable => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error('No se pudo leer la foto'));
    reader.readAsDataURL(readable);
  }));
}

window.blobToBase64ForMigration = blobToBase64;

function setCompanySaveStatus(text, isError) {
  const el = document.getElementById('company-save-status');
  if (!el) return;
  el.textContent = text || '';
  el.classList.toggle('save-status--error', !!isError);
}

function compressImageFile(file, maxEdge) {
  maxEdge = maxEdge || 1920;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Imagen no válida'));
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxEdge || h > maxEdge) {
          if (w >= h) {
            h = Math.round(h * (maxEdge / w));
            w = maxEdge;
          } else {
            w = Math.round(w * (maxEdge / h));
            h = maxEdge;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          blob => {
            if (blob) resolve(blob);
            else reject(new Error('No se pudo comprimir'));
          },
          'image/jpeg',
          0.85
        );
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}


/* ──────────────────────────────────────────────
   COUNTDOWN
────────────────────────────────────────────── */
function initCountdown() {
  /* 20 jun 2026, 12:00 — hora local del dispositivo */
  const target = new Date(2026, 5, 20, 12, 0, 0);
  const daysEl = document.getElementById('countdown-days');
  const subEl = document.getElementById('countdown-sub');
  const hoursEl = document.getElementById('countdown-hours');
  if (!daysEl) return;

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = '¡Ya!';
      if (subEl) subEl.textContent = 'Salida Madrid · 20 jun 12:00';
      if (hoursEl) hoursEl.hidden = true;
      return;
    }
    const dayMs = 1000 * 60 * 60 * 24;
    const hourMs = 1000 * 60 * 60;
    const days = Math.ceil(diff / dayMs);
    const hours = Math.floor(diff / hourMs);
    daysEl.textContent = String(days);
    if (subEl) {
      subEl.textContent = days === 1
        ? 'día hasta salida (20 jun, 12:00)'
        : 'días hasta salida (20 jun, 12:00)';
    }
    if (hoursEl) {
      hoursEl.textContent = hours === 1 ? '1 hora' : hours + ' horas';
      hoursEl.hidden = false;
    }
  }

  update();
  setInterval(update, 60 * 1000);
}


/* ──────────────────────────────────────────────
   PRESENTACIONES — menú y sub-vistas
────────────────────────────────────────────── */
let presentacionesScreen = 'menu';

function getPresentacionesPanelId(screen) {
  if (screen === 'menu') return 'presentaciones-menu';
  return 'presentaciones-panel-' + screen;
}

/* ──────────────────────────────────────────────
   PRESENTACIONES — visor carrusel (diapositivas)
────────────────────────────────────────────── */
const DECK_PRESENTATIONS = {
  reman: { folder: 'Presentaciones/reman' }
};

const TRILINGUAL_DECK_LANGS = ['es', 'zh', 'en'];

const TRILINGUAL_DECKS = {
  diversificacion: {
    label: 'Diversificación',
    langPickerId: 'div-lang-picker',
    langBtnSelector: '.div-lang-btn[data-div-lang]',
    langDataAttr: 'divLang',
    resolveFolder(lang) {
      return 'Presentaciones/diversificacion/div-' + lang;
    }
  },
  oem: {
    label: 'OEM · TIER1',
    langPickerId: 'oem-lang-picker',
    langBtnSelector: '.oem-lang-btn[data-oem-lang]',
    langDataAttr: 'oemLang',
    resolveFolder(lang) {
      return 'Presentaciones/oem-tier1/oem-' + (lang === 'zh' ? 'ch' : lang);
    }
  }
};

const trilingualDeckLang = {
  diversificacion: 'es',
  oem: 'es'
};

function getTrilingualDeckFolder(deckId, lang) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg) return '';
  return cfg.resolveFolder(lang);
}

function getManifestSlides(folder) {
  const manifest = window.PRESENTATION_SLIDE_MANIFEST || {};
  const slides = manifest[folder];
  if (!Array.isArray(slides) || !slides.length) {
    console.warn('[SlideDeck] manifest vacío o ausente:', folder);
    return [];
  }
  return sortSlideFilenames(slides);
}

function warnTrilingualCountMismatch(deckId) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg) return;
  const counts = TRILINGUAL_DECK_LANGS.map(lang => {
    const folder = getTrilingualDeckFolder(deckId, lang);
    return { lang, folder, count: getManifestSlides(folder).length };
  });
  const unique = new Set(counts.map(item => item.count));
  if (unique.size > 1) {
    console.warn(
      '[SlideDeck]',
      cfg.label,
      '— recuento distinto entre idiomas:',
      counts.map(item => item.lang + ':' + item.count).join(', ')
    );
  }
}

function getTrilingualDeckSlideCount(deckId, lang) {
  return getManifestSlides(getTrilingualDeckFolder(deckId, lang || trilingualDeckLang[deckId] || 'es')).length;
}

const CORPORATE_VIDEO_FILE = 'Presentaciones/lizarte-corporate.mp4';

function getMediaCacheName() {
  return 'mision-china-v' + (window.__APP_BUILD__ || '38');
}

function getCorporateVideoUrl() {
  return CORPORATE_VIDEO_FILE + '?v=' + encodeURIComponent(deckCacheBust());
}

let corporateVideoCaching = false;

function pauseCorporateVideo() {
  const video = document.getElementById('corporate-video');
  if (video && !video.paused) video.pause();
}

async function ensureCorporateVideoCached() {
  const video = document.getElementById('corporate-video');
  const status = document.getElementById('corporate-video-cache-status');
  if (!video) return;

  const videoUrl = getCorporateVideoUrl();
  if (video.dataset.src !== videoUrl) {
    video.src = videoUrl;
    video.dataset.src = videoUrl;
    video.load();
  }

  if (!('caches' in window)) return;

  try {
    const cache = await caches.open(getMediaCacheName());
    const cached = await cache.match(videoUrl);
    if (cached) {
      if (status) status.hidden = true;
      return;
    }

    if (corporateVideoCaching) return;
    corporateVideoCaching = true;

    if (status) status.hidden = false;

    const res = await fetch(videoUrl);
    if (res.ok) await cache.put(videoUrl, res.clone());
  } catch (err) {
    console.warn('Corporate video cache:', err);
  } finally {
    corporateVideoCaching = false;
    if (status) status.hidden = true;
  }
}

function initCorporateVideoViewer() {
  ensureCorporateVideoCached().catch(err => console.warn('Corporate video:', err));
}

function isCorporateVideoFullscreenActive() {
  const viewport = document.getElementById('corporate-video-viewport');
  const video = document.getElementById('corporate-video');
  if (!viewport) return false;
  const fs = getFullscreenElement();
  return (
    viewport.classList.contains('corporate-video-viewport--expanded')
    || fs === viewport
    || fs === video
  );
}

function updateCorporateVideoFullscreenButton(active) {
  const btn = document.getElementById('btn-corporate-video-fullscreen');
  if (!btn) return;
  btn.textContent = active ? '✕ Salir pantalla completa' : '⛶ Pantalla completa';
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');
}

async function exitCorporateVideoFullscreen() {
  const viewport = document.getElementById('corporate-video-viewport');
  const video = document.getElementById('corporate-video');
  if (viewport && getFullscreenElement() === viewport) await exitNativeFullscreen();
  if (video && getFullscreenElement() === video) await exitNativeFullscreen();
  if (viewport) viewport.classList.remove('corporate-video-viewport--expanded');
  document.body.classList.remove('corporate-video-fullscreen-active');
  updateCorporateVideoFullscreenButton(false);
}

async function toggleCorporateVideoFullscreen() {
  const viewport = document.getElementById('corporate-video-viewport');
  const video = document.getElementById('corporate-video');
  if (!viewport || !video) return;

  if (isCorporateVideoFullscreenActive()) {
    await exitCorporateVideoFullscreen();
    return;
  }

  const nativeOk = await requestNativeFullscreen(video)
    || await requestNativeFullscreen(viewport);
  if (nativeOk) {
    updateCorporateVideoFullscreenButton(true);
    return;
  }

  viewport.classList.add('corporate-video-viewport--expanded');
  document.body.classList.add('corporate-video-fullscreen-active');
  updateCorporateVideoFullscreenButton(true);
}

function initCorporateVideoControls() {
  const btn = document.getElementById('btn-corporate-video-fullscreen');
  const viewport = document.getElementById('corporate-video-viewport');
  if (!btn || !viewport || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  btn.addEventListener('click', event => {
    event.preventDefault();
    toggleCorporateVideoFullscreen();
  });

  const onFullscreenChange = () => {
    if (!isCorporateVideoFullscreenActive()) {
      if (viewport) viewport.classList.remove('corporate-video-viewport--expanded');
      document.body.classList.remove('corporate-video-fullscreen-active');
      updateCorporateVideoFullscreenButton(false);
    }
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
}

function showPresentacionesScreen(screen) {
  presentacionesScreen = screen || 'menu';

  document.querySelectorAll('.presentaciones-panel').forEach(panel => {
    const active = panel.id === getPresentacionesPanelId(presentacionesScreen);
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });

  const isBrochure = presentacionesScreen === 'brochure';
  document.body.classList.toggle('mode-brochure', isBrochure);

  if (isBrochure) {
    initBrochureFrame();
  } else {
    exitBrochureFullscreen(document.getElementById('brochure-viewport'));
    exitDeckFullscreen();
    exitCorporateVideoFullscreen();
    closeDeckZoomModal();
    pauseCorporateVideo();
  }

  if (presentacionesScreen === 'video') {
    initCorporateVideoViewer();
  }

  if (TRILINGUAL_DECKS[presentacionesScreen]) {
    initTrilingualDeck(presentacionesScreen);
  } else if (DECK_PRESENTATIONS[presentacionesScreen]) {
    initSlideDeck(presentacionesScreen).catch(err => console.warn('Slide deck:', err));
  }

  updatePresentacionesBackFab();
}

function updatePresentacionesBackFab() {
  const fab = document.getElementById('presentaciones-back-fab');
  const view = document.getElementById('view-presentaciones');
  if (!fab) return;
  const viewActive = view && view.classList.contains('active');
  const show = viewActive && presentacionesScreen !== 'menu';
  fab.hidden = !show;
  fab.setAttribute('aria-hidden', show ? 'false' : 'true');
}

function handlePresentacionesBackFab() {
  showPresentacionesScreen('menu');
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (_) {
    window.scrollTo(0, 0);
  }
}

function resetPresentacionesToMenu() {
  showPresentacionesScreen('menu');
}

function initPresentaciones() {
  const root = document.getElementById('view-presentaciones');
  if (!root || root.dataset.bound === '1') return;
  root.dataset.bound = '1';

  const fab = document.getElementById('presentaciones-back-fab');
  if (fab) {
    fab.addEventListener('click', event => {
      event.preventDefault();
      handlePresentacionesBackFab();
    });
  }

  root.addEventListener('click', event => {
    const goBtn = event.target.closest('[data-presentaciones-go]');
    if (goBtn) {
      event.preventDefault();
      showPresentacionesScreen(goBtn.dataset.presentacionesGo);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
      return;
    }

    const backBtn = event.target.closest('[data-presentaciones-back]');
    if (backBtn) {
      event.preventDefault();
      showPresentacionesScreen(backBtn.dataset.presentacionesBack);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    }
  });

  initDeckViewers();
  initDeckZoomModal();
  initCorporateVideoControls();
  showPresentacionesScreen('menu');
}

const slideDeckState = new Map();
let activeDeckFsId = null;
let deckFsToggleLock = false;

function deckCacheBust() {
  return window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '38';
}

function getDeckViewerElements(deckId) {
  const viewer = document.getElementById('deck-viewer-' + deckId);
  if (!viewer) return null;
  return {
    viewer,
    viewport: viewer.querySelector('.deck-viewport'),
    placeholder: viewer.querySelector('.deck-placeholder'),
    pdfFrame: viewer.querySelector('.deck-pdf-frame'),
    carousel: viewer.querySelector('.deck-slide-carousel'),
    slideImg: viewer.querySelector('.deck-slide-img'),
    indicator: viewer.querySelector('.deck-carousel-indicator'),
    fsBtn: viewer.querySelector('[data-deck-fs="' + deckId + '"]'),
    dlLink: viewer.querySelector('[data-deck-dl="' + deckId + '"]')
  };
}

function setDeckViewportSlideMode(els, active) {
  if (!els) return;
  if (els.viewport) els.viewport.classList.toggle('deck-viewport--has-slides', !!active);
  if (els.placeholder) els.placeholder.hidden = !active ? false : true;
  if (els.pdfFrame) els.pdfFrame.hidden = true;
  if (els.carousel) els.carousel.hidden = !active;
}

function slideDeckAssetUrl(folder, filename) {
  return folder + '/' + encodeURI(filename).replace(/#/g, '%23') + '?v=' + encodeURIComponent(deckCacheBust());
}

function sortSlideFilenames(files) {
  return files.slice().sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

async function fetchSlideManifest(folder) {
  const url = folder + '/slides.json?v=' + encodeURIComponent(deckCacheBust());
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    console.warn('[SlideDeck] slides.json no disponible:', url, res.status);
    return [];
  }
  const data = await res.json();
  const slides = Array.isArray(data.slides) ? data.slides : [];
  const images = sortSlideFilenames(slides.filter(name => /\.(jpe?g|png|webp)$/i.test(name)));
  console.log('[SlideDeck] manifest', folder, images.length, 'diapositivas');
  return images;
}

function updateDeckSlideIndicator(deckId) {
  const state = slideDeckState.get(deckId);
  const els = getDeckViewerElements(deckId);
  if (!state || !els || !els.indicator) return;
  els.indicator.textContent = (state.current + 1) + ' / ' + state.slides.length;
}

function preloadDeckSlide(deckId, index) {
  const state = slideDeckState.get(deckId);
  if (!state || index < 0 || index >= state.slides.length) return;
  const name = state.slides[index];
  if (state.preloaded.has(name)) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = slideDeckAssetUrl(state.folder, name);
  state.preloaded.set(name, img);
}

function preloadAdjacentDeckSlides(deckId) {
  const state = slideDeckState.get(deckId);
  if (!state) return;
  preloadDeckSlide(deckId, state.current - 1);
  preloadDeckSlide(deckId, state.current + 1);
}

function goToDeckSlide(deckId, index) {
  const state = slideDeckState.get(deckId);
  const els = getDeckViewerElements(deckId);
  if (!state || !els || !els.slideImg || !state.slides.length) return;

  const next = Math.max(0, Math.min(index, state.slides.length - 1));
  state.current = next;

  const filename = state.slides[next];
  const src = slideDeckAssetUrl(state.folder, filename);
  els.slideImg.src = src;
  els.slideImg.alt = 'Diapositiva ' + (next + 1) + ' de ' + state.slides.length;

  if (els.dlLink) {
    els.dlLink.href = src;
    els.dlLink.download = filename;
    els.dlLink.hidden = false;
  }

  updateDeckSlideIndicator(deckId);
  preloadAdjacentDeckSlides(deckId);

  const prevBtn = els.viewer.querySelector('[data-deck-nav="prev"]');
  const nextBtn = els.viewer.querySelector('[data-deck-nav="next"]');
  if (prevBtn) prevBtn.disabled = next <= 0;
  if (nextBtn) nextBtn.disabled = next >= state.slides.length - 1;
}

function stepDeckSlide(deckId, delta) {
  const state = slideDeckState.get(deckId);
  if (!state) return;
  goToDeckSlide(deckId, state.current + delta);
}

function bindSlideDeckSwipe(deckId) {
  const els = getDeckViewerElements(deckId);
  if (!els || !els.carousel) return;
  const stage = els.carousel.querySelector('[data-deck-swipe]');
  if (!stage || stage.dataset.bound === '1') return;
  stage.dataset.bound = '1';

  let startX = 0;
  let startY = 0;

  stage.addEventListener('touchstart', event => {
    if (!event.changedTouches || !event.changedTouches.length) return;
    startX = event.changedTouches[0].screenX;
    startY = event.changedTouches[0].screenY;
  }, { passive: true });

  stage.addEventListener('touchend', event => {
    if (!event.changedTouches || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].screenX - startX;
    const dy = event.changedTouches[0].screenY - startY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) stepDeckSlide(deckId, 1);
    else stepDeckSlide(deckId, -1);
  }, { passive: true });
}

function bindSlideDeckControls(deckId) {
  const els = getDeckViewerElements(deckId);
  if (!els || !els.viewer || els.viewer.dataset.deckBound === '1') return;
  els.viewer.dataset.deckBound = '1';

  els.viewer.addEventListener('click', event => {
    const nav = event.target.closest('[data-deck-nav]');
    if (!nav) return;
    event.preventDefault();
    if (nav.dataset.deckNav === 'prev') stepDeckSlide(deckId, -1);
    else if (nav.dataset.deckNav === 'next') stepDeckSlide(deckId, 1);
  });

  bindSlideDeckSwipe(deckId);
}

async function initSlideDeck(deckId) {
  console.log('[SlideDeck] initSlideDeck llamado:', deckId);
  const config = DECK_PRESENTATIONS[deckId];
  const els = getDeckViewerElements(deckId);
  if (!config || !els) {
    console.warn('[SlideDeck] sin config o DOM:', deckId, { config: !!config, els: !!els });
    return;
  }

  const existing = slideDeckState.get(deckId);
  if (existing && existing.ready) {
    bindDeckSlideZoom(deckId);
    goToDeckSlide(deckId, existing.current);
    return;
  }

  const slides = await fetchSlideManifest(config.folder);
  if (!slides.length) {
    console.warn('[SlideDeck] sin diapositivas para', deckId, 'en', config.folder);
    return;
  }

  slideDeckState.set(deckId, {
    folder: config.folder,
    slides,
    current: 0,
    preloaded: new Map(),
    ready: true
  });

  setDeckViewportSlideMode(els, true);

  if (els.fsBtn) {
    els.fsBtn.hidden = false;
    els.fsBtn.disabled = false;
  }

  bindSlideDeckControls(deckId);
  bindDeckSlideZoom(deckId);
  goToDeckSlide(deckId, 0);
  console.log('[SlideDeck] carrusel activo:', deckId, slides.length, 'diapositivas');
}

function syncTrilingualLangButtons(deckId) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg) return;
  const lang = trilingualDeckLang[deckId] || 'es';
  document.querySelectorAll(cfg.langBtnSelector).forEach(btn => {
    btn.classList.toggle('active', btn.dataset[cfg.langDataAttr] === lang);
  });
}

async function switchTrilingualDeckLang(deckId, lang) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg || !TRILINGUAL_DECK_LANGS.includes(lang) || lang === trilingualDeckLang[deckId]) return;
  trilingualDeckLang[deckId] = lang;
  await closeDeckZoomModal();
  const folder = getTrilingualDeckFolder(deckId, lang);
  const slides = getManifestSlides(folder);
  if (!slides.length) {
    console.warn('[SlideDeck] sin diapositivas al cambiar idioma:', deckId, folder);
    return;
  }
  slideDeckState.set(deckId, {
    folder,
    slides,
    lang,
    current: 0,
    preloaded: new Map(),
    ready: true
  });
  const els = getDeckViewerElements(deckId);
  setDeckViewportSlideMode(els, true);
  goToDeckSlide(deckId, 0);
  syncTrilingualLangButtons(deckId);
}

function bindTrilingualLangPicker(deckId) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg) return;
  const picker = document.getElementById(cfg.langPickerId);
  if (!picker || picker.dataset.bound === '1') return;
  picker.dataset.bound = '1';
  picker.addEventListener('click', event => {
    const btn = event.target.closest(cfg.langBtnSelector);
    if (!btn) return;
    event.preventDefault();
    switchTrilingualDeckLang(deckId, btn.dataset[cfg.langDataAttr]);
  });
}

function initTrilingualDeck(deckId) {
  const cfg = TRILINGUAL_DECKS[deckId];
  if (!cfg) return;

  warnTrilingualCountMismatch(deckId);

  const lang = trilingualDeckLang[deckId] || 'es';
  const existing = slideDeckState.get(deckId);
  if (existing && existing.ready && existing.lang === lang) {
    bindDeckSlideZoom(deckId);
    goToDeckSlide(deckId, existing.current);
    syncTrilingualLangButtons(deckId);
    return;
  }

  const folder = getTrilingualDeckFolder(deckId, lang);
  const slides = getManifestSlides(folder);
  if (!slides.length) {
    console.warn('[SlideDeck] sin diapositivas:', deckId, folder);
    return;
  }

  slideDeckState.set(deckId, {
    folder,
    slides,
    lang,
    current: 0,
    preloaded: new Map(),
    ready: true
  });

  const els = getDeckViewerElements(deckId);
  setDeckViewportSlideMode(els, true);
  bindSlideDeckControls(deckId);
  bindTrilingualLangPicker(deckId);
  bindDeckSlideZoom(deckId);
  goToDeckSlide(deckId, 0);
  syncTrilingualLangButtons(deckId);
  console.log('[SlideDeck]', deckId, 'activa:', lang, slides.length, 'diapositivas');
}

function syncDiversificacionLangButtons() {
  syncTrilingualLangButtons('diversificacion');
}

async function switchDiversificacionLang(lang) {
  return switchTrilingualDeckLang('diversificacion', lang);
}

function bindDiversificacionLangSelector() {
  bindTrilingualLangPicker('diversificacion');
}

function initDiversificacionDeck() {
  initTrilingualDeck('diversificacion');
}

async function requestDocumentFullscreen() {
  const root = document.documentElement;
  try {
    if (root.requestFullscreen) await root.requestFullscreen();
    else if (root.webkitRequestFullscreen) await root.webkitRequestFullscreen();
  } catch (_) { /* silenciar si no soportado */ }
}

async function lockPresentationLandscape() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
    }
  } catch (_) { /* silenciar si no soportado */ }
}

function unlockPresentationOrientation() {
  try {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  } catch (_) { /* silenciar si no soportado */ }
}

let activeDeckZoomId = null;

function resetDeckZoomViewportScroll() {
  const viewport = document.getElementById('deck-zoom-viewport');
  if (viewport) viewport.scrollTop = viewport.scrollLeft = 0;
}

function refreshDeckZoomModal() {
  if (!activeDeckZoomId) return;
  const state = slideDeckState.get(activeDeckZoomId);
  const img = document.getElementById('deck-zoom-img');
  const indicator = document.getElementById('deck-zoom-indicator');
  const prevBtn = document.getElementById('deck-zoom-prev');
  const nextBtn = document.getElementById('deck-zoom-next');
  if (!state || !img || !state.slides.length) return;

  const index = state.current;
  const filename = state.slides[index];
  const src = slideDeckAssetUrl(state.folder, filename);
  img.src = src;
  img.alt = 'Diapositiva ' + (index + 1) + ' de ' + state.slides.length;
  if (indicator) indicator.textContent = (index + 1) + ' / ' + state.slides.length;
  if (prevBtn) prevBtn.disabled = index <= 0;
  if (nextBtn) nextBtn.disabled = index >= state.slides.length - 1;
  preloadAdjacentDeckSlides(activeDeckZoomId);
}

function stepDeckZoomSlide(delta) {
  if (!activeDeckZoomId) return;
  stepDeckSlide(activeDeckZoomId, delta);
  refreshDeckZoomModal();
  resetDeckZoomViewportScroll();
}

async function openDeckZoomModal(deckId) {
  const state = slideDeckState.get(deckId);
  const modal = document.getElementById('deck-zoom-modal');
  if (!state || !state.slides.length || !modal) return;

  activeDeckZoomId = deckId;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('deck-zoom-open');
  refreshDeckZoomModal();
  resetDeckZoomViewportScroll();

  try {
    await requestDocumentFullscreen();
    await lockPresentationLandscape();
  } catch (_) { /* silenciar si no soportado */ }
}

async function closeDeckZoomModal(options) {
  const skipFullscreen = options && options.skipFullscreen;

  if (!skipFullscreen) {
    try {
      unlockPresentationOrientation();
      if (getFullscreenElement()) {
        await exitNativeFullscreen();
      }
    } catch (_) { /* silenciar si no soportado */ }
  }

  const modal = document.getElementById('deck-zoom-modal');
  const img = document.getElementById('deck-zoom-img');
  const indicator = document.getElementById('deck-zoom-indicator');
  if (!modal) return;
  activeDeckZoomId = null;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('deck-zoom-open');
  if (img) {
    img.src = '';
    img.alt = '';
  }
  if (indicator) indicator.textContent = '';
}

function bindDeckSlideZoom(deckId) {
  const els = getDeckViewerElements(deckId);
  if (!els || !els.slideImg || els.slideImg.dataset.zoomBound === '1') return;
  els.slideImg.dataset.zoomBound = '1';
  els.slideImg.classList.add('deck-slide-img--zoomable');
  els.slideImg.addEventListener('click', () => {
    if (!els.slideImg.src) return;
    openDeckZoomModal(deckId);
  });
}

function bindDeckZoomSwipe() {
  const viewport = document.getElementById('deck-zoom-viewport');
  if (!viewport || viewport.dataset.bound === '1') return;
  viewport.dataset.bound = '1';

  const touch = { startX: 0, startY: 0, multiTouch: false };

  viewport.addEventListener('touchstart', event => {
    touch.multiTouch = event.touches.length > 1;
    if (!event.changedTouches || !event.changedTouches.length) return;
    touch.startX = event.changedTouches[0].screenX;
    touch.startY = event.changedTouches[0].screenY;
  }, { passive: true });

  viewport.addEventListener('touchmove', event => {
    if (event.touches.length > 1) touch.multiTouch = true;
  }, { passive: true });

  viewport.addEventListener('touchend', event => {
    if (touch.multiTouch) {
      if (event.touches.length === 0) touch.multiTouch = false;
      return;
    }
    if (!event.changedTouches || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].screenX - touch.startX;
    const dy = event.changedTouches[0].screenY - touch.startY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) stepDeckZoomSlide(1);
    else stepDeckZoomSlide(-1);
  }, { passive: true });
}

function initDeckZoomModal() {
  const modal = document.getElementById('deck-zoom-modal');
  if (!modal || modal.dataset.bound === '1') return;
  modal.dataset.bound = '1';

  const closeBtn = document.getElementById('deck-zoom-close');
  const prevBtn = document.getElementById('deck-zoom-prev');
  const nextBtn = document.getElementById('deck-zoom-next');
  if (closeBtn) closeBtn.addEventListener('click', () => { closeDeckZoomModal(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stepDeckZoomSlide(-1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stepDeckZoomSlide(1); });

  bindDeckZoomSwipe();

  document.addEventListener('keydown', event => {
    if (!modal || modal.hidden) return;
    if (event.key === 'Escape') closeDeckZoomModal();
    else if (event.key === 'ArrowRight') stepDeckZoomSlide(1);
    else if (event.key === 'ArrowLeft') stepDeckZoomSlide(-1);
  });

  const onFullscreenEnd = () => {
    if (!modal || modal.hidden) return;
    if (!getFullscreenElement()) closeDeckZoomModal({ skipFullscreen: true });
  };
  document.addEventListener('fullscreenchange', onFullscreenEnd);
  document.addEventListener('webkitfullscreenchange', onFullscreenEnd);
}

function isDeckFullscreenActive(deckId) {
  const els = getDeckViewerElements(deckId);
  if (!els || !els.viewport) return false;
  return (
    activeDeckFsId === deckId
    || els.viewport.classList.contains('deck-viewport--expanded')
    || getFullscreenElement() === els.viewport
  );
}

function updateDeckFullscreenButton(btn, active) {
  if (!btn) return;
  btn.textContent = active ? '✕ Salir pantalla completa' : '⛶ Pantalla completa';
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');
}

function enterDeckExpanded(deckId) {
  const els = getDeckViewerElements(deckId);
  if (!els || !els.viewport) return;
  els.viewport.classList.add('deck-viewport--expanded', 'deck-viewport--presentation');
  document.body.classList.add('deck-fullscreen-active');
  activeDeckFsId = deckId;
}

function exitDeckExpanded(deckId) {
  const els = getDeckViewerElements(deckId);
  if (els && els.viewport) {
    els.viewport.classList.remove('deck-viewport--expanded', 'deck-viewport--presentation');
  }
  if (activeDeckFsId === deckId) activeDeckFsId = null;
  if (!document.querySelector('.deck-viewport--expanded')) {
    document.body.classList.remove('deck-fullscreen-active');
  }
}

async function exitDeckFullscreen(deckId) {
  if (deckId) {
    const els = getDeckViewerElements(deckId);
    if (els && els.viewport && getFullscreenElement() === els.viewport) {
      await exitNativeFullscreen();
    }
    exitDeckExpanded(deckId);
    updateDeckFullscreenButton(els && els.fsBtn, false);
    return;
  }

  document.querySelectorAll('.deck-viewport--expanded').forEach(vp => {
    vp.classList.remove('deck-viewport--expanded', 'deck-viewport--presentation');
  });
  if (getFullscreenElement()) await exitNativeFullscreen();
  activeDeckFsId = null;
  document.body.classList.remove('deck-fullscreen-active');
  document.querySelectorAll('[data-deck-fs]').forEach(btn => updateDeckFullscreenButton(btn, false));
}

async function toggleDeckFullscreen(deckId) {
  if (deckFsToggleLock) return;
  deckFsToggleLock = true;
  setTimeout(() => { deckFsToggleLock = false; }, 450);

  const els = getDeckViewerElements(deckId);
  if (!els || !els.viewport || !els.fsBtn || els.fsBtn.disabled) return;

  if (isDeckFullscreenActive(deckId)) {
    await exitDeckFullscreen(deckId);
    return;
  }

  const nativeOk = await requestNativeFullscreen(els.viewport);
  if (nativeOk) {
    activeDeckFsId = deckId;
    updateDeckFullscreenButton(els.fsBtn, true);
    return;
  }

  enterDeckExpanded(deckId);
  updateDeckFullscreenButton(els.fsBtn, true);
}

function initDeckViewers() {
  document.querySelectorAll('[data-deck-fs]').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', event => {
      event.preventDefault();
      toggleDeckFullscreen(btn.dataset.deckFs);
    });
  });

  const onFullscreenChange = () => {
    if (getFullscreenElement()) return;
    document.querySelectorAll('.deck-viewport--expanded').forEach(vp => {
      vp.classList.remove('deck-viewport--expanded', 'deck-viewport--presentation');
    });
    activeDeckFsId = null;
    document.body.classList.remove('deck-fullscreen-active');
    document.querySelectorAll('[data-deck-fs]').forEach(btn => updateDeckFullscreenButton(btn, false));
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeDeckFsId) {
      exitDeckFullscreen(activeDeckFsId);
      return;
    }
    if (!activeDeckFsId) return;
    if (event.key === 'ArrowRight') stepDeckSlide(activeDeckFsId, 1);
    if (event.key === 'ArrowLeft') stepDeckSlide(activeDeckFsId, -1);
  });
}

/* Cargar presentación por carpeta (reutilizable) */
function loadDeckPresentation(deckId, options) {
  options = options || {};
  if (options.type === 'images' && options.slides && options.slides.length) {
    const config = DECK_PRESENTATIONS[deckId] || { folder: options.folder || '' };
    slideDeckState.set(deckId, {
      folder: config.folder,
      slides: sortSlideFilenames(options.slides),
      current: 0,
      preloaded: new Map(),
      ready: true
    });
    const els = getDeckViewerElements(deckId);
    setDeckViewportSlideMode(els, true);
    if (els && els.fsBtn) { els.fsBtn.hidden = false; els.fsBtn.disabled = false; }
    bindSlideDeckControls(deckId);
    goToDeckSlide(deckId, 0);
    return;
  }

  const els = getDeckViewerElements(deckId);
  if (!els) return;

  const url = options.url ? options.url + (options.url.indexOf('?') >= 0 ? '&' : '?') + 'v=' + encodeURIComponent(deckCacheBust()) : '';

  if (els.placeholder) els.placeholder.hidden = true;

  if (options.type === 'pdf' && url && els.pdfFrame) {
    els.pdfFrame.hidden = false;
    els.pdfFrame.src = url;
    if (els.carousel) els.carousel.hidden = true;
  }

  if (url && els.dlLink) {
    els.dlLink.href = url;
    els.dlLink.hidden = false;
  }
  if (els.fsBtn) {
    els.fsBtn.hidden = false;
    els.fsBtn.disabled = false;
  }
}

window.loadDeckPresentation = loadDeckPresentation;
window.initSlideDeck = initSlideDeck;


/* ──────────────────────────────────────────────
   BROCHURE — folleto en iframe (scroll horizontal)
────────────────────────────────────────────── */
let brochureFrameLoaded = false;
let brochureToggleLock = false;

function getBrochureUrl() {
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '38';
  return 'brochure-liz-china.html?v=' + encodeURIComponent(bust);
}

function ensureBrochureFrame() {
  let frame = document.getElementById('brochure-frame');
  const home = document.getElementById('brochure-frame-home');
  if (!frame && home) {
    frame = document.createElement('iframe');
    frame.id = 'brochure-frame';
    frame.className = 'brochure-frame';
    frame.title = 'Brochure Lizarte China';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    home.appendChild(frame);
  }
  return frame;
}

function initBrochureFrame() {
  const frame = ensureBrochureFrame();
  if (!frame || brochureFrameLoaded) return;
  frame.src = getBrochureUrl();
  brochureFrameLoaded = true;
}

function prefersBrochurePortal() {
  if (window.matchMedia('(pointer: coarse)').matches) return true;
  if (window.matchMedia('(max-width: 768px)').matches) return true;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.standalone) return true;
  return false;
}

function isBrochurePortalOpen() {
  const portal = document.getElementById('brochure-fs-portal');
  return !!(portal && !portal.hidden);
}

function getFullscreenElement() {
  return (
    document.fullscreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement
    || null
  );
}

function isBrochureFullscreenActive(viewport) {
  if (!viewport) return isBrochurePortalOpen();
  return (
    isBrochurePortalOpen()
    || viewport.classList.contains('brochure-viewport--expanded')
    || getFullscreenElement() === viewport
  );
}

function enterBrochurePortal() {
  const portal = document.getElementById('brochure-fs-portal');
  const host = document.getElementById('brochure-fs-host');
  const frame = ensureBrochureFrame();
  if (!portal || !host || !frame) return;

  initBrochureFrame();
  host.appendChild(frame);
  portal.hidden = false;
  portal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('brochure-fs-portal-open');
}

function exitBrochurePortal() {
  const portal = document.getElementById('brochure-fs-portal');
  const home = document.getElementById('brochure-frame-home');
  const frame = document.getElementById('brochure-frame');
  if (home && frame) home.appendChild(frame);
  if (portal) {
    portal.hidden = true;
    portal.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('brochure-fs-portal-open');
}

function updateBrochureFullscreenButton(btn, active) {
  if (!btn) return;
  btn.textContent = active ? '✕ Salir pantalla completa' : '⛶ Pantalla completa';
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');
}

function enterBrochureExpanded(viewport) {
  viewport.classList.add('brochure-viewport--expanded');
  document.body.classList.add('brochure-fullscreen-active');
}

function exitBrochureExpanded(viewport) {
  viewport.classList.remove('brochure-viewport--expanded');
  document.body.classList.remove('brochure-fullscreen-active');
}

async function requestNativeFullscreen(el) {
  if (!el) return false;

  const attempts = [
    () => el.requestFullscreen && el.requestFullscreen(),
    () => el.webkitRequestFullscreen && el.webkitRequestFullscreen(),
    () => el.msRequestFullscreen && el.msRequestFullscreen()
  ];

  for (let i = 0; i < attempts.length; i++) {
    try {
      await attempts[i]();
      const fs = getFullscreenElement();
      if (fs === el) return true;
    } catch (_) {
      /* probar siguiente API */
    }
  }

  return getFullscreenElement() === el;
}

async function exitNativeFullscreen() {
  const exit = (
    document.exitFullscreen
    || document.webkitExitFullscreen
    || document.msExitFullscreen
  );
  if (!exit) return;
  try {
    await exit.call(document);
  } catch (_) { /* ignore */ }
}

async function exitBrochureFullscreen(viewport) {
  if (isBrochurePortalOpen()) {
    exitBrochurePortal();
  }
  if (viewport && getFullscreenElement() === viewport) {
    await exitNativeFullscreen();
  }
  if (viewport) exitBrochureExpanded(viewport);
  updateBrochureFullscreenButton(
    document.getElementById('btn-brochure-fullscreen'),
    false
  );
}

function openBrochureInNewTab() {
  initBrochureFrame();
  const url = getBrochureUrl();
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.assign(url);
}

async function toggleBrochureFullscreen() {
  if (brochureToggleLock) return;
  brochureToggleLock = true;
  setTimeout(() => { brochureToggleLock = false; }, 450);

  const btn = document.getElementById('btn-brochure-fullscreen');
  const viewport = document.getElementById('brochure-viewport');
  if (!btn || !viewport) return;

  if (isBrochureFullscreenActive(viewport)) {
    await exitBrochureFullscreen(viewport);
    return;
  }

  initBrochureFrame();

  const nativeOk = await requestNativeFullscreen(viewport);
  if (nativeOk) {
    updateBrochureFullscreenButton(btn, true);
    return;
  }

  if (prefersBrochurePortal()) {
    enterBrochurePortal();
    updateBrochureFullscreenButton(btn, true);
    return;
  }

  enterBrochureExpanded(viewport);
  updateBrochureFullscreenButton(btn, true);
}

function initBrochureControls() {
  const btn = document.getElementById('btn-brochure-fullscreen');
  const closePortalBtn = document.getElementById('btn-brochure-fs-close');
  const openTabBtn = document.getElementById('btn-brochure-open-tab');
  const viewport = document.getElementById('brochure-viewport');
  if (!btn || !viewport) return;

  btn.addEventListener('click', event => {
    event.preventDefault();
    toggleBrochureFullscreen();
  });

  if (closePortalBtn) {
    closePortalBtn.addEventListener('click', event => {
      event.preventDefault();
      exitBrochureFullscreen(viewport);
    });
  }

  if (openTabBtn) {
    openTabBtn.addEventListener('click', event => {
      event.preventDefault();
      openBrochureInNewTab();
    });
  }

  const onFullscreenChange = () => {
    if (isBrochurePortalOpen()) {
      updateBrochureFullscreenButton(btn, true);
      return;
    }
    const nativeOn = getFullscreenElement() === viewport;
    if (!nativeOn && viewport.classList.contains('brochure-viewport--expanded')) {
      updateBrochureFullscreenButton(btn, true);
      return;
    }
    if (!nativeOn) exitBrochureExpanded(viewport);
    updateBrochureFullscreenButton(btn, nativeOn);
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isBrochureFullscreenActive(viewport)) {
      exitBrochureFullscreen(viewport);
    }
  });
}


/* ──────────────────────────────────────────────
   NAV — ocultar barra superior al bajar scroll
────────────────────────────────────────────── */
function initNavAutoHide() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;
  const threshold = 48;

  function setHidden(hidden) {
    nav.classList.toggle('top-nav--hidden', hidden);
  }

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y <= 8) {
      setHidden(false);
    } else if (y > lastY && y > threshold) {
      setHidden(true);
    } else if (y < lastY) {
      setHidden(false);
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
}


/* ──────────────────────────────────────────────
   NAVIGATION — pestañas principales y eventos
────────────────────────────────────────────── */
let activeEventTab = 'cisce-feria';

function initNavigation() {
  function scrollMainToTop() {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }

  function activateEventTab(eventId) {
    activeEventTab = eventId;
    document.querySelectorAll('.event-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.event === eventId);
    });
    document.querySelectorAll('.event-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.event === eventId);
    });
    if (eventId === 'cisce-feria') {
      renderCisceFeria().catch(err => console.warn('CISCE Feria:', err));
    }
    if (eventId === 'auto-electronics') {
      renderAutoElectronics().catch(err => console.warn('Auto Electronics:', err));
    }
  }

  function activateViewByName(target) {
    if (!target) return;

    document.querySelectorAll('.top-nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === target);
    });
    document.querySelectorAll('.view').forEach(v => {
      v.classList.toggle('active', v.id === 'view-' + target);
    });

    if (target === 'eventos') {
      activateEventTab(activeEventTab);
    }

    if (target === 'resumen') {
      renderMeetingsSummary();
    }

    if (target === 'otras') {
      renderOtrasReuniones().catch(err => console.warn('Otras:', err));
    }

    document.body.classList.toggle('mode-brochure', target === 'presentaciones' && presentacionesScreen === 'brochure');

    if (target === 'presentaciones') {
      if (presentacionesScreen === 'brochure') {
        initBrochureFrame();
      }
    } else {
      exitBrochureFullscreen(document.getElementById('brochure-viewport'));
      resetPresentacionesToMenu();
    }

    updatePresentacionesBackFab();

    scrollMainToTop();
  }

  window.switchView = activateViewByName;
  window.switchEventTab = activateEventTab;

  const nav = document.querySelector('.top-nav');
  if (nav) {
    nav.addEventListener('click', event => {
      const button = event.target.closest('.top-nav-item');
      if (!button) return;
      event.preventDefault();
      activateViewByName(button.dataset.view);
    });
  }

  const subnav = document.getElementById('event-subnav');
  if (subnav) {
    const onSub = event => {
      const tab = event.target.closest('.event-tab');
      if (!tab) return;
      event.preventDefault();
      activateEventTab(tab.dataset.event);
    };
    subnav.addEventListener('click', onSub);
  }
}


/* ──────────────────────────────────────────────
   RENDER — Logística
────────────────────────────────────────────── */
function renderLogistics() {
  const container = document.getElementById('logistics-list');
  if (!container) return;

  container.innerHTML = TRIP_LOGISTICS.map(item => {
    if (item.interpreter) {
      const email = String(item.interpreter.email || '').trim();
      const emailHtml = email
        ? `<a class="hotel-phone" href="mailto:${escapeHtml(email)}">✉️ ${escapeHtml(email)}</a>`
        : '';
      const schedule = (item.interpreter.schedule || []).map(row => `
        <div class="interpreter-timeline-row">
          <span class="interpreter-date">${escapeHtml(row.date || '')}</span>
          <span class="interpreter-task">${escapeHtml(row.task || '')}</span>
        </div>
      `).join('');
      const costs = (item.interpreter.costs || []).map(cost => `
        <li class="interpreter-cost-item">${escapeHtml(cost)}</li>
      `).join('');
      return `
      <article class="hotel-card interpreter-card">
        <header class="hotel-card-header">
          <div class="hotel-city">
            <span class="hotel-city-es">${escapeHtml(item.cityEs)}</span>
          </div>
          <div class="hotel-header-meta">
            <span class="hotel-dates">${escapeHtml(item.dateRange || '')}</span>
          </div>
        </header>
        <div class="hotel-card-body">
          <div class="interpreter-names">
            <span class="hotel-name-es">${escapeHtml(item.interpreter.name || '')}</span>
            <span class="interpreter-role">${escapeHtml(item.interpreter.role || '')}</span>
            ${emailHtml}
          </div>
          <h4 class="interpreter-section-title">Plan de trabajo</h4>
          <div class="interpreter-timeline">${schedule}</div>
          <section class="interpreter-cost">
            <h4 class="interpreter-cost-title">Coste</h4>
            <ul class="interpreter-cost-list">${costs}</ul>
          </section>
        </div>
      </article>`;
    }

    const isTravel = !item.hotel;
    const phoneRaw = item.hotel && item.hotel.phone ? String(item.hotel.phone) : '';
    const phoneLink = phoneRaw ? phoneRaw.split('/')[0].replace(/[^\d+]/g, '') : '';
    const phoneHtml = phoneRaw
      ? `<a class="hotel-phone" href="tel:${escapeHtml(phoneLink)}">📞 ${escapeHtml(phoneRaw)}</a>`
      : '';
    const stayBadges = (!isTravel && (item.checkIn || item.checkOut || item.nightsBadge))
      ? `<div class="hotel-stay-badges">
          ${item.checkIn ? `<span class="hotel-stay-badge">Check-in · ${escapeHtml(item.checkIn)}</span>` : ''}
          ${item.checkOut ? `<span class="hotel-stay-badge">Check-out · ${escapeHtml(item.checkOut)}</span>` : ''}
          ${item.nightsBadge ? `<span class="hotel-stay-badge hotel-stay-badge--nights">${escapeHtml(item.nightsBadge)}</span>` : ''}
         </div>`
      : '';
    const hotelBlock = item.hotel
      ? `<div class="hotel-names">
          <span class="hotel-name-es">${escapeHtml(item.hotel.nameEs)}</span>
          <span class="hotel-name-zh">${escapeHtml(item.hotel.nameZh)}</span>
         </div>
         ${item.hotel.addressEs ? `<span class="hotel-address">${escapeHtml(item.hotel.addressEs)}</span>` : ''}
         ${item.hotel.addressZh ? `<span class="hotel-address-zh">${escapeHtml(item.hotel.addressZh)}</span>` : ''}
         ${phoneHtml}
         ${stayBadges}`
      : `<p class="hotel-travel-note">${escapeHtml(item.departureNote || '')}</p>`;

    const departure = item.departureTime
      ? `<div class="hotel-departure">
          <span class="departure-label">Salida del hotel</span>
          <span class="departure-time">${escapeHtml(item.departureTime)}</span>
         </div>`
      : `<div class="hotel-departure hotel-departure--pending">
          <span class="departure-label">Salida del hotel</span>
          <span class="departure-note">${escapeHtml(item.departureNote || 'Por confirmar')}</span>
         </div>`;

    return `
      <article class="hotel-card ${isTravel ? 'hotel-card--travel' : ''}">
        <header class="hotel-card-header">
          <div class="hotel-city">
            <span class="hotel-city-es">${escapeHtml(item.cityEs)}</span>
            <span class="hotel-city-zh">${escapeHtml(item.cityZh)}</span>
          </div>
          <div class="hotel-header-meta">
            <span class="hotel-dates">${escapeHtml(item.dateRange)}</span>
            ${item.cityBadge && item.cityBadge.label ? `<span class="hotel-city-badge" style="--hotel-city-badge-color:${escapeHtml(item.cityBadge.color || '#E67E22')}">${escapeHtml(item.cityBadge.label)}</span>` : ''}
          </div>
        </header>
        ${isTravel ? '' : `<div class="hotel-card-body">${hotelBlock}${departure}</div>`}
        ${isTravel ? hotelBlock : ''}
        ${item.notes ? `<p class="hotel-notes">${escapeHtml(item.notes)}</p>` : ''}
      </article>`;
  }).join('');
}


/* ──────────────────────────────────────────────
   RENDER — Arrival Cards (General)
────────────────────────────────────────────── */
function arrivalCardAssetUrl(filename) {
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '53';
  return filename + '?v=' + encodeURIComponent(bust);
}

function renderArrivalCards() {
  const container = document.getElementById('arrival-cards-list');
  if (!container) return;

  container.innerHTML = ARRIVAL_CARDS.map(card => `
    <article class="arrival-card">
      <div class="arrival-card-header">
        <span class="arrival-card-doc" aria-hidden="true">📄</span>
        <span class="arrival-card-name">${escapeHtml(card.name)}</span>
      </div>
      <a class="arrival-card-btn" href="${escapeHtml(arrivalCardAssetUrl(card.file))}" target="_blank" rel="noopener noreferrer">Ver Arrival Card</a>
    </article>
  `).join('');
}

function initTravelInsuranceLink() {
  const link = document.getElementById('travel-insurance-link');
  if (!link) return;
  link.href = arrivalCardAssetUrl('poliza-seguro-viaje.pdf');
}


/* ──────────────────────────────────────────────
   RENDER — Delegaciones (Eventos)
────────────────────────────────────────────── */
function countDelegationEntries(delegation) {
  if (!delegation) return 0;
  return (delegation.institutional || []).length + (delegation.companies || []).length;
}

function isLizarteDelegationEntry(entry) {
  if (!entry) return false;
  if (entry.highlight) return true;
  const org = String(entry.org || '').toUpperCase();
  return org.indexOf('LIZARTE') === 0;
}

function buildDelegationRowHtml(entry) {
  const lizarteClass = isLizarteDelegationEntry(entry) ? ' agenda-delegation-item--lizarte' : '';
  if (!entry.person) {
    return `<li class="agenda-delegation-item${lizarteClass}"><span class="delegation-org">${escapeHtml(entry.org)}</span></li>`;
  }
  return `<li class="agenda-delegation-item${lizarteClass}">
    <span class="delegation-org">${escapeHtml(entry.org)}</span>
    <span class="delegation-person">${escapeHtml(entry.person)}</span>
    <span class="delegation-role"> — ${escapeHtml(entry.role)}</span>
  </li>`;
}

function buildDelegationSectionHtml(label, entries) {
  if (!entries || !entries.length) return '';
  const rows = entries.map(buildDelegationRowHtml).join('');
  return `
    <div class="agenda-delegation-section">
      <h4 class="agenda-delegation-heading">${escapeHtml(label)}</h4>
      <ul class="agenda-delegation-list">${rows}</ul>
    </div>`;
}

const DELEGATION_EVENT_LABELS = {
  cisce: 'CISCE',
  shenzhen: 'Shenzhen'
};

function getDelegationToggleLabel(blockId, count, expanded) {
  const name = DELEGATION_EVENT_LABELS[blockId] || blockId;
  if (expanded) return `👥 Delegación ${name} ▲`;
  return `👥 Delegación ${name} (${count} personas) ▼`;
}

function buildDelegationBlockHtml(blockId) {
  const delegation = TRIP_DELEGATIONS[blockId];
  if (!delegation) return '';

  const count = countDelegationEntries(delegation);
  const panelId = 'delegation-panel-' + blockId;

  return `
    <div class="event-delegation-wrap">
      <div class="agenda-delegation" data-delegation-id="${escapeHtml(blockId)}">
        <button type="button" class="agenda-delegation-toggle" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
          <span class="agenda-delegation-toggle-label">${escapeHtml(getDelegationToggleLabel(blockId, count, false))}</span>
        </button>
        <div class="agenda-delegation-panel" id="${escapeHtml(panelId)}" hidden>
          ${buildDelegationSectionHtml('Institucional', delegation.institutional)}
          ${buildDelegationSectionHtml('Empresas', delegation.companies)}
        </div>
      </div>
    </div>`;
}

function bindAgendaDelegations() {
  document.querySelectorAll('.agenda-delegation-toggle').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const wrap = btn.closest('.agenda-delegation');
      const panel = wrap ? wrap.querySelector('.agenda-delegation-panel') : null;
      const label = btn.querySelector('.agenda-delegation-toggle-label');
      const blockId = wrap ? wrap.dataset.delegationId : '';
      if (!panel || !label) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      panel.hidden = !next;
      wrap.classList.toggle('agenda-delegation--expanded', next);

      const delegation = TRIP_DELEGATIONS[blockId];
      const count = countDelegationEntries(delegation);
      label.textContent = getDelegationToggleLabel(blockId, count, next);
    });
  });
}

/* ──────────────────────────────────────────────
   RENDER — Resumen diario maestro (General)
────────────────────────────────────────────── */
function buildTripDailySlotLabel(slot) {
  if (slot.travel) return '🚗 ' + slot.label;
  const parts = [];
  if (slot.lizarte) parts.push('🔴');
  parts.push(slot.label);
  if (slot.confirmed) parts.push('✅');
  if (slot.warning === 'confirmar') parts.push('⚠️ Por confirmar');
  if (slot.warning === 'pendiente') parts.push('⚠️ Pendiente');
  return parts.join(' ');
}

function buildTripDailySlotHtml(slot) {
  if (slot.travel) {
    return `
      <div class="trip-daily-slot trip-daily-slot--travel">
        <span class="trip-daily-slot-label">${escapeHtml(buildTripDailySlotLabel(slot))}</span>
      </div>`;
  }

  const classes = ['trip-daily-slot'];
  if (slot.lizarte) classes.push('trip-daily-slot--lizarte');
  if (slot.warning) classes.push('trip-daily-slot--warning');
  if (slot.flight) classes.push('trip-daily-slot--flight');

  const time = slot.time ? escapeHtml(slot.time) : '';
  const detail = slot.detail
    ? `<span class="trip-daily-slot-detail">${escapeHtml(slot.detail)}</span>`
    : '';

  return `
    <div class="${classes.join(' ')}">
      <span class="trip-daily-slot-time">${time}</span>
      <div class="trip-daily-slot-body">
        <span class="trip-daily-slot-label">${escapeHtml(buildTripDailySlotLabel(slot))}</span>
        ${detail}
      </div>
    </div>`;
}

function buildTripDailySlotsHtml(slots) {
  return (slots || []).map(buildTripDailySlotHtml).join('');
}

function buildTripDailyDayHtml(day) {
  const panelId = 'trip-daily-panel-' + day.id;
  const dayClass = day.conflict ? ' trip-daily-day--conflict' : '';

  let bodyHtml = '';
  if (day.location) {
    bodyHtml += `<p class="trip-daily-location">${escapeHtml(day.location)}</p>`;
  }
  if (day.groups && day.groups.length) {
    bodyHtml += day.groups.map(group => `
      <div class="trip-daily-group">
        <h4 class="trip-daily-group-heading">${escapeHtml(group.heading)}</h4>
        <div class="trip-daily-timeline">${buildTripDailySlotsHtml(group.slots)}</div>
      </div>`).join('');
  } else {
    bodyHtml += `<div class="trip-daily-timeline">${buildTripDailySlotsHtml(day.slots)}</div>`;
  }
  if (day.dayNotes && day.dayNotes.length) {
    bodyHtml += day.dayNotes.map(note => `
      <p class="trip-daily-day-note">${escapeHtml(note)}</p>`).join('');
  }

  return `
    <article class="trip-daily-day${dayClass}" data-trip-day="${escapeHtml(day.id)}">
      <button type="button" class="trip-daily-toggle" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span class="trip-daily-toggle-title">${escapeHtml(day.title)}</span>
        <span class="trip-daily-toggle-summary">${escapeHtml(day.summaryLine)}</span>
        <span class="trip-daily-toggle-icon" aria-hidden="true">▼</span>
      </button>
      <div class="trip-daily-panel" id="${escapeHtml(panelId)}" hidden>
        ${bodyHtml}
      </div>
    </article>`;
}

function bindTripDailySummary() {
  document.querySelectorAll('.trip-daily-toggle').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const day = btn.closest('.trip-daily-day');
      const panel = day ? day.querySelector('.trip-daily-panel') : null;
      const icon = btn.querySelector('.trip-daily-toggle-icon');
      if (!panel) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      panel.hidden = !next;
      if (day) day.classList.toggle('trip-daily-day--expanded', next);
      if (icon) icon.textContent = next ? '▲' : '▼';
    });
  });
}

function renderTripDailySummary() {
  const root = document.getElementById('trip-daily-summary');
  if (!root) return;
  root.innerHTML = TRIP_DAILY_SUMMARY.map(buildTripDailyDayHtml).join('');
  bindTripDailySummary();
}

/* ──────────────────────────────────────────────
   RENDER — Vuelos
────────────────────────────────────────────── */
function renderFlights() {
  const container = document.getElementById('flights-list');
  if (!container) return;
  container.innerHTML = FLIGHTS.map(buildFlightCard).join('');
}

function buildFlightCard(f) {
  return `
    <article class="flight-card" data-id="${escapeHtml(f.id)}">
      <header class="flight-card-header">
        <span class="flight-type">${escapeHtml(f.title)}</span>
        <span class="flight-date">${escapeHtml(f.dateLabel)}</span>
      </header>
      <p class="flight-route-label">${escapeHtml(f.routeLabel)}</p>
      <div class="flight-route">
        <div class="flight-endpoint">
          <span class="flight-code">${escapeHtml(f.from.code)}</span>
          <span class="flight-city">${escapeHtml(f.from.city)}</span>
        </div>
        <div class="flight-connector" aria-hidden="true">
          <span class="flight-plane">✈</span>
          <span class="flight-duration">${escapeHtml(f.duration)}</span>
        </div>
        <div class="flight-endpoint flight-endpoint--to">
          <span class="flight-code">${escapeHtml(f.to.code)}</span>
          <span class="flight-city">${escapeHtml(f.to.city)}</span>
        </div>
      </div>
      <div class="flight-times">
        <div class="flight-time-row">
          <span class="flight-time-label">Salida</span>
          <span class="flight-time-value">${escapeHtml(f.departTime)}</span>
          <span class="flight-time-meta">${escapeHtml(f.from.code)} · ${escapeHtml(f.from.terminal)}</span>
        </div>
        <div class="flight-time-row">
          <span class="flight-time-label">Llegada</span>
          <span class="flight-time-value">${escapeHtml(f.arriveTime)}</span>
          <span class="flight-time-meta">${escapeHtml(f.to.code)} · ${escapeHtml(f.arriveDateLabel)} · ${escapeHtml(f.to.terminal)}</span>
        </div>
      </div>
      <div class="alert-box alert-box--flight">
        <span class="alert-icon">🛫</span>
        <p><strong>${escapeHtml(f.from.airport)}</strong></p>
      </div>
      <div class="alert-box alert-box--flight alert-box--flight-arrival">
        <span class="alert-icon">🛬</span>
        <p><strong>${escapeHtml(f.to.airport)}</strong></p>
      </div>
      <p class="flight-footnote">${escapeHtml(f.note)}</p>
    </article>`;
}


/* ──────────────────────────────────────────────
   RENDER — Contactos
────────────────────────────────────────────── */
function qrAssetUrl(filename) {
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '38';
  return filename + '?v=' + encodeURIComponent(bust);
}

function getOrderedQrContactCards() {
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
  return QR_CONTACT_CARDS.slice().sort((a, b) => {
    if (a.id === uid) return -1;
    if (b.id === uid) return 1;
    return 0;
  });
}

function buildQrContactCard(person) {
  const vcardSrc = qrAssetUrl(person.vcardQr);
  const wechatSrc = person.wechatQr ? qrAssetUrl(person.wechatQr) : '';
  const wechatBodyHtml = person.wechatQr
    ? `
        <img
          class="qr-contact-img"
          src="${escapeHtml(wechatSrc)}"
          alt="QR WeChat de ${escapeHtml(person.name)}"
          width="280"
          height="280"
          loading="lazy"
        />
        <button
          type="button"
          class="btn-qr-fullscreen btn-qr-fullscreen--wechat"
          data-qr-fs="${escapeHtml(person.wechatQr)}"
          data-qr-title="WeChat — ${escapeHtml(person.name)}"
          aria-label="Ver QR WeChat a pantalla completa"
        >⛶ Pantalla completa</button>`
    : `
        <div class="qr-contact-qr-placeholder" role="status">
          <span class="qr-contact-qr-placeholder-icon" aria-hidden="true">💬</span>
          <span class="qr-contact-qr-placeholder-text">QR WeChat pendiente</span>
        </div>`;

  return `
    <article class="qr-contact-card" data-qr-person="${escapeHtml(person.id)}">
      <header class="qr-contact-header">
        <h4 class="qr-contact-name">${escapeHtml(person.name)}</h4>
        <p class="qr-contact-role">${escapeHtml(person.role)}</p>
      </header>
      <div class="qr-contact-qr-grid">
        <section class="qr-contact-qr-item qr-contact-qr-item--vcard" aria-label="Guardar contacto">
          <div class="qr-contact-qr-label">
            <span class="qr-contact-qr-icon" aria-hidden="true">📇</span>
            <span class="qr-contact-qr-title">Guardar contacto</span>
            <span class="qr-contact-qr-sub">用手机相机扫描 · Escanear con la CÁMARA del móvil (no WeChat)</span>
          </div>
          <div class="qr-contact-qr-wrap">
            <img
              class="qr-contact-img"
              src="${escapeHtml(vcardSrc)}"
              alt="QR vCard de ${escapeHtml(person.name)}"
              width="280"
              height="280"
              loading="lazy"
            />
            <button
              type="button"
              class="btn-qr-fullscreen"
              data-qr-fs="${escapeHtml(person.vcardQr)}"
              data-qr-title="Guardar contacto — ${escapeHtml(person.name)}"
              aria-label="Ver QR vCard a pantalla completa"
            >⛶ Pantalla completa</button>
          </div>
        </section>
        <section class="qr-contact-qr-item qr-contact-qr-item--wechat" aria-label="Añadir en WeChat">
          <div class="qr-contact-qr-label">
            <span class="qr-contact-qr-icon" aria-hidden="true">💬</span>
            <span class="qr-contact-qr-title">Añadir en WeChat</span>
            <span class="qr-contact-qr-sub">微信扫一扫加好友 · Escanear dentro de WeChat</span>
          </div>
          <div class="qr-contact-qr-wrap">
            ${wechatBodyHtml}
          </div>
        </section>
      </div>
      <div class="qr-contact-links">
        <a class="qr-contact-link" href="tel:${escapeHtml(person.phone)}">📞 ${escapeHtml(person.phoneDisplay)}</a>
        <a class="qr-contact-link" href="mailto:${escapeHtml(person.email)}">✉ ${escapeHtml(person.email)}</a>
      </div>
    </article>`;
}

function renderQrContactCards() {
  const root = document.getElementById('qr-cards-root');
  if (!root) return;
  const cardsHtml = getOrderedQrContactCards().map(buildQrContactCard).join('');
  const noticeHtml = `
    <p class="qr-contact-notice">
      ℹ️ Si la otra persona usa WeChat para escanear, debe usar el QR de WeChat.
      El QR de contacto solo lo lee la cámara del móvil.
    </p>`;
  root.innerHTML = cardsHtml + noticeHtml;
}

function showQrFullscreenModal(src, title) {
  const modal = document.getElementById('qr-fullscreen-modal');
  const img = document.getElementById('qr-fullscreen-img');
  const titleEl = document.getElementById('qr-fullscreen-title');
  if (!modal || !img) return;

  img.src = qrAssetUrl(src);
  img.alt = title || 'Código QR';
  if (titleEl) titleEl.textContent = title || 'QR';

  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('qr-fullscreen-open');
}

function hideQrFullscreenModal() {
  const modal = document.getElementById('qr-fullscreen-modal');
  const img = document.getElementById('qr-fullscreen-img');
  if (modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  }
  if (img) img.src = '';
  document.body.classList.remove('qr-fullscreen-open');
}

function initQrContactControls() {
  const root = document.getElementById('qr-cards-root');
  if (!root || root.dataset.bound === '1') return;
  root.dataset.bound = '1';

  root.addEventListener('click', event => {
    const fsBtn = event.target.closest('[data-qr-fs]');
    if (fsBtn) {
      event.preventDefault();
      showQrFullscreenModal(fsBtn.dataset.qrFs, fsBtn.dataset.qrTitle);
    }
  });

  const modal = document.getElementById('qr-fullscreen-modal');
  if (!modal || modal.dataset.bound === '1') return;
  modal.dataset.bound = '1';

  const backdrop = document.getElementById('qr-fullscreen-backdrop');
  const closeBtn = document.getElementById('qr-fullscreen-close');
  const close = () => hideQrFullscreenModal();

  if (backdrop) backdrop.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', event => {
    const m = document.getElementById('qr-fullscreen-modal');
    if (m && !m.hidden && event.key === 'Escape') hideQrFullscreenModal();
  });
}

function renderContacts() {
  renderQrContactCards();
  initQrContactControls();

  const container = document.getElementById('contacts-list');
  if (!container) return;

  const groups = [];
  const groupIndex = new Map();

  CONTACTS.forEach(c => {
    if (!groupIndex.has(c.group)) {
      groupIndex.set(c.group, groups.length);
      groups.push({ name: c.group, flag: c.flag, items: [] });
    }
    groups[groupIndex.get(c.group)].items.push(c);
  });

  container.innerHTML = groups.map(g => `
    <div class="contact-group">
      <div class="contact-group-header">
        <span class="contact-group-flag">${g.flag}</span>
        <span class="contact-group-name">${escapeHtml(g.name)}</span>
      </div>
      ${g.items.map(buildContactCard).join('')}
    </div>
  `).join('');
}

function buildContactCard(c) {
  const details = (c.details || [])
    .map(d => `<span class="contact-detail">${escapeHtml(d)}</span>`)
    .join('');
  const tag = c.tag
    ? `<span class="contact-tag contact-tag--${c.tagClass || 'pending'}">${escapeHtml(c.tag)}</span>`
    : '';

  return `
    <div class="contact-card">
      <div class="contact-initials ci-${c.color}">${escapeHtml(c.initials)}</div>
      <div class="contact-info">
        <span class="contact-name">${escapeHtml(c.name)}</span>
        <span class="contact-role">${escapeHtml(c.role)}</span>
        ${details}
        ${tag}
      </div>
    </div>`;
}


/* ──────────────────────────────────────────────
   RENDER — Agendas CISCE / Shenzhen
────────────────────────────────────────────── */
const EVENT_SLOT_STATUS_LABELS = {
  confirmado: 'Confirmado',
  confirmada: 'Confirmada',
  cambiada: 'Cambiada',
  pendiente: 'Pendiente',
  'por-confirmar': 'Por confirmar si es evento abierto'
};

function buildEventSlotStatusBadge(statusBadge) {
  const key = String(statusBadge || '').toLowerCase();
  const text = EVENT_SLOT_STATUS_LABELS[key];
  if (!text) return '';
  return `<span class="slot-status-badge slot-status-badge--${escapeHtml(key)}">${escapeHtml(text)}</span>`;
}

function buildEventAgendaSlotHtml(slot) {
  const classes = ['meeting-slot'];
  if (slot.empty) classes.push('meeting-slot--empty');
  if (slot.priority) classes.push('meeting-slot--priority');
  if (slot.travel) classes.push('meeting-slot--travel');
  if (slot.institutional) classes.push('meeting-slot--institutional');

  const time = slot.time ? escapeHtml(slot.time) : '';
  const badgeHtml = buildEventSlotStatusBadge(slot.statusBadge);
  const institutionalTag = slot.institutional
    ? '<span class="slot-institutional-tag">Consejero</span>'
    : '';
  const sub = slot.sub
    ? `<span class="slot-sub">${escapeHtml(slot.sub)}</span>`
    : '';
  const detail = slot.detail
    ? `<span class="slot-detail">${escapeHtml(slot.detail)}</span>`
    : '';

  let labelHtml;
  if (slot.travel) {
    const travelLabel = slot.label || 'Desplazamiento';
    labelHtml = `<span class="slot-label slot-label--travel">🚗 &gt;&gt;&gt;&gt;&gt; ${escapeHtml(travelLabel)}</span>`;
  } else if (slot.visit) {
    labelHtml = `<strong class="slot-label slot-label--visit">${escapeHtml(slot.label)}</strong>`;
  } else {
    labelHtml = `<span class="slot-label">${escapeHtml(slot.label)}</span>`;
  }

  return `
    <div class="${classes.join(' ')}">
      <span class="slot-time">${time}</span>
      <div class="slot-text">
        <div class="slot-label-row">
          ${labelHtml}
          ${institutionalTag}
          ${badgeHtml}
        </div>
        ${detail}
        ${sub}
      </div>
    </div>`;
}

function renderEventAgendas() {
  Object.keys(EVENT_AGENDA).forEach(key => {
    const panel = document.getElementById('event-panel-' + key);
    const data = EVENT_AGENDA[key];
    if (!panel || !data) return;

    const daysHtml = data.days.map(day => {
      const slots = (day.slots || []).map(buildEventAgendaSlotHtml).join('');

      const badgeHtml = day.badge
        ? `<span class="day-badge ${day.badgeClass || ''}">${escapeHtml(day.badge)}</span>`
        : '';

      return `
        <div class="timeline-day" data-date="${day.date}">
          <div class="day-header">
            <span class="day-date${(key === 'shenzhen' || key === 'cisce') ? ' day-date--major' : ''}">${escapeHtml(day.dateLabel)}</span>
            ${badgeHtml}
          </div>
          <div class="day-content">
            ${day.note ? `<p class="day-note">${escapeHtml(day.note)}</p>` : ''}
            ${slots}
          </div>
        </div>`;
    }).join('');

    const delegationHtml = (key === 'cisce' || key === 'shenzhen')
      ? buildDelegationBlockHtml(key)
      : '';

    panel.innerHTML = `
      <div class="event-hero">
        <div class="hero-tag">${escapeHtml(data.heroTag)}</div>
        <h3 class="event-hero-title">${escapeHtml(data.heroTitle)}</h3>
        <p class="event-hero-desc">${escapeHtml(data.heroDesc)}</p>
      </div>
      ${data.programIntro ? `<div class="alert-box alert-box--info"><span class="alert-icon">📋</span><p>${escapeHtml(data.programIntro)}</p></div>` : ''}
      ${delegationHtml}
      ${key === 'cisce' ? buildNavarraDayCardHtml() : ''}
      <div class="timeline">
        <div class="timeline-city">
          <div class="city-marker ${data.cityClass}">${data.cityMarker}</div>
        </div>
        ${daysHtml}
      </div>
      ${data.footerAlert ? `<div class="alert-box alert-box--warn"><span class="alert-icon">⚠️</span><p>${escapeHtml(data.footerAlert)}</p></div>` : ''}
      ${data.footerNote ? `<div class="info-box"><span class="info-box-icon">ℹ</span><p>${escapeHtml(data.footerNote)}</p></div>` : ''}`;
  });

  bindSummitCollapsible();
  bindAgendaDelegations();
}


/* ──────────────────────────────────────────────
   RENDER — Tarjetas empresa (ICEX + Otras)
────────────────────────────────────────────── */
function buildCantonMeetingTimeHtml(meetingTime) {
  const time = trimText(meetingTime);
  if (time) {
    return `<span class="company-meeting-time" aria-label="Hora de reunión">${escapeHtml(time)}</span>`;
  }
  return '<span class="company-meeting-time company-meeting-time--pending">Sin hora</span>';
}

function buildCompanyCardHtml(ficha, companyId, seedCompany, cardOptions) {
  cardOptions = cardOptions || {};
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
  const meetingType = normalizeMeetingType(ficha.meetingType);
  const photos = countPhotosInFicha(ficha);
  const mine = ficha.userEntries && ficha.userEntries[uid] ? ficha.userEntries[uid] : {};
  const hasNotes = !!(mine.description || mine.notes);
  const displayName = trimText(ficha.name) || (seedCompany && seedCompany.name) || 'Sin nombre';
  const nameZh = ficha.nameZh || (seedCompany && seedCompany.nameZh) || '';
  const contactPerson = ficha.contactPerson || (seedCompany && seedCompany.contactPerson) || '';
  const role = ficha.role || (seedCompany && seedCompany.role) || '';
  const city = cardOptions.city || (seedCompany && seedCompany.city) || '';
  const showCantonTime = Object.prototype.hasOwnProperty.call(cardOptions, 'cantonMeetingTime');
  const cantonTimeHtml = showCantonTime ? buildCantonMeetingTimeHtml(cardOptions.cantonMeetingTime) : '';
  const preview = mine.description
    ? truncateText(mine.description, 72)
    : 'Pulsa para abrir ficha en SharePoint';
  const photoLabel = photos.total > 0
    ? 'Krum:' + countUserPhotos(ficha.userEntries.krum || {})
      + ' · Óscar:' + countUserPhotos(ficha.userEntries.oscar || {})
    : '';
  const contactLine = [contactPerson, role].filter(Boolean).join(' · ');
  const lizarteClass = isLizarteCompanyName(displayName) ? ' company-card--lizarte' : '';
  const cityHtml = city
    ? `<p class="icex-canton-city">📍 ${escapeHtml(city)}</p>`
    : '';

  const headerHtml = showCantonTime
    ? `
      <div class="company-card-header company-card-header--with-time">
        <div class="company-card-header-main">
          <div class="company-card-title-row">
            <div>
              <span class="company-name">${escapeHtml(displayName)}</span>
              ${nameZh ? `<span class="company-name-zh">${escapeHtml(nameZh)}</span>` : ''}
            </div>
            ${cantonTimeHtml}
          </div>
          <div class="company-badges">
            ${meetingTypeBadgeHtml(meetingType)}
            ${photos.total > 0 ? `<span class="company-badge badge-photos">📷 ${photos.total}</span>` : ''}
          </div>
        </div>
      </div>`
    : `
      <div class="company-card-header">
        <div>
          <span class="company-name">${escapeHtml(displayName)}</span>
          ${nameZh ? `<span class="company-name-zh">${escapeHtml(nameZh)}</span>` : ''}
        </div>
        <div class="company-badges">
          ${meetingTypeBadgeHtml(meetingType)}
          ${photos.total > 0 ? `<span class="company-badge badge-photos">📷 ${photos.total}</span>` : ''}
        </div>
      </div>`;

  return `
    <article class="company-card icex-company-card${lizarteClass}" data-company-id="${escapeHtml(companyId)}" role="button" tabindex="0" aria-label="Abrir ficha de ${escapeHtml(displayName)}">
      ${headerHtml}
      ${cityHtml}
      ${buildMeetingTypePickerHtml(companyId, meetingType, 'meeting-type-picker--card')}
      ${contactLine ? `<p class="company-contact-person">👤 ${escapeHtml(contactLine)}</p>` : ''}
      <p class="company-card-preview ${hasNotes ? '' : 'company-card-preview--empty'}">${escapeHtml(preview)}</p>
      <p class="company-card-meta" ${photoLabel ? '' : 'hidden'}>📷 ${escapeHtml(photoLabel)}</p>
    </article>`;
}

function tallyIcexMeetingStats(ficha) {
  const meetingType = normalizeMeetingType(ficha.meetingType);
  if (meetingType === 'b2b') return { b2b: 1, visita: 0, unset: 0 };
  if (meetingType === 'visita') return { b2b: 0, visita: 1, unset: 0 };
  return { b2b: 0, visita: 0, unset: 1 };
}

function mergeIcexOfficeStats(stats, delta) {
  stats.b2b += delta.b2b;
  stats.visita += delta.visita;
  stats.unset += delta.unset;
}

function buildSummitFichaBarHtml(ficha, companyId) {
  const meetingType = normalizeMeetingType(ficha.meetingType);
  return `
    <div class="icex-summit-ficha-bar">
      ${buildMeetingTypePickerHtml(companyId, meetingType, 'meeting-type-picker--summit')}
      <button type="button" class="icex-summit-ficha-btn" data-company-id="${escapeHtml(companyId)}">📝 Notas, contactos y fotos</button>
    </div>`;
}

function buildIcexCantonScheduleHtml(office) {
  const companyMap = new Map(office.companies.map(c => [c.id, c]));
  const officeStats = { b2b: 0, visita: 0, unset: 0 };

  const daysHtml = ICEX_CANTON_SCHEDULE.map((day, dayIndex) => {
    const dayId = 'icex-canton-day-' + dayIndex;
    const itemsHtml = day.items.map(item => {
      if (item.type === 'travel') {
        return `<div class="icex-canton-travel" role="note">${escapeHtml(item.text)}</div>`;
      }
      const company = companyMap.get(item.companyId);
      if (!company) return '';
      const ficha = getCachedFicha(item.companyId);
      mergeIcexOfficeStats(officeStats, tallyIcexMeetingStats(ficha));

      if (item.summit || item.companyId === ICEX_CANTON_SUMMIT_ID) {
        return `
        <div class="icex-canton-meeting icex-canton-meeting--summit-ref">
          <span class="icex-canton-slot-badge icex-canton-slot-badge--${escapeHtml(item.slot)}">${escapeHtml(item.slotLabel)}</span>
          ${buildSummitReferenceHtml(ficha, item.companyId)}
        </div>`;
      }

      const cardHtml = buildCompanyCardHtml(ficha, item.companyId, company, {
        city: company.city,
        cantonMeetingTime: item.meetingTime
      });
      return `
        <div class="icex-canton-meeting">
          <span class="icex-canton-slot-badge icex-canton-slot-badge--${escapeHtml(item.slot)}">${escapeHtml(item.slotLabel)}</span>
          ${cardHtml}
        </div>`;
    }).join('');

    const subHtml = day.daySub
      ? `<span class="icex-canton-day-sub">${escapeHtml(day.daySub)}</span>`
      : '';

    return `
      <section class="icex-canton-day" aria-labelledby="${dayId}">
        <header class="icex-canton-day-header" id="${dayId}">
          <h4 class="icex-canton-day-title">${escapeHtml(day.dayLabel)}</h4>
          ${subHtml}
        </header>
        <div class="icex-canton-day-items">${itemsHtml}</div>
      </section>`;
  }).join('');

  return { daysHtml, officeStats };
}

async function renderOtrasReuniones() {
  const root = document.getElementById('otras-reuniones-root');
  if (!root) return;

  try {
    await loadAllRemoteFichas(false);
  } catch (err) {
    console.warn('Carga fichas otras:', err);
  }

  const fichas = getManualFichasFromCache();

  if (!fichas.length) {
    root.innerHTML = `
      <div class="otras-empty">
        <p class="otras-empty-text">Aún no hay otras reuniones. Pulsa <strong>+</strong> para añadir la primera.</p>
      </div>`;
    return;
  }

  root.innerHTML = `
    <div class="alert-box alert-box--info">
      <span class="alert-icon">☁️</span>
      <p>Reuniones añadidas manualmente · mismas fichas en SharePoint que ICEX.</p>
    </div>
    <div class="company-list otras-company-list">${fichas.map(f => buildCompanyCardHtml(f, f.id)).join('')}</div>`;

  bindIcexCompanyCards();
  bindMeetingTypePickers();
}

function openNewManualFicha() {
  const ficha = createManualFichaDraft();
  openCompanyModal(ficha.id, { draft: true, ficha });
}

function initOtrasReuniones() {
  const fab = document.getElementById('btn-otras-add');
  if (fab && fab.dataset.bound !== '1') {
    fab.dataset.bound = '1';
    fab.addEventListener('click', () => openNewManualFicha());
  }
}

function buildCisceFeriaSectionHtml(section) {
  const items = getCisceFichasForSection(section);
  const count = items.length;
  const panelId = 'cisce-feria-panel-' + section.id;
  const countLabel = count === 1 ? '1 empresa' : count + ' empresas';

  const listHtml = count
    ? `<div class="company-list cisce-feria-company-list">${items.map(item => (
      buildCisceFeriaCardHtml(item.ficha, item.seed)
    )).join('')}</div>`
    : `<div class="cisce-feria-empty"><p class="cisce-feria-empty-text">Sin empresas en esta sub-sección.</p></div>`;

  return `
    <div class="cisce-feria-section" data-cisce-section="${escapeHtml(section.id)}">
      <button type="button" class="cisce-feria-toggle" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span class="cisce-feria-toggle-label">${section.emoji} ${escapeHtml(section.label)} (${countLabel}) ▼</span>
      </button>
      <div class="cisce-feria-panel" id="${escapeHtml(panelId)}" hidden>
        ${listHtml}
        <button type="button" class="cisce-feria-add-btn" data-cisce-section="${escapeHtml(section.id)}">+ Añadir empresa</button>
      </div>
    </div>`;
}

function bindCisceFeriaSections() {
  document.querySelectorAll('.cisce-feria-toggle').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.cisce-feria-section');
      const panel = wrap ? wrap.querySelector('.cisce-feria-panel') : null;
      const label = btn.querySelector('.cisce-feria-toggle-label');
      if (!panel || !label) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      wrap.classList.toggle('cisce-feria-section--expanded', next);
      panel.hidden = !next;
      const base = label.textContent.replace(/\s*[▼▲]\s*$/, '');
      label.textContent = base + (next ? ' ▲' : ' ▼');
    });
  });

  document.querySelectorAll('.cisce-feria-add-btn').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      openNewCisceFicha(btn.dataset.cisceSection || 'jv');
    });
  });
}

function openNewCisceFicha(sectionId) {
  const ficha = createCisceFichaDraft(sectionId);
  openCompanyModal(ficha.id, { draft: true, ficha });
}

function setEventTabRefreshIndicator(eventId, active) {
  const tab = document.querySelector('.event-tab[data-event="' + eventId + '"]');
  if (!tab) return;
  let el = tab.querySelector('.event-tab-refresh');
  if (active) {
    if (!el) {
      el = document.createElement('span');
      el.className = 'event-tab-refresh';
      el.setAttribute('aria-live', 'polite');
      el.textContent = 'Actualizando…';
      tab.appendChild(el);
    }
  } else if (el) {
    el.remove();
  }
}

function setIcexTabsRefreshIndicator(active) {
  ICEX_OFFICES.forEach(office => setEventTabRefreshIndicator(office.id, active));
}

function paintCisceFeria() {
  const panel = document.getElementById('event-panel-cisce-feria');
  if (!panel) return;

  const cisceSections = getCisceFeriaSections();
  const sectionsHtml = cisceSections.map(buildCisceFeriaSectionHtml).join('');

  panel.innerHTML = `
    <div class="event-hero event-hero--icex">
      <div class="hero-tag">CISCE · Beijing</div>
      <h3 class="event-hero-title">CISCE Feria</h3>
      <p class="event-hero-desc">36 empresas priorizadas · Joint Venture, Diversificación y Apoyo</p>
    </div>
    <div class="alert-box alert-box--info">
      <span class="alert-icon">☁️</span>
      <p>Fichas en SharePoint · solo notas editables · datos estratégicos en la app.</p>
    </div>
    <div class="cisce-feria-plan-row">
      <a
        class="cisce-feria-plan-btn"
        href="https://www.cisce.org.cn/overview/layout.html"
        target="_blank"
        rel="noopener noreferrer"
      >🗺️ Plano oficial CISCE</a>
    </div>
    <p class="cisce-feria-zona-notice">ℹ️ La zona es la cadena oficial del CISCE. El hall y stand exactos se confirman en el plano oficial o en la app de visitante.</p>
    <div class="cisce-feria-root">${sectionsHtml}</div>
    <div class="cisce-feria-global-add">
      <label class="cisce-feria-global-label" for="cisce-feria-add-section">Sub-sección</label>
      <div class="cisce-feria-global-row">
        <select id="cisce-feria-add-section" class="cisce-feria-select" aria-label="Elegir sub-sección">
          ${cisceSections.map(section => `
            <option value="${escapeHtml(section.id)}">${section.emoji} ${escapeHtml(section.label)}</option>`).join('')}
        </select>
        <button type="button" class="cisce-feria-global-btn" id="btn-cisce-feria-add">+ Añadir empresa</button>
      </div>
    </div>`;

  bindCisceFeriaSections();
  bindIcexCompanyCards();
  bindMeetingTypePickers();

  const globalAdd = document.getElementById('btn-cisce-feria-add');
  if (globalAdd && globalAdd.dataset.bound !== '1') {
    globalAdd.dataset.bound = '1';
    globalAdd.addEventListener('click', () => {
      const select = document.getElementById('cisce-feria-add-section');
      const sectionId = select ? select.value : 'div';
      openNewCisceFicha(sectionId);
    });
  }
}

function renderCisceFeria() {
  paintCisceFeria();
  setEventTabRefreshIndicator('cisce-feria', true);
  return loadAllRemoteFichas(false)
    .then(() => paintCisceFeria())
    .catch(err => console.warn('CISCE Feria:', err))
    .finally(() => setEventTabRefreshIndicator('cisce-feria', false));
}

function initCisceFeria() {
  renderCisceFeria().catch(err => console.warn('CISCE Feria init:', err));
}

/* ──────────────────────────────────────────────
   RENDER — Oficinas ICEX (empresas + fichas)
────────────────────────────────────────────── */
function buildSummitTimelineRow(slot) {
  const rowClass = [
    'summit-timeline-row',
    slot.meal ? ' summit-timeline-row--meal' : '',
    slot.break ? ' summit-timeline-row--break' : ''
  ].join('');
  const timeCell = slot.time
    ? `<span class="summit-timeline-time">${escapeHtml(slot.time)}</span>`
    : '<span class="summit-timeline-time summit-timeline-time--empty" aria-hidden="true">·</span>';
  const speakerHtml = slot.speaker
    ? `<span class="summit-timeline-speaker">${escapeHtml(slot.speaker)}</span>`
    : '';
  const talkHtml = slot.talkTitle
    ? `<span class="summit-timeline-talk">«${escapeHtml(slot.talkTitle)}»</span>`
    : '';
  const detailsHtml = slot.details
    ? `<span class="summit-timeline-details">${escapeHtml(slot.details)}</span>`
    : '';
  return `
    <div class="${rowClass}">
      ${timeCell}
      <div class="summit-timeline-body">
        <span class="summit-timeline-activity">${escapeHtml(slot.activity)}</span>
        ${talkHtml}
        ${speakerHtml}
        ${detailsHtml}
      </div>
    </div>`;
}

function buildSummitProgramHtml(summit) {
  return summit.sections.map(section => `
    <div class="summit-section">
      <p class="summit-section-label">${escapeHtml(section.label)}</p>
      <div class="summit-timeline">
        ${section.slots.map(buildSummitTimelineRow).join('')}
      </div>
    </div>`).join('');
}

function buildSummitReferenceHtml(ficha, companyId) {
  const s = AUTOMOTIVE_SUMMIT;
  return `
    <div class="summit-ref-card">
      <p class="summit-ref-title">${escapeHtml(s.title)}</p>
      <p class="summit-ref-meta">📅 ${escapeHtml(s.dateBadge)} · 📍 ${escapeHtml(s.venueBadge)}</p>
      <button type="button" class="summit-ref-tab-link">📍 Ver programa completo en pestaña Auto Electronics</button>
      ${buildSummitFichaBarHtml(ficha, companyId)}
    </div>`;
}

function buildAutoElectronicsSummitCardHtml() {
  const s = AUTOMOTIVE_SUMMIT;
  return `
    <article class="summit-card" id="auto-electronics-summit-card">
      <h4 class="summit-title">${escapeHtml(s.title)}</h4>
      <p class="summit-theme">${escapeHtml(s.theme)}</p>
      <div class="summit-badges">
        <span class="summit-badge">📅 ${escapeHtml(s.dateBadge)}</span>
        <span class="summit-badge">📍 ${escapeHtml(s.venueBadge)}</span>
      </div>
      <button type="button" class="summit-toggle" id="auto-electronics-summit-toggle" aria-expanded="false" aria-controls="auto-electronics-summit-panel">
        <span class="summit-toggle-label">Ver programa completo ▼</span>
        <span class="summit-toggle-icon" aria-hidden="true">▼</span>
      </button>
      <div class="summit-program" id="auto-electronics-summit-panel" hidden>
        ${buildSummitProgramHtml(s)}
      </div>
    </article>`;
}

function buildSummitCardHtml() {
  return buildAutoElectronicsSummitCardHtml();
}

function buildNavarraDayCardHtml() {
  const e = NAVARRA_DAY_EVENT;
  return `
    <article class="summit-card" id="navarra-day-card">
      <p class="summit-theme summit-theme--label">${escapeHtml(e.subtitle)}</p>
      <h4 class="summit-title">${escapeHtml(e.title)}</h4>
      <div class="summit-badges">
        <span class="summit-badge">📅 ${escapeHtml(e.dateBadge)}</span>
        <span class="summit-badge">📍 ${escapeHtml(e.venueBadge)}</span>
        <span class="summit-badge">🌐 ${escapeHtml(e.langBadge)}</span>
        <span class="summit-badge">👥 ${escapeHtml(e.capacityBadge)}</span>
      </div>
      <button type="button" class="summit-toggle" id="navarra-day-toggle-btn" aria-expanded="false" aria-controls="navarra-day-program-panel">
        <span class="summit-toggle-label">Ver programa completo</span>
        <span class="summit-toggle-icon" aria-hidden="true">▼</span>
      </button>
      <div class="summit-program" id="navarra-day-program-panel" hidden>
        ${buildSummitProgramHtml(e)}
      </div>
    </article>`;
}

function bindProgramCollapsible(cardId, btnId, panelId) {
  const card = document.getElementById(cardId);
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  if (!card || !btn || !panel || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    card.classList.toggle('summit-card--expanded', next);
    panel.hidden = !next;
    btn.querySelector('.summit-toggle-label').textContent = next
      ? 'Ocultar ▲'
      : 'Ver programa completo ▼';
  });
}

function bindSummitFichaButtons() {
  document.querySelectorAll('.icex-summit-ficha-btn[data-company-id]').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => openCompanyModal(btn.dataset.companyId));
  });
}

function bindSummitCollapsible() {
  bindProgramCollapsible('auto-electronics-summit-card', 'auto-electronics-summit-toggle', 'auto-electronics-summit-panel');
  bindProgramCollapsible('navarra-day-card', 'navarra-day-toggle-btn', 'navarra-day-program-panel');
}

function bindSummitRefTabLinks() {
  document.querySelectorAll('.summit-ref-tab-link').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (typeof window.switchView === 'function') window.switchView('eventos');
      if (typeof window.switchEventTab === 'function') window.switchEventTab('auto-electronics');
    });
  });
}

function openNewSummitFicha() {
  const ficha = createSummitFichaDraft();
  openCompanyModal(ficha.id, { draft: true, ficha });
}

function initSummitEvent() {
  const fab = document.getElementById('btn-summit-add');
  if (fab && fab.dataset.bound !== '1') {
    fab.dataset.bound = '1';
    fab.addEventListener('click', () => openNewSummitFicha());
  }
}

function paintAutoElectronics() {
  const panel = document.getElementById('event-panel-auto-electronics');
  if (!panel) return;

  const items = getSummitFichasFromCache();
  const officeStats = { b2b: 0, visita: 0, unset: 0 };
  const cardsHtml = items.map(item => {
    const ficha = item.ficha;
    mergeIcexOfficeStats(officeStats, tallyIcexMeetingStats(ficha));
    return buildCompanyCardHtml(ficha, item.seed.id, item.seed);
  }).join('');

  const statsHtml = `
    <div class="icex-office-stats">
      <span class="icex-stat icex-stat--b2b">🤝 ${officeStats.b2b} B2B</span>
      <span class="icex-stat icex-stat--visita">🏭 ${officeStats.visita} visitas</span>
      ${officeStats.unset > 0 ? `<span class="icex-stat icex-stat--unset">${officeStats.unset} sin asignar</span>` : ''}
    </div>
    <div class="alert-box alert-box--info">
      <span class="alert-icon">☁️</span>
      <p><strong>5 fotos por usuario</strong> · fichas en SharePoint (prefijo <strong>summit-</strong>) · marca <strong>B2B</strong> o <strong>Visita</strong> en cada tarjeta.</p>
    </div>`;

  panel.innerHTML = `
    <div class="event-hero event-hero--icex">
      <div class="hero-tag">Shenzhen</div>
      <h3 class="event-hero-title">Auto Electronics</h3>
      <p class="event-hero-desc">Summit 27 junio 2026 · reuniones B2B</p>
    </div>
    ${statsHtml}
    ${buildAutoElectronicsSummitCardHtml()}
    <h3 class="summit-companies-heading">Reuniones con empresas</h3>
    <div class="company-list summit-company-list">${cardsHtml}</div>
    <button type="button" class="summit-add-btn" id="btn-summit-add">+ Añadir empresa</button>`;

  bindSummitCollapsible();
  bindSummitRefTabLinks();
  bindIcexCompanyCards();
  bindMeetingTypePickers();
  bindSummitFichaButtons();
  initSummitEvent();
  renderMeetingsSummary();
}

function renderAutoElectronics() {
  paintAutoElectronics();
  setEventTabRefreshIndicator('auto-electronics', true);
  return loadAllRemoteFichas(false)
    .then(() => paintAutoElectronics())
    .catch(err => console.warn('Auto Electronics:', err))
    .finally(() => setEventTabRefreshIndicator('auto-electronics', false));
}

function buildIcexOfficeEmptyHtml() {
  return `
    <div class="icex-empty">
      <span class="icex-empty-icon" aria-hidden="true">🏗️</span>
      <p class="icex-empty-text">Pendiente de añadir empresas reales</p>
      <p class="icex-empty-sub">Las empresas se añadirán cuando se confirmen las reuniones</p>
    </div>`;
}

function paintIcexOffices() {
  ICEX_OFFICES.forEach(office => {
    const panel = document.getElementById('event-panel-' + office.id);
    if (!panel) return;

    const officeStats = { b2b: 0, visita: 0, unset: 0 };
    const hasCompanies = office.companies.length > 0;
    let listHtml;

    if (office.scheduleLayout && office.id === 'icex-canton') {
      const schedule = buildIcexCantonScheduleHtml(office);
      officeStats.b2b = schedule.officeStats.b2b;
      officeStats.visita = schedule.officeStats.visita;
      officeStats.unset = schedule.officeStats.unset;
      listHtml = hasCompanies
        ? `<div class="icex-canton-schedule">${schedule.daysHtml}</div>`
        : buildIcexOfficeEmptyHtml();
    } else {
      const cardsHtml = office.companies.map(company => {
        const ficha = getCachedFicha(company.id);
        mergeIcexOfficeStats(officeStats, tallyIcexMeetingStats(ficha));
        return buildCompanyCardHtml(ficha, company.id, company);
      }).join('');
      listHtml = hasCompanies
        ? `<div class="company-list icex-company-list">${cardsHtml}</div>`
        : buildIcexOfficeEmptyHtml();
    }

    const statsHtml = hasCompanies
      ? `<div class="icex-office-stats">
        <span class="icex-stat icex-stat--b2b">🤝 ${officeStats.b2b} B2B</span>
        <span class="icex-stat icex-stat--visita">🏭 ${officeStats.visita} visitas</span>
        ${officeStats.unset > 0 ? `<span class="icex-stat icex-stat--unset">${officeStats.unset} sin asignar</span>` : ''}
      </div>
      <div class="alert-box alert-box--info">
        <span class="alert-icon">☁️</span>
        <p><strong>5 fotos por usuario</strong> · fichas en SharePoint · marca <strong>B2B</strong> o <strong>Visita</strong> en cada tarjeta.</p>
      </div>`
      : '';

    panel.innerHTML = `
      <div class="event-hero event-hero--icex">
        <div class="hero-tag">${escapeHtml(office.heroTag)}</div>
        <h3 class="event-hero-title">${escapeHtml(office.heroTitle)}</h3>
        <p class="event-hero-desc">${escapeHtml(office.heroDesc)}</p>
      </div>
      ${statsHtml}
      <div class="timeline-city timeline-city--compact">
        <div class="city-marker ${office.cityClass}">${office.cityMarker}</div>
      </div>
      ${listHtml}`;
  });

  bindIcexCompanyCards();
  bindMeetingTypePickers();
  bindSummitCollapsible();
  bindSummitFichaButtons();
  bindSummitRefTabLinks();
  renderMeetingsSummary();
}

function renderIcexOffices() {
  paintIcexOffices();
  setIcexTabsRefreshIndicator(true);
  return loadAllRemoteFichas(true)
    .then(() => paintIcexOffices())
    .catch(err => console.warn('ICEX:', err))
    .finally(() => setIcexTabsRefreshIndicator(false));
}

function trimText(s) {
  return String(s == null ? '' : s).trim();
}

function truncateText(text, max) {
  const t = trimText(text);
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + '…';
}

let cardDelegationBound = false;
let meetingTypeDelegationBound = false;

function bindIcexCompanyCards() {
  if (cardDelegationBound) return;
  cardDelegationBound = true;

  const root = document.getElementById('app-main') || document;

  root.addEventListener('click', event => {
    const card = event.target.closest('.icex-company-card[data-company-id], .cisce-feria-card[data-company-id]');
    if (!card) return;
    if (event.target.closest('.meeting-type-picker')) return;
    openCompanyModal(card.dataset.companyId);
  });

  root.addEventListener('keydown', event => {
    const card = event.target.closest('.icex-company-card[data-company-id], .cisce-feria-card[data-company-id]');
    if (!card) return;
    if (event.target.closest('.meeting-type-picker')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCompanyModal(card.dataset.companyId);
    }
  });
}

function bindMeetingTypePickers() {
  if (meetingTypeDelegationBound) return;
  meetingTypeDelegationBound = true;

  const root = document.getElementById('app-main') || document;

  root.addEventListener('click', async event => {
    const btn = event.target.closest('.meeting-type-btn');
    if (!btn) return;
    const picker = btn.closest('.meeting-type-picker[data-company-id]');
    if (!picker) return;
    event.preventDefault();
    event.stopPropagation();

    const companyId = picker.dataset.companyId;
    const type = btn.dataset.type;
    const ficha = getCachedFicha(companyId);
    const current = normalizeMeetingType(ficha.meetingType);
    const next = current === type ? '' : type;
    try {
      await setCompanyMeetingType(companyId, next);
      syncMeetingTypePickerButtons(picker, next);
      if (activeCompanyId === companyId) {
        syncMeetingTypePickerButtons(
          document.getElementById('company-meeting-type-picker'),
          next
        );
        if (activeModalFicha) activeModalFicha.meetingType = next || null;
      }
    } catch (_) { /* mensaje en setCompanyMeetingType */ }
  });
}

function setModalHeaderMode(fichaOrFlag) {
  const ficha = fichaOrFlag && typeof fichaOrFlag === 'object' ? fichaOrFlag : null;
  const isEditable = ficha ? isEditableFicha(ficha) : !!fichaOrFlag;
  const precarga = ficha ? isCiscePrecargadaFicha(ficha) : false;
  const title = document.getElementById('company-modal-title');
  const subtitle = document.getElementById('company-modal-subtitle');
  const fields = document.getElementById('company-modal-manual-fields');
  const precargaHeader = document.getElementById('company-modal-precarga-header');
  const strategic = document.getElementById('company-modal-strategic');
  const temasSection = document.getElementById('company-modal-temas');
  const photoSection = document.querySelector('.photo-section');
  const deleteBtn = document.getElementById('company-btn-delete');
  const isSummit = ficha ? isSummitFicha(ficha) : isSummitFichaId(activeCompanyId);
  const showDelete = isEditable && !activeManualDraft && !isSummitSeedId(activeCompanyId || (ficha && ficha.id));

  if (title) title.hidden = isEditable || precarga;
  if (subtitle) subtitle.hidden = isEditable || precarga;
  if (fields) fields.hidden = !isEditable;
  if (precargaHeader) precargaHeader.hidden = !precarga;
  if (strategic) strategic.hidden = !precarga;
  const icexCantonMeeting = document.getElementById('company-modal-icex-canton');
  const companyId = (ficha && ficha.id) || activeCompanyId || '';
  if (icexCantonMeeting) {
    icexCantonMeeting.hidden = !isIcexCantonFichaId(companyId) || !getIcexCantonMeetingDetails(companyId);
  }
  if (temasSection) temasSection.hidden = !isSummit;
  if (photoSection) photoSection.hidden = false;
  if (deleteBtn) deleteBtn.hidden = !showDelete;
}

function fillCisceStrategicSection(ficha) {
  const encaje = document.getElementById('company-field-encaje');
  const queHace = document.getElementById('company-field-quehace');
  const zonaInput = document.getElementById('company-precarga-zona');
  const badges = document.getElementById('company-cisce-badges');
  const seed = getCisceCompanyMap().get(ficha.id);
  const zona = resolveCisceZona(ficha, seed);
  if (encaje) encaje.textContent = ficha.encaje || '';
  if (queHace) queHace.textContent = ficha.queHace || '';
  if (zonaInput) zonaInput.value = zona;
  if (badges) {
    badges.innerHTML = buildCisceCardBadgesHtml(ficha, seed, normalizeMeetingType(ficha.meetingType));
  }
}

function fillPrecargaHeader(ficha) {
  const nameEl = document.getElementById('company-precarga-name');
  const nameZhEl = document.getElementById('company-precarga-name-zh');
  const contactInput = document.getElementById('company-precarga-contact');
  const roleInput = document.getElementById('company-precarga-role');
  if (nameEl) {
    const zh = ficha.nameZh ? ` <span class="company-precarga-name-zh-inline">${escapeHtml(ficha.nameZh)}</span>` : '';
    nameEl.innerHTML = escapeHtml(ficha.name || '') + zh;
  }
  if (nameZhEl) nameZhEl.hidden = true;
  if (contactInput) contactInput.value = ficha.contactPerson || '';
  if (roleInput) roleInput.value = ficha.role || '';
}

function updateManualSaveButtonState() {
  const saveBtn = document.getElementById('company-btn-save');
  if (!saveBtn) return;
  if (!activeModalFicha || !isEditableFicha(activeModalFicha)) {
    saveBtn.disabled = false;
    return;
  }
  const nameInput = document.getElementById('company-manual-name');
  const name = nameInput ? trimText(nameInput.value) : trimText(activeModalFicha.name);
  saveBtn.disabled = !name || !isAppOnline();
  if (!isAppOnline()) saveBtn.title = sharePointOfflineMessage();
  else saveBtn.removeAttribute('title');
}

function refreshIcexCompanyCard(companyId) {
  if (isSummitFichaId(companyId) || isSummitFicha(getCachedFicha(companyId))) {
    renderAutoElectronics().catch(() => undefined);
    return;
  }
  if (isCisceFichaId(companyId) || isCisceFicha(getCachedFicha(companyId))) {
    renderCisceFeria().catch(() => undefined);
    return;
  }
  if (isManualFichaId(companyId) || isManualFicha(getCachedFicha(companyId))) {
    renderOtrasReuniones().catch(() => undefined);
    return;
  }

  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
  const ficha = getCachedFicha(companyId);
  const card = document.querySelector(`.icex-company-card[data-company-id="${companyId}"]`);
  if (!card) return;

  const photos = countPhotosInFicha(ficha);
  const mine = ficha.userEntries && ficha.userEntries[uid] ? ficha.userEntries[uid] : {};
  const hasNotes = !!(mine.description || mine.notes);
  const preview = mine.description
    ? truncateText(mine.description, 72)
    : 'Pulsa para abrir ficha en SharePoint';
  const photoLabel = photos.total > 0
    ? 'Krum:' + countUserPhotos(ficha.userEntries.krum || {})
      + ' · Óscar:' + countUserPhotos(ficha.userEntries.oscar || {})
    : '';

  const meetingType = normalizeMeetingType(ficha.meetingType);
  const badges = card.querySelector('.company-badges');
  if (badges) {
    badges.innerHTML = `
      ${meetingTypeBadgeHtml(meetingType)}
      ${photos.total > 0 ? `<span class="company-badge badge-photos">📷 ${photos.total}</span>` : ''}`;
  }
  const picker = card.querySelector('.meeting-type-picker');
  syncMeetingTypePickerButtons(picker, meetingType);
  const previewEl = card.querySelector('.company-card-preview');
  if (previewEl) {
    previewEl.textContent = preview;
    previewEl.classList.toggle('company-card-preview--empty', !hasNotes);
  }
  const metaEl = card.querySelector('.company-card-meta');
  if (metaEl) {
    if (photoLabel) {
      metaEl.textContent = '📷 ' + photoLabel;
      metaEl.hidden = false;
    } else {
      metaEl.hidden = true;
    }
  }
}

function setCompanyModalLoading(visible) {
  const el = document.getElementById('company-modal-loading');
  const body = document.getElementById('company-modal-form');
  if (el) el.hidden = !visible;
  if (body) body.hidden = visible;
}

function getFormStateFromModal() {
  if (!activeCompanyId || !activeModalFicha) return null;
  const uid = getCurrentUser();
  const desc = document.getElementById('company-field-desc');
  const contacts = document.getElementById('company-field-contacts');
  const notes = document.getElementById('company-field-notes');
  const modalPicker = document.getElementById('company-meeting-type-picker');
  const activeBtn = modalPicker && modalPicker.querySelector('.meeting-type-btn.active');
  const meetingType = activeBtn
    ? normalizeMeetingType(activeBtn.dataset.type)
    : normalizeMeetingType(activeModalFicha.meetingType);

  const entry = activeModalFicha.userEntries[uid] || emptyUserEntry();
  if (desc) entry.description = desc.value;
  if (contacts) entry.contacts = contacts.value;
  if (notes) entry.notes = notes.value;
  activeModalFicha.userEntries[uid] = entry;

  const formState = {
    meta: metaFromFicha(activeModalFicha, activeCompanyId),
    meetingType: meetingType || '',
    myDescription: entry.description,
    myContacts: entry.contacts,
    myNotes: entry.notes,
    myPhotos: entry.photos.slice()
  };

  if (isEditableFicha(activeModalFicha)) {
    const nameInput = document.getElementById('company-manual-name');
    const nameZhInput = document.getElementById('company-manual-name-zh');
    const contactInput = document.getElementById('company-manual-contact');
    const roleInput = document.getElementById('company-manual-role');
    formState.name = nameInput ? trimText(nameInput.value) : '';
    formState.nameZh = nameZhInput ? trimText(nameZhInput.value) : '';
    formState.contactPerson = contactInput ? trimText(contactInput.value) : '';
    formState.role = roleInput ? trimText(roleInput.value) : '';
    formState.isManual = true;
    formState.icexOffice = isCisceFicha(activeModalFicha)
      ? 'CISCE Feria'
      : (isSummitFicha(activeModalFicha) ? 'Auto Electronics' : '');
    if (isSummitFicha(activeModalFicha)) {
      const temasInput = document.getElementById('company-field-temas');
      formState.temas = temasInput ? trimText(temasInput.value) : '';
    }
    formState.meta = {
      companyId: activeCompanyId,
      name: formState.name,
      nameZh: formState.nameZh,
      contactPerson: formState.contactPerson,
      role: formState.role,
      temas: formState.temas || '',
      icexOffice: formState.icexOffice,
      isManual: true,
      cisceSection: getCisceFichaSection(activeCompanyId)
    };
  } else if (isCiscePrecargadaFicha(activeModalFicha)) {
    const contactInput = document.getElementById('company-precarga-contact');
    const roleInput = document.getElementById('company-precarga-role');
    const zonaInput = document.getElementById('company-precarga-zona');
    formState.contactPerson = contactInput ? trimText(contactInput.value) : '';
    formState.role = roleInput ? trimText(roleInput.value) : '';
    formState.zona = zonaInput ? trimText(zonaInput.value) : '';
  }

  return formState;
}

function fillCompanyModalFromFicha(ficha) {
  const uid = getCurrentUser();
  const otherId = otherUserId(uid);
  const mine = ficha.userEntries[uid] || emptyUserEntry();
  const other = ficha.userEntries[otherId] || emptyUserEntry();
  const otherName = userIdToDisplayName(otherId);
  const editable = isEditableFicha(ficha);
  const precarga = isCiscePrecargadaFicha(ficha);

  setModalHeaderMode(ficha);

  const nameInput = document.getElementById('company-manual-name');
  const nameZhInput = document.getElementById('company-manual-name-zh');
  const contactInput = document.getElementById('company-manual-contact');
  const roleInput = document.getElementById('company-manual-role');
  if (editable) {
    if (nameInput) nameInput.value = ficha.name || '';
    if (nameZhInput) nameZhInput.value = ficha.nameZh || '';
    if (contactInput) contactInput.value = ficha.contactPerson || '';
    if (roleInput) roleInput.value = ficha.role || '';
  }
  if (precarga) {
    fillPrecargaHeader(ficha);
    fillCisceStrategicSection(ficha);
  }
  fillIcexCantonMeetingSection(activeCompanyId || (ficha && ficha.id));

  const temasInput = document.getElementById('company-field-temas');
  if (temasInput) temasInput.value = ficha.temas || '';

  const desc = document.getElementById('company-field-desc');
  const contacts = document.getElementById('company-field-contacts');
  const notes = document.getElementById('company-field-notes');
  const otherDesc = document.getElementById('company-field-other-desc');
  const otherContacts = document.getElementById('company-field-other-contacts');
  const otherNotes = document.getElementById('company-field-other-notes');
  const otherTitle = document.getElementById('company-other-section-title');

  if (desc) desc.value = mine.description || '';
  let contactsVal = mine.contacts || '';
  if (!trimText(contactsVal) && activeCompanyId && !editable && !precarga) {
    contactsVal = icexSeedContactsText(ICEX_COMPANY_MAP.get(activeCompanyId));
  }
  if (contacts) contacts.value = contactsVal;
  if (notes) notes.value = mine.notes || '';
  if (otherDesc) otherDesc.value = other.description || '';
  let otherContactsVal = other.contacts || '';
  if (!trimText(otherContactsVal) && activeCompanyId && !editable && !precarga) {
    otherContactsVal = icexSeedContactsText(ICEX_COMPANY_MAP.get(activeCompanyId));
  }
  if (otherContacts) otherContacts.value = otherContactsVal;
  if (otherNotes) otherNotes.value = other.notes || '';
  if (otherTitle) otherTitle.textContent = 'Notas de ' + otherName;

  syncMeetingTypePickerButtons(
    document.getElementById('company-meeting-type-picker'),
    normalizeMeetingType(ficha.meetingType)
  );
  renderCompanyPhotoGrid(ficha);
  updateManualSaveButtonState();
  captureModalFormSnapshot();
  renderFindreamsRespuestasSection();
}

function getFindreamsRespuestas() {
  if (typeof FINDREAMS_RESPUESTAS !== 'undefined' && Array.isArray(FINDREAMS_RESPUESTAS)) {
    return FINDREAMS_RESPUESTAS;
  }
  return [];
}

function isFindreamsFichaId(companyId) {
  return companyId === ICEX_CANTON_FINDREAMS_ID;
}

function findreamsEscenarioBadgeLabel(escenario) {
  const e = String(escenario || '').toLowerCase();
  const hasReman = e.indexOf('remanufactura') !== -1 || e.indexOf('reman') !== -1;
  const hasMaquila = e.indexOf('maquila') !== -1;
  if (e.indexOf('ambos') !== -1 || (hasReman && hasMaquila)) return 'Ambos';
  if (hasMaquila) return 'Maquila';
  if (hasReman) return 'Remanufactura';
  return trimText(escenario) || '—';
}

function findreamsEscenarioBadgeClass(label) {
  if (label === 'Maquila') return 'findreams-pa-badge--maquila';
  if (label === 'Ambos') return 'findreams-pa-badge--ambos';
  return 'findreams-pa-badge--reman';
}

function buildFindreamsPaLangHtml(flag, text) {
  if (!trimText(text)) return '';
  return `
    <div class="findreams-pa-lang">
      <span class="findreams-pa-flag" aria-hidden="true">${flag}</span>
      <p class="findreams-pa-text">${escapeHtml(text)}</p>
    </div>`;
}

function buildFindreamsPaItemHtml(item) {
  const badgeLabel = findreamsEscenarioBadgeLabel(item.escenario);
  const badgeClass = findreamsEscenarioBadgeClass(badgeLabel);
  const panelId = 'findreams-pa-panel-' + String(item.id || '').replace(/[^a-z0-9-]/gi, '');
  const internoHtml = trimText(item.interno)
    ? `<div class="findreams-pa-interno">
        <span class="findreams-pa-interno-label">⚠️ INTERNO</span>
        <p class="findreams-pa-interno-text">${escapeHtml(item.interno)}</p>
      </div>`
    : '';

  return `
    <article class="findreams-pa-item">
      <button type="button" class="findreams-pa-toggle" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span class="findreams-pa-head">
          <span class="findreams-pa-title">[${escapeHtml(item.id)}] ${escapeHtml(item.titulo)}</span>
          <span class="findreams-pa-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span>
        </span>
        <span class="findreams-pa-icon" aria-hidden="true">▼</span>
      </button>
      <div class="findreams-pa-body" id="${escapeHtml(panelId)}" hidden>
        ${buildFindreamsPaLangHtml('🇪🇸', item.es)}
        ${buildFindreamsPaLangHtml('🇨🇳', item.zh)}
        ${buildFindreamsPaLangHtml('🇬🇧', item.en)}
        ${internoHtml}
      </div>
    </article>`;
}

function bindFindreamsPaAccordions(listEl) {
  if (!listEl) return;
  listEl.querySelectorAll('.findreams-pa-toggle').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      btn.classList.toggle('findreams-pa-toggle--expanded', next);
      if (panel) panel.hidden = !next;
    });
  });
}

function resetFindreamsRespuestasSection() {
  const section = document.getElementById('company-modal-findreams-respuestas');
  const toggle = document.getElementById('findreams-respuestas-toggle');
  const panel = document.getElementById('findreams-respuestas-panel');
  const list = document.getElementById('findreams-respuestas-list');
  if (section) section.hidden = true;
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('findreams-respuestas-toggle--expanded');
  }
  if (panel) panel.hidden = true;
  if (list) list.innerHTML = '';
}

function renderFindreamsRespuestasSection() {
  const section = document.getElementById('company-modal-findreams-respuestas');
  const list = document.getElementById('findreams-respuestas-list');
  const toggle = document.getElementById('findreams-respuestas-toggle');
  const panel = document.getElementById('findreams-respuestas-panel');
  if (!section || !list) return;

  const show = isFindreamsFichaId(activeCompanyId);
  section.hidden = !show;
  if (!show) {
    if (list) list.innerHTML = '';
    return;
  }

  const items = getFindreamsRespuestas();
  const count = items.length;
  const labelEl = toggle && toggle.querySelector('.findreams-respuestas-toggle-label');
  if (labelEl) labelEl.textContent = '📋 Respuestas técnicas (' + count + ') ▼';
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('findreams-respuestas-toggle--expanded');
  }
  if (panel) panel.hidden = true;

  list.innerHTML = items.map(buildFindreamsPaItemHtml).join('');
  bindFindreamsPaAccordions(list);
}

function initFindreamsRespuestasControls() {
  const toggle = document.getElementById('findreams-respuestas-toggle');
  const panel = document.getElementById('findreams-respuestas-panel');
  if (!toggle || !panel || toggle.dataset.bound === '1') return;
  toggle.dataset.bound = '1';
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    toggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    toggle.classList.toggle('findreams-respuestas-toggle--expanded', next);
    panel.hidden = !next;
    const labelEl = toggle.querySelector('.findreams-respuestas-toggle-label');
    if (labelEl) {
      const count = getFindreamsRespuestas().length;
      labelEl.textContent = next
        ? '📋 Respuestas técnicas (' + count + ') ▲'
        : '📋 Respuestas técnicas (' + count + ') ▼';
    }
  });
}

function renderCompanyPhotoGrid(ficha) {
  const grid = document.getElementById('company-photo-grid');
  const counter = document.getElementById('company-photo-counter');
  if (!grid || !ficha) return;

  const uid = getCurrentUser();
  const otherId = otherUserId(uid);
  const mine = (ficha.userEntries[uid] && ficha.userEntries[uid].photos) || [];
  const other = (ficha.userEntries[otherId] && ficha.userEntries[otherId].photos) || [];
  const mineFilled = mine.filter(p => p && p.dataBase64).length;

  if (counter) counter.textContent = mineFilled + ' / ' + PHOTOS_PER_USER + ' (tuyas)';

  let html = '';
  for (let i = 0; i < PHOTOS_PER_USER; i++) {
    const photo = mine[i];
    if (photo && photo.dataBase64) {
      html += `
        <div class="photo-slot photo-slot--filled" data-owner="${escapeHtml(uid)}">
          <img src="${photoDataUrl(photo)}" alt="Mi foto ${i + 1}" class="photo-thumb" loading="lazy" />
          <span class="photo-owner">${escapeHtml(userIdToDisplayName(uid))}</span>
          <button type="button" class="photo-remove" data-mine-index="${i}" aria-label="Eliminar foto ${i + 1}">✕</button>
        </div>`;
    } else {
      html += `
        <button type="button" class="photo-slot photo-slot--add" data-mine-index="${i}" aria-label="Añadir foto ${i + 1}">
          <span class="photo-add-icon">+</span>
          <span class="photo-add-label">Foto ${i + 1}</span>
        </button>`;
    }
  }

  other.forEach((photo, i) => {
    if (!photo || !photo.dataBase64) return;
    html += `
      <div class="photo-slot photo-slot--filled photo-slot--readonly" data-owner="${escapeHtml(otherId)}">
        <img src="${photoDataUrl(photo)}" alt="Foto ${otherId} ${i + 1}" class="photo-thumb" loading="lazy" />
        <span class="photo-owner">${escapeHtml(userIdToDisplayName(otherId))}</span>
      </div>`;
  });

  grid.innerHTML = html;

  grid.querySelectorAll('.photo-slot--add').forEach(btn => {
    btn.addEventListener('click', () => {
      const uidNow = getCurrentUser();
      const entry = activeModalFicha.userEntries[uidNow] || emptyUserEntry();
      const filled = (entry.photos || []).filter(p => p && p.dataBase64).length;
      if (filled >= PHOTOS_PER_USER) {
        setCompanySaveStatus('Máximo ' + PHOTOS_PER_USER + ' fotos por usuario', true);
        return;
      }
      activePhotoSlot = parseInt(btn.dataset.mineIndex, 10);
      const input = document.getElementById('company-photo-input');
      if (input) {
        input.value = '';
        input.click();
      }
    });
  });

  grid.querySelectorAll('.photo-remove').forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopPropagation();
      const idx = parseInt(btn.dataset.mineIndex, 10);
      const uidNow = getCurrentUser();
      const entry = activeModalFicha.userEntries[uidNow];
      if (!entry || !entry.photos[idx]) return;
      entry.photos.splice(idx, 1);
      renderCompanyPhotoGrid(activeModalFicha);
    });
  });
}

async function saveCompanyModal(options) {
  options = options || {};
  if (!activeCompanyId || !activeModalFicha) return false;
  const saveBtn = document.getElementById('company-btn-save');
  const formState = getFormStateFromModal();

  if (!isAppOnline()) {
    setCompanySaveStatus(sharePointOfflineMessage(), true);
    return false;
  }

  if (isEditableFicha(activeModalFicha) && !trimText(formState.name)) {
    setCompanySaveStatus('El nombre de la empresa es obligatorio', true);
    return false;
  }

  if (saveBtn) saveBtn.disabled = true;
  setCompanySaveStatus('Guardando…');

  try {
    let merged;
    if (isCiscePrecargadaFicha(activeModalFicha)) {
      const remote = await saveCisceFichaAtomic(activeCompanyId, formState);
      const seed = getCisceCompanyMap().get(activeCompanyId);
      merged = buildCisceFichaView(remote, seed);
    } else {
      merged = await saveFichaAtomic(activeCompanyId, formState);
    }
    activeModalFicha = merged;
    activeManualDraft = false;
    setCachedFicha(activeCompanyId, merged);
    modalFormSnapshot = null;
    setCompanySaveStatus('Guardado');
    refreshAfterFichaChange(activeCompanyId);
    renderMeetingsSummary();
    setModalHeaderMode(merged);
    captureModalFormSnapshot();
    if (options.closeOnSuccess) {
      closeCompanyModal();
    } else {
      setTimeout(() => closeCompanyModal(), 1000);
    }
    return true;
  } catch (err) {
    console.warn(err);
    setCompanySaveStatus(connectionErrorMessage(), true);
    updateManualSaveButtonState();
    return false;
  } finally {
    if (saveBtn && !isEditableFicha(activeModalFicha)) saveBtn.disabled = false;
    else updateManualSaveButtonState();
  }
}

async function openCompanyModal(companyId, options) {
  options = options || {};
  const icexSeed = ICEX_COMPANY_MAP.get(companyId);
  const cisceSeed = getCisceCompanyMap().get(companyId);
  const isDraft = !!options.draft;
  const isPrecarga = isCiscePrecargadaId(companyId);
  const isSummit = isSummitFichaId(companyId);
  const isEditable = isDraft
    || (isEditableFichaId(companyId) && !isPrecarga)
    || (options.ficha && isEditableFicha(options.ficha));

  if (!icexSeed && !isEditable && !isPrecarga && !isSummit) return;

  const modal = document.getElementById('company-modal');
  if (!modal) return;

  activeCompanyId = companyId;
  activeModalFicha = null;
  activePhotoSlot = null;
  activeManualDraft = isDraft;

  const title = document.getElementById('company-modal-title');
  const subtitle = document.getElementById('company-modal-subtitle');

  setModalHeaderMode(isDraft && options.ficha ? options.ficha : (isPrecarga ? { isCiscePrecargada: true } : isEditable));

  if (!isEditable && !isPrecarga && icexSeed) {
    const details = getIcexCantonMeetingDetails(companyId);
    if (title) title.textContent = icexSeed.name;
    if (subtitle) {
      const parts = [];
      if (icexSeed.nameZh) parts.push(icexSeed.nameZh);
      if (details && details.contactName) parts.push(details.contactName);
      else if (icexSeed.contactPerson) parts.push(icexSeed.contactPerson);
      subtitle.textContent = parts.join(' · ');
    }
  }

  setCompanySaveStatus('');
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('company-modal-open');

  if (!companyModalBound) initCompanyModalControls();

  if (isDraft && options.ficha) {
    activeModalFicha = options.ficha;
    setCompanyModalLoading(false);
    fillCompanyModalFromFicha(activeModalFicha);
    return;
  }

  setCompanyModalLoading(true);

  try {
    const raw = await getRemoteFicha(companyId);
    if (isPrecarga && cisceSeed) {
      activeModalFicha = buildCisceFichaView(raw, cisceSeed);
    } else {
      activeModalFicha = normalizeRemoteFicha(raw, companyId, metaFromFicha(raw, companyId));
      applyIcexSeedContacts(activeModalFicha, companyId);
    }
    setCachedFicha(companyId, activeModalFicha);
    fillCompanyModalFromFicha(activeModalFicha);
  } catch (err) {
    console.warn(err);
    if (isPrecarga && cisceSeed) {
      activeModalFicha = buildCisceFichaView(null, cisceSeed);
    } else {
      activeModalFicha = normalizeRemoteFicha(null, companyId, metaFromFicha(null, companyId));
      applyIcexSeedContacts(activeModalFicha, companyId);
    }
    fillCompanyModalFromFicha(activeModalFicha);
    setCompanySaveStatus(connectionErrorMessage(), true);
  } finally {
    setCompanyModalLoading(false);
  }
}

async function deleteActiveManualFicha() {
  if (!activeCompanyId || !activeModalFicha || !isEditableFicha(activeModalFicha)) return;

  if (!isAppOnline()) {
    setCompanySaveStatus(sharePointOfflineMessage(), true);
    return;
  }

  const ok = window.confirm(
    '¿Eliminar esta ficha?\n\nEsta acción no se puede deshacer.'
  );
  if (!ok) return;

  const id = activeCompanyId;
  const wasCisce = isCisceFicha(activeModalFicha);
  const wasSummit = isSummitFicha(activeModalFicha);
  try {
    await deleteRemoteFicha(id);
    remoteFichaMap.delete(id);
    closeCompanyModal();
    if (wasCisce) {
      await renderCisceFeria();
    } else if (wasSummit) {
      await renderAutoElectronics();
    } else {
      await renderOtrasReuniones();
    }
  } catch (err) {
    console.warn(err);
    setCompanySaveStatus('No se ha podido eliminar. Reintenta cuando tengas conexión.', true);
  }
}

function closeCompanyModal() {
  const modal = document.getElementById('company-modal');
  if (!modal) return;

  hideCompanyUnsavedModal();
  activeManualDraft = false;
  modalFormSnapshot = null;
  activeCompanyId = null;
  activePhotoSlot = null;
  activeModalFicha = null;
  resetFindreamsRespuestasSection();
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('company-modal-open');
  setCompanyModalLoading(false);
  setModalHeaderMode(false);
}

function initCompanyModalControls() {
  if (companyModalBound) return;
  companyModalBound = true;

  const closeBtn = document.getElementById('company-modal-close');
  const backdrop = document.getElementById('company-modal-backdrop');
  const photoInput = document.getElementById('company-photo-input');
  const saveBtn = document.getElementById('company-btn-save');

  if (closeBtn) closeBtn.addEventListener('click', () => requestCloseCompanyModal());
  if (backdrop) backdrop.addEventListener('click', () => requestCloseCompanyModal());
  if (saveBtn) saveBtn.addEventListener('click', () => saveCompanyModal());

  const deleteBtn = document.getElementById('company-btn-delete');
  if (deleteBtn) deleteBtn.addEventListener('click', () => deleteActiveManualFicha());

  ['company-manual-name', 'company-manual-name-zh', 'company-manual-contact', 'company-manual-role'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateManualSaveButtonState);
  });

  const modalPicker = document.getElementById('company-meeting-type-picker');
  if (modalPicker) {
    modalPicker.querySelectorAll('.meeting-type-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();
        if (!activeCompanyId) return;
        const type = btn.dataset.type;
        const current = normalizeMeetingType(
          activeModalFicha ? activeModalFicha.meetingType : ''
        );
        const next = current === type ? '' : type;
        try {
          await setCompanyMeetingType(activeCompanyId, next);
          syncMeetingTypePickerButtons(modalPicker, next);
          document.querySelectorAll(`.meeting-type-picker[data-company-id="${activeCompanyId}"]`)
            .forEach(p => syncMeetingTypePickerButtons(p, next));
          if (activeModalFicha) activeModalFicha.meetingType = next || null;
          refreshAfterFichaChange(activeCompanyId);
        } catch (_) { /* error mostrado */ }
      });
    });
  }

  if (photoInput) {
    photoInput.addEventListener('change', async () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file || activeCompanyId == null || !activeModalFicha) return;

      const uidNow = getCurrentUser();
      const entry = activeModalFicha.userEntries[uidNow] || emptyUserEntry();
      if (!Array.isArray(entry.photos)) entry.photos = [];
      const filled = entry.photos.filter(p => p && p.dataBase64).length;
      if (filled >= PHOTOS_PER_USER) {
        setCompanySaveStatus('Máximo ' + PHOTOS_PER_USER + ' fotos por usuario', true);
        activePhotoSlot = null;
        photoInput.value = '';
        return;
      }

      setCompanySaveStatus('Procesando foto…');
      try {
        const blob = await compressImageFile(file);
        const dataBase64 = await blobToBase64(blob);
        const photo = {
          dataBase64,
          mime: 'image/jpeg',
          name: file.name || 'foto.jpg',
          addedAt: Date.now()
        };
        if (activePhotoSlot != null && activePhotoSlot < PHOTOS_PER_USER) {
          entry.photos[activePhotoSlot] = photo;
        } else {
          entry.photos.push(photo);
        }
        activeModalFicha.userEntries[uidNow] = entry;
        renderCompanyPhotoGrid(activeModalFicha);
        setCompanySaveStatus('Foto añadida (pulsa Guardar para subir)');
      } catch (err) {
        console.warn(err);
        setCompanySaveStatus('No se pudo procesar la foto', true);
      }
      activePhotoSlot = null;
      photoInput.value = '';
    });
  }

  document.addEventListener('keydown', event => {
    const unsavedModal = document.getElementById('company-unsaved-modal');
    if (unsavedModal && !unsavedModal.hidden && event.key === 'Escape') {
      hideCompanyUnsavedModal();
      return;
    }
    if (event.key === 'Escape' && activeCompanyId) requestCloseCompanyModal();
  });

  initFindreamsRespuestasControls();
}

/* ──────────────────────────────────────────────
   DEV — migración IndexedDB → SharePoint
────────────────────────────────────────────── */
let devPanelTapCount = 0;

function initDevPanel() {
  const chip = document.getElementById('graph-init-chip');
  const panel = document.getElementById('dev-panel');
  const migrateBtn = document.getElementById('btn-migrate-local');
  const statusEl = document.getElementById('dev-migrate-status');

  if (chip) {
    chip.addEventListener('click', () => {
      devPanelTapCount += 1;
      if (devPanelTapCount >= 5 && panel) {
        panel.hidden = false;
        devPanelTapCount = 0;
      }
    });
  }

  if (!migrateBtn) return;

  migrateBtn.addEventListener('click', async () => {
    if (!isAppOnline()) {
      if (statusEl) {
        statusEl.textContent = sharePointOfflineMessage();
      }
      return;
    }

    migrateBtn.disabled = true;
    if (statusEl) statusEl.textContent = 'Leyendo fichas locales…';

    try {
      const records = await getAllRecordsFromDatabase();
      if (!records.length) {
        if (statusEl) statusEl.textContent = 'No hay fichas en IndexedDB en este dispositivo.';
        return;
      }

      await migrateAllLocalFichasToSharePoint(
        () => Promise.resolve(records),
        companyId => companyMetaFromSeed(companyId),
        blobToBase64,
        (done, total, id) => {
          if (statusEl) statusEl.textContent = 'Migrando ' + done + ' de ' + total + '… (' + id + ')';
        }
      );

      remoteFichaMapLoaded = false;
      await loadAllRemoteFichas(true);
      await renderIcexOffices();
      if (statusEl) statusEl.textContent = 'Migración completada: ' + records.length + ' fichas subidas.';
    } catch (err) {
      console.error(err);
      if (statusEl) statusEl.textContent = 'Error: ' + (err.message || String(err));
    } finally {
      migrateBtn.disabled = false;
    }
  });
}


/* ──────────────────────────────────────────────
   RENDER — Resumen B2B + Visitas
────────────────────────────────────────────── */
async function renderMeetingsSummary() {
  const root = document.getElementById('meetings-summary-root');
  if (!root) return;

  const entries = await loadAllIcexRecords();
  const stats = aggregateMeetings(entries);

  const officeBlocks = stats.byOffice.map(block => {
    const lines = block.items.length
      ? block.items.map(({ company, type }) => `
          <button type="button" class="summary-meeting-row" data-open-company="${escapeHtml(company.id)}">
            <span class="summary-meeting-type summary-meeting-type--${type}">${type === 'b2b' ? '🤝' : '🏭'}</span>
            <span class="summary-meeting-name">${escapeHtml(company.name)}</span>
          </button>`).join('')
      : '<p class="summary-empty-office">Ninguna reunión asignada aún</p>';

    return `
      <section class="summary-office-block">
        <header class="summary-office-head">
          <h3 class="summary-office-title">${escapeHtml(block.office.heroTitle)}</h3>
          <div class="summary-office-counts">
            <span class="icex-stat icex-stat--b2b">🤝 ${block.b2b}</span>
            <span class="icex-stat icex-stat--visita">🏭 ${block.visita}</span>
          </div>
        </header>
        <div class="summary-meeting-list">${lines}</div>
      </section>`;
  }).join('');

  root.innerHTML = `
    <article class="summary-hero card-hero card-hero--blue">
      <p class="summary-hero-label">Reuniones confirmadas</p>
      <p class="summary-hero-value">${stats.total}</p>
      <p class="summary-hero-sub">B2B + visitas · de ${stats.totalCompanies} empresas ICEX</p>
    </article>
    <div class="summary-stats-grid">
      <div class="summary-stat-card summary-stat-card--b2b">
        <span class="summary-stat-icon">🤝</span>
        <span class="summary-stat-value">${stats.b2b}</span>
        <span class="summary-stat-label">B2B</span>
      </div>
      <div class="summary-stat-card summary-stat-card--visita">
        <span class="summary-stat-icon">🏭</span>
        <span class="summary-stat-value">${stats.visita}</span>
        <span class="summary-stat-label">Visitas</span>
      </div>
    </div>
    ${stats.unset > 0 ? `
      <div class="alert-box alert-box--warn">
        <span class="alert-icon">⚠️</span>
        <p><strong>${stats.unset}</strong> empresa${stats.unset === 1 ? '' : 's'} sin tipo asignado en Eventos → ICEX.</p>
      </div>` : ''}
    <p class="section-lead summary-list-lead">Detalle por oficina</p>
    ${officeBlocks}
    <div class="alert-box alert-box--info">
      <span class="alert-icon">ℹ️</span>
      <p>Marca <strong>B2B</strong> o <strong>Visita</strong> en cada tarjeta ICEX. Pulsa de nuevo el mismo botón para quitar la asignación.</p>
    </div>`;

  root.querySelectorAll('[data-open-company]').forEach(btn => {
    btn.addEventListener('click', () => {
      const companyId = btn.dataset.openCompany;
      if (!companyId) return;
      const seed = ICEX_COMPANY_MAP.get(companyId);
      if (seed && window.switchView && window.switchEventTab) {
        window.switchView('eventos');
        window.switchEventTab(seed.officeId);
      }
      setTimeout(() => openCompanyModal(companyId), 120);
    });
  });
}


/* ──────────────────────────────────────────────
   LOGIN — actualización forzada del service worker
────────────────────────────────────────────── */
const SW_CACHE_PREFIX = 'mision-china-';
let loginToastTimer = null;

function showLoginToast(message) {
  const toast = document.getElementById('login-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(loginToastTimer);
  loginToastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2000);
}

async function resolveSwCacheVersionLabel() {
  const el = document.getElementById('login-sw-version');
  if (!el) return;

  let label = '—';
  try {
    if (window.caches) {
      const keys = await caches.keys();
      const match = keys.filter(key => key.indexOf(SW_CACHE_PREFIX) === 0).sort().pop();
      if (match) {
        el.textContent = 'Caché SW ' + match.slice(SW_CACHE_PREFIX.length);
        return;
      }
    }
    const bust = window.__APP_BUILD__ || '42';
    const res = await fetch('sw.js?v=' + encodeURIComponent(bust), { cache: 'no-store' });
    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();
    const match = text.match(/CACHE_VERSION\s*=\s*['"]([^'"]+)['"]/);
    if (match) label = match[1];
  } catch (_) {}

  el.textContent = 'Caché SW ' + label;
}

async function forceLoginAppUpdate() {
  const btn = document.getElementById('login-update-app-btn');
  if (btn && btn.disabled) return;

  if (btn) {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    btn.textContent = 'Borrando caché...';
  } else {
    showLoginToast('Borrando caché...');
  }

  try {
    sessionStorage.setItem('mision-china-nuclear-update', window.__APP_BUILD__ || '');
  } catch (_) {}

  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }

    if (window.caches) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
      }
    }
  } catch (err) {
    console.warn('Nuclear update:', err);
  }

  window.location.reload(true);
}

function checkNuclearUpdateToast() {
  try {
    const flag = sessionStorage.getItem('mision-china-nuclear-update');
    if (!flag) return;
    sessionStorage.removeItem('mision-china-nuclear-update');
    const build = window.__APP_BUILD__ || flag;
    showLoginToast('App actualizada a v' + build + ' ✓');
  } catch (_) {}
}

function initLoginAppUpdate() {
  const btn = document.getElementById('login-update-app-btn');
  if (!btn || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => {
    forceLoginAppUpdate();
  });
  checkNuclearUpdateToast();
  resolveSwCacheVersionLabel();
}


/* ──────────────────────────────────────────────
   PWA — registro del service worker
────────────────────────────────────────────── */
function initPWA() {
  if (!('serviceWorker' in navigator)) return;
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;

  window.addEventListener('load', () => {
    const swUrl = 'sw.js?v=' + encodeURIComponent(window.__APP_BUILD__ || '38');
    navigator.serviceWorker.register(swUrl).catch(err => {
      console.warn('No se pudo registrar el Service Worker:', err);
    });
  });
}


/* ──────────────────────────────────────────────
   UTILITIES
────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ──────────────────────────────────────────────
   INIT — compatible con carga dinámica de app.js
────────────────────────────────────────────── */
function startApp() {
  initConnectionStatus();
  initCountdown();
  initNavAutoHide();
  initNavigation();
  initPresentaciones();
  initBrochureControls();
  initDevPanel();
  initOtrasReuniones();
  initCisceFeria();
  initSummitEvent();
  initCompanyUnsavedModal();
  if (typeof window.initResumenGenerator === 'function') {
    window.initResumenGenerator();
  }
  renderTripDailySummary();
  renderFlights();
  renderLogistics();
  renderArrivalCards();
  initTravelInsuranceLink();
  renderContacts();
  renderEventAgendas();
  renderIcexOffices().catch(err => console.warn('ICEX:', err));
  initPWA();
  initIcexFichasInSharePoint().catch(() => undefined);
}

window.startApp = startApp;

function bootApp() {
  document.body.classList.add('app-locked');
  document.body.classList.remove('app-authenticated');
  const login = document.getElementById('login-screen');
  if (login) {
    login.hidden = false;
    login.setAttribute('aria-hidden', 'false');
  }

  if (typeof window.initLoginScreen === 'function') {
    window.initLoginScreen();
  }
  initLoginAppUpdate();

  if (typeof window.initLoginScreen === 'function') {
    return;
  }

  const err = document.getElementById('login-error');
  if (err) {
    err.textContent = 'No se cargaron los scripts de la app. Actualiza la aplicación.';
    err.hidden = false;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}

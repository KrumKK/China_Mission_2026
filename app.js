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
   DATA — Agenda resumida (pestaña General)
────────────────────────────────────────────── */
const TRIP_AGENDA = [
  {
    id: 'cisce',
    title: 'Feria CISCE — Beijing',
    items: [
      { date: '22 junio', text: 'Agenda institucional y citas B2B' },
      {
        date: '23 junio',
        text: 'Encuentro «Día de Navarra» + firma MOU con provincia de Hainan'
      }
    ]
  },
  {
    id: 'shenzhen',
    title: 'Misión Shenzhen',
    days: [
      {
        date: '23 junio',
        text: 'Sesión de trabajo empresas con SPI, preparatoria de las sesiones y B2Bs'
      },
      {
        date: '24 junio',
        subtitle: 'Foro Navarra-Longhua',
        forumTitle: 'Innovación, industria y relaciones estratégicas en la Gran Bahía',
        timeline: [
          { time: '9:00', activity: 'Inauguración institucional (modera Longhua)' },
          { time: '9:30', activity: 'Panel 1 — Innovación (modera Navarra)' },
          { time: '10:30', activity: 'Panel 2 — Industria (modera Longhua)' },
          { time: '11:30', activity: 'Panel 3 — Relaciones Estratégicas (modera Navarra)' },
          { time: '12:00', activity: 'Palabras de clausura (modera Longhua)' },
          { time: '', activity: 'Comida Networking', meal: true },
          { time: '15:00', activity: 'B2B' }
        ]
      },
      {
        date: '25–26 junio',
        text: 'Visitas y reuniones a determinar'
      },
      {
        date: '27 junio',
        eventTitle: '15th International Automotive Electronics Industry Summit',
        venue: 'Hilton Hotel, Shenzhen'
      }
    ]
  }
];

/* ──────────────────────────────────────────────
   DATA — Delegaciones (Agenda · General)
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
      { org: 'GN.', person: 'Mila García', role: 'Representante comercial del Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Laura Tella', role: 'Comunicación, Servicio de Proyección Internacional' },
      { org: 'GN.', person: 'Estela Cerdán', role: 'Técnica del Servicio de Proyección Internacional' }
    ],
    companies: [
      { org: 'CEIN.', person: 'Uxue Itoiz', role: 'Directora Gerente' },
      { org: 'CEIN.', person: 'Víctor Fernández', role: 'Responsable de Comunicación' },
      { org: 'CENER.', person: 'Eduardo Aznar', role: 'Director de Desarrollo de Negocio' },
      { org: 'LIZARTE', highlight: true },
      { org: 'GURPEA SYSTEMS, S.L.U.' },
      { org: 'LUARTECHNOLOGY S.L' },
      { org: 'INNOUP FARMA' },
      { org: 'NAIR CENTER' },
      { org: 'NR ELECTRÓNICA' },
      { org: 'POLO IRIS NASERTIC' },
      { org: 'DAS-NANO TECH SL' },
      { org: 'ARANDOVO' },
      { org: 'HR MOTOR' }
    ]
  }
};

/* ──────────────────────────────────────────────
   DATA — Summit Automotive Electronics (Eventos · Shenzhen)
────────────────────────────────────────────── */
const AUTOMOTIVE_SUMMIT = {
  title: '15th International Automotive Electronics Industry Summit 2026',
  theme: 'AI Smart Driving Pioneers; Chip & Chain Co-Upgrades; Building a New-Quality Industrial Ecosystem for Automotive Electronics',
  dateBadge: '27 junio 2026',
  venueBadge: 'Hilton Hotel Shenzhen',
  venueFull: 'Hilton Hotel, Shenzhen International Convention and Exhibition Center',
  sections: [
    {
      label: 'Mañana',
      slots: [
        { time: '08:00-09:00', activity: 'Check-in' },
        { time: '09:00-09:30', activity: 'Opening Remarks' },
        { time: '09:30-09:50', activity: 'Guest Address' },
        {
          time: '09:50-10:00',
          activity: 'Keynote: Empowering with AI, Upholding Integrity and Innovation, and Co-building a Global Automotive Intelligent Ecosystem',
          speaker: 'Yang Hong, President of Shenzhen Automotive Electronics Industry Association and Chairman of Hangsheng Electronics Co., Ltd.'
        },
        {
          time: '10:00-10:15',
          activity: "Report on Development Trends of China's Intelligent and Connected Vehicles",
          speaker: 'Ye Shengli, Chief Engineer of China Association of Automobile Manufacturers'
        },
        {
          time: '10:15-10:30',
          activity: 'Sunlord Electronics Empowers Innovation and Upgrade of Intelligent Cockpit',
          speaker: 'Jin Zekun, Engineering & Marketing Manager'
        },
        { time: '10:30-10:40', activity: 'Tea Break ☕', break: true },
        {
          time: '10:40-11:00',
          activity: 'Build Core Competitiveness of In-Vehicle Communication and Cockpit via Indigenous Independent R&D',
          speaker: 'Fang Lijun, Industry Director, Strategy & Marketing Dept., Neoway Technology'
        },
        {
          time: '11:00-11:20',
          activity: 'When the Internet Meets AI – The Intelligent Revolution Driving the Automotive Industry',
          speaker: 'Geely Automobile'
        },
        {
          time: '11:20-11:40',
          activity: 'The Evolution of Automotive Storage',
          speaker: 'Longsys'
        },
        {
          time: '11:40-12:00',
          activity: 'Keynote: Leading the New Future of Autonomous Driving: AI and Storage Power a New Era for Intelligent Vehicles',
          speaker: 'Silicon Motion'
        }
      ]
    },
    {
      label: 'Almuerzo',
      slots: [
        { time: '12:00-14:00', activity: 'Self-service Lunch 🍽️', meal: true }
      ]
    },
    {
      label: 'Tarde',
      slots: [
        {
          time: '14:00-14:20',
          activity: 'Analysis of Intelligent Automotive Development Trends in the AI Era',
          speaker: 'Por confirmar'
        },
        {
          time: '14:20-14:40',
          activity: 'Opportunities and Challenges in the Flash Memory Chip Market in the Era of Intelligent Connected Vehicles',
          speaker: 'Mr. Chen Jian, Product Director, Hangzhou Hikvision Storage Technology Co., Ltd.'
        },
        {
          time: '14:40-15:00',
          activity: 'Por confirmar',
          speaker: 'China Academy of Information and Communications Technology'
        },
        { time: '15:00-15:20', activity: 'Tea Break ☕', break: true },
        {
          time: '15:20-15:40',
          activity: 'New Explorations in AI-Enabled Intelligent Technologies',
          speaker: 'Por confirmar'
        },
        {
          time: '15:40-16:00',
          activity: 'Explorations amid the Era of AI-enabled Intelligent Vehicles',
          speaker: 'Ethiopia'
        },
        {
          time: '16:00-16:20',
          activity: 'Development Opportunities of Automotive Industry in Malaysia & ASEAN',
          speaker: "Dato' Khoo Chong Boon"
        },
        { time: '16:20-18:00', activity: 'Automotive Electronics Science and Technology Award Ceremony 🏆' },
        { time: '18:30-20:30', activity: 'Networking Dinner 🍷', meal: true }
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
    vcardQr: 'vcard-qr-oscar.png',
    wechatQr: null,
    phone: '+34677424250',
    phoneDisplay: '+34 677424250',
    email: 'oscar@lizarte.com'
  }
];

/* ──────────────────────────────────────────────
   DATA — Agendas por evento (timeline)
────────────────────────────────────────────── */
const EVENT_AGENDA = {
  cisce: {
    heroTag: 'Pekín',
    heroTitle: 'Feria CISCE',
    heroDesc: 'China International Supply Chain Expo · Beijing',
    cityMarker: '北京',
    cityClass: 'city-beijing',
    programIntro: 'Programa preliminar del PIN. Se finalizará en las próximas semanas.',
    days: [
      {
        date: '2026-06-21',
        dateLabel: 'Dom 21 junio',
        badge: 'LLEGADA',
        badgeClass: 'day-badge--mision',
        note: 'Llegada 06:00 PEK · Hotel Beijing Liangmahe (check-in).',
        slots: []
      },
      {
        date: '2026-06-22',
        dateLabel: 'Lun 22 junio',
        badge: 'CISCE',
        badgeClass: 'day-badge--feria',
        note: 'Día 22 · Feria CISCE',
        slots: [
          { time: 'Jornada', label: 'Agenda institucional' },
          { time: 'Jornada', label: 'Citas B2B' }
        ]
      },
      {
        date: '2026-06-23',
        dateLabel: 'Mar 23 junio',
        badge: 'CISCE',
        badgeClass: 'day-badge--feria',
        note: 'Día 23 · Check-out hotel · vuelo a Shenzhen por la noche',
        slots: [
          { time: 'Jornada', label: "Encuentro «Día de Navarra» en el stand", priority: true },
          { time: 'Jornada', label: 'Agenda institucional' },
          { time: 'Jornada', label: 'Citas B2B' },
          { time: '20:15', label: 'Vuelo PEK → SZX', priority: true }
        ]
      }
    ],
    footerNote: 'Hotel Beijing Liangmahe (21–23 jun). Llegada internacional 21 jun 06:00.',
    footerAlert: 'Día de Navarra: aportar al PIN los contactos a invitar (nombre, cargo, email y teléfono).'
  },
  shenzhen: {
    heroTag: 'Shenzhen',
    heroTitle: 'Misión Shenzhen',
    heroDesc: 'Foro Navarra–Longhua · SPI · visitas empresariales',
    cityMarker: '深圳',
    cityClass: 'city-shenzhen',
    programIntro: 'Programa preliminar del PIN. Se finalizará en las próximas semanas.',
    days: [
      {
        date: '2026-06-23',
        dateLabel: 'Mar 23 junio',
        badge: 'LLEGADA',
        badgeClass: 'day-badge--mision',
        note: 'Llegada 23:35 SZX · Hotel Grand Madison LongHua Yujing',
        slots: [
          { time: 'Por confirmar', label: 'Sesión de trabajo empresas con SPI (preparación sesiones y B2B)', empty: true }
        ]
      },
      {
        date: '2026-06-24',
        dateLabel: 'Mié 24 junio',
        badge: 'FORO',
        badgeClass: 'day-badge--mision',
        note: 'Foro Navarra – Longhua (Shenzhen). Innovación, industria y relaciones estratégicas en el Greater Bay Area.',
        slots: [
          { time: '09:00', label: 'Apertura institucional', sub: 'Modera: Longhua' },
          { time: '09:30', label: 'Panel 1: Innovación', sub: 'Modera: Navarra' },
          { time: '10:30', label: 'Panel 2: Industria', sub: 'Modera: Longhua' },
          { time: '11:30', label: 'Panel 3: Relaciones estratégicas', sub: 'Modera: Navarra' },
          { time: '12:00', label: 'Clausura', sub: 'Modera: Longhua' },
          { time: 'Mediodía', label: 'Comida networking' },
          { time: '15:00', label: 'Reuniones B2B', priority: true }
        ]
      },
      {
        date: '2026-06-25',
        dateLabel: 'Jue 25 junio',
        badge: 'VISITAS',
        badgeClass: 'day-badge--mision',
        note: 'Visitas y reuniones a determinar (programa preliminar).',
        slots: [
          { time: 'Prioridad', label: 'BYD + proveedor EPS · visita planta', priority: true },
          { time: 'Por determinar', label: 'Visita AIERFY', empty: true },
          { time: 'Por determinar', label: 'Visita SINOMZ', empty: true },
          { time: 'Por determinar', label: 'Otras visitas y B2B', empty: true }
        ]
      },
      {
        date: '2026-06-26',
        dateLabel: 'Vie 26 junio',
        badge: 'VISITAS',
        badgeClass: 'day-badge--mision',
        note: 'Visitas y reuniones a determinar (programa preliminar).',
        slots: [
          { time: 'Por determinar', label: 'Visitas y reuniones pendientes de confirmar', empty: true }
        ]
      },
      {
        date: '2026-06-27',
        dateLabel: 'Sáb 27 junio',
        badge: 'SALIDA',
        badgeClass: 'day-badge--mision',
        note: 'Check-out hotel Grand Madison (reserva hasta 27 jun).',
        slots: []
      }
    ],
    footerNote: 'Hotel Grand Madison LongHua Yujing (23–27 jun). Vuelo PEK→SZX el 23 jun 20:15.'
  }
};

/* ──────────────────────────────────────────────
   DATA — Oficinas ICEX y empresas (fichas editables)
────────────────────────────────────────────── */
const PHOTOS_PER_USER = 5;

const ICEX_OFFICES = [
  {
    id: 'icex-canton',
    tabLabel: 'ICEX Cantón',
    heroTag: 'Shenzhen · Cantón',
    heroTitle: 'ICEX Cantón (Shenzhen)',
    heroDesc: '1 ficha',
    cityMarker: '粤',
    cityClass: 'city-shenzhen',
    companies: [
      {
        id: 'icex-canton-06',
        name: 'FinDreams BYD',
        nameZh: '弗迪 (比亚迪)',
        contactPerson: 'Peng HE',
        role: 'Gerente Depto. Chasis 6 / Director General de Producto',
        krumContactsSeed: [
          'Peng HE — Gerente del Departamento de Chasis 6 y Director General de Producto del Departamento de Chasis 6',
          'Xiaofei ZHANG — Gerente de línea de productos CEPS y experto en EPS',
          'Yuanfei WANG — Director del proyecto en el extranjero y su equipo'
        ].join('\n')
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

function connectionErrorMessage() {
  return 'Sin conexión, reintenta cuando tengas VPN';
}

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

async function initIcexFichasInSharePoint() {
  if (!CONFIG || !CONFIG.driveId) return;
  if (typeof listRemoteFichaIds !== 'function' || typeof putRemoteFicha !== 'function') return;
  if (typeof defaultRemoteFicha !== 'function') return;

  setFichasInitChip('Preparando fichas…', true);

  try {
    const existingIds = await listRemoteFichaIds();
    const existing = new Set(existingIds);
    const toCreate = [];
    ICEX_COMPANY_MAP.forEach((seed, companyId) => {
      if (!existing.has(companyId)) toCreate.push(companyId);
    });

    if (!toCreate.length) return;

    await Promise.allSettled(
      toCreate.map(async companyId => {
        const meta = companyMetaFromSeed(companyId);
        const ficha = defaultRemoteFicha(companyId, meta);
        applyIcexSeedContacts(ficha, companyId);
        await putRemoteFicha(companyId, ficha);
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
  const manual = isManualFicha(activeModalFicha);
  const snap = {
    desc: readModalField('company-field-desc'),
    contacts: readModalField('company-field-contacts'),
    notes: readModalField('company-field-notes'),
    photos: snapshotPhotosForCompare(entry.photos)
  };
  if (manual) {
    snap.manual = {
      name: readModalField('company-manual-name'),
      nameZh: readModalField('company-manual-name-zh'),
      contactPerson: readModalField('company-manual-contact'),
      role: readModalField('company-manual-role')
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

function isIcexCompanyId(companyId) {
  return ICEX_COMPANY_MAP.has(companyId);
}

function isManualFicha(ficha) {
  if (!ficha) return false;
  return ficha.isManual === true || isManualFichaId(ficha.id);
}

function metaFromFicha(ficha, companyId) {
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

function refreshAfterFichaChange(companyId) {
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
    const allIds = await listRemoteFichaIds();
    const manualIds = allIds.filter(id => isManualFichaId(id));
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
  } else if (isManualFichaId(companyId)) {
    ficha = normalizeRemoteFicha(null, companyId, metaFromFicha(null, companyId));
  } else {
    ficha = normalizeRemoteFicha(null, companyId, companyMetaFromSeed(companyId));
  }
  return applyIcexSeedContacts(ficha, companyId);
}

function getManualFichasFromCache() {
  const list = [];
  remoteFichaMap.forEach((ficha, id) => {
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
  if (!daysEl) return;

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = '¡Ya!';
      if (subEl) subEl.textContent = 'Salida Madrid · 20 jun 12:00';
      return;
    }
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    daysEl.textContent = String(days);
    if (subEl) {
      subEl.textContent = days === 1
        ? 'día hasta salida (20 jun, 12:00)'
        : 'días hasta salida (20 jun, 12:00)';
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
  oem: { folder: 'Presentaciones/oem-tier1' },
  reman: { folder: 'Presentaciones/reman' },
  exoesqueletos: { folder: 'Presentaciones/diversificacion/exoesqueletos' },
  amr: { folder: 'Presentaciones/diversificacion/amr' },
  cobots: { folder: 'Presentaciones/diversificacion/cobots' }
};

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
    pauseCorporateVideo();
  }

  if (presentacionesScreen === 'video') {
    initCorporateVideoViewer();
  }

  if (DECK_PRESENTATIONS[presentacionesScreen]) {
    initSlideDeck(presentacionesScreen).catch(err => console.warn('Slide deck:', err));
  }
}

function resetPresentacionesToMenu() {
  showPresentacionesScreen('menu');
}

function initPresentaciones() {
  const root = document.getElementById('view-presentaciones');
  if (!root || root.dataset.bound === '1') return;
  root.dataset.bound = '1';

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
  goToDeckSlide(deckId, 0);
  console.log('[SlideDeck] carrusel activo:', deckId, slides.length, 'diapositivas');
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
let activeEventTab = 'cisce';

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
    const isTravel = !item.hotel;
    const hotelBlock = item.hotel
      ? `<div class="hotel-names">
          <span class="hotel-name-es">${escapeHtml(item.hotel.nameEs)}</span>
          <span class="hotel-name-zh">${escapeHtml(item.hotel.nameZh)}</span>
         </div>
         ${item.hotel.addressEs ? `<span class="hotel-address">${escapeHtml(item.hotel.addressEs)}</span>` : ''}
         ${item.hotel.addressZh ? `<span class="hotel-address-zh">${escapeHtml(item.hotel.addressZh)}</span>` : ''}
         ${item.hotel.phone ? `<span class="hotel-phone">📞 ${escapeHtml(item.hotel.phone)}</span>` : ''}`
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
          <span class="hotel-dates">${escapeHtml(item.dateRange)}</span>
        </header>
        ${isTravel ? '' : `<div class="hotel-card-body">${hotelBlock}${departure}</div>`}
        ${isTravel ? hotelBlock : ''}
        ${item.notes ? `<p class="hotel-notes">${escapeHtml(item.notes)}</p>` : ''}
      </article>`;
  }).join('');
}


/* ──────────────────────────────────────────────
   RENDER — Agenda (General)
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

function buildDelegationBlockHtml(blockId) {
  const delegation = TRIP_DELEGATIONS[blockId];
  if (!delegation) return '';

  const count = countDelegationEntries(delegation);
  const panelId = 'delegation-panel-' + blockId;

  return `
    <div class="agenda-delegation" data-delegation-id="${escapeHtml(blockId)}">
      <button type="button" class="agenda-delegation-toggle" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span class="agenda-delegation-toggle-label">Ver delegación (${count} personas) ▼</span>
      </button>
      <div class="agenda-delegation-panel" id="${escapeHtml(panelId)}" hidden>
        ${buildDelegationSectionHtml('Institucional', delegation.institutional)}
        ${buildDelegationSectionHtml('Empresas', delegation.companies)}
      </div>
    </div>`;
}

function wrapAgendaCardWithDelegation(cardHtml, blockId) {
  const delegationHtml = buildDelegationBlockHtml(blockId);
  if (!delegationHtml) return cardHtml;
  return `<div class="agenda-card-group">${cardHtml}${delegationHtml}</div>`;
}

function bindAgendaDelegations() {
  document.querySelectorAll('.agenda-delegation-toggle').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const wrap = btn.closest('.agenda-delegation');
      const panel = wrap ? wrap.querySelector('.agenda-delegation-panel') : null;
      const label = btn.querySelector('.agenda-delegation-toggle-label');
      if (!panel || !label) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      panel.hidden = !next;
      wrap.classList.toggle('agenda-delegation--expanded', next);

      const countMatch = label.textContent.match(/\((\d+)\s+personas\)/);
      const count = countMatch ? countMatch[1] : '';
      label.textContent = next
        ? 'Ocultar delegación ▲'
        : `Ver delegación (${count} personas) ▼`;
    });
  });
}

function buildAgendaCisceCard(block) {
  const rows = block.items.map(item => `
    <div class="agenda-day-row">
      <span class="agenda-day-date">${escapeHtml(item.date)}</span>
      <p class="agenda-day-text">${escapeHtml(item.text)}</p>
    </div>`).join('');

  return wrapAgendaCardWithDelegation(`
    <article class="agenda-card" data-id="${escapeHtml(block.id)}">
      <header class="agenda-card-header">${escapeHtml(block.title)}</header>
      <div class="agenda-card-body">${rows}</div>
    </article>`, block.id);
}

function buildAgendaTimelineRows(slots) {
  return slots.map(slot => {
    const timeCell = slot.time
      ? `<span class="agenda-timeline-time">${escapeHtml(slot.time)}</span>`
      : '<span class="agenda-timeline-time agenda-timeline-time--empty" aria-hidden="true">·</span>';
    const activityClass = slot.meal ? ' agenda-timeline-activity--meal' : '';
    return `
      <div class="agenda-timeline-row${slot.meal ? ' agenda-timeline-row--meal' : ''}">
        ${timeCell}
        <span class="agenda-timeline-activity${activityClass}">${escapeHtml(slot.activity)}</span>
      </div>`;
  }).join('');
}

function buildAgendaShenzhenCard(block) {
  const daysHtml = block.days.map(day => {
    if (day.eventTitle) {
      return `
        <div class="agenda-day-block">
          <p class="agenda-day-label">${escapeHtml(day.date)}</p>
          <p class="agenda-day-text agenda-day-text--event">${escapeHtml(day.eventTitle)}</p>
          ${day.venue ? `<p class="agenda-day-venue">📍 ${escapeHtml(day.venue)}</p>` : ''}
        </div>`;
    }
    if (day.timeline) {
      return `
        <div class="agenda-day-block">
          <p class="agenda-day-label">${escapeHtml(day.date)}${day.subtitle ? ' — ' + escapeHtml(day.subtitle) : ''}</p>
          ${day.forumTitle ? `<p class="agenda-forum-title">${escapeHtml(day.forumTitle)}</p>` : ''}
          <div class="agenda-timeline">${buildAgendaTimelineRows(day.timeline)}</div>
        </div>`;
    }
    return `
      <div class="agenda-day-block">
        <p class="agenda-day-label">${escapeHtml(day.date)}</p>
        <p class="agenda-day-text">${escapeHtml(day.text)}</p>
      </div>`;
  }).join('');

  return wrapAgendaCardWithDelegation(`
    <article class="agenda-card" data-id="${escapeHtml(block.id)}">
      <header class="agenda-card-header">${escapeHtml(block.title)}</header>
      <div class="agenda-card-body">${daysHtml}</div>
    </article>`, block.id);
}

function renderAgenda() {
  const root = document.getElementById('agenda-root');
  if (!root) return;
  root.innerHTML = TRIP_AGENDA.map(block => {
    if (block.items) return buildAgendaCisceCard(block);
    return buildAgendaShenzhenCard(block);
  }).join('');
  bindAgendaDelegations();
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
  const wechatBtn = person.wechatQr
    ? `<button type="button" class="btn-qr-wechat" data-qr-wechat="${escapeHtml(person.wechatQr)}" data-qr-title="WeChat — ${escapeHtml(person.name)}">Ver WeChat QR</button>`
    : '';

  return `
    <article class="qr-contact-card" data-qr-person="${escapeHtml(person.id)}">
      <header class="qr-contact-header">
        <h4 class="qr-contact-name">${escapeHtml(person.name)}</h4>
        <p class="qr-contact-role">${escapeHtml(person.role)}</p>
      </header>
      <div class="qr-contact-qr-wrap">
        <img
          class="qr-contact-img"
          src="${escapeHtml(vcardSrc)}"
          alt="QR vCard de ${escapeHtml(person.name)}"
          width="320"
          height="320"
          loading="lazy"
        />
        <button
          type="button"
          class="btn-qr-fullscreen"
          data-qr-fs="${escapeHtml(person.vcardQr)}"
          data-qr-title="vCard — ${escapeHtml(person.name)}"
          aria-label="Ver QR vCard a pantalla completa"
        >⛶ Pantalla completa</button>
      </div>
      ${wechatBtn}
      <div class="qr-contact-links">
        <a class="qr-contact-link" href="tel:${escapeHtml(person.phone)}">📞 ${escapeHtml(person.phoneDisplay)}</a>
        <a class="qr-contact-link" href="mailto:${escapeHtml(person.email)}">✉ ${escapeHtml(person.email)}</a>
      </div>
    </article>`;
}

function renderQrContactCards() {
  const root = document.getElementById('qr-cards-root');
  if (!root) return;
  root.innerHTML = getOrderedQrContactCards().map(buildQrContactCard).join('');
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
      return;
    }

    const wechatBtn = event.target.closest('[data-qr-wechat]');
    if (wechatBtn) {
      event.preventDefault();
      showQrFullscreenModal(wechatBtn.dataset.qrWechat, wechatBtn.dataset.qrTitle);
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
function renderEventAgendas() {
  Object.keys(EVENT_AGENDA).forEach(key => {
    const panel = document.getElementById('event-panel-' + key);
    const data = EVENT_AGENDA[key];
    if (!panel || !data) return;

    const daysHtml = data.days.map(day => {
      const slots = (day.slots || []).map(slot => {
        const classes = ['meeting-slot'];
        if (slot.empty) classes.push('meeting-slot--empty');
        if (slot.priority) classes.push('meeting-slot--priority');
        const sub = slot.sub
          ? `<span class="slot-sub">${escapeHtml(slot.sub)}</span>`
          : '';
        return `
          <div class="${classes.join(' ')}">
            <span class="slot-time">${escapeHtml(slot.time)}</span>
            <div class="slot-text">
              <span class="slot-label">${escapeHtml(slot.label)}</span>
              ${sub}
            </div>
          </div>`;
      }).join('');

      return `
        <div class="timeline-day" data-date="${day.date}">
          <div class="day-header">
            <span class="day-date">${escapeHtml(day.dateLabel)}</span>
            <span class="day-badge ${day.badgeClass || ''}">${escapeHtml(day.badge)}</span>
          </div>
          <div class="day-content">
            ${day.note ? `<p class="day-note">${escapeHtml(day.note)}</p>` : ''}
            ${slots}
          </div>
        </div>`;
    }).join('');

    panel.innerHTML = `
      <div class="event-hero">
        <div class="hero-tag">${escapeHtml(data.heroTag)}</div>
        <h3 class="event-hero-title">${escapeHtml(data.heroTitle)}</h3>
        <p class="event-hero-desc">${escapeHtml(data.heroDesc)}</p>
      </div>
      ${data.programIntro ? `<div class="alert-box alert-box--info"><span class="alert-icon">📋</span><p>${escapeHtml(data.programIntro)}</p></div>` : ''}
      ${key === 'shenzhen' ? buildSummitCardHtml() : ''}
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
}


/* ──────────────────────────────────────────────
   RENDER — Tarjetas empresa (ICEX + Otras)
────────────────────────────────────────────── */
function buildCompanyCardHtml(ficha, companyId, seedCompany) {
  const uid = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
  const meetingType = normalizeMeetingType(ficha.meetingType);
  const photos = countPhotosInFicha(ficha);
  const mine = ficha.userEntries && ficha.userEntries[uid] ? ficha.userEntries[uid] : {};
  const hasNotes = !!(mine.description || mine.notes);
  const displayName = trimText(ficha.name) || (seedCompany && seedCompany.name) || 'Sin nombre';
  const nameZh = ficha.nameZh || (seedCompany && seedCompany.nameZh) || '';
  const contactPerson = ficha.contactPerson || (seedCompany && seedCompany.contactPerson) || '';
  const role = ficha.role || (seedCompany && seedCompany.role) || '';
  const preview = mine.description
    ? truncateText(mine.description, 72)
    : 'Pulsa para abrir ficha en SharePoint';
  const photoLabel = photos.total > 0
    ? 'Krum:' + countUserPhotos(ficha.userEntries.krum || {})
      + ' · Óscar:' + countUserPhotos(ficha.userEntries.oscar || {})
    : '';
  const contactLine = [contactPerson, role].filter(Boolean).join(' · ');

  return `
    <article class="company-card icex-company-card" data-company-id="${escapeHtml(companyId)}" role="button" tabindex="0" aria-label="Abrir ficha de ${escapeHtml(displayName)}">
      <div class="company-card-header">
        <div>
          <span class="company-name">${escapeHtml(displayName)}</span>
          ${nameZh ? `<span class="company-name-zh">${escapeHtml(nameZh)}</span>` : ''}
        </div>
        <div class="company-badges">
          ${meetingTypeBadgeHtml(meetingType)}
          ${photos.total > 0 ? `<span class="company-badge badge-photos">📷 ${photos.total}</span>` : ''}
        </div>
      </div>
      ${buildMeetingTypePickerHtml(companyId, meetingType, 'meeting-type-picker--card')}
      ${contactLine ? `<p class="company-contact-person">👤 ${escapeHtml(contactLine)}</p>` : ''}
      <p class="company-card-preview ${hasNotes ? '' : 'company-card-preview--empty'}">${escapeHtml(preview)}</p>
      <p class="company-card-meta" ${photoLabel ? '' : 'hidden'}>📷 ${escapeHtml(photoLabel)}</p>
    </article>`;
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
  return `
    <div class="${rowClass}">
      ${timeCell}
      <div class="summit-timeline-body">
        <span class="summit-timeline-activity">${escapeHtml(slot.activity)}</span>
        ${speakerHtml}
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

function buildSummitCardHtml() {
  const s = AUTOMOTIVE_SUMMIT;
  return `
    <article class="summit-card" id="automotive-summit-card">
      <h4 class="summit-title">${escapeHtml(s.title)}</h4>
      <p class="summit-theme">${escapeHtml(s.theme)}</p>
      <div class="summit-badges">
        <span class="summit-badge">📅 ${escapeHtml(s.dateBadge)}</span>
        <span class="summit-badge">📍 ${escapeHtml(s.venueBadge)}</span>
      </div>
      <p class="summit-venue-full">${escapeHtml(s.venueFull)}</p>
      <button type="button" class="summit-toggle" id="summit-toggle-btn" aria-expanded="false" aria-controls="summit-program-panel">
        <span class="summit-toggle-label">Ver programa completo</span>
        <span class="summit-toggle-icon" aria-hidden="true">▼</span>
      </button>
      <div class="summit-program" id="summit-program-panel" hidden>
        ${buildSummitProgramHtml(s)}
      </div>
    </article>`;
}

function bindSummitCollapsible() {
  const card = document.getElementById('automotive-summit-card');
  const btn = document.getElementById('summit-toggle-btn');
  const panel = document.getElementById('summit-program-panel');
  if (!card || !btn || !panel || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    card.classList.toggle('summit-card--expanded', next);
    panel.hidden = !next;
    btn.querySelector('.summit-toggle-label').textContent = next
      ? 'Ocultar programa'
      : 'Ver programa completo';
  });
}

function buildIcexOfficeEmptyHtml() {
  return `
    <div class="icex-empty">
      <span class="icex-empty-icon" aria-hidden="true">🏗️</span>
      <p class="icex-empty-text">Pendiente de añadir empresas reales</p>
      <p class="icex-empty-sub">Las empresas se añadirán cuando se confirmen las reuniones</p>
    </div>`;
}

async function renderIcexOffices() {
  try {
    await loadAllRemoteFichas(true);
  } catch (err) {
    console.warn('Listado fichas:', err);
  }

  ICEX_OFFICES.forEach(office => {
    const panel = document.getElementById('event-panel-' + office.id);
    if (!panel) return;

    const officeStats = { b2b: 0, visita: 0, unset: 0 };
    const hasCompanies = office.companies.length > 0;
    const cardsHtml = office.companies.map(company => {
      const ficha = getCachedFicha(company.id);
      const meetingType = normalizeMeetingType(ficha.meetingType);
      if (meetingType === 'b2b') officeStats.b2b += 1;
      else if (meetingType === 'visita') officeStats.visita += 1;
      else officeStats.unset += 1;
      return buildCompanyCardHtml(ficha, company.id, company);
    }).join('');

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

    const listHtml = hasCompanies
      ? `<div class="company-list icex-company-list">${cardsHtml}</div>`
      : buildIcexOfficeEmptyHtml();

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
  renderMeetingsSummary();
}

function trimText(s) {
  return String(s == null ? '' : s).trim();
}

function truncateText(text, max) {
  const t = trimText(text);
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + '…';
}

function bindIcexCompanyCards() {
  document.querySelectorAll('.icex-company-card[data-company-id]').forEach(el => {
    const open = () => openCompanyModal(el.dataset.companyId);
    el.addEventListener('click', e => {
      if (e.target.closest('.meeting-type-picker')) return;
      open();
    });
    el.addEventListener('keydown', e => {
      if (e.target.closest('.meeting-type-picker')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
}

function bindMeetingTypePickers() {
  document.querySelectorAll('.meeting-type-picker[data-company-id]').forEach(picker => {
    picker.querySelectorAll('.meeting-type-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();
        e.stopPropagation();
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
    });
  });
}

function setModalHeaderMode(isManual) {
  const title = document.getElementById('company-modal-title');
  const subtitle = document.getElementById('company-modal-subtitle');
  const fields = document.getElementById('company-modal-manual-fields');
  const deleteBtn = document.getElementById('company-btn-delete');
  const showDelete = isManual && !activeManualDraft;

  if (title) title.hidden = isManual;
  if (subtitle) subtitle.hidden = isManual;
  if (fields) fields.hidden = !isManual;
  if (deleteBtn) deleteBtn.hidden = !showDelete;
}

function updateManualSaveButtonState() {
  const saveBtn = document.getElementById('company-btn-save');
  if (!saveBtn) return;
  if (!activeModalFicha || !isManualFicha(activeModalFicha)) {
    saveBtn.disabled = false;
    return;
  }
  const nameInput = document.getElementById('company-manual-name');
  const name = nameInput ? trimText(nameInput.value) : trimText(activeModalFicha.name);
  saveBtn.disabled = !name;
}

function refreshIcexCompanyCard(companyId) {
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

  if (isManualFicha(activeModalFicha)) {
    const nameInput = document.getElementById('company-manual-name');
    const nameZhInput = document.getElementById('company-manual-name-zh');
    const contactInput = document.getElementById('company-manual-contact');
    const roleInput = document.getElementById('company-manual-role');
    formState.name = nameInput ? trimText(nameInput.value) : '';
    formState.nameZh = nameZhInput ? trimText(nameZhInput.value) : '';
    formState.contactPerson = contactInput ? trimText(contactInput.value) : '';
    formState.role = roleInput ? trimText(roleInput.value) : '';
    formState.isManual = true;
    formState.icexOffice = '';
    formState.meta = {
      companyId: activeCompanyId,
      name: formState.name,
      nameZh: formState.nameZh,
      contactPerson: formState.contactPerson,
      role: formState.role,
      icexOffice: '',
      isManual: true
    };
  }

  return formState;
}

function fillCompanyModalFromFicha(ficha) {
  const uid = getCurrentUser();
  const otherId = otherUserId(uid);
  const mine = ficha.userEntries[uid] || emptyUserEntry();
  const other = ficha.userEntries[otherId] || emptyUserEntry();
  const otherName = userIdToDisplayName(otherId);
  const manual = isManualFicha(ficha);

  setModalHeaderMode(manual);

  const nameInput = document.getElementById('company-manual-name');
  const nameZhInput = document.getElementById('company-manual-name-zh');
  const contactInput = document.getElementById('company-manual-contact');
  const roleInput = document.getElementById('company-manual-role');
  if (manual) {
    if (nameInput) nameInput.value = ficha.name || '';
    if (nameZhInput) nameZhInput.value = ficha.nameZh || '';
    if (contactInput) contactInput.value = ficha.contactPerson || '';
    if (roleInput) roleInput.value = ficha.role || '';
  }

  const desc = document.getElementById('company-field-desc');
  const contacts = document.getElementById('company-field-contacts');
  const notes = document.getElementById('company-field-notes');
  const otherDesc = document.getElementById('company-field-other-desc');
  const otherContacts = document.getElementById('company-field-other-contacts');
  const otherNotes = document.getElementById('company-field-other-notes');
  const otherTitle = document.getElementById('company-other-section-title');

  if (desc) desc.value = mine.description || '';
  let contactsVal = mine.contacts || '';
  if (!trimText(contactsVal) && activeCompanyId && !manual) {
    contactsVal = icexSeedContactsText(ICEX_COMPANY_MAP.get(activeCompanyId));
  }
  if (contacts) contacts.value = contactsVal;
  if (notes) notes.value = mine.notes || '';
  if (otherDesc) otherDesc.value = other.description || '';
  let otherContactsVal = other.contacts || '';
  if (!trimText(otherContactsVal) && activeCompanyId && !manual) {
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

  if (isManualFicha(activeModalFicha) && !trimText(formState.name)) {
    setCompanySaveStatus('El nombre de la empresa es obligatorio', true);
    return false;
  }

  if (saveBtn) saveBtn.disabled = true;
  setCompanySaveStatus('Guardando…');

  try {
    const merged = await saveFichaAtomic(activeCompanyId, formState);
    activeModalFicha = merged;
    activeManualDraft = false;
    setCachedFicha(activeCompanyId, merged);
    modalFormSnapshot = null;
    setCompanySaveStatus('Guardado');
    refreshAfterFichaChange(activeCompanyId);
    renderMeetingsSummary();
    setModalHeaderMode(true);
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
    if (saveBtn && !isManualFicha(activeModalFicha)) saveBtn.disabled = false;
    else updateManualSaveButtonState();
  }
}

async function openCompanyModal(companyId, options) {
  options = options || {};
  const seed = ICEX_COMPANY_MAP.get(companyId);
  const isDraft = !!options.draft;
  const isManual = isDraft || isManualFichaId(companyId) || (options.ficha && isManualFicha(options.ficha));

  if (!seed && !isManual) return;

  const modal = document.getElementById('company-modal');
  if (!modal) return;

  activeCompanyId = companyId;
  activeModalFicha = null;
  activePhotoSlot = null;
  activeManualDraft = isDraft;

  const title = document.getElementById('company-modal-title');
  const subtitle = document.getElementById('company-modal-subtitle');

  setModalHeaderMode(isManual);

  if (!isManual && seed) {
    if (title) title.textContent = seed.name;
    if (subtitle) {
      subtitle.textContent = (seed.nameZh ? seed.nameZh + ' · ' : '') + seed.contactPerson;
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
    activeModalFicha = normalizeRemoteFicha(raw, companyId, metaFromFicha(raw, companyId));
    applyIcexSeedContacts(activeModalFicha, companyId);
    setCachedFicha(companyId, activeModalFicha);
    fillCompanyModalFromFicha(activeModalFicha);
  } catch (err) {
    console.warn(err);
    activeModalFicha = normalizeRemoteFicha(null, companyId, metaFromFicha(null, companyId));
    applyIcexSeedContacts(activeModalFicha, companyId);
    fillCompanyModalFromFicha(activeModalFicha);
    setCompanySaveStatus(connectionErrorMessage(), true);
  } finally {
    setCompanyModalLoading(false);
  }
}

async function deleteActiveManualFicha() {
  if (!activeCompanyId || !activeModalFicha || !isManualFicha(activeModalFicha)) return;

  const ok = window.confirm(
    '¿Eliminar esta ficha?\n\nEsta acción no se puede deshacer.'
  );
  if (!ok) return;

  const id = activeCompanyId;
  try {
    await deleteRemoteFicha(id);
    remoteFichaMap.delete(id);
    closeCompanyModal();
    await renderOtrasReuniones();
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
   PWA — registro del service worker
   (la actualización forzada está en index.html, inline)
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
  initCountdown();
  initNavAutoHide();
  initNavigation();
  initPresentaciones();
  initBrochureControls();
  initDevPanel();
  initOtrasReuniones();
  initCompanyUnsavedModal();
  if (typeof window.initResumenGenerator === 'function') {
    window.initResumenGenerator();
  }
  renderAgenda();
  renderFlights();
  renderLogistics();
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

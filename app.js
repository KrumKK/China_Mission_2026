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
    dateRange: '23–27 jun 2026 · 4 noches',
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
      }
    ]
  }
];

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
    heroDesc: 'Empresas del área de Cantón · 6 fichas con fotos y notas',
    cityMarker: '粤',
    cityClass: 'city-shenzhen',
    companies: [
      { id: 'icex-canton-01', name: 'Shenzhen Precision Motors Co.', nameZh: '深圳精密电机', contactPerson: '林伟 Wei Lin', role: 'Director comercial' },
      { id: 'icex-canton-02', name: 'Pearl River Composites Ltd.', nameZh: '珠江复合材料', contactPerson: '陈美玲 Meiling Chen', role: 'Gerente de exportación' },
      { id: 'icex-canton-03', name: 'Dongguan Auto Plastics Group', nameZh: '东莞汽车塑料', contactPerson: '黄志明 Zhiming Huang', role: 'Jefe de planta' },
      { id: 'icex-canton-04', name: 'Guangzhou EV Components', nameZh: '广州电动车零部件', contactPerson: '张晓芳 Xiaofang Zhang', role: 'Directora técnica' },
      { id: 'icex-canton-05', name: 'Longhua Smart Manufacturing', nameZh: '龙华智能制造', contactPerson: '何俊杰 Junjie He', role: 'CEO' },
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
    heroDesc: 'Empresas del área de Shanghái · 5 fichas con fotos y notas',
    cityMarker: '沪',
    cityClass: 'city-shanghai',
    companies: [
      { id: 'icex-shanghai-01', name: 'Yangtze Precision Parts Co.', nameZh: '长江精密零件', contactPerson: '王浩然 Haoran Wang', role: 'Director general' },
      { id: 'icex-shanghai-02', name: 'Pudong Robotics & Automation', nameZh: '浦东机器人自动化', contactPerson: '李雪梅 Xueme Li', role: 'Directora de I+D' },
      { id: 'icex-shanghai-03', name: 'Baosteel Trading Shanghai', nameZh: '宝钢贸易上海', contactPerson: '赵一阳 Yiyang Zhao', role: 'Responsable de ventas' },
      { id: 'icex-shanghai-04', name: 'Minhang Industrial Supply', nameZh: '闵行工业供应', contactPerson: '周慧敏 Huimin Zhou', role: 'Coordinadora B2B' },
      { id: 'icex-shanghai-05', name: 'Hongqiao Automotive Tech', nameZh: '虹桥汽车科技', contactPerson: '孙立新 Lixin Sun', role: 'Director de operaciones' }
    ]
  },
  {
    id: 'icex-pekin',
    tabLabel: 'ICEX Pekín',
    heroTag: 'Pekín',
    heroTitle: 'ICEX Pekín',
    heroDesc: 'Empresas del área de Pekín · 5 fichas con fotos y notas',
    cityMarker: '京',
    cityClass: 'city-beijing',
    companies: [
      { id: 'icex-pekin-01', name: 'Capital EPS Solutions', nameZh: '首都EPS解决方案', contactPerson: '刘建国 Jianguo Liu', role: 'Director comercial' },
      { id: 'icex-pekin-02', name: 'Haidian Advanced Materials', nameZh: '海淀先进材料', contactPerson: '马丽娜 Lina Ma', role: 'Gerente de proyecto' },
      { id: 'icex-pekin-03', name: 'Zhongguancun Tech Park Ltd.', nameZh: '中关村科技园', contactPerson: '杨帆 Fan Yang', role: 'Director de innovación' },
      { id: 'icex-pekin-04', name: 'Chaoyang Metal Forming Co.', nameZh: '朝阳金属成型', contactPerson: '郭晓宇 Xiaoyu Guo', role: 'Jefe de producción' },
      { id: 'icex-pekin-05', name: 'Daxing Electric Vehicle Parts', nameZh: '大兴电动车零部件', contactPerson: '霍金凤 Jinfeng Huo', role: 'Directora de calidad' }
    ]
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
   BROCHURE — folleto en iframe (scroll horizontal)
────────────────────────────────────────────── */
let brochureFrameLoaded = false;
let brochureToggleLock = false;

function getBrochureUrl() {
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '27';
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

function tryLockLandscape() {
  if (!screen.orientation || !screen.orientation.lock) return;
  screen.orientation.lock('landscape').catch(() => { /* no soportado */ });
}

function tryUnlockOrientation() {
  if (!screen.orientation || !screen.orientation.unlock) return;
  try { screen.orientation.unlock(); } catch (_) { /* ignore */ }
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
  tryLockLandscape();
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
  tryLockLandscape();
}

function exitBrochureExpanded(viewport) {
  viewport.classList.remove('brochure-viewport--expanded');
  document.body.classList.remove('brochure-fullscreen-active');
  tryUnlockOrientation();
}

async function requestNativeFullscreen(el) {
  const request = (
    el.requestFullscreen
    || el.webkitRequestFullscreen
    || el.msRequestFullscreen
  );
  if (!request) return false;
  try {
    await request.call(el);
    return getFullscreenElement() === el;
  } catch (_) {
    return false;
  }
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
    tryUnlockOrientation();
  }
  if (viewport && getFullscreenElement() === viewport) {
    await exitNativeFullscreen();
  }
  if (viewport) exitBrochureExpanded(viewport);
  else tryUnlockOrientation();
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

  if (prefersBrochurePortal()) {
    enterBrochurePortal();
    updateBrochureFullscreenButton(btn, true);
    return;
  }

  const nativeOk = await requestNativeFullscreen(viewport);
  if (nativeOk) {
    updateBrochureFullscreenButton(btn, true);
    tryLockLandscape();
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

    document.body.classList.toggle('mode-brochure', target === 'brochure');

    if (target === 'brochure') {
      initBrochureFrame();
      tryLockLandscape();
    } else {
      exitBrochureFullscreen(document.getElementById('brochure-viewport'));
      tryUnlockOrientation();
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
function buildAgendaCisceCard(block) {
  const rows = block.items.map(item => `
    <div class="agenda-day-row">
      <span class="agenda-day-date">${escapeHtml(item.date)}</span>
      <p class="agenda-day-text">${escapeHtml(item.text)}</p>
    </div>`).join('');

  return `
    <article class="agenda-card" data-id="${escapeHtml(block.id)}">
      <header class="agenda-card-header">${escapeHtml(block.title)}</header>
      <div class="agenda-card-body">${rows}</div>
    </article>`;
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

  return `
    <article class="agenda-card" data-id="${escapeHtml(block.id)}">
      <header class="agenda-card-header">${escapeHtml(block.title)}</header>
      <div class="agenda-card-body">${daysHtml}</div>
    </article>`;
}

function renderAgenda() {
  const root = document.getElementById('agenda-root');
  if (!root) return;
  root.innerHTML = TRIP_AGENDA.map(block => {
    if (block.items) return buildAgendaCisceCard(block);
    return buildAgendaShenzhenCard(block);
  }).join('');
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
function renderContacts() {
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
      <div class="timeline">
        <div class="timeline-city">
          <div class="city-marker ${data.cityClass}">${data.cityMarker}</div>
        </div>
        ${daysHtml}
      </div>
      ${data.footerAlert ? `<div class="alert-box alert-box--warn"><span class="alert-icon">⚠️</span><p>${escapeHtml(data.footerAlert)}</p></div>` : ''}
      ${data.footerNote ? `<div class="info-box"><span class="info-box-icon">ℹ</span><p>${escapeHtml(data.footerNote)}</p></div>` : ''}`;
  });
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
    const cardsHtml = office.companies.map(company => {
      const ficha = getCachedFicha(company.id);
      const meetingType = normalizeMeetingType(ficha.meetingType);
      if (meetingType === 'b2b') officeStats.b2b += 1;
      else if (meetingType === 'visita') officeStats.visita += 1;
      else officeStats.unset += 1;
      return buildCompanyCardHtml(ficha, company.id, company);
    }).join('');

    panel.innerHTML = `
      <div class="event-hero event-hero--icex">
        <div class="hero-tag">${escapeHtml(office.heroTag)}</div>
        <h3 class="event-hero-title">${escapeHtml(office.heroTitle)}</h3>
        <p class="event-hero-desc">${escapeHtml(office.heroDesc)}</p>
      </div>
      <div class="icex-office-stats">
        <span class="icex-stat icex-stat--b2b">🤝 ${officeStats.b2b} B2B</span>
        <span class="icex-stat icex-stat--visita">🏭 ${officeStats.visita} visitas</span>
        ${officeStats.unset > 0 ? `<span class="icex-stat icex-stat--unset">${officeStats.unset} sin asignar</span>` : ''}
      </div>
      <div class="alert-box alert-box--info">
        <span class="alert-icon">☁️</span>
        <p><strong>5 fotos por usuario</strong> · fichas en SharePoint · marca <strong>B2B</strong> o <strong>Visita</strong> en cada tarjeta.</p>
      </div>
      <div class="timeline-city timeline-city--compact">
        <div class="city-marker ${office.cityClass}">${office.cityMarker}</div>
      </div>
      <div class="company-list icex-company-list">${cardsHtml}</div>`;
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

async function saveCompanyModal() {
  if (!activeCompanyId || !activeModalFicha) return;
  const saveBtn = document.getElementById('company-btn-save');
  const formState = getFormStateFromModal();

  if (isManualFicha(activeModalFicha) && !trimText(formState.name)) {
    setCompanySaveStatus('El nombre de la empresa es obligatorio', true);
    return;
  }

  if (saveBtn) saveBtn.disabled = true;
  setCompanySaveStatus('Guardando…');

  try {
    const merged = await saveFichaAtomic(activeCompanyId, formState);
    activeModalFicha = merged;
    activeManualDraft = false;
    setCachedFicha(activeCompanyId, merged);
    setCompanySaveStatus('Guardado');
    refreshAfterFichaChange(activeCompanyId);
    renderMeetingsSummary();
    setModalHeaderMode(true);
    setTimeout(() => closeCompanyModal(false), 1000);
  } catch (err) {
    console.warn(err);
    setCompanySaveStatus(connectionErrorMessage(), true);
    updateManualSaveButtonState();
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
    closeCompanyModal(false);
    await renderOtrasReuniones();
  } catch (err) {
    console.warn(err);
    setCompanySaveStatus('No se ha podido eliminar. Reintenta cuando tengas conexión.', true);
  }
}

function closeCompanyModal() {
  const modal = document.getElementById('company-modal');
  if (!modal) return;

  if (activeManualDraft) {
    activeManualDraft = false;
  }

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

  if (closeBtn) closeBtn.addEventListener('click', () => closeCompanyModal());
  if (backdrop) backdrop.addEventListener('click', () => closeCompanyModal());
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
    if (event.key === 'Escape' && activeCompanyId) closeCompanyModal();
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
    const swUrl = 'sw.js?v=' + encodeURIComponent(window.__APP_BUILD__ || '27');
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
  initBrochureControls();
  initDevPanel();
  initOtrasReuniones();
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

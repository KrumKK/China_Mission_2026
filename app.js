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
const PHOTOS_PER_COMPANY = 5;

const ICEX_OFFICES = [
  {
    id: 'icex-canton',
    tabLabel: 'ICEX Cantón',
    heroTag: 'Shenzhen · Cantón',
    heroTitle: 'ICEX Cantón (Shenzhen)',
    heroDesc: 'Empresas del área de Cantón · 5 fichas con fotos y notas',
    cityMarker: '粤',
    cityClass: 'city-shenzhen',
    companies: [
      { id: 'icex-canton-01', name: 'Shenzhen Precision Motors Co.', nameZh: '深圳精密电机', contactPerson: '林伟 Wei Lin', role: 'Director comercial' },
      { id: 'icex-canton-02', name: 'Pearl River Composites Ltd.', nameZh: '珠江复合材料', contactPerson: '陈美玲 Meiling Chen', role: 'Gerente de exportación' },
      { id: 'icex-canton-03', name: 'Dongguan Auto Plastics Group', nameZh: '东莞汽车塑料', contactPerson: '黄志明 Zhiming Huang', role: 'Jefe de planta' },
      { id: 'icex-canton-04', name: 'Guangzhou EV Components', nameZh: '广州电动车零部件', contactPerson: '张晓芳 Xiaofang Zhang', role: 'Directora técnica' },
      { id: 'icex-canton-05', name: 'Longhua Smart Manufacturing', nameZh: '龙华智能制造', contactPerson: '何俊杰 Junjie He', role: 'CEO' }
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
  const companies = ICEX_OFFICES.flatMap(o => o.companies);
  const records = await Promise.all(companies.map(c => loadCompanyRecord(c.id)));
  return companies.map((company, i) => {
    const seed = ICEX_COMPANY_MAP.get(company.id);
    const office = seed
      ? ICEX_OFFICES.find(o => o.id === seed.officeId)
      : null;
    return { company, record: records[i], office };
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

  entries.forEach(({ company, record, office }) => {
    const type = normalizeMeetingType(record.meetingType);
    const seed = ICEX_COMPANY_MAP.get(company.id);
    const officeId = seed ? seed.officeId : office && office.id;
    const bucket = officeIndex.has(officeId) ? byOffice[officeIndex.get(officeId)] : null;
    const item = { company, record, type, office };

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
   STORAGE — fichas y fotos (IndexedDB, solo en dispositivo)
────────────────────────────────────────────── */
const COMPANY_DB_NAME = 'mision-china-companies-v1';
const COMPANY_DB_VERSION = 1;
const COMPANY_STORE = 'records';

let companyDbPromise = null;
const companyRecordCache = new Map();
const companyObjectUrls = new Map();

let activeCompanyId = null;
let activePhotoSlot = null;
let companySaveTimer = null;
let companyModalBound = false;
let activeUserName = '';

function userIdToDisplayName(userId) {
  if (userId === 'krum') return 'Krum';
  if (userId === 'oscar') return 'Óscar';
  return userId || '';
}

function setActiveUser(userIdOrName) {
  const raw = userIdOrName || (typeof window.getCurrentUser === 'function' ? window.getCurrentUser() : '');
  activeUserName = userIdToDisplayName(raw) || raw || '';
  window.__ACTIVE_USER__ = activeUserName;

  const chip = document.getElementById('active-user-chip');
  if (chip && activeUserName) {
    chip.textContent = 'Usuario: ' + activeUserName;
    chip.hidden = false;
  }
}

window.setActiveUser = setActiveUser;

function labelEditor(name) {
  return name ? 'Última edición: ' + name : 'Sin edición';
}

function countPhotosByUser(record) {
  const map = new Map();
  (record.photos || []).forEach(p => {
    if (!p || !p.blob || !p.addedBy) return;
    map.set(p.addedBy, (map.get(p.addedBy) || 0) + 1);
  });
  return map;
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

function emptyPhotoSlots() {
  return Array.from({ length: PHOTOS_PER_COMPANY }, () => null);
}

function defaultCompanyRecord(companyId) {
  const seed = ICEX_COMPANY_MAP.get(companyId);
  const contactsSeed = seed
    ? `${seed.contactPerson} — ${seed.role}`
    : '';
  return {
    companyId,
    meetingType: '',
    description: '',
    descriptionBy: '',
    contacts: contactsSeed,
    contactsBy: '',
    notes: '',
    notesBy: '',
    lastEditedBy: '',
    photos: emptyPhotoSlots(),
    updatedAt: Date.now()
  };
}

function normalizeCompanyRecord(raw, companyId) {
  const base = defaultCompanyRecord(companyId);
  if (!raw || typeof raw !== 'object') return base;
  const photos = emptyPhotoSlots();
  if (Array.isArray(raw.photos)) {
    raw.photos.slice(0, PHOTOS_PER_COMPANY).forEach((p, i) => {
      if (p && p.blob instanceof Blob) {
        photos[i] = {
          blob: p.blob,
          name: typeof p.name === 'string' ? p.name : 'foto.jpg',
          addedAt: p.addedAt || null,
          addedBy: typeof p.addedBy === 'string' ? p.addedBy : ''
        };
      }
    });
  }
  return {
    companyId,
    meetingType: normalizeMeetingType(raw.meetingType),
    description: typeof raw.description === 'string' ? raw.description : base.description,
    descriptionBy: typeof raw.descriptionBy === 'string' ? raw.descriptionBy : base.descriptionBy,
    contacts: typeof raw.contacts === 'string' ? raw.contacts : base.contacts,
    contactsBy: typeof raw.contactsBy === 'string' ? raw.contactsBy : base.contactsBy,
    notes: typeof raw.notes === 'string' ? raw.notes : base.notes,
    notesBy: typeof raw.notesBy === 'string' ? raw.notesBy : base.notesBy,
    lastEditedBy: typeof raw.lastEditedBy === 'string' ? raw.lastEditedBy : base.lastEditedBy,
    photos,
    updatedAt: raw.updatedAt || Date.now()
  };
}

async function setCompanyMeetingType(companyId, meetingType) {
  const record = await loadCompanyRecord(companyId);
  record.meetingType = normalizeMeetingType(meetingType);
  if (activeUserName) record.lastEditedBy = activeUserName;
  await saveCompanyRecord(record);
  refreshIcexCompanyCard(companyId);
  renderMeetingsSummary();
  return record;
}

async function loadCompanyRecord(companyId) {
  if (companyRecordCache.has(companyId)) {
    return companyRecordCache.get(companyId);
  }
  try {
    const db = await openCompanyDatabase();
    const record = await new Promise((resolve, reject) => {
      const tx = db.transaction(COMPANY_STORE, 'readonly');
      const req = tx.objectStore(COMPANY_STORE).get(companyId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    const normalized = normalizeCompanyRecord(record, companyId);
    companyRecordCache.set(companyId, normalized);
    return normalized;
  } catch (err) {
    console.warn('No se pudo cargar ficha:', err);
    const fallback = defaultCompanyRecord(companyId);
    companyRecordCache.set(companyId, fallback);
    return fallback;
  }
}

async function saveCompanyRecord(record) {
  record.updatedAt = Date.now();
  companyRecordCache.set(record.companyId, record);
  try {
    const db = await openCompanyDatabase();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(COMPANY_STORE, 'readwrite');
      tx.objectStore(COMPANY_STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    return true;
  } catch (err) {
    console.warn('No se pudo guardar ficha:', err);
    return false;
  }
}

async function getAllRecordsFromDatabase() {
  const db = await openCompanyDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COMPANY_STORE, 'readonly');
    const req = tx.objectStore(COMPANY_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function clearCompanyRecordCache() {
  companyRecordCache.clear();
  companyObjectUrls.forEach(url => URL.revokeObjectURL(url));
  companyObjectUrls.clear();
}

/* ──────────────────────────────────────────────
   BACKUP — exportar / importar fichas y fotos
────────────────────────────────────────────── */
const BACKUP_FORMAT = 'mision-china-backup';
const BACKUP_VERSION = 1;
const BACKUP_META_KEY = 'mision-china-last-backup';

function formatBackupFileDate(date) {
  const d = date || new Date();
  const pad = n => String(n).padStart(2, '0');
  return (
    d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    + '_' + pad(d.getHours()) + '-' + pad(d.getMinutes())
  );
}

function setBackupStatus(text, isError) {
  const el = document.getElementById('backup-status');
  if (!el) return;
  el.textContent = text || '';
  el.classList.toggle('backup-status--error', !!isError);
}

function updateBackupLastInfo(meta) {
  const el = document.getElementById('backup-last-info');
  if (!el) return;
  if (!meta || !meta.at) {
    el.textContent = 'Aún no hay copia registrada desde este dispositivo.';
    return;
  }
  const when = new Date(meta.at).toLocaleString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const size = meta.sizeMb != null ? ' · ' + meta.sizeMb + ' MB' : '';
  const photos = meta.photoCount != null ? ' · ' + meta.photoCount + ' fotos' : '';
  el.textContent = 'Última copia: ' + when + photos + size;
}

function readBackupMeta() {
  try {
    const raw = localStorage.getItem(BACKUP_META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function writeBackupMeta(meta) {
  try {
    localStorage.setItem(BACKUP_META_KEY, JSON.stringify(meta));
  } catch (_) { /* ignore */ }
  updateBackupLastInfo(meta);
}

function isIOSDevice() {
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function prefersMobileBackupDelivery() {
  return isIOSDevice() || window.matchMedia('(pointer: coarse)').matches;
}

async function ensureReadableBlob(blob) {
  if (!(blob instanceof Blob)) {
    throw new Error('Archivo de foto no disponible en este dispositivo');
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

function base64ToBlob(base64, mime) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime || 'image/jpeg' });
}

async function serializeRecordForBackup(record, includePhotos) {
  const photos = [];
  for (let i = 0; i < PHOTOS_PER_COMPANY; i++) {
    const p = record.photos[i];
    if (includePhotos && p && p.blob) {
      photos.push({
        name: p.name || 'foto-' + (i + 1) + '.jpg',
        mime: p.blob.type || 'image/jpeg',
        addedAt: p.addedAt || null,
        addedBy: p.addedBy || '',
        dataBase64: await blobToBase64(p.blob)
      });
    } else {
      photos.push(null);
    }
  }
  return {
    companyId: record.companyId,
    meetingType: normalizeMeetingType(record.meetingType),
    description: record.description || '',
    descriptionBy: record.descriptionBy || '',
    contacts: record.contacts || '',
    contactsBy: record.contactsBy || '',
    notes: record.notes || '',
    notesBy: record.notesBy || '',
    lastEditedBy: record.lastEditedBy || '',
    photos,
    updatedAt: record.updatedAt || Date.now()
  };
}

function deserializeRecordFromBackup(entry) {
  const photos = emptyPhotoSlots();
  if (Array.isArray(entry.photos)) {
    entry.photos.slice(0, PHOTOS_PER_COMPANY).forEach((p, i) => {
      if (p && p.dataBase64) {
        photos[i] = {
          name: p.name || 'foto.jpg',
          addedAt: p.addedAt || Date.now(),
          addedBy: p.addedBy || '',
          blob: base64ToBlob(p.dataBase64, p.mime || 'image/jpeg')
        };
      }
    });
  }
  return normalizeCompanyRecord({
    companyId: entry.companyId,
    meetingType: entry.meetingType,
    description: entry.description,
    descriptionBy: entry.descriptionBy,
    contacts: entry.contacts,
    contactsBy: entry.contactsBy,
    notes: entry.notes,
    notesBy: entry.notesBy,
    lastEditedBy: entry.lastEditedBy,
    photos,
    updatedAt: entry.updatedAt
  }, entry.companyId);
}

function countBackupPhotos(records) {
  let n = 0;
  records.forEach(r => {
    (r.photos || []).forEach(p => { if (p && p.dataBase64) n += 1; });
  });
  return n;
}

async function collectRecordsForBackup() {
  const stored = await getAllRecordsFromDatabase();
  const byId = new Map(stored.map(r => [r.companyId, r]));
  const allIds = new Set(ICEX_OFFICES.flatMap(o => o.companies.map(c => c.id)));
  stored.forEach(r => allIds.add(r.companyId));

  const records = [];
  for (const id of allIds) {
    const raw = byId.get(id) || defaultCompanyRecord(id);
    records.push(normalizeCompanyRecord(raw, id));
  }
  return records;
}

async function buildBackupPayload(includePhotos, onProgress) {
  const records = await collectRecordsForBackup();
  const serialized = [];
  let photoIndex = 0;
  const totalPhotos = includePhotos
    ? records.reduce((sum, r) => sum + countFilledPhotos(r), 0)
    : 0;

  for (let i = 0; i < records.length; i++) {
    if (onProgress) onProgress('Ficha ' + (i + 1) + ' de ' + records.length + '…');
    const entry = await serializeRecordForBackup(records[i], includePhotos);
    serialized.push(entry);
    if (includePhotos) {
      photoIndex += countFilledPhotos(records[i]);
      if (totalPhotos > 0 && onProgress) {
        onProgress('Fotos procesadas… (' + photoIndex + '/' + totalPhotos + ')');
      }
    }
  }

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    appBuild: window.__APP_BUILD__ || '20',
    includesPhotos: !!includePhotos,
    companyCount: serialized.length,
    photoCount: countBackupPhotos(serialized),
    records: serialized
  };
}

function backupPayloadToBlob(payload) {
  return new Blob([JSON.stringify(payload)], { type: 'application/json' });
}

function backupDeliveryStatus(method, sizeMb, photoCount) {
  if (method === 'shared') {
    return 'Copia lista (' + sizeMb + ' MB · ' + photoCount + ' fotos). Elige «Guardar en Archivos», OneDrive o Mail.';
  }
  if (method === 'opened') {
    return 'Copia abierta en otra ventana (' + sizeMb + ' MB). Pulsa ↗ Compartir → «Guardar en Archivos».';
  }
  return 'Copia descargada (' + sizeMb + ' MB · ' + photoCount + ' fotos). Guárdala en OneDrive o envíatela por email.';
}

async function shareBackupFile(blob, filename) {
  if (!navigator.share) return false;
  const file = new File([blob], filename, { type: 'application/json' });
  const payload = { files: [file], title: 'Copia Misión China 2026' };
  if (navigator.canShare && !navigator.canShare(payload)) return false;
  await navigator.share(payload);
  return true;
}

async function openBackupOnIOS(blob, filename) {
  const deliveryBlob = new Blob([blob], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(deliveryBlob);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 120000);
  return 'opened';
}

async function deliverBackupBlob(blob, filename, options) {
  options = options || {};
  const deliveryBlob = prefersMobileBackupDelivery()
    ? new Blob([blob], { type: 'application/octet-stream' })
    : blob;

  /* iPhone: no usar share tras await (pierde el gesto y falla con NotFoundError) */
  if (isIOSDevice()) {
    return openBackupOnIOS(blob, filename);
  }

  if (options.preferShare && navigator.share) {
    try {
      const shared = await shareBackupFile(deliveryBlob, filename);
      if (shared) return 'shared';
    } catch (err) {
      if (err && err.name === 'AbortError') throw err;
    }
  }

  if (prefersMobileBackupDelivery()) {
    try {
      const shared = await shareBackupFile(deliveryBlob, filename);
      if (shared) return 'shared';
    } catch (err) {
      if (err && err.name === 'AbortError') throw err;
    }
    return openBackupOnIOS(blob, filename);
  }

  const url = URL.createObjectURL(deliveryBlob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 5000);
    return 'downloaded';
  } catch (err) {
    URL.revokeObjectURL(url);
    if (deliveryBlob.size < 12 * 1024 * 1024) {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(deliveryBlob);
      });
      const opened = window.open(String(dataUrl), '_blank');
      if (opened) return 'opened';
    }
    throw err;
  }
}

async function exportBackup(includePhotos, options) {
  options = options || {};
  const exportBtn = document.getElementById('btn-export-backup');
  const textBtn = document.getElementById('btn-export-text-backup');
  const shareBtn = document.getElementById('btn-share-backup');
  [exportBtn, textBtn, shareBtn].forEach(b => { if (b) b.disabled = true; });

  try {
    setBackupStatus('Preparando copia…');
    const payload = await buildBackupPayload(includePhotos, setBackupStatus);
    const blob = backupPayloadToBlob(payload);
    const sizeMb = (blob.size / (1024 * 1024)).toFixed(2);
    const filename = 'mision-china-backup-' + formatBackupFileDate() + (includePhotos ? '' : '-solo-textos') + '.json';

    let deliveryMethod = null;
    if (options.download !== false) {
      deliveryMethod = await deliverBackupBlob(blob, filename, {
        preferShare: !!options.preferShare
      });
    }

    writeBackupMeta({
      at: Date.now(),
      photoCount: payload.photoCount,
      sizeMb,
      includesPhotos: includePhotos
    });

    if (options.download !== false && deliveryMethod) {
      setBackupStatus(backupDeliveryStatus(deliveryMethod, sizeMb, payload.photoCount));
    }
    return { blob, filename, payload, sizeMb, deliveryMethod };
  } catch (err) {
    console.error(err);
    if (err && err.name === 'AbortError') {
      setBackupStatus('Copia cancelada.');
      return null;
    }
    const hint = prefersMobileBackupDelivery()
      ? ' En iPhone usa «Compartir copia» o vuelve a intentar.'
      : '';
    setBackupStatus('Error al crear la copia: ' + (err.message || 'desconocido') + hint, true);
    return null;
  } finally {
    [exportBtn, textBtn, shareBtn].forEach(b => { if (b) b.disabled = false; });
  }
}

async function restoreBackupPayload(payload) {
  if (!payload || payload.format !== BACKUP_FORMAT) {
    throw new Error('Archivo no válido para Misión China 2026');
  }
  if (!Array.isArray(payload.records) || payload.records.length === 0) {
    throw new Error('La copia no contiene fichas');
  }

  clearCompanyRecordCache();
  const db = await openCompanyDatabase();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(COMPANY_STORE, 'readwrite');
    const store = tx.objectStore(COMPANY_STORE);
    const clearReq = store.clear();
    clearReq.onsuccess = () => {
      payload.records.forEach(entry => {
        const record = deserializeRecordFromBackup(entry);
        store.put(record);
        companyRecordCache.set(record.companyId, record);
      });
    };
    clearReq.onerror = () => reject(clearReq.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  await renderIcexOffices();
  await renderMeetingsSummary();
}

async function importBackupFromFile(file) {
  const text = await file.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (_) {
    throw new Error('El archivo no es JSON válido');
  }

  const photoCount = countBackupPhotos(payload.records || []);
  const companyCount = (payload.records || []).length;
  const when = payload.exportedAt
    ? new Date(payload.exportedAt).toLocaleString('es-ES')
    : 'fecha desconocida';

  const ok = window.confirm(
    'Restaurar copia del ' + when + '?\n\n'
    + '· ' + companyCount + ' empresas\n'
    + '· ' + photoCount + ' fotos\n\n'
    + 'Se sustituirá TODO lo guardado en este dispositivo por esta copia.'
  );
  if (!ok) return;

  setBackupStatus('Restaurando copia…');
  await restoreBackupPayload(payload);
  writeBackupMeta({
    at: Date.now(),
    photoCount,
    sizeMb: (file.size / (1024 * 1024)).toFixed(2),
    includesPhotos: !!payload.includesPhotos,
    restored: true
  });
  setBackupStatus('Copia restaurada correctamente (' + photoCount + ' fotos).');
}

function initBackupControls() {
  updateBackupLastInfo(readBackupMeta());

  const exportBtn = document.getElementById('btn-export-backup');
  const textBtn = document.getElementById('btn-export-text-backup');
  const shareBtn = document.getElementById('btn-share-backup');
  const importBtn = document.getElementById('btn-import-backup');
  const fileInput = document.getElementById('backup-file-input');

  if (shareBtn && navigator.share) {
    shareBtn.hidden = false;
  }
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      await exportBackup(true, { preferShare: !isIOSDevice() });
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => exportBackup(true));
  }
  if (textBtn) {
    textBtn.addEventListener('click', () => exportBackup(false));
  }
  if (importBtn && fileInput) {
    importBtn.addEventListener('click', () => {
      fileInput.value = '';
      fileInput.click();
    });
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      try {
        await importBackupFromFile(file);
      } catch (err) {
        console.error(err);
        setBackupStatus('Error al restaurar: ' + (err.message || 'desconocido'), true);
      }
      fileInput.value = '';
    });
  }
}

function revokeCompanyObjectUrls(companyId) {
  const prefix = companyId + ':';
  companyObjectUrls.forEach((url, key) => {
    if (key.startsWith(prefix)) {
      URL.revokeObjectURL(url);
      companyObjectUrls.delete(key);
    }
  });
}

function getPhotoObjectUrl(companyId, slot, blob) {
  const key = companyId + ':' + slot;
  const prev = companyObjectUrls.get(key);
  if (prev) URL.revokeObjectURL(prev);
  const url = URL.createObjectURL(blob);
  companyObjectUrls.set(key, url);
  return url;
}

function countFilledPhotos(record) {
  return (record.photos || []).filter(p => p && p.blob).length;
}

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
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '20';
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
   RENDER — Oficinas ICEX (empresas + fichas)
────────────────────────────────────────────── */
async function renderIcexOffices() {
  const records = await Promise.all(
    ICEX_OFFICES.flatMap(o => o.companies.map(c => loadCompanyRecord(c.id)))
  );
  const recordById = new Map(records.map(r => [r.companyId, r]));

  ICEX_OFFICES.forEach(office => {
    const panel = document.getElementById('event-panel-' + office.id);
    if (!panel) return;

    const officeStats = { b2b: 0, visita: 0, unset: 0 };
    const cardsHtml = office.companies.map(company => {
      const record = recordById.get(company.id) || defaultCompanyRecord(company.id);
      const meetingType = normalizeMeetingType(record.meetingType);
      if (meetingType === 'b2b') officeStats.b2b += 1;
      else if (meetingType === 'visita') officeStats.visita += 1;
      else officeStats.unset += 1;

      const photoCount = countFilledPhotos(record);
      const photoByUser = countPhotosByUser(record);
      const photoByUserText = Array.from(photoByUser.entries())
        .map(([name, count]) => name + ': ' + count)
        .join(' · ');
      const hasNotes = !!(record.description || record.notes);
      const preview = record.description
        ? truncateText(record.description, 72)
        : 'Pulsa para completar ficha y subir fotos';

      return `
        <article class="company-card icex-company-card" data-company-id="${escapeHtml(company.id)}" role="button" tabindex="0" aria-label="Abrir ficha de ${escapeHtml(company.name)}">
          <div class="company-card-header">
            <div>
              <span class="company-name">${escapeHtml(company.name)}</span>
              ${company.nameZh ? `<span class="company-name-zh">${escapeHtml(company.nameZh)}</span>` : ''}
            </div>
            <div class="company-badges">
              ${meetingTypeBadgeHtml(meetingType)}
              ${photoCount > 0 ? `<span class="company-badge badge-photos">📷 ${photoCount}/5</span>` : ''}
            </div>
          </div>
          ${buildMeetingTypePickerHtml(company.id, meetingType, 'meeting-type-picker--card')}
          <p class="company-contact-person">👤 ${escapeHtml(company.contactPerson)} · ${escapeHtml(company.role)}</p>
          <p class="company-card-preview ${hasNotes ? '' : 'company-card-preview--empty'}">${escapeHtml(preview)}</p>
          <p class="company-card-meta">✍ ${escapeHtml(record.lastEditedBy || 'Sin edición')}</p>
          <p class="company-card-meta" ${photoByUserText ? '' : 'hidden'}>📷 ${escapeHtml(photoByUserText || '')}</p>
        </article>`;
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
        <span class="alert-icon">📷</span>
        <p><strong>5 fotos por empresa</strong> · marca <strong>B2B</strong> o <strong>Visita</strong> en cada ficha · resumen en pestaña <strong>Resumen</strong>.</p>
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

function truncateText(text, max) {
  const t = String(text || '').trim();
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
        const record = await loadCompanyRecord(companyId);
        const next = record.meetingType === type ? '' : type;
        await setCompanyMeetingType(companyId, next);
        syncMeetingTypePickerButtons(picker, next);
        if (activeCompanyId === companyId) {
          syncMeetingTypePickerButtons(
            document.getElementById('company-meeting-type-picker'),
            next
          );
        }
      });
    });
  });
}

function refreshIcexCompanyCard(companyId) {
  const seed = ICEX_COMPANY_MAP.get(companyId);
  const office = ICEX_OFFICES.find(o => o.companies.some(c => c.id === companyId));
  if (!seed || !office) return;

  loadCompanyRecord(companyId).then(record => {
    const card = document.querySelector(`.icex-company-card[data-company-id="${companyId}"]`);
    if (!card) return;
    const photoCount = countFilledPhotos(record);
    const hasNotes = !!(record.description || record.notes);
    const preview = record.description
      ? truncateText(record.description, 72)
      : 'Pulsa para completar ficha y subir fotos';
    const photoByUser = countPhotosByUser(record);
    const photoByUserText = Array.from(photoByUser.entries())
      .map(([name, count]) => name + ': ' + count)
      .join(' · ');

    const meetingType = normalizeMeetingType(record.meetingType);
    const badges = card.querySelector('.company-badges');
    if (badges) {
      badges.innerHTML = `
        ${meetingTypeBadgeHtml(meetingType)}
        ${photoCount > 0 ? `<span class="company-badge badge-photos">📷 ${photoCount}/5</span>` : ''}`;
    }
    const picker = card.querySelector('.meeting-type-picker');
    syncMeetingTypePickerButtons(picker, meetingType);
    const previewEl = card.querySelector('.company-card-preview');
    if (previewEl) {
      previewEl.textContent = preview;
      previewEl.classList.toggle('company-card-preview--empty', !hasNotes);
    }
    const metaEls = card.querySelectorAll('.company-card-meta');
    if (metaEls[0]) metaEls[0].textContent = '✍ ' + (record.lastEditedBy || 'Sin edición');
    if (metaEls[1]) {
      if (photoByUserText) {
        metaEls[1].textContent = '📷 ' + photoByUserText;
        metaEls[1].hidden = false;
      } else {
        metaEls[1].hidden = true;
      }
    }
  });
}

function getActiveCompanyRecordFromForm() {
  if (!activeCompanyId) return null;
  const cached = companyRecordCache.get(activeCompanyId);
  const previous = cached || defaultCompanyRecord(activeCompanyId);
  const record = cached
    ? { ...cached, photos: cached.photos.slice() }
    : defaultCompanyRecord(activeCompanyId);

  const desc = document.getElementById('company-field-desc');
  const contacts = document.getElementById('company-field-contacts');
  const notes = document.getElementById('company-field-notes');
  let changed = false;
  if (desc) {
    const next = desc.value;
    if (next !== previous.description) {
      changed = true;
      if (activeUserName) record.descriptionBy = activeUserName;
    }
    record.description = next;
  }
  if (contacts) {
    const next = contacts.value;
    if (next !== previous.contacts) {
      changed = true;
      if (activeUserName) record.contactsBy = activeUserName;
    }
    record.contacts = next;
  }
  if (notes) {
    const next = notes.value;
    if (next !== previous.notes) {
      changed = true;
      if (activeUserName) record.notesBy = activeUserName;
    }
    record.notes = next;
  }

  const modalPicker = document.getElementById('company-meeting-type-picker');
  const activeBtn = modalPicker && modalPicker.querySelector('.meeting-type-btn.active');
  const nextMeetingType = activeBtn ? normalizeMeetingType(activeBtn.dataset.type) : normalizeMeetingType(record.meetingType);
  if (nextMeetingType !== previous.meetingType) changed = true;
  record.meetingType = nextMeetingType;
  if (changed && activeUserName) record.lastEditedBy = activeUserName;

  return record;
}

function scheduleCompanySave() {
  clearTimeout(companySaveTimer);
  companySaveTimer = setTimeout(async () => {
    const record = getActiveCompanyRecordFromForm();
    if (!record) return;
    setCompanySaveStatus('Guardando…');
    const ok = await saveCompanyRecord(record);
    setCompanySaveStatus(ok ? 'Guardado en el dispositivo' : 'Error al guardar', !ok);
    updateCompanyEditorBadges(record);
    refreshIcexCompanyCard(record.companyId);
    renderMeetingsSummary();
  }, 450);
}

function updateCompanyEditorBadges(record) {
  if (!record) return;
  const descBy = document.getElementById('company-field-desc-by');
  const contactsBy = document.getElementById('company-field-contacts-by');
  const notesBy = document.getElementById('company-field-notes-by');
  if (descBy) descBy.textContent = labelEditor(record.descriptionBy);
  if (contactsBy) contactsBy.textContent = labelEditor(record.contactsBy);
  if (notesBy) notesBy.textContent = labelEditor(record.notesBy);
}

function renderCompanyPhotoGrid(record) {
  const grid = document.getElementById('company-photo-grid');
  const counter = document.getElementById('company-photo-counter');
  if (!grid || !record) return;

  const filled = countFilledPhotos(record);
  if (counter) counter.textContent = filled + ' / ' + PHOTOS_PER_COMPANY;

  grid.innerHTML = record.photos.map((photo, index) => {
    if (photo && photo.blob) {
      const url = getPhotoObjectUrl(record.companyId, index, photo.blob);
      return `
        <div class="photo-slot photo-slot--filled">
          <img src="${url}" alt="Foto ${index + 1}" class="photo-thumb" loading="lazy" />
          ${photo.addedBy ? `<span class="photo-owner">${escapeHtml(photo.addedBy)}</span>` : ''}
          <button type="button" class="photo-remove" data-slot="${index}" aria-label="Eliminar foto ${index + 1}">✕</button>
        </div>`;
    }
    return `
      <button type="button" class="photo-slot photo-slot--add" data-slot="${index}" aria-label="Añadir foto ${index + 1}">
        <span class="photo-add-icon">+</span>
        <span class="photo-add-label">Foto ${index + 1}</span>
      </button>`;
  }).join('');

  grid.querySelectorAll('.photo-slot--add').forEach(btn => {
    btn.addEventListener('click', () => {
      activePhotoSlot = parseInt(btn.dataset.slot, 10);
      const input = document.getElementById('company-photo-input');
      if (input) {
        input.value = '';
        input.click();
      }
    });
  });

  grid.querySelectorAll('.photo-remove').forEach(btn => {
    btn.addEventListener('click', async event => {
      event.stopPropagation();
      const slot = parseInt(btn.dataset.slot, 10);
      const rec = getActiveCompanyRecordFromForm();
      if (!rec || !rec.photos[slot]) return;
      rec.photos[slot] = null;
      await saveCompanyRecord(rec);
      revokeCompanyObjectUrls(rec.companyId);
      renderCompanyPhotoGrid(rec);
      refreshIcexCompanyCard(rec.companyId);
      setCompanySaveStatus('Foto eliminada');
    });
  });
}

async function openCompanyModal(companyId) {
  const seed = ICEX_COMPANY_MAP.get(companyId);
  if (!seed) return;

  const modal = document.getElementById('company-modal');
  if (!modal) return;

  activeCompanyId = companyId;
  const record = await loadCompanyRecord(companyId);

  const title = document.getElementById('company-modal-title');
  const subtitle = document.getElementById('company-modal-subtitle');
  const desc = document.getElementById('company-field-desc');
  const contacts = document.getElementById('company-field-contacts');
  const notes = document.getElementById('company-field-notes');

  if (title) title.textContent = seed.name;
  if (subtitle) {
    subtitle.textContent = (seed.nameZh ? seed.nameZh + ' · ' : '') + seed.contactPerson;
  }
  if (desc) desc.value = record.description || '';
  if (contacts) contacts.value = record.contacts || '';
  if (notes) notes.value = record.notes || '';
  updateCompanyEditorBadges(record);

  syncMeetingTypePickerButtons(
    document.getElementById('company-meeting-type-picker'),
    normalizeMeetingType(record.meetingType)
  );

  renderCompanyPhotoGrid(record);
  setCompanySaveStatus('');

  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('company-modal-open');

  if (!companyModalBound) initCompanyModalControls();
}

function closeCompanyModal() {
  const modal = document.getElementById('company-modal');
  if (!modal) return;
  if (activeCompanyId) {
    const record = getActiveCompanyRecordFromForm();
    if (record) {
      saveCompanyRecord(record).then(() => {
        refreshIcexCompanyCard(activeCompanyId);
        renderMeetingsSummary();
      });
    }
    revokeCompanyObjectUrls(activeCompanyId);
  }
  activeCompanyId = null;
  activePhotoSlot = null;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('company-modal-open');
}

function initCompanyModalControls() {
  if (companyModalBound) return;
  companyModalBound = true;

  const closeBtn = document.getElementById('company-modal-close');
  const backdrop = document.getElementById('company-modal-backdrop');
  const photoInput = document.getElementById('company-photo-input');

  if (closeBtn) closeBtn.addEventListener('click', closeCompanyModal);
  if (backdrop) backdrop.addEventListener('click', closeCompanyModal);

  ['company-field-desc', 'company-field-contacts', 'company-field-notes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', scheduleCompanySave);
  });

  const modalPicker = document.getElementById('company-meeting-type-picker');
  if (modalPicker) {
    modalPicker.querySelectorAll('.meeting-type-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();
        if (!activeCompanyId) return;
        const type = btn.dataset.type;
        const record = await loadCompanyRecord(activeCompanyId);
        const next = record.meetingType === type ? '' : type;
        await setCompanyMeetingType(activeCompanyId, next);
        syncMeetingTypePickerButtons(modalPicker, next);
        document.querySelectorAll(`.meeting-type-picker[data-company-id="${activeCompanyId}"]`)
          .forEach(p => syncMeetingTypePickerButtons(p, next));
      });
    });
  }

  if (photoInput) {
    photoInput.addEventListener('change', async () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file || activeCompanyId == null || activePhotoSlot == null) return;

      setCompanySaveStatus('Procesando foto…');
      try {
        const blob = await compressImageFile(file);
        const record = getActiveCompanyRecordFromForm() || await loadCompanyRecord(activeCompanyId);
        record.photos[activePhotoSlot] = {
          blob,
          name: file.name || 'foto.jpg',
          addedAt: Date.now(),
          addedBy: activeUserName || ''
        };
        if (activeUserName) record.lastEditedBy = activeUserName;
        await saveCompanyRecord(record);
        updateCompanyEditorBadges(record);
        renderCompanyPhotoGrid(record);
        refreshIcexCompanyCard(activeCompanyId);
        setCompanySaveStatus('Foto guardada');
      } catch (err) {
        console.warn(err);
        setCompanySaveStatus('No se pudo guardar la foto', true);
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
    const swUrl = 'sw.js?v=' + encodeURIComponent(window.__APP_BUILD__ || '20');
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
  initBackupControls();
  renderFlights();
  renderLogistics();
  renderContacts();
  renderEventAgendas();
  openCompanyDatabase()
    .then(() => renderIcexOffices())
    .catch(() => renderIcexOffices());
  initPWA();
}

window.startApp = startApp;

function bootApp() {
  if (typeof window.initLoginScreen === 'function') {
    window.initLoginScreen();
  } else {
    startApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}

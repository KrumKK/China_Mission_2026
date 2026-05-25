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
   DATA — Empresas (B2B y visitas)
   category: 'b2b' | 'visita'
────────────────────────────────────────────── */
const COMPANIES = [
  {
    id: 'byd-visita',
    category: 'visita',
    name: 'BYD + proveedor EPS',
    nameZh: '比亚迪',
    type: 'eps',
    city: 'shenzhen',
    sector: 'Fabricante de automóviles / EPS',
    meeting: { date: '2026-06-25', time: null, location: 'Shenzhen — por confirmar' },
    objective: 'Visita planta · explorar suministro cascos EPS y posible JV',
    notes: 'Alta prioridad. Solicitada, sin confirmar.',
    notesPost: ''
  },
  {
    id: 'aierfy-visita',
    category: 'visita',
    name: 'AIERFY',
    nameZh: null,
    type: 'otro',
    city: 'shenzhen',
    sector: 'Por confirmar',
    meeting: { date: '2026-06-25', time: null, location: null },
    objective: 'Visita a empresa',
    notes: 'Por confirmar',
    notesPost: ''
  },
  {
    id: 'sinomz-visita',
    category: 'visita',
    name: 'SINOMZ',
    nameZh: null,
    type: 'otro',
    city: 'shenzhen',
    sector: 'Por confirmar',
    meeting: { date: '2026-06-25', time: null, location: null },
    objective: 'Visita a empresa',
    notes: 'Por confirmar',
    notesPost: ''
  }
];


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

function getBrochureUrl() {
  const bust = window.__APP_CACHE_BUSTER__ || window.__APP_BUILD__ || '10';
  return 'brochure-liz-china.html?v=' + encodeURIComponent(bust);
}

function initBrochureFrame() {
  const frame = document.getElementById('brochure-frame');
  if (!frame || brochureFrameLoaded) return;
  frame.src = getBrochureUrl();
  brochureFrameLoaded = true;
}

function tryLockLandscape() {
  if (!screen.orientation || !screen.orientation.lock) return;
  screen.orientation.lock('landscape').catch(() => { /* no soportado */ });
}

function tryUnlockOrientation() {
  if (!screen.orientation || !screen.orientation.unlock) return;
  try { screen.orientation.unlock(); } catch (_) { /* ignore */ }
}

function initBrochureControls() {
  const btn = document.getElementById('btn-brochure-fullscreen');
  const viewport = document.getElementById('brochure-viewport');
  if (!btn || !viewport) return;

  btn.addEventListener('click', () => {
    const el = viewport;
    if (document.fullscreenElement === el) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === viewport;
    btn.textContent = on ? '✕ Salir pantalla completa' : '⛶ Pantalla completa';
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

    document.body.classList.toggle('mode-brochure', target === 'brochure');

    if (target === 'brochure') {
      initBrochureFrame();
      tryLockLandscape();
    } else {
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
    subnav.addEventListener('touchend', onSub, { passive: false });
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
   RENDER — B2B y Visitas (COMPANIES)
────────────────────────────────────────────── */
function renderB2BAndVisits() {
  const b2b = COMPANIES.filter(c => c.category === 'b2b');
  const visitas = COMPANIES.filter(c => c.category === 'visita');

  const b2bList = document.getElementById('b2b-list');
  const emptyB2b = document.getElementById('empty-b2b');
  if (b2bList) {
    if (b2b.length === 0) {
      b2bList.innerHTML = '';
      if (emptyB2b) emptyB2b.hidden = false;
    } else {
      if (emptyB2b) emptyB2b.hidden = true;
      b2bList.innerHTML = b2b.map(c => buildCompanyCard(c)).join('');
    }
  }

  const visitsList = document.getElementById('visits-list');
  const emptyVisitas = document.getElementById('empty-visitas');
  if (visitsList) {
    if (visitas.length === 0) {
      visitsList.innerHTML = '';
      if (emptyVisitas) emptyVisitas.hidden = false;
    } else {
      if (emptyVisitas) emptyVisitas.hidden = true;
      visitsList.innerHTML = visitas.map(c => buildVisitCard(c)).join('');
    }
  }
}

function buildCompanyCard(c) {
  const typeBadge = {
    eps: '<span class="company-badge badge-eps">EPS / JV</span>',
    robotica: '<span class="company-badge badge-robot">Robótica</span>',
    otro: ''
  }[c.type] || '';

  const cityBadge = c.city === 'beijing'
    ? '<span class="company-badge badge-beijing">北京</span>'
    : '<span class="company-badge badge-shenzhen">深圳</span>';

  const meetingBlock = c.meeting
    ? `<div class="company-meeting-time">
        ⏱ ${formatDate(c.meeting.date)}${c.meeting.time ? ' · ' + escapeHtml(c.meeting.time) : ''}
        ${c.meeting.location ? ' · ' + escapeHtml(c.meeting.location) : ''}
       </div>`
    : '';

  return `
    <div class="company-card" data-id="${escapeHtml(c.id)}" role="button" tabindex="0">
      <div class="company-card-header">
        <div>
          <span class="company-name">${escapeHtml(c.name)}</span>
          ${c.nameZh ? `<span class="company-name-zh">${escapeHtml(c.nameZh)}</span>` : ''}
        </div>
        <div class="company-badges">${typeBadge}${cityBadge}</div>
      </div>
      ${c.objective ? `<p class="company-objective">${escapeHtml(c.objective)}</p>` : ''}
      ${meetingBlock}
      ${c.notes ? `<p class="company-notes">${escapeHtml(c.notes)}</p>` : ''}
    </div>`;
}

function buildVisitCard(c) {
  const priority = c.notes && c.notes.toLowerCase().includes('prioridad');
  return `
    <article class="visit-card ${priority ? 'visit-card--priority' : ''}" data-id="${escapeHtml(c.id)}">
      <div class="visit-card-header">
        <span class="visit-name">${escapeHtml(c.name)}</span>
        ${c.nameZh ? `<span class="visit-name-zh">${escapeHtml(c.nameZh)}</span>` : ''}
      </div>
      ${c.meeting && c.meeting.date ? `<p class="visit-date">📅 ${formatDate(c.meeting.date)}</p>` : ''}
      ${c.objective ? `<p class="visit-objective">${escapeHtml(c.objective)}</p>` : ''}
      ${c.meeting && c.meeting.location ? `<p class="visit-location">📍 ${escapeHtml(c.meeting.location)}</p>` : ''}
      ${c.notes ? `<p class="visit-notes">${escapeHtml(c.notes)}</p>` : ''}
    </article>`;
}

function bindCompanyCardClicks() {
  document.querySelectorAll('.company-card[data-id]').forEach(el => {
    const open = () => {
      const company = COMPANIES.find(c => c.id === el.dataset.id);
      if (!company) return;
      alert(`${company.name}\n\nObjetivo: ${company.objective || '—'}\nNotas: ${company.notes || '—'}`);
    };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
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
    const swUrl = 'sw.js?v=' + encodeURIComponent(window.__APP_BUILD__ || '10');
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
function bootApp() {
  initCountdown();
  initNavAutoHide();
  initNavigation();
  initBrochureControls();
  renderFlights();
  renderLogistics();
  renderContacts();
  renderEventAgendas();
  renderB2BAndVisits();
  bindCompanyCardClicks();
  initPWA();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}

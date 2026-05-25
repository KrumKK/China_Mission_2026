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
    dateRange: '22–23 jun 2026',
    hotel: {
      nameEs: 'Por confirmar',
      nameZh: '待确认',
      addressEs: null,
      addressZh: null,
      phone: null
    },
    departureTime: null,
    departureNote: 'Hora de salida del hotel — pendiente de confirmar',
    notes: 'Feria CISCE · llegada 22 junio'
  },
  {
    id: 'travel',
    cityEs: 'Traslado',
    cityZh: '北京 → 深圳',
    dateRange: 'Noche 23 → 24 jun',
    hotel: null,
    departureTime: null,
    departureNote: 'Vuelo o tren según organización del viaje',
    notes: 'Beijing → Shenzhen'
  },
  {
    id: 'shenzhen',
    cityEs: 'Shenzhen · Longhua',
    cityZh: '深圳 · 龙华',
    dateRange: '24–26 jun 2026',
    hotel: {
      nameEs: 'Por confirmar',
      nameZh: '待确认',
      addressEs: null,
      addressZh: null,
      phone: null
    },
    departureTime: null,
    departureNote: 'Hora de salida del hotel — pendiente de confirmar',
    notes: 'Misión comercial PIN · distrito Longhua'
  }
];

/* ──────────────────────────────────────────────
   DATA — Contactos (editar / ampliar con vuestro doc)
────────────────────────────────────────────── */
const CONTACTS = [
  { group: 'Gobierno de Navarra — PIN', flag: '🇪🇸', initials: 'MA', color: 'navarra', name: 'Miren Ausín Lecuna', role: 'Directora · Servicio de Proyección Internacional', details: ['📞 (+34) 848 425 765 · 609 538 237', '✉ mausinle@navarra.es'] },
  { group: 'Gobierno de Navarra — PIN', flag: '🇪🇸', initials: 'MG', color: 'navarra', name: 'Mila García Val', role: 'Proyección Internacional', details: ['✉ mila.garcia.val@navarra.es'] },
  { group: 'Gobierno de Navarra — PIN', flag: '🇪🇸', initials: 'EC', color: 'navarra', name: 'Estela Cerdán García', role: 'Servicio de Proyección Internacional', details: ['📞 848 426 654', '✉ estela.cerdan.garcia@navarra.es'] },
  { group: 'CCPIT — China', flag: '🇨🇳', initials: 'CC', color: 'ccpit', name: 'CCPIT', role: 'Organización agendas B2B CISCE y Shenzhen', details: ['Brief Lizarte enviado', 'Agenda en preparación'] },
  { group: 'Lizarte — Equipo', flag: '🏭', initials: 'LA', color: 'lizarte', name: 'Laura Alba', role: 'Comunicación / Coordinación', details: ['✉ lalba@lizarte.com'] },
  { group: 'ICEX — Cantón (área Shenzhen)', flag: '📍', initials: 'AS', color: 'icex', name: 'Amy Su 苏绮妮', role: 'Analista de Mercado', details: ['✉ ASU@comercio.mineco.es'] },
  { group: 'ICEX — Cantón (área Shenzhen)', flag: '📍', initials: 'JL', color: 'icex', name: 'Jaime Lorenzo Garcia-ormaechea', role: 'Consejero Económico y Comercial', details: ['✉ jlorenzo@comercio.mineco.es'] },
  { group: 'ICEX — Cantón (área Shenzhen)', flag: '📍', initials: 'JD', color: 'icex', name: 'Javier Dong Wu', role: 'Sin cargo especificado', details: ['✉ javier.dong@comercio.mineco.es'] },
  { group: 'ICEX — Cantón (área Shenzhen)', flag: '📍', initials: 'CG', color: 'icex', name: 'Buzón general Cantón', role: 'Contacto general oficina', details: ['✉ canton@comercio.mineco.es'] },
  { group: 'ICEX — Pekín', flag: '📍', initials: 'SJ', color: 'icex', name: 'Sun Zhang, Jian', role: 'Español de nacimiento, padres chinos', details: ['✉ jian.sun@comercio.mineco.es'] },
  { group: 'ICEX — Pekín', flag: '📍', initials: 'LM', color: 'icex', name: 'Leire Motrico San Emeterio', role: 'Sin cargo especificado', details: ['✉ leire.motrico@comercio.mineco.es'] },
  { group: 'ICEX — Pekín', flag: '📍', initials: 'PG', color: 'icex', name: 'Buzón general Pekín', role: 'Contacto general oficina', details: ['✉ bcopekin@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'DD', color: 'icex', name: 'Diego Domínguez Escudero', role: 'Organizador de la reunión', details: ['✉ diego.dominguez@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'YZ', color: 'icex', name: 'Yolanda Zhu', role: 'Contacto inicial de Óscar', details: ['✉ yzhu@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'TY', color: 'icex', name: 'Tu, Yuming', role: 'Sin cargo especificado', details: ['✉ YTU@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'CL', color: 'icex', name: 'Cao, Lucia', role: 'Sin cargo especificado', details: ['✉ LCAO@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'IG', color: 'icex', name: 'Isabel Galindo Rodríguez', role: 'Sin cargo especificado', details: ['✉ isabel.galindo@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'SG', color: 'icex', name: 'Buzón general Shanghai', role: 'Contacto general oficina', details: ['✉ shanghai@comercio.mineco.es'] },
  { group: 'ICEX — Shanghai', flag: '📍', initials: 'RA', color: 'icex', name: 'Raúl (apellido desconocido)', role: 'Jefe de todos — sin email disponible', details: ['✉ Sin email'] }
];

/* ──────────────────────────────────────────────
   DATA — Agendas por evento (timeline)
────────────────────────────────────────────── */
const EVENT_AGENDA = {
  cisce: {
    heroTag: 'Pekín',
    heroTitle: 'CISCE',
    heroDesc: 'China International Supply Chain Expo · Beijing',
    cityMarker: '北京',
    cityClass: 'city-beijing',
    days: [
      {
        date: '2026-06-22',
        dateLabel: 'Lun 22 junio',
        badge: 'CISCE',
        badgeClass: 'day-badge--feria',
        note: 'Llegada a Beijing. Inicio de la feria CISCE.',
        slots: [
          { time: 'Por confirmar', label: 'Reuniones B2B — CCPIT', empty: true }
        ]
      },
      {
        date: '2026-06-23',
        dateLabel: 'Mar 23 junio',
        badge: 'CISCE',
        badgeClass: 'day-badge--feria',
        note: 'Segundo día de feria. Posibles encuentros institucionales.',
        slots: [
          { time: 'Por confirmar', label: 'Reuniones B2B — CCPIT', empty: true }
        ]
      }
    ],
    footerNote: 'Reuniones B2B confirmadas aparecerán también en la subpestaña B2B.'
  },
  shenzhen: {
    heroTag: 'Shenzhen',
    heroTitle: 'Misión PIN',
    heroDesc: 'Longhua · Foro y visitas empresariales',
    cityMarker: '深圳',
    cityClass: 'city-shenzhen',
    days: [
      {
        date: '2026-06-24',
        dateLabel: 'Mié 24 junio',
        badge: 'MISIÓN PIN',
        badgeClass: 'day-badge--mision',
        note: 'Inicio misión comercial Shenzhen. Posible Foro Navarra-Longhua.',
        slots: [
          { time: 'Por confirmar', label: 'Visitas a empresa / Foro', empty: true }
        ]
      },
      {
        date: '2026-06-25',
        dateLabel: 'Jue 25 junio',
        badge: 'MISIÓN PIN',
        badgeClass: 'day-badge--mision',
        note: null,
        slots: [
          { time: 'Alta prioridad', label: 'BYD + proveedor EPS · visita planta', priority: true },
          { time: 'Por confirmar', label: 'Visita con AIERFY' },
          { time: 'Por confirmar', label: 'Visita con SINOMZ' },
          { time: 'Por confirmar', label: 'Reuniones B2B robótica/automatización', empty: true }
        ]
      },
      {
        date: '2026-06-26',
        dateLabel: 'Vie 26 junio',
        badge: 'MISIÓN PIN',
        badgeClass: 'day-badge--mision',
        note: 'Último día. Cierre de reuniones y seguimientos.',
        slots: [
          { time: 'Por confirmar', label: 'Reuniones pendientes', empty: true }
        ]
      }
    ],
    footerNote: 'Traslado Beijing → Shenzhen entre el 23 y el 24 de junio.'
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
  const departureDate = new Date('2026-06-22T00:00:00');
  const el = document.getElementById('countdown-days');
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = departureDate - now;
    if (diff <= 0) {
      el.textContent = '✈';
      const label = document.querySelector('.badge-label');
      if (label) label.textContent = '¡viaje!';
      return;
    }
    el.textContent = String(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  update();
  setInterval(update, 60 * 1000);
}


/* ──────────────────────────────────────────────
   NAVIGATION — pestañas principales y eventos
────────────────────────────────────────────── */
let activeEventTab = 'cisce';

function initNavigation() {
  function scrollMainToTop() {
    const main = document.getElementById('app-main');
    if (!main) return;
    try {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {
      main.scrollTop = 0;
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

    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === target);
    });
    document.querySelectorAll('.view').forEach(v => {
      v.classList.toggle('active', v.id === 'view-' + target);
    });

    if (target === 'eventos') {
      activateEventTab(activeEventTab);
    }

    scrollMainToTop();
  }

  window.switchView = activateViewByName;
  window.switchEventTab = activateEventTab;

  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    const onNav = event => {
      const button = event.target.closest('.nav-item');
      if (!button) return;
      event.preventDefault();
      activateViewByName(button.dataset.view);
    };
    nav.addEventListener('click', onNav);
    nav.addEventListener('touchend', onNav, { passive: false });
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
        return `
          <div class="${classes.join(' ')}">
            <span class="slot-time">${escapeHtml(slot.time)}</span>
            <span class="slot-label">${escapeHtml(slot.label)}</span>
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
      <div class="timeline">
        <div class="timeline-city">
          <div class="city-marker ${data.cityClass}">${data.cityMarker}</div>
        </div>
        ${daysHtml}
      </div>
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
   CACHE / PWA
────────────────────────────────────────────── */
async function clearAppCacheStorage() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.unregister()));
  }
  if ('caches' in window) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
  }
  try { localStorage.clear(); } catch (_) { /* ignore */ }
  try { sessionStorage.clear(); } catch (_) { /* ignore */ }
}

function buildVersionedUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('v', String(Date.now()));
  return url.toString();
}

async function forceRefreshApp() {
  const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(async reg => {
        try { await reg.update(); } catch (_) { /* ignore */ }
        try { await reg.unregister(); } catch (_) { /* ignore */ }
      }));
    }
  } catch (_) { /* ignore */ }
  try { await clearAppCacheStorage(); } catch (_) { /* ignore */ }
  if (isHttp) {
    window.location.replace(buildVersionedUrl());
    return;
  }
  window.location.reload();
}

function initRefreshAppButton() {
  const refreshBtn = document.getElementById('refresh-app-btn');
  if (!refreshBtn) return;

  let isRefreshing = false;

  async function onRefreshTap(event) {
    event.preventDefault();
    if (isRefreshing) return;
    isRefreshing = true;

    const originalText = refreshBtn.textContent;
    refreshBtn.disabled = true;
    refreshBtn.textContent = 'Actualizando...';
    refreshBtn.setAttribute('aria-busy', 'true');

    try {
      await forceRefreshApp();
    } catch (err) {
      console.warn('No se pudo limpiar todo el cache:', err);
      refreshBtn.textContent = 'Reintentar actualización';
      refreshBtn.disabled = false;
      refreshBtn.removeAttribute('aria-busy');
      isRefreshing = false;
      return;
    }

    setTimeout(() => {
      refreshBtn.textContent = originalText;
      refreshBtn.disabled = false;
      refreshBtn.removeAttribute('aria-busy');
      isRefreshing = false;
      window.location.reload();
    }, 1500);
  }

  refreshBtn.addEventListener('click', onRefreshTap, { passive: false });
  refreshBtn.addEventListener('touchend', onRefreshTap, { passive: false });
}

function initPWA() {
  if (!('serviceWorker' in navigator)) return;
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
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
   INIT
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNavigation();
  renderLogistics();
  renderContacts();
  renderEventAgendas();
  renderB2BAndVisits();
  bindCompanyCardClicks();
  initRefreshAppButton();
  initPWA();
});

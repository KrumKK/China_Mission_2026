/* ═══════════════════════════════════════════════════════════
   MISIÓN CHINA 2026 — LIZARTE
   App Logic
   ─────────────────────────────────────────────────────────
   Estructura modular para continuar desarrollo en Cursor.
   Cada sección está claramente delimitada.
═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────
   DATA — EMPRESAS
   Añadir nuevas empresas aquí cuando el CCPIT
   y el PIN confirmen la agenda B2B.
   Formato de cada empresa:
   {
     id:          string único,
     name:        nombre en español / inglés,
     nameZh:      nombre en chino (opcional),
     type:        'eps' | 'robotica' | 'otro',
     city:        'beijing' | 'shenzhen',
     sector:      descripción del sector,
     yearsActive: años en el sector,
     contact: {
       name:     nombre del responsable,
       role:     cargo,
       email:    correo (opcional),
       phone:    teléfono (opcional)
     },
     meeting: {
       date:     'YYYY-MM-DD',
       time:     'HH:MM',
       location: dirección o nombre del lugar
     },
     objective:   objetivo de la reunión,
     notes:       notas previas,
     notesPost:   notas post-reunión (rellenar después)
   }
────────────────────────────────────────────── */
const COMPANIES = [
  /* ── PLACEHOLDER — borrar cuando haya datos reales ── */
  /*
  {
    id: 'byd-eps',
    name: 'BYD Auto (Proveedor EPS)',
    nameZh: '比亚迪',
    type: 'eps',
    city: 'shenzhen',
    sector: 'Fabricante de automóviles / EPS',
    yearsActive: 28,
    contact: {
      name: 'Por confirmar',
      role: 'Director de Cadena de Suministro',
    },
    meeting: {
      date: '2026-06-25',
      time: '10:00',
      location: 'BYD Headquarters, Shenzhen'
    },
    objective: 'Explorar suministro de cascos EPS y posible alianza tecnológica',
    notes: 'Visita prioritaria. Preparar PPT en chino con propuesta JV.',
    notesPost: ''
  }
  */
];


/* ──────────────────────────────────────────────
   COUNTDOWN — días hasta el viaje
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
      document.querySelector('.badge-label').textContent = '¡viaje!';
      return;
    }
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    el.textContent = days;
  }

  update();
  setInterval(update, 60 * 1000);
}


/* ──────────────────────────────────────────────
   NAVIGATION — gestión de pestañas
────────────────────────────────────────────── */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const views    = document.querySelectorAll('.view');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.view;

      navItems.forEach(n => n.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      item.classList.add('active');
      const targetView = document.getElementById('view-' + target);
      if (targetView) targetView.classList.add('active');

      /* Scroll al inicio de la sección */
      document.getElementById('app-main').scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────────
   ACTUALIZAR APP — limpieza de cache y recarga
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

function initRefreshAppButton() {
  const refreshBtn = document.getElementById('refresh-app-btn');
  if (!refreshBtn) return;

  refreshBtn.addEventListener('click', async () => {
    const originalText = refreshBtn.textContent;
    refreshBtn.disabled = true;
    refreshBtn.textContent = 'Actualizando...';

    const url = new URL(window.location.href);
    url.searchParams.set('v', String(Date.now()));

    try {
      await clearAppCacheStorage();
    } catch (err) {
      console.warn('No se pudo limpiar todo el cache automáticamente:', err);
    } finally {
      refreshBtn.textContent = originalText;
      window.location.replace(url.toString());
    }
  });
}


/* ──────────────────────────────────────────────
   COMPANIES — renderizado y filtrado
────────────────────────────────────────────── */
function renderCompanies(filter = 'all') {
  const list         = document.getElementById('company-list');
  const emptyState   = document.getElementById('empty-companies');

  const filtered = filter === 'all'
    ? COMPANIES
    : COMPANIES.filter(c => c.type === filter || c.city === filter);

  if (filtered.length === 0) {
    list.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  list.innerHTML = filtered.map(c => buildCompanyCard(c)).join('');
}

function buildCompanyCard(c) {
  const typeBadge = {
    eps:      '<span class="company-badge badge-eps">EPS / JV</span>',
    robotica: '<span class="company-badge badge-robot">Robótica</span>',
    otro:     ''
  }[c.type] || '';

  const cityBadge = c.city === 'beijing'
    ? '<span class="company-badge badge-beijing">北京 Beijing</span>'
    : '<span class="company-badge badge-shenzhen">深圳 Shenzhen</span>';

  const meetingBlock = c.meeting
    ? `<div class="company-meeting-time">
        ⏱ ${formatDate(c.meeting.date)} · ${c.meeting.time}
        ${c.meeting.location ? `· ${c.meeting.location}` : ''}
       </div>`
    : '';

  const contactBlock = c.contact
    ? `<div class="company-contact">
        <span class="contact-person-name">${c.contact.name}</span>
        <span class="contact-person-role">${c.contact.role}</span>
        ${c.contact.email ? `<span class="contact-detail">✉ ${c.contact.email}</span>` : ''}
       </div>`
    : '';

  return `
    <div class="company-card" data-id="${c.id}" onclick="openCompanyDetail('${c.id}')">
      <div class="company-card-header">
        <div>
          <span class="company-name">${c.name}</span>
          ${c.nameZh ? `<span class="company-name-zh">${c.nameZh}</span>` : ''}
        </div>
        <div style="display:flex;gap:4px;flex-direction:column;align-items:flex-end">
          ${typeBadge}
          ${cityBadge}
        </div>
      </div>
      <div class="company-meta">
        ${c.sector ? `<span class="company-meta-item">◈ ${c.sector}</span>` : ''}
        ${c.yearsActive ? `<span class="company-meta-item">⌛ ${c.yearsActive} años</span>` : ''}
      </div>
      ${contactBlock}
      ${meetingBlock}
    </div>`;
}

function initCompanyFilter() {
  const buttons = document.querySelectorAll('#company-filter .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCompanies(btn.dataset.filter);
    });
  });
}

/* Abre el detalle de una empresa (para implementar en Cursor) */
function openCompanyDetail(id) {
  const company = COMPANIES.find(c => c.id === id);
  if (!company) return;
  /* TODO en Cursor: implementar panel de detalle o modal */
  console.log('Detalle empresa:', company);
  alert(`${company.name}\n\nObjetivo: ${company.objective || '—'}\nNotas: ${company.notes || '—'}`);
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


/* ──────────────────────────────────────────────
   INIT — punto de entrada
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNavigation();
  initRefreshAppButton();
});

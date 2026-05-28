/* Microsoft Graph — token (Azure Function) e initSync */
'use strict';

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
const TOKEN_REFRESH_MARGIN_MS = 5 * 60 * 1000;

let tokenCache = {
  access_token: null,
  expiresAt: 0
};

function getCurrentUser() {
  try {
    return sessionStorage.getItem('currentUser') || '';
  } catch (_) {
    return '';
  }
}

function userDisplayName(userId) {
  if (userId === 'krum') return 'Krum';
  if (userId === 'oscar') return 'Óscar';
  return userId || '';
}

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.access_token && tokenCache.expiresAt - now > TOKEN_REFRESH_MARGIN_MS) {
    return tokenCache.access_token;
  }

  const res = await fetch(CONFIG.tokenEndpoint);
  if (!res.ok) {
    throw new Error('No se pudo obtener el token (HTTP ' + res.status + ')');
  }

  const data = await res.json();
  if (!data || !data.access_token) {
    throw new Error('La respuesta del token no incluye access_token');
  }

  const expiresIn = Number(data.expires_in) || 3600;
  tokenCache.access_token = data.access_token;
  tokenCache.expiresAt = now + expiresIn * 1000;
  return tokenCache.access_token;
}

async function graphGet(path) {
  const token = await getAccessToken();
  const res = await fetch(GRAPH_BASE + path, {
    headers: { Authorization: 'Bearer ' + token }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('Graph ' + res.status + (text ? ': ' + text.slice(0, 120) : ''));
  }
  return res.json();
}

async function initSync() {
  const siteKey = CONFIG.siteHost + ':' + CONFIG.sitePath;
  const siteData = await graphGet('/sites/' + siteKey);
  CONFIG.siteId = siteData.id;
  if (!CONFIG.siteId) {
    throw new Error('No se obtuvo siteId de SharePoint');
  }

  const drivesData = await graphGet('/sites/' + CONFIG.siteId + '/drives');
  const drives = drivesData.value || [];
  if (!drives.length || !drives[0].id) {
    throw new Error('No se encontró ninguna biblioteca (drive) en el sitio');
  }
  CONFIG.driveId = drives[0].id;
  return { siteId: CONFIG.siteId, driveId: CONFIG.driveId };
}

function setLoginError(message) {
  const el = document.getElementById('login-error');
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.hidden = false;
  } else {
    el.textContent = '';
    el.hidden = true;
  }
}

function setLoginSyncStatus(message, isError) {
  const el = document.getElementById('login-sync-status');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('login-sync-status--error', !!isError);
}

function setGraphInitChip(ok, detail) {
  const el = document.getElementById('graph-init-chip');
  if (!el) return;
  if (ok) {
    el.textContent = 'Graph: conectado';
    el.className = 'graph-init-chip graph-init-chip--ok';
    el.title = detail || '';
  } else if (detail) {
    el.textContent = 'Graph: error';
    el.className = 'graph-init-chip graph-init-chip--error';
    el.title = detail;
  } else {
    el.textContent = 'Graph: pendiente';
    el.className = 'graph-init-chip';
    el.title = '';
  }
}

function unlockApp() {
  document.body.classList.add('app-authenticated');
  const screen = document.getElementById('login-screen');
  if (screen) {
    screen.hidden = true;
    screen.setAttribute('aria-hidden', 'true');
  }
}

async function handleLoginSubmit(userId) {
  const pinInput = document.getElementById('login-pin');
  const pin = pinInput ? String(pinInput.value || '').trim() : '';

  setLoginError('');

  if (!/^\d{4}$/.test(pin)) {
    setLoginError('Introduce un PIN de 4 dígitos.');
    return;
  }
  if (pin !== CONFIG.pin) {
    setLoginError('PIN incorrecto.');
    if (pinInput) pinInput.value = '';
    return;
  }
  if (userId !== 'krum' && userId !== 'oscar') {
    setLoginError('Selecciona Krum u Óscar.');
    return;
  }

  try {
    sessionStorage.setItem('currentUser', userId);
  } catch (_) { /* ignore */ }

  unlockApp();

  if (typeof window.setActiveUser === 'function') {
    window.setActiveUser(userId);
  }

  setLoginSyncStatus('Obteniendo token y conectando con SharePoint…');

  try {
    await getAccessToken();
    const ids = await initSync();
    setLoginSyncStatus('Listo · siteId y driveId configurados');
    setGraphInitChip(true, 'site: ' + ids.siteId.slice(0, 12) + '…');
  } catch (err) {
    console.error(err);
    const msg = err && err.message ? err.message : String(err);
    setLoginSyncStatus('Token OK puede fallar en localhost (CORS). Error: ' + msg, true);
    setGraphInitChip(false, msg);
  }

  if (typeof window.startApp === 'function') {
    window.startApp();
  }
}

function initLoginScreen() {
  const screen = document.getElementById('login-screen');
  if (!screen) return;

  document.body.classList.remove('app-authenticated');

  const pinInput = document.getElementById('login-pin');
  if (pinInput) {
    pinInput.value = '';
    pinInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const focused = screen.querySelector('.login-user-btn:focus');
        if (focused && focused.dataset.user) {
          handleLoginSubmit(focused.dataset.user);
        }
      }
    });
  }

  screen.querySelectorAll('.login-user-btn[data-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      handleLoginSubmit(btn.dataset.user);
    });
  });

  setLoginError('');
  setLoginSyncStatus('Introduce el PIN y elige usuario');
  setGraphInitChip(false, '');
}

window.getCurrentUser = getCurrentUser;
window.getAccessToken = getAccessToken;
window.initSync = initSync;
window.initLoginScreen = initLoginScreen;

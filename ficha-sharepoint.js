/* Fichas ICEX — lectura/escritura SharePoint vía Microsoft Graph */
'use strict';

const FICHA_GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
const PHOTOS_PER_USER_LIMIT = 5;

function emptyUserEntry() {
  return {
    description: '',
    contacts: '',
    notes: '',
    photos: [],
    updatedAt: null
  };
}

function normalizeMeetingTypeValue(value) {
  if (value === 'b2b' || value === 'visita') return value;
  return null;
}

function normalizePhotosArray(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(p => p && (p.dataBase64 || p.data))
    .slice(0, PHOTOS_PER_USER_LIMIT)
    .map(p => ({
      dataBase64: p.dataBase64 || p.data || '',
      mime: p.mime || 'image/jpeg',
      name: p.name || 'foto.jpg',
      addedAt: p.addedAt || null
    }))
    .filter(p => p.dataBase64);
}

function defaultRemoteFicha(companyId, meta) {
  meta = meta || {};
  return {
    id: companyId,
    name: meta.name || '',
    nameZh: meta.nameZh || '',
    contactPerson: meta.contactPerson || '',
    role: meta.role || '',
    icexOffice: meta.icexOffice || meta.officeLabel || '',
    meetingType: null,
    isManual: !!meta.isManual,
    userEntries: {
      krum: emptyUserEntry(),
      oscar: emptyUserEntry()
    }
  };
}

function normalizeRemoteFicha(raw, companyId, meta) {
  const base = defaultRemoteFicha(companyId, meta);
  if (!raw || typeof raw !== 'object') return base;

  const merged = {
    id: raw.id || companyId,
    name: raw.name || base.name,
    nameZh: raw.nameZh || base.nameZh,
    contactPerson: raw.contactPerson || base.contactPerson,
    role: raw.role || base.role,
    icexOffice: raw.icexOffice != null ? raw.icexOffice : base.icexOffice,
    meetingType: raw.meetingType != null ? normalizeMeetingTypeValue(raw.meetingType) : null,
    isManual: raw.isManual === true || String(companyId).indexOf('otras-') === 0,
    userEntries: {
      krum: emptyUserEntry(),
      oscar: emptyUserEntry()
    }
  };

  ['krum', 'oscar'].forEach(userId => {
    const src = raw.userEntries && raw.userEntries[userId];
    if (!src || typeof src !== 'object') return;
    merged.userEntries[userId] = {
      description: typeof src.description === 'string' ? src.description : '',
      contacts: typeof src.contacts === 'string' ? src.contacts : '',
      notes: typeof src.notes === 'string' ? src.notes : '',
      photos: normalizePhotosArray(src.photos),
      updatedAt: src.updatedAt || null
    };
  });

  return merged;
}

function fichaContentPath(empresaId) {
  return (
    '/drives/' + CONFIG.driveId
    + '/root:/' + CONFIG.fichasPath + '/' + empresaId + '.json:/content'
  );
}

function fichaFolderPath() {
  return '/drives/' + CONFIG.driveId + '/root:/' + CONFIG.fichasPath + ':/children';
}

async function graphFetch(path, options) {
  if (!CONFIG.driveId) {
    throw new Error('SharePoint no inicializado (falta driveId). Vuelve a iniciar sesión.');
  }
  const token = await getAccessToken();
  return fetch(FICHA_GRAPH_BASE + path, Object.assign({}, options || {}, {
    headers: Object.assign(
      { Authorization: 'Bearer ' + token },
      (options && options.headers) || {}
    )
  }));
}

async function getRemoteFicha(empresaId) {
  const res = await graphFetch(fichaContentPath(empresaId));
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('No se pudo leer la ficha (HTTP ' + res.status + ')' + (text ? ': ' + text.slice(0, 80) : ''));
  }
  return res.json();
}

async function putRemoteFicha(empresaId, ficha) {
  const res = await graphFetch(fichaContentPath(empresaId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ficha)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('No se pudo guardar la ficha (HTTP ' + res.status + ')' + (text ? ': ' + text.slice(0, 80) : ''));
  }
}

async function deleteRemoteFicha(empresaId) {
  const res = await graphFetch(fichaContentPath(empresaId), { method: 'DELETE' });
  if (res.status === 404) return;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('No se pudo eliminar la ficha (HTTP ' + res.status + ')' + (text ? ': ' + text.slice(0, 80) : ''));
  }
}

async function listRemoteFichaIds() {
  const res = await graphFetch(fichaFolderPath());
  if (res.status === 404) return [];
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('No se pudo listar fichas (HTTP ' + res.status + ')' + (text ? ': ' + text.slice(0, 80) : ''));
  }
  const data = await res.json();
  return (data.value || [])
    .filter(item => item.name && /\.json$/i.test(item.name))
    .map(item => item.name.replace(/\.json$/i, ''));
}

function mergeFichaForSave(remote, formState, currentUser) {
  const companyId = formState.companyId;
  const merged = normalizeRemoteFicha(remote, companyId, formState.meta);

  if (formState.meetingType !== undefined) {
    const mt = formState.meetingType;
    merged.meetingType = mt === '' || mt == null ? null : normalizeMeetingTypeValue(mt);
  }

  const touchUser =
    formState.myDescription !== undefined
    || formState.myContacts !== undefined
    || formState.myNotes !== undefined
    || formState.myPhotos !== undefined;

  if (touchUser && (currentUser === 'krum' || currentUser === 'oscar')) {
    const entry = merged.userEntries[currentUser];
    if (formState.myDescription !== undefined) entry.description = formState.myDescription;
    if (formState.myContacts !== undefined) entry.contacts = formState.myContacts;
    if (formState.myNotes !== undefined) entry.notes = formState.myNotes;
    if (formState.myPhotos !== undefined) {
      entry.photos = normalizePhotosArray(formState.myPhotos);
    }
    entry.updatedAt = new Date().toISOString();
  }

  if (formState.name !== undefined) merged.name = formState.name;
  if (formState.nameZh !== undefined) merged.nameZh = formState.nameZh;
  if (formState.contactPerson !== undefined) merged.contactPerson = formState.contactPerson;
  if (formState.role !== undefined) merged.role = formState.role;
  if (formState.isManual !== undefined) merged.isManual = !!formState.isManual;
  if (formState.icexOffice !== undefined) merged.icexOffice = formState.icexOffice;

  return merged;
}

async function saveFichaAtomic(empresaId, formState) {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Usuario no identificado');
  const remote = await getRemoteFicha(empresaId);
  const merged = mergeFichaForSave(remote, Object.assign({ companyId: empresaId }, formState), currentUser);
  await putRemoteFicha(empresaId, merged);
  return merged;
}

async function convertLegacyIndexedDbRecord(record, currentUser, meta, blobToBase64Fn) {
  const ficha = defaultRemoteFicha(record.companyId, meta);
  const photos = [];
  if (Array.isArray(record.photos) && blobToBase64Fn) {
    for (let i = 0; i < record.photos.length && photos.length < PHOTOS_PER_USER_LIMIT; i++) {
      const p = record.photos[i];
      if (!p || !p.blob) continue;
      photos.push({
        dataBase64: await blobToBase64Fn(p.blob),
        mime: p.blob.type || 'image/jpeg',
        name: p.name || 'foto.jpg',
        addedAt: p.addedAt || Date.now()
      });
    }
  }

  if (currentUser === 'krum' || currentUser === 'oscar') {
    const entry = ficha.userEntries[currentUser];
    entry.description = typeof record.description === 'string' ? record.description : '';
    entry.contacts = typeof record.contacts === 'string' ? record.contacts : '';
    entry.notes = typeof record.notes === 'string' ? record.notes : '';
    entry.photos = photos;
    entry.updatedAt = new Date().toISOString();
  }

  const mt = record.meetingType;
  ficha.meetingType = mt === 'b2b' || mt === 'visita' ? mt : null;
  return normalizeRemoteFicha(ficha, record.companyId, meta);
}

async function migrateAllLocalFichasToSharePoint(getLocalRecords, getMetaForCompany, blobToBase64Fn, onProgress) {
  const records = await getLocalRecords();
  const total = records.length;
  let done = 0;

  for (const record of records) {
    done += 1;
    if (onProgress) onProgress(done, total, record.companyId);
    const meta = getMetaForCompany(record.companyId) || {};
    const currentUser = getCurrentUser();
    const ficha = await convertLegacyIndexedDbRecord(record, currentUser, meta, blobToBase64Fn);
    await putRemoteFicha(record.companyId, ficha);
  }

  return { migrated: total };
}

window.emptyUserEntry = emptyUserEntry;
window.defaultRemoteFicha = defaultRemoteFicha;
window.normalizeRemoteFicha = normalizeRemoteFicha;
window.getRemoteFicha = getRemoteFicha;
window.putRemoteFicha = putRemoteFicha;
window.listRemoteFichaIds = listRemoteFichaIds;
window.deleteRemoteFicha = deleteRemoteFicha;
window.mergeFichaForSave = mergeFichaForSave;
window.saveFichaAtomic = saveFichaAtomic;
window.migrateAllLocalFichasToSharePoint = migrateAllLocalFichasToSharePoint;
window.PHOTOS_PER_USER_LIMIT = PHOTOS_PER_USER_LIMIT;

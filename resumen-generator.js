/* Resumen del día — generación Word y subida a SharePoint */
'use strict';

const RESUMEN_GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const FONT_MAIN = 'Calibri';
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_PHOTO_WIDTH_PX = Math.round((12 / 2.54) * 96);

let pendingDownloadBlob = null;
let pendingDownloadFilename = null;

function userDisplayName(userId) {
  if (userId === 'krum') return 'Krum';
  if (userId === 'oscar') return 'Óscar';
  return userId || '';
}

function setResumenStatus(text, isError) {
  const el = document.getElementById('resumen-dia-status');
  if (!el) return;
  el.textContent = text || '';
  el.classList.toggle('resumen-dia-status--error', !!isError);
}

function formatLocalYmd(date) {
  const d = date || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function formatFilenameDate(date) {
  const d = date || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return '' + y + m + day;
}

function formatDateLongSpanish(date) {
  const d = date || new Date();
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function formatDateTimeSpanish(date) {
  const d = date || new Date();
  return d.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function isUpdatedOnLocalDay(isoString, ymdToday) {
  if (!isoString) return false;
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return false;
  return formatLocalYmd(d) === ymdToday;
}

function fichaTouchedToday(ficha, ymdToday) {
  const ue = ficha.userEntries || {};
  return (
    isUpdatedOnLocalDay(ue.krum && ue.krum.updatedAt, ymdToday)
    || isUpdatedOnLocalDay(ue.oscar && ue.oscar.updatedAt, ymdToday)
  );
}

function photoHasPayload(photo) {
  if (!photo || typeof photo !== 'object') return false;
  const raw = photo.dataBase64 || photo.data;
  return typeof raw === 'string' && raw.trim().length > 0;
}

function countValidPhotos(photos) {
  return (photos || []).filter(photoHasPayload).length;
}

function countPhotosBreakdown(ficha) {
  const ue = ficha.userEntries || {};
  const krum = countValidPhotos(ue.krum && ue.krum.photos);
  const oscar = countValidPhotos(ue.oscar && ue.oscar.photos);
  return { total: krum + oscar, krum, oscar };
}

function countPhotosInFicha(ficha) {
  return countPhotosBreakdown(ficha).total;
}

function formatPhotoCountForTable(ficha) {
  const counts = countPhotosBreakdown(ficha);
  if (counts.total === 0) return '0';
  return counts.total + ' (Krum: ' + counts.krum + ' · Óscar: ' + counts.oscar + ')';
}

function parsePhotoPayload(photo) {
  if (!photoHasPayload(photo)) return null;
  let b64 = String(photo.dataBase64 || photo.data || '').trim();
  let mime = photo.mime || 'image/jpeg';
  if (b64.indexOf('data:') === 0) {
    const match = /^data:([^;]+);base64,(.+)$/i.exec(b64);
    if (match) {
      mime = match[1];
      b64 = match[2];
    }
  }
  b64 = b64.replace(/\s/g, '');
  if (!b64) return null;
  return { b64, mime };
}

function estimateBase64Bytes(b64) {
  return Math.floor((b64.length * 3) / 4);
}

function toDataUri(parsed) {
  return 'data:' + parsed.mime + ';base64,' + parsed.b64;
}

function loadImageDimensions(dataUri) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || 1,
        height: img.naturalHeight || 1
      });
    };
    img.onerror = () => reject(new Error('No se pudo decodificar la imagen'));
    img.src = dataUri;
  });
}

function scaleToMaxWidth(naturalW, naturalH, maxW) {
  if (naturalW <= maxW) {
    return { width: Math.round(naturalW), height: Math.round(naturalH) };
  }
  const ratio = maxW / naturalW;
  return {
    width: Math.round(maxW),
    height: Math.round(naturalH * ratio)
  };
}

function collectPhotosOrdered(ficha) {
  const ue = ficha.userEntries || {};
  const items = [];
  ['krum', 'oscar'].forEach(userId => {
    const entry = ue[userId];
    (entry && entry.photos ? entry.photos : []).forEach(photo => {
      if (photoHasPayload(photo)) {
        items.push({ userId, photo });
      }
    });
  });
  return items;
}

async function buildSinglePhotoBlocks(userId, photo) {
  const docx = getDocxApi();
  const parsed = parsePhotoPayload(photo);
  if (!parsed) {
    return { paragraphs: [], omitted: 0 };
  }

  const authorLabel = 'Foto de ' + userDisplayName(userId);
  const caption = () => new docx.Paragraph({
    alignment: docx.AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [textRun(authorLabel, { italics: true, color: '888888', size: 18 })]
  });

  if (estimateBase64Bytes(parsed.b64) > MAX_PHOTO_BYTES) {
    return {
      paragraphs: [
        bodyParagraph([
          textRun('[foto demasiado grande, ver en la app]', { italics: true, color: '888888' })
        ], { alignment: docx.AlignmentType.CENTER }),
        caption()
      ],
      omitted: 1
    };
  }

  const dataUri = toDataUri(parsed);

  try {
    const dims = await loadImageDimensions(dataUri);
    const size = scaleToMaxWidth(dims.width, dims.height, MAX_PHOTO_WIDTH_PX);
    const imagePara = new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [
        new docx.ImageRun({
          data: dataUri,
          transformation: {
            width: size.width,
            height: size.height
          }
        })
      ]
    });
    return { paragraphs: [imagePara, caption()], omitted: 0 };
  } catch (_) {
    return { paragraphs: [], omitted: 1 };
  }
}

async function buildFotosSection(ficha) {
  const items = collectPhotosOrdered(ficha);
  if (!items.length) return { paragraphs: [], omitted: 0 };

  const docx = getDocxApi();
  const paragraphs = [
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [textRun('FOTOS', { bold: true, size: 28 })]
    })
  ];
  let omitted = 0;

  for (let i = 0; i < items.length; i++) {
    const result = await buildSinglePhotoBlocks(items[i].userId, items[i].photo);
    result.paragraphs.forEach(p => paragraphs.push(p));
    omitted += result.omitted;
  }

  return { paragraphs, omitted };
}

function meetingTypeLabel(type) {
  if (type === 'b2b') return 'B2B';
  if (type === 'visita') return 'Visita';
  return 'Sin especificar';
}

function trimText(s) {
  return String(s || '').trim();
}

function combineUserBlocks(krumText, oscarText) {
  const k = trimText(krumText);
  const o = trimText(oscarText);
  if (k && o) {
    return { mode: 'both', krum: k, oscar: o };
  }
  if (k) return { mode: 'single', text: k };
  if (o) return { mode: 'single', text: o };
  return { mode: 'empty' };
}

function resumenDocxPath(fileName) {
  return (
    '/drives/' + CONFIG.driveId
    + '/root:/' + CONFIG.reunionesPath + '/' + fileName + ':/content'
  );
}

async function putResumenDocx(blob, fileName) {
  if (!CONFIG.driveId) {
    throw new Error('SharePoint no inicializado (falta driveId).');
  }
  const token = await getAccessToken();
  const res = await fetch(RESUMEN_GRAPH_BASE + resumenDocxPath(fileName), {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': DOCX_MIME
    },
    body: blob
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      'No se pudo subir el resumen (HTTP ' + res.status + ')'
      + (text ? ': ' + text.slice(0, 80) : '')
    );
  }
}

async function fetchFichasForResumen(ymdToday) {
  const ids = await listRemoteFichaIds();
  if (!ids.length) {
    return { fichas: [], failedIds: [] };
  }

  const settled = await Promise.allSettled(
    ids.map(id => getRemoteFicha(id).then(ficha => ({ id, ficha })))
  );

  const fichas = [];
  const failedIds = [];

  settled.forEach((result, index) => {
    const id = ids[index];
    if (result.status === 'rejected') {
      failedIds.push(id);
      return;
    }
    const { ficha } = result.value;
    if (ficha == null) return;
    if (fichaTouchedToday(ficha, ymdToday)) {
      fichas.push(ficha);
    }
  });

  fichas.sort((a, b) => String(a.name || a.id || '').localeCompare(
    String(b.name || b.id || ''),
    'es',
    { sensitivity: 'base' }
  ));

  return { fichas, failedIds };
}

function computeStats(fichas) {
  let b2b = 0;
  let visita = 0;
  let photos = 0;
  fichas.forEach(f => {
    if (f.meetingType === 'b2b') b2b += 1;
    else if (f.meetingType === 'visita') visita += 1;
    photos += countPhotosInFicha(f);
  });
  return {
    total: fichas.length,
    b2b,
    visita,
    photos
  };
}

function getDocxApi() {
  if (!window.docx) {
    throw new Error('La librería docx no está cargada.');
  }
  return window.docx;
}

function bodyParagraph(children, options) {
  const docx = getDocxApi();
  return new docx.Paragraph(Object.assign({
    spacing: { line: 276, after: 120 },
    children: children
  }, options || {}));
}

function textRun(text, opts) {
  const docx = getDocxApi();
  return new docx.TextRun(Object.assign({
    text: text,
    font: FONT_MAIN,
    size: 22
  }, opts || {}));
}

function sectionLabelParagraph(label) {
  return bodyParagraph([
    textRun(label, { bold: true, size: 22 })
  ], { spacing: { before: 200, after: 80, line: 276 } });
}

function combinedContentParagraphs(combined) {
  const docx = getDocxApi();
  const paras = [];
  if (combined.mode === 'empty') {
    paras.push(bodyParagraph([textRun('(Sin contenido)')]));
    return paras;
  }
  if (combined.mode === 'single') {
    paras.push(bodyParagraph([textRun(combined.text)]));
    return paras;
  }
  paras.push(new docx.Paragraph({
    spacing: { line: 276, after: 80 },
    children: [
      textRun('[Krum] ', { bold: true }),
      textRun(combined.krum)
    ]
  }));
  paras.push(new docx.Paragraph({
    spacing: { line: 276, after: 120 },
    children: [
      textRun('[Óscar] ', { bold: true }),
      textRun(combined.oscar)
    ]
  }));
  return paras;
}

function metadataTable(ficha) {
  const docx = getDocxApi();
  const cell = (txt, bold) => {
    const safe = txt == null ? '' : String(txt);
    return new docx.TableCell({
      children: [new docx.Paragraph({
        children: [textRun(safe, bold ? { bold: true } : {})]
      })]
    });
  };
  const rows = [
    ['Tipo de reunión', meetingTypeLabel(ficha.meetingType)],
    ['Oficina ICEX', ficha.icexOffice || '—'],
    ['Nº de fotos', formatPhotoCountForTable(ficha)]
  ].map(([label, value]) => new docx.TableRow({
    children: [cell(label, true), cell(value, false)]
  }));

  return new docx.Table({
    width: { size: 100, type: docx.WidthType.PERCENTAGE },
    rows: rows
  });
}

function summaryStatsTable(stats) {
  const docx = getDocxApi();
  const cell = (txt, bold) => new docx.TableCell({
    children: [new docx.Paragraph({
      children: [textRun(txt, bold ? { bold: true } : {})]
    })]
  });
  const data = [
    ['Total empresas tocadas hoy', String(stats.total)],
    ['Reuniones B2B', String(stats.b2b)],
    ['Visitas técnicas', String(stats.visita)]
  ];
  return new docx.Table({
    width: { size: 100, type: docx.WidthType.PERCENTAGE },
    rows: data.map(([label, value]) => new docx.TableRow({
      children: [cell(label, true), cell(value, false)]
    }))
  });
}

function horizontalSeparator() {
  const docx = getDocxApi();
  return new docx.Paragraph({
    spacing: { before: 240, after: 240 },
    border: {
      bottom: {
        color: 'CCCCCC',
        space: 1,
        style: docx.BorderStyle.SINGLE,
        size: 6
      }
    },
    children: [textRun('')]
  });
}

async function buildResumenDocument(fichas, stats, meta) {
  const docx = getDocxApi();
  const children = [];
  let omittedPhotosCount = 0;

  children.push(
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [textRun('Resumen del día', { bold: true, size: 48 })]
    }),
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [textRun('Misión Comercial China — Junio 2026', { size: 24, color: '444444' })]
    }),
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [textRun(meta.dateLong, { size: 24, italics: true })]
    })
  );

  for (let index = 0; index < fichas.length; index++) {
    const ficha = fichas[index];
    const ue = ficha.userEntries || {};
    const krum = ue.krum || {};
    const oscar = ue.oscar || {};
    const subtitleParts = [];
    if (ficha.nameZh) subtitleParts.push(ficha.nameZh);
    const contactLine = [ficha.contactPerson, ficha.role].filter(Boolean).join(', ');
    if (contactLine) subtitleParts.push(contactLine);
    const subtitle = subtitleParts.join(' · ');

    children.push(
      new docx.Paragraph({
        heading: docx.HeadingLevel.HEADING_1,
        spacing: { before: index === 0 ? 0 : 280, after: 80 },
        children: [textRun(ficha.name || ficha.id || 'Empresa', { bold: true, size: 32 })]
      })
    );

    if (subtitle) {
      children.push(
        new docx.Paragraph({
          spacing: { after: 160 },
          children: [textRun(subtitle, { italics: true, color: '666666', size: 22 })]
        })
      );
    }

    children.push(metadataTable(ficha));
    children.push(new docx.Paragraph({ spacing: { after: 160 }, children: [textRun('')] }));

    children.push(sectionLabelParagraph('DESCRIPCIÓN DE LA EMPRESA'));
    combinedContentParagraphs(combineUserBlocks(krum.description, oscar.description))
      .forEach(p => children.push(p));

    children.push(sectionLabelParagraph('CONTACTOS'));
    combinedContentParagraphs(combineUserBlocks(krum.contacts, oscar.contacts))
      .forEach(p => children.push(p));

    children.push(sectionLabelParagraph('NOTAS'));
    combinedContentParagraphs(combineUserBlocks(krum.notes, oscar.notes))
      .forEach(p => children.push(p));

    const fotos = await buildFotosSection(ficha);
    omittedPhotosCount += fotos.omitted;
    fotos.paragraphs.forEach(p => children.push(p));

    if (index < fichas.length - 1) {
      children.push(horizontalSeparator());
    }
  }

  children.push(
    new docx.Paragraph({
      spacing: { before: 480, after: 200 },
      children: [textRun('')]
    }),
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_1,
      spacing: { after: 200 },
      children: [textRun('Resumen del día', { bold: true, size: 32 })]
    }),
    summaryStatsTable(stats),
    new docx.Paragraph({ spacing: { before: 200, after: 80 }, children: [textRun('')] }),
    bodyParagraph([textRun('Fotos totales subidas hoy: ' + stats.photos)]),
    bodyParagraph([
      textRun(
        'Documento generado el ' + meta.generatedAt
        + ' por ' + meta.generatedBy
      )
    ])
  );

  if (meta.failedCount > 0) {
    children.push(
      bodyParagraph([
        textRun(
          'Nota: no se pudo recuperar la información de '
          + meta.failedCount
          + ' empresa(s).',
          { italics: true, color: '666666' }
        )
      ], { spacing: { before: 240 } })
    );
  }

  if (omittedPhotosCount > 0) {
    children.push(
      bodyParagraph([
        textRun(
          'Nota: ' + omittedPhotosCount + ' foto(s) no se pudieron incluir en el documento '
          + '(formato no soportado o tamaño excesivo). Disponibles en la app.',
          { italics: true, color: '666666' }
        )
      ], { spacing: { before: meta.failedCount > 0 ? 80 : 240 } })
    );
  }

  return new docx.Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT_MAIN,
            size: 22
          },
          paragraph: {
            spacing: { line: 276 }
          }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top: docx.convertInchesToTwip(1),
            right: docx.convertInchesToTwip(1),
            bottom: docx.convertInchesToTwip(1),
            left: docx.convertInchesToTwip(1)
          }
        }
      },
      children: children
    }]
  });
}

async function buildDocxBlob(document) {
  const docx = getDocxApi();
  return docx.Packer.toBlob(document);
}

function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 5000);
}

function showResumenDownloadModal(blob, fileName) {
  pendingDownloadBlob = blob;
  pendingDownloadFilename = fileName;
  const modal = document.getElementById('resumen-download-modal');
  if (!modal) return;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('resumen-modal-open');
}

function hideResumenDownloadModal() {
  const modal = document.getElementById('resumen-download-modal');
  if (modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('resumen-modal-open');
  pendingDownloadBlob = null;
  pendingDownloadFilename = null;
}

async function generateDailyResumen() {
  const btn = document.getElementById('btn-generar-resumen-dia');
  if (btn && btn.disabled) return;

  if (!window.docx) {
    setResumenStatus('No se cargó la librería docx. Actualiza la aplicación.', true);
    return;
  }

  if (btn) btn.disabled = true;
  setResumenStatus('Generando resumen…');

  const now = new Date();
  const ymdToday = formatLocalYmd(now);
  const fileName = 'resumen-' + formatFilenameDate(now) + '.docx';

  try {
    const { fichas, failedIds } = await fetchFichasForResumen(ymdToday);

    if (!fichas.length) {
      setResumenStatus('No has actualizado ninguna ficha hoy');
      return;
    }

    const stats = computeStats(fichas);
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : '';
    setResumenStatus('Generando documento Word…');
    const doc = await buildResumenDocument(fichas, stats, {
      dateLong: formatDateLongSpanish(now),
      generatedAt: formatDateTimeSpanish(now),
      generatedBy: userDisplayName(currentUser) || 'Usuario',
      failedCount: failedIds.length
    });

    const blob = await buildDocxBlob(doc);
    await putResumenDocx(blob, fileName);

    setResumenStatus('Resumen guardado en SharePoint (' + fileName + ').');
    showResumenDownloadModal(blob, fileName);
  } catch (err) {
    console.error(err);
    const msg = err && err.message ? err.message : String(err);
    if (/subir|SharePoint|HTTP|conexión|network|fetch/i.test(msg)) {
      setResumenStatus('No se ha podido guardar en SharePoint. Reintenta cuando tengas conexión.', true);
    } else {
      setResumenStatus('Error al generar el resumen: ' + msg, true);
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

function initResumenDownloadModal() {
  const modal = document.getElementById('resumen-download-modal');
  if (!modal || modal.dataset.bound === '1') return;
  modal.dataset.bound = '1';

  const backdrop = document.getElementById('resumen-download-backdrop');
  const btnYes = document.getElementById('resumen-download-yes');
  const btnNo = document.getElementById('resumen-download-no');

  const close = () => hideResumenDownloadModal();

  if (backdrop) backdrop.addEventListener('click', close);
  if (btnNo) btnNo.addEventListener('click', close);
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      if (pendingDownloadBlob && pendingDownloadFilename) {
        triggerDownload(pendingDownloadBlob, pendingDownloadFilename);
      }
      close();
    });
  }
}

function initResumenGenerator() {
  initResumenDownloadModal();
  const btn = document.getElementById('btn-generar-resumen-dia');
  if (!btn || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => {
    generateDailyResumen();
  });
}

window.initResumenGenerator = initResumenGenerator;
window.generateDailyResumen = generateDailyResumen;

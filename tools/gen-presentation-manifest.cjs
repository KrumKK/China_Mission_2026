const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const presBase = path.join(root, 'Presentaciones');

const folders = [
  ['Presentaciones/diversificacion/div-es', path.join(presBase, 'diversificacion/div-es')],
  ['Presentaciones/diversificacion/div-zh', path.join(presBase, 'diversificacion/div-zh')],
  ['Presentaciones/diversificacion/div-en', path.join(presBase, 'diversificacion/div-en')],
  ['Presentaciones/oem-tier1/oem-es', path.join(presBase, 'oem-tier1/oem-es')],
  ['Presentaciones/oem-tier1/oem-ch', path.join(presBase, 'oem-tier1/oem-ch')],
  ['Presentaciones/oem-tier1/oem-en', path.join(presBase, 'oem-tier1/oem-en')]
];

const manifest = {};

for (const [key, dir] of folders) {
  if (!fs.existsSync(dir)) {
    console.warn('missing', key);
    continue;
  }
  const nums = fs.readdirSync(dir)
    .filter(f => /^Diapositiva\d+\.JPG$/i.test(f))
    .map(f => parseInt(f.match(/\d+/)[0], 10))
    .sort((a, b) => a - b);
  manifest[key] = nums.map(n => 'Diapositiva' + n + '.JPG');
  console.log(key, manifest[key].length);
}

const out = path.join(root, 'presentations-slides-manifest.js');
const body = [
  '/* Auto-generado · diapositivas JPG por carpeta · Build 78 */',
  '(function (root) {',
  '  var PRESENTATION_SLIDE_MANIFEST = ' + JSON.stringify(manifest, null, 2) + ';',
  '  root.PRESENTATION_SLIDE_MANIFEST = PRESENTATION_SLIDE_MANIFEST;',
  '  if (typeof self !== "undefined" && self !== root) self.PRESENTATION_SLIDE_MANIFEST = PRESENTATION_SLIDE_MANIFEST;',
  '})(typeof self !== "undefined" ? self : this);',
  ''
].join('\n');

fs.writeFileSync(out, body);
console.log('written', out);

// Converts the PHP data arrays from the original WordPress theme into JSON.
// Usage: node scripts/convert-php.mjs
// Reads scripts/php-source/*.php, writes src/data/generated/*.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'scripts', 'php-source');
const outDir = path.join(root, 'src', 'data', 'generated');
fs.mkdirSync(outDir, { recursive: true });

const NAMED = { bull: '•', mdash: '—', ndash: '–', hellip: '…', rarr: '→', larr: '←', middot: '·', rsaquo: '›', amp: '&', nbsp: ' ', quot: '"' };
function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => (n in NAMED ? NAMED[n] : m));
}

/** Parse a PHP array literal starting at src[i] === '['. Returns [value, nextIndex]. */
function parseValue(src, i) {
  i = skip(src, i);
  const ch = src[i];
  if (ch === '[') return parseArray(src, i);
  if (ch === "'") return parseSingle(src, i);
  if (ch === '"') return parseDouble(src, i);
  if (src.startsWith("<<<'", i)) return parseNowdoc(src, i);
  const m = /^(true|false|null|-?\d+(?:\.\d+)?)/.exec(src.slice(i, i + 40));
  if (m) return [JSON.parse(m[1]), i + m[1].length];
  throw new Error('Unexpected token at ' + i + ': ' + src.slice(i, i + 60));
}
function skip(src, i) {
  for (;;) {
    while (/\s/.test(src[i])) i++;
    if (src.startsWith('/*', i)) { i = src.indexOf('*/', i) + 2; continue; }
    if (src.startsWith('//', i)) { i = src.indexOf('\n', i) + 1; continue; }
    return i;
  }
}
function parseSingle(src, i) {
  let out = ''; i++;
  while (src[i] !== "'") {
    if (src[i] === '\\' && (src[i + 1] === "'" || src[i + 1] === '\\')) { out += src[i + 1]; i += 2; }
    else out += src[i++];
  }
  return [out, i + 1];
}
function parseDouble(src, i) {
  let out = ''; i++;
  while (src[i] !== '"') {
    if (src[i] === '\\') { const n = src[i + 1]; out += n === 'n' ? '\n' : n; i += 2; }
    else out += src[i++];
  }
  return [out, i + 1];
}
function parseNowdoc(src, i) {
  const m = /^<<<'(\w+)'\r?\n/.exec(src.slice(i));
  const tag = m[1];
  const start = i + m[0].length;
  const endRe = new RegExp('\\r?\\n[ \\t]*' + tag + '\\b', 'g');
  endRe.lastIndex = start;
  const e = endRe.exec(src);
  return [src.slice(start, e.index).replace(/\r\n/g, '\n'), e.index + e[0].length];
}
function parseArray(src, i) {
  i++;
  const list = []; const obj = {}; let isAssoc = false;
  for (;;) {
    i = skip(src, i);
    if (src[i] === ']') { i++; break; }
    let [v, j] = parseValue(src, i);
    j = skip(src, j);
    if (src.startsWith('=>', j)) {
      isAssoc = true;
      const [val, k] = parseValue(src, j + 2);
      obj[v] = val; j = k;
    } else list.push(v);
    j = skip(src, j);
    if (src[j] === ',') j++;
    i = j;
  }
  return [isAssoc ? obj : list, i];
}

/** All `return [...]` arrays inside the named function, in order. */
function fnReturns(file, fn) {
  const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const start = src.indexOf('function ' + fn + '(');
  if (start < 0) throw new Error(fn + ' not found in ' + file);
  const next = src.indexOf('\nfunction ', start + 10);
  const body = src.slice(start, next < 0 ? undefined : next);
  const res = []; let idx = 0;
  while ((idx = body.indexOf('return [', idx)) >= 0) {
    res.push(parseValue(body, idx + 7)[0]);
    idx += 8;
  }
  return res;
}

// Short data fields: decode HTML entities (icons, &bull; etc.). Long-form html stays as markup.
function decodeDeep(v) {
  if (typeof v === 'string') return decodeEntities(v);
  if (Array.isArray(v)) return v.map(decodeDeep);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'html' ? x : decodeDeep(x)]));
  return v;
}

const write = (name, data) => {
  fs.writeFileSync(path.join(outDir, name + '.json'), JSON.stringify(decodeDeep(data), null, 1) + '\n');
  console.log('wrote', name);
};

write('cities', fnReturns('functions.php', 'mrseo_get_cities')[0]);
write('industries', fnReturns('functions.php', 'mrseo_get_industries')[0]);
write('services', fnReturns('functions.php', 'mrseo_get_services')[0]);
write('courses', fnReturns('functions.php', 'mrseo_get_courses')[0]);
const inc = fnReturns('functions.php', 'mrseo_course_includes');
write('course-includes', { short: inc[0], pro: inc[1] });
write('city-content', fnReturns('content-cities.php', 'mrseo_city_content_all')[0]);
write('industry-content', fnReturns('content-industries.php', 'mrseo_industry_content_all')[0]);
write('service-content', fnReturns('content-services.php', 'mrseo_service_content_all')[0]);
write('course-content', fnReturns('content-courses.php', 'mrseo_course_content_all')[0]);
write('faqs', {
  home: fnReturns('content-render.php', 'mrseo_home_faqs')[0],
  contact: fnReturns('content-render.php', 'mrseo_contact_faqs')[0],
  courses: fnReturns('content-render.php', 'mrseo_courses_faqs')[0],
});

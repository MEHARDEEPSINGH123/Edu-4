import fs from 'fs';
import path from 'path';

const datasetPath = path.resolve('./src/data/ascendra_dataset.json');
const raw = fs.readFileSync(datasetPath, 'utf-8');
const dataset = JSON.parse(raw);

const urlMap = new Map();

function scan(obj, pathStr) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.startsWith('https://images.unsplash.com/')) {
      const baseId = obj.split('?')[0];
      if (!urlMap.has(baseId)) {
        urlMap.set(baseId, []);
      }
      urlMap.get(baseId).push(pathStr);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => scan(item, `${pathStr}[${idx}]`));
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((key) => scan(obj[key], `${pathStr}.${key}`));
  }
}

scan(dataset, 'root');

console.log('Total unique images in dataset:', urlMap.size);

let duplicates = 0;
for (const [id, locations] of urlMap.entries()) {
  if (locations.length > 1) {
    duplicates++;
    console.warn(`DUPLICATE FOUND (${locations.length}x): ${id}`);
    locations.forEach(loc => console.warn(`   → at ${loc}`));
  }
}

if (duplicates === 0) {
  console.log('PERFECT! Zero duplicate images found across the entire dataset.');
} else {
  console.log(`Found ${duplicates} duplicates that need fixing.`);
}

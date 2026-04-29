import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';

const svgDir = './src/assets/titles'; 
const outputFile = './src/utils/iconData.js';

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));
const iconData = {};

files.forEach(file => {
  const name = path.parse(file).name;
  const rawSvg = fs.readFileSync(path.join(svgDir, file), 'utf8');
  
  // 1. Get ViewBox (Safe)
  const viewBoxMatch = rawSvg.match(/viewBox="([\d\s\.\-]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 100 100";
  
  // 2. Get Path (Specific: looks for 'd="' followed by 'm' or 'M')
  // This prevents it from grabbing id="svg1"
  const pathMatch = rawSvg.match(/d="([mM][^"]+)"/);
  const pathData = pathMatch ? pathMatch[1] : "";
  
  // 3. Get Transform (Specifically look for the group translate)
  const transformMatch = rawSvg.match(/transform="([^"]+)"/);
  const transform = transformMatch ? transformMatch[1] : "";

  iconData[name] = { viewBox, path: pathData, transform };
});

const fileContent = `export const icons = ${JSON.stringify(iconData, null, 2)};`;
fs.writeFileSync(outputFile, fileContent);
console.log('✅ Icons processed and saved to iconData.js');
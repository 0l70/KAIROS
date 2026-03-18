const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all .vue and .js files with conflicts
const output = execSync('grep -r "<<<<<<< HEAD" frontend/src --include="*.vue" --include="*.js" -l', { cwd: process.cwd() }).toString().trim();
const files = output.split('\n').filter(Boolean);

console.log('Files with conflicts:', files);

files.forEach(filepath => {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const out = [];
  let state = 'normal';

  for (const line of lines) {
    if (line.trim().startsWith('<<<<<<< HEAD')) {
      state = 'head';
    } else if (line.trim() === '=======') {
      state = 'incoming';
    } else if (line.trim().startsWith('>>>>>>>')) {
      state = 'normal';
    } else {
      if (state === 'normal' || state === 'head') {
        out.push(line);
      }
    }
  }
  fs.writeFileSync(filepath, out.join('\n'));
  console.log('Resolved:', filepath);
});

console.log('All done!');

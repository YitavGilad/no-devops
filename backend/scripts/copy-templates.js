const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, '..', 'src', 'templates');
const destDir = path.join(__dirname, '..', 'dist', 'templates');

// Copy templates to dist
fs.copySync(srcDir, destDir, {
  overwrite: true,
  errorOnExist: false,
  dereference: true,
  preserveTimestamps: true,
});

console.log('Templates copied successfully to dist/templates');

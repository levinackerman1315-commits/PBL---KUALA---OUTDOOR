// Script to fix ALL hardcoded localhost URLs in the project
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Scanning for hardcoded localhost URLs...\n');

// Find all TypeScript/TSX files in src
const files = glob.sync('src/**/*.{ts,tsx}', { cwd: __dirname });

let totalFiles = 0;
let totalReplacements = 0;
const fixedFiles = [];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Count occurrences before replacement
  const matches = (content.match(/http:\/\/localhost\/PBL-KELANA-OUTDOOR/g) || []).length;
  
  if (matches > 0) {
    // Replace hardcoded localhost with environment variable usage
    // Pattern 1: Direct URL strings
    content = content.replace(
      /['"`]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api/g,
      '`${API_BASE_URL}'
    );
    
    // Pattern 2: For base URLs without /api
    content = content.replace(
      /['"`]http:\/\/localhost\/PBL-KELANA-OUTDOOR['"`;]/g,
      match => {
        if (match.includes('/api')) return match;
        return '`${UPLOADS_BASE_URL}';
      }
    );
    
    // Pattern 3: Concatenated URLs
    content = content.replace(
      /`http:\/\/localhost\/PBL-KELANA-OUTDOOR([^`]*)`/g,
      '`${UPLOADS_BASE_URL}$1`'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFiles++;
      totalReplacements += matches;
      fixedFiles.push({ file, count: matches });
      console.log(`✅ ${file} - ${matches} replacements`);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY:');
console.log('='.repeat(60));
console.log(`Total files fixed: ${totalFiles}`);
console.log(`Total replacements: ${totalReplacements}`);
console.log('\n📝 Fixed files:');
fixedFiles.forEach(({ file, count }) => {
  console.log(`  - ${file} (${count} changes)`);
});

if (totalFiles === 0) {
  console.log('✨ No hardcoded localhost URLs found! All clean! ✅');
} else {
  console.log('\n✅ All localhost URLs have been replaced with environment variables!');
  console.log('⚠️  Make sure API_BASE_URL and UPLOADS_BASE_URL are defined in each file.');
}

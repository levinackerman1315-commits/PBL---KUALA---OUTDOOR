/**
 * Script untuk update semua API URLs dari localhost ke environment variable
 * Jalankan: node update-api-urls.js
 */

const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/AdminDashboard.tsx',
  'src/pages/AdminLogin.tsx',
  'src/pages/BookingForm.tsx',
  'src/pages/BookingManagement.tsx',
  'src/pages/BookingDetail.tsx',
  'src/pages/Browse.tsx',
  'src/pages/EquipmentDetail.tsx',
  'src/pages/EquipmentManagement.tsx',
  'src/pages/TripDetailPage.tsx',
  'src/pages/TambahEquipment.tsx',
  'src/pages/TripForm.tsx',
  'src/pages/Trips.tsx'
];

const API_BASE_URL_DECLARATION = `// ✅ API BASE URL untuk production\nconst API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api';\n\n`;

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File tidak ditemukan: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Cek apakah sudah ada API_BASE_URL declaration
  if (!content.includes('const API_BASE_URL')) {
    // Tambahkan setelah imports (cari baris pertama yang bukan import)
    const lines = content.split('\n');
    let insertIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].trim().startsWith('import') && 
          !lines[i].trim().startsWith('//') && 
          !lines[i].trim() === '') {
        insertIndex = i;
        break;
      }
    }

    lines.splice(insertIndex, 0, API_BASE_URL_DECLARATION);
    content = lines.join('\n');
    modified = true;
  }

  // Replace semua fetch localhost
  const replacements = [
    {
      from: /fetch\('http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g,
      to: "fetch(`${API_BASE_URL}/"
    },
    {
      from: /fetch\(`http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g,
      to: "fetch(`${API_BASE_URL}/"
    },
    {
      from: /fetch\('http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\//g,
      to: "fetch(`${API_BASE_URL}/../uploads/"
    }
  ];

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  Skipped (already updated): ${filePath}`);
  }
});

console.log('\n🎉 Selesai! Semua file sudah diupdate.');
console.log('\n📝 Next steps:');
console.log('1. npm run build');
console.log('2. vercel --prod');

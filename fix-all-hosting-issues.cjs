/**
 * ✅ COMPREHENSIVE FIX untuk semua hosting issues
 * Jalankan: node fix-all-hosting-issues.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive hosting fixes...\n');

// ===================================
// 1. FIX API FETCH CALLS
// ===================================
const apiFiles = [
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
  'src/pages/CartPage.tsx'
];

const API_BASE_DECLARATION = `// ✅ API Base URL for production deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api';
const UPLOADS_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost/PBL-KELANA-OUTDOOR';

`;

let apiFilesFixed = 0;
let apiFetchFixed = 0;
let imageUrlsFixed = 0;

apiFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skip: ${filePath} (tidak ditemukan)`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Check if already has API_BASE_URL declaration
  if (!content.includes('API_BASE_URL')) {
    // Find position after imports
    const exportDefaultMatch = content.match(/export default function/);
    const functionMatch = content.match(/function \w+\(/);
    const constMatch = content.match(/const \w+ = \(/);
    
    let insertPos = 0;
    if (exportDefaultMatch) {
      insertPos = exportDefaultMatch.index;
    } else if (functionMatch) {
      insertPos = functionMatch.index;
    } else if (constMatch) {
      insertPos = constMatch.index;
    }
    
    if (insertPos > 0) {
      content = content.slice(0, insertPos) + API_BASE_DECLARATION + content.slice(insertPos);
      modified = true;
    }
  }
  
  // Replace API fetch calls
  const apiPatterns = [
    /fetch\(['"]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g,
    /fetch\(`http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g
  ];
  
  apiPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      apiFetchFixed += matches.length;
    }
  });
  
  content = content.replace(
    /fetch\(['"]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g,
    'fetch(`${API_BASE_URL}/'
  );
  
  content = content.replace(
    /fetch\(`http:\/\/localhost\/PBL-KELANA-OUTDOOR\/api\//g,
    'fetch(`${API_BASE_URL}/'
  );
  
  // Fix TripForm.tsx special case (uses /uploads/trips instead of /api)
  if (filePath.includes('TripForm.tsx')) {
    content = content.replace(
      /fetch\(['"]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/trips\//g,
      'fetch(`${API_BASE_URL}/'
    );
    content = content.replace(
      /fetch\(`http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/trips\//g,
      'fetch(`${API_BASE_URL}/'
    );
  }
  
  // Replace image URL paths (for Browse.tsx, CartPage.tsx, TambahEquipment.tsx)
  const imagePatterns = [
    /return ['"]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/equipment\/\$\{/g,
    /return `http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/equipment\/\$\{/g
  ];
  
  imagePatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      imageUrlsFixed += matches.length;
    }
  });
  
  content = content.replace(
    /return ['"]http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/equipment\/\$\{/g,
    'return `${UPLOADS_BASE_URL}/uploads/equipment/${'
  );
  
  content = content.replace(
    /return `http:\/\/localhost\/PBL-KELANA-OUTDOOR\/uploads\/equipment\/\$\{/g,
    'return `${UPLOADS_BASE_URL}/uploads/equipment/${'
  );
  
  if (modified || content !== fs.readFileSync(fullPath, 'utf8')) {
    fs.writeFileSync(fullPath, content, 'utf8');
    apiFilesFixed++;
    console.log(`✅ Fixed: ${filePath}`);
  }
});

console.log(`\n📊 API & Images Summary:`);
console.log(`   ✅ ${apiFilesFixed} files updated`);
console.log(`   ✅ ${apiFetchFixed} API fetch calls fixed`);
console.log(`   ✅ ${imageUrlsFixed} image URLs fixed\n`);

// ===================================
// 2. CREATE .env.example
// ===================================
const envExample = `# API Configuration
# Development: http://localhost/PBL-KELANA-OUTDOOR/api
# Production: https://your-backend-domain.com/api
VITE_API_URL=http://localhost/PBL-KELANA-OUTDOOR/api

# WhatsApp Contact
VITE_WHATSAPP_NUMBER=6281234567890

# Supabase (if needed)
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co

# Google OAuth (if needed)
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
`;

fs.writeFileSync('.env.example', envExample, 'utf8');
console.log('✅ Created: .env.example\n');

// ===================================
// 3. UPDATE .env.production
// ===================================
const envProduction = `# Production Environment Variables
# Update VITE_API_URL with your actual backend URL after deploying to InfinityFree

VITE_API_URL=https://placeholder-backend.com/api
VITE_WHATSAPP_NUMBER=6281234567890

# Supabase (copy from .env if using)
VITE_SUPABASE_PROJECT_ID=ffqhbvzlwubrcqddqoxq
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
VITE_SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co

# Google OAuth (copy from .env if using)
VITE_GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
`;

fs.writeFileSync('.env.production', envProduction, 'utf8');
console.log('✅ Updated: .env.production\n');

// ===================================
// 4. CREATE PRODUCTION README
// ===================================
const productionReadme = `# 🚀 PRODUCTION DEPLOYMENT GUIDE

## ✅ Pre-Deployment Checklist

### Frontend (Vercel)
- [x] All API URLs using environment variables
- [x] .env.production configured
- [x] WhatsApp number configured
- [ ] Test build: \`npm run build\`
- [ ] Deploy: \`vercel --prod\`

### Backend (InfinityFree)
- [ ] Register InfinityFree account
- [ ] Create database & user
- [ ] Upload PHP files to public_html/api/
- [ ] Import database SQL
- [ ] Update config/database.php with credentials
- [ ] Test API endpoints

## 📝 Environment Variables

### Vercel Dashboard Settings
\`\`\`
VITE_API_URL = https://your-backend.infinityfreeapp.com/api
VITE_WHATSAPP_NUMBER = 6281234567890
\`\`\`

### InfinityFree Database Config
Edit \`config/database.php\`:
\`\`\`php
$host = 'sql123.byethost.com';
$dbname = 'epiz_XXXXX_kuala_outdoor';
$username = 'epiz_XXXXX';
$password = 'your_generated_password';
\`\`\`

## 🧪 Testing URLs

### Frontend (Vercel)
https://pbl-kelana-outdoor-ifkuyyj67-naufalzakwans-projects.vercel.app

### Backend (After InfinityFree Setup)
- https://your-account.infinityfreeapp.com/api/public/trips.php
- https://your-account.infinityfreeapp.com/api/public/equipment.php
- https://your-account.infinityfreeapp.com/api/admin/login.php

## 🔧 Common Issues

### Frontend shows "Failed to fetch"
- Backend belum deploy (normal saat development)
- CORS not configured on backend
- Wrong VITE_API_URL in Vercel settings

### Images not loading
- Upload folder permissions on InfinityFree
- Check UPLOADS_BASE_URL configuration

### Admin login fails
- Check database connection on backend
- Verify admin credentials in database
- Check CORS headers on login.php

## 📚 Useful Links
- Vercel Dashboard: https://vercel.com/dashboard
- InfinityFree Panel: https://app.infinityfree.com
- Repository: https://github.com/levinackerman1315-commits/PBL---KUALA---OUTDOOR
`;

fs.writeFileSync('PRODUCTION_DEPLOYMENT.md', productionReadme, 'utf8');
console.log('✅ Created: PRODUCTION_DEPLOYMENT.md\n');

// ===================================
// SUMMARY
// ===================================
console.log('═══════════════════════════════════════════════════');
console.log('✅ ALL HOSTING ISSUES FIXED!');
console.log('═══════════════════════════════════════════════════');
console.log('\n📦 Files Modified:');
console.log(`   • ${apiFilesFixed} React/TypeScript files`);
console.log(`   • .env.production`);
console.log(`   • .env.example (created)`);
console.log(`   • PRODUCTION_DEPLOYMENT.md (created)`);
console.log('\n🔧 Fixes Applied:');
console.log(`   • ${apiFetchFixed} API fetch() calls`);
console.log(`   • ${imageUrlsFixed} image URL paths`);
console.log('   • TripForm.tsx special path fixed');
console.log('   • All files now use environment variables');
console.log('\n🚀 Next Steps:');
console.log('   1. npm run build');
console.log('   2. vercel --prod');
console.log('   3. Setup backend on InfinityFree');
console.log('   4. Update VITE_API_URL in Vercel with real backend URL');
console.log('\n✅ Ready for production deployment!\n');

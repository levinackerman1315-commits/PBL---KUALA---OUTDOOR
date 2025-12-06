/**
 * Script untuk mengupdate semua URL dari InfinityFree ke Railway
 * Update: Desember 2025
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL Configuration
const OLD_URL = 'https://kualaoutdoor.free.nf/api';
const NEW_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

// Files to update
const filesToUpdate = [
  'src/lib/triApi.ts',
  'src/services/api.ts',
  'src/lib/api.ts',
  'src/contexts/CartContext.tsx',
  'src/contexts/AuthContext.tsx',
  'src/pages/BookingForm.tsx',
  'src/pages/BookingManagement.tsx',
  'src/pages/AdminLogin.tsx',
  'src/pages/BookingDetail.tsx',
  'src/pages/EquipmentDetail.tsx',
  'src/pages/TambahEquipment.tsx',
  'src/pages/Profile.tsx',
  'src/pages/TripDetailPage.tsx',
  'src/pages/TripForm.tsx',
  'src/pages/Trips.tsx'
];

console.log('🚀 Starting URL migration from InfinityFree to Railway...\n');

let updatedCount = 0;
let errorCount = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Replace old URL with new URL
      content = content.replace(new RegExp(OLD_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_URL);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
      } else {
        console.log(`⏭️  Skipped (no changes needed): ${file}`);
      }
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✨ Migration Complete!`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Errors: ${errorCount} files`);
console.log(`   Old URL: ${OLD_URL}`);
console.log(`   New URL: ${NEW_URL}`);
console.log(`${'='.repeat(60)}\n`);

if (errorCount === 0) {
  console.log('✅ All files updated successfully!\n');
  console.log('📋 Next steps:');
  console.log('   1. npm run build');
  console.log('   2. Deploy to Vercel');
  console.log('   3. Test all features (login, upload, update, delete)');
  console.log('   4. Update Google OAuth redirect URIs\n');
} else {
  console.log(`❌ There were ${errorCount} errors. Please check the files manually.\n`);
}

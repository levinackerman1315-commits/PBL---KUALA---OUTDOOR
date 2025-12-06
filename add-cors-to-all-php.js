/**
 * Script untuk menambahkan CORS headers ke semua PHP files
 * Run: node add-cors-to-all-php.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORS_HEADER = `<?php
// ✅ CORS Configuration for Railway + Vercel
require_once __DIR__ . '/../config/cors.php';
`;

const CORS_HEADER_ADMIN = `<?php
// ✅ CORS Configuration for Railway + Vercel
require_once __DIR__ . '/../../config/cors.php';
`;

const CORS_HEADER_DEEP = `<?php
// ✅ CORS Configuration for Railway + Vercel
require_once __DIR__ . '/../../../config/cors.php';
`;

// PHP files that need CORS
const phpFiles = [
  // Admin
  { path: 'api/admin/equipment.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/bookings.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/booking_detail.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/login.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/trips.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/usage_guide.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/rental_terms.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/update_booking_status.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/update_payment_status.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/delete_booking.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/admin/confirm_late_return.php', corsPath: CORS_HEADER_ADMIN },
  
  // Public
  { path: 'api/public/equipment.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/public/trips.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/public/packages.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/public/booking.php', corsPath: CORS_HEADER_ADMIN },
  
  // Upload
  { path: 'api/upload/multi_image.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/upload-profile-picture.php', corsPath: CORS_HEADER },
  
  // Customer
  { path: 'api/customer/profile.php', corsPath: CORS_HEADER_ADMIN },
  
  // Packages
  { path: 'api/packages/get_package_detail.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages/create_package.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages/update_package.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages/delete_package.php', corsPath: CORS_HEADER_ADMIN },
  
  // Packages Bookings
  { path: 'api/packages_bookings/upload_payment_proof.php', corsPath: CORS_HEADER_ADMIN },
  
  // Cart
  { path: 'api/packages_cart/get.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages_cart/add.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages_cart/delete.php', corsPath: CORS_HEADER_ADMIN },
  { path: 'api/packages_cart/update.php', corsPath: CORS_HEADER_ADMIN },
];

console.log('🔧 Adding CORS headers to PHP files...\n');

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

phpFiles.forEach(({ path: filePath, corsPath }) => {
  const fullPath = path.join(__dirname, filePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if already has cors.php require
      if (content.includes("require_once __DIR__ . '/../config/cors.php'") ||
          content.includes("require_once __DIR__ . '/../../config/cors.php'") ||
          content.includes("require_once __DIR__ . '/../../../config/cors.php'")) {
        console.log(`⏭️  Skipped (already has CORS): ${filePath}`);
        skipCount++;
        return;
      }
      
      // Remove old CORS headers if any
      content = content.replace(/header\("Access-Control-Allow-Origin: \*"\);?\s*/g, '');
      content = content.replace(/header\("Access-Control-Allow-Methods: .*?"\);?\s*/g, '');
      content = content.replace(/header\("Access-Control-Allow-Headers: .*?"\);?\s*/g, '');
      content = content.replace(/header\("Content-Type: application\/json; charset=UTF-8"\);?\s*/g, '');
      content = content.replace(/if \(\$_SERVER\['REQUEST_METHOD'\] == 'OPTIONS'\) \{\s*http_response_code\(200\);\s*exit\(\);\s*\}/g, '');
      
      // Add CORS require at the top (after <?php)
      content = content.replace('<?php', corsPath);
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      successCount++;
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    errorCount++;
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✨ CORS Update Complete!`);
console.log(`   Updated: ${successCount} files`);
console.log(`   Skipped: ${skipCount} files`);
console.log(`   Errors: ${errorCount} files`);
console.log(`${'='.repeat(60)}\n`);

if (errorCount === 0) {
  console.log('✅ All PHP files now have proper CORS configuration!\n');
  console.log('📋 Next steps:');
  console.log('   1. Test locally with XAMPP');
  console.log('   2. Push to GitHub');
  console.log('   3. Railway will auto-deploy');
  console.log('   4. Vercel will auto-deploy\n');
} else {
  console.log(`⚠️  There were ${errorCount} errors. Please check manually.\n`);
}

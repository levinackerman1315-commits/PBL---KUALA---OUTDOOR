// Fix ALL 10 tables missing AUTO_INCREMENT
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api/fix-all-tables-autoincrement.php';

console.log('🔧 Fixing ALL 10 tables with missing AUTO_INCREMENT...\n');
console.log('This will fix:');
console.log('  1. merchandise');
console.log('  2. open_trips');
console.log('  3. package_availability');
console.log('  4. package_bookings');
console.log('  5. package_cart');
console.log('  6. package_items ← YOUR ERROR!');
console.log('  7. stock_movements');
console.log('  8. trip_participations');
console.log('  9. trips');
console.log(' 10. user_profiles\n');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('📋 FIX RESULT:');
    console.log('='.repeat(70));
    
    if (data.success && data.results) {
      const { summary, success, failed, verification, test_insert } = data.results;
      
      console.log('\n📊 Summary:');
      console.log(`   Total tables fixed: ${summary.total_tables}`);
      console.log(`   ✅ Successful: ${summary.successful_fixes}`);
      console.log(`   ❌ Failed: ${summary.failed_fixes}`);
      
      if (success && success.length > 0) {
        console.log('\n✅ SUCCESSFULLY FIXED:');
        success.forEach((table, idx) => {
          console.log(`   ${idx + 1}. ${table.table}.${table.column} - ${table.status}`);
        });
      }
      
      if (failed && failed.length > 0) {
        console.log('\n❌ FAILED TO FIX:');
        failed.forEach((table, idx) => {
          console.log(`   ${idx + 1}. ${table.table}.${table.column}`);
          console.log(`      Error: ${table.error}`);
        });
      }
      
      if (verification && verification.length > 0) {
        console.log('\n🔍 VERIFICATION:');
        verification.forEach((v, idx) => {
          const status = v.has_autoincrement ? '✅' : '❌';
          console.log(`   ${status} ${v.table}.${v.column} - ${v.extra || 'NO AUTO_INCREMENT'}`);
        });
      }
      
      if (test_insert) {
        console.log('\n🧪 TEST INSERT (package_items):');
        if (test_insert.status === 'SUCCESS') {
          console.log(`   ✅ ${test_insert.status}`);
          console.log(`   package_item_id auto-generated: ${test_insert.package_item_id}`);
          console.log(`   ${test_insert.message}`);
        } else {
          console.log(`   ❌ ${test_insert.status}`);
          console.log(`   Error: ${test_insert.error}`);
        }
      }
      
      console.log('\n' + '='.repeat(70));
      if (summary.failed_fixes === 0) {
        console.log('🎉 ALL TABLES FIXED! Package add/edit/delete should work now!');
      } else {
        console.log(`⚠️  ${summary.failed_fixes} table(s) failed to fix. Check errors above.`);
      }
    }
  })
  .catch(error => {
    console.error('\n❌ Failed to run fix:');
    console.error(error.message);
  });

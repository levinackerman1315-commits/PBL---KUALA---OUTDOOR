// Scan all tables for missing AUTO_INCREMENT
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api/check-all-tables-autoincrement.php';

console.log('🔍 Scanning ALL tables for missing AUTO_INCREMENT...\n');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('📋 SCAN RESULT:');
    console.log('='.repeat(70));
    
    if (data.success && data.results) {
      const { summary, missing_autoincrement } = data.results;
      
      console.log('\n📊 Summary:');
      console.log(`   Total tables: ${summary.total_tables}`);
      console.log(`   Tables with PRIMARY KEY: ${summary.tables_with_primary_keys}`);
      console.log(`   ✅ Has AUTO_INCREMENT: ${summary.has_autoincrement_count}`);
      console.log(`   ❌ Missing AUTO_INCREMENT: ${summary.missing_autoincrement_count}`);
      
      if (missing_autoincrement && missing_autoincrement.length > 0) {
        console.log('\n⚠️  TABLES MISSING AUTO_INCREMENT:');
        console.log('='.repeat(70));
        missing_autoincrement.forEach((table, idx) => {
          console.log(`\n${idx + 1}. Table: ${table.table}`);
          console.log(`   Column: ${table.column}`);
          console.log(`   Type: ${table.type}`);
          console.log(`   Issue: ${table.issue}`);
          console.log(`   Fix: ALTER TABLE ${table.table} MODIFY COLUMN ${table.column} ${table.type} AUTO_INCREMENT;`);
        });
        
        console.log('\n\n🔧 RECOMMENDED ACTION:');
        console.log('These tables need AUTO_INCREMENT added to prevent "doesn\'t have a default value" errors!');
      } else {
        console.log('\n✅ All tables have proper AUTO_INCREMENT!');
      }
      
      // Full JSON for reference
      console.log('\n\n📄 Full Details:');
      console.log(JSON.stringify(data.results, null, 2));
    }
  })
  .catch(error => {
    console.error('\n❌ Failed to scan tables:');
    console.error(error.message);
  });

// Check usage_guides schema
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api/check-usage-guide-schema.php';

console.log('🔍 Checking equipment_usage_guides table schema...\n');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('📋 RESULT:');
    console.log('='.repeat(70));
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success && data.results) {
      console.log('\n📊 Table Structure:');
      data.results.table_structure.forEach(col => {
        console.log(`   - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key} ${col.Extra}`);
      });
      
      console.log('\n⚠️  Column Details (Check for guide_id):');
      const guideIdCol = data.results.column_details.find(c => c.COLUMN_NAME === 'guide_id');
      if (guideIdCol) {
        console.log(`   guide_id:`);
        console.log(`     - Type: ${guideIdCol.DATA_TYPE || 'N/A'}`);
        console.log(`     - Nullable: ${guideIdCol.IS_NULLABLE}`);
        console.log(`     - Default: ${guideIdCol.COLUMN_DEFAULT || 'NONE'}`);
        console.log(`     - Key: ${guideIdCol.COLUMN_KEY}`);
        console.log(`     - Extra: ${guideIdCol.EXTRA || 'none'}`);
        
        if (guideIdCol.IS_NULLABLE === 'NO' && !guideIdCol.COLUMN_DEFAULT && !guideIdCol.EXTRA.includes('auto_increment')) {
          console.log(`\n   ❌ PROBLEM FOUND!`);
          console.log(`   guide_id is NOT NULL, has NO DEFAULT, and is NOT AUTO_INCREMENT`);
          console.log(`   This is why INSERT fails!`);
        }
      }
    }
  })
  .catch(error => {
    console.error('\n❌ Failed to check schema:');
    console.error(error.message);
  });

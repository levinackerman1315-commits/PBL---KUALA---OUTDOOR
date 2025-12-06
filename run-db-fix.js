// Test Database Schema Fix
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api/fix-database-schema.php';

console.log('🔧 Running Database Schema Fix...\n');
console.log(`Accessing: ${API_URL}\n`);

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('📋 RESULT:');
    console.log('='.repeat(70));
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Database schema fix completed successfully!');
      
      if (data.results) {
        console.log('\n📊 Details:');
        console.log(`- Current schema: ${JSON.stringify(data.results.current_schema)}`);
        console.log(`- ALTER TABLE: ${data.results.alter_table}`);
        console.log(`- New schema: ${JSON.stringify(data.results.new_schema)}`);
        console.log(`- Test insert: ${data.results.test_insert.status || data.results.test_insert}`);
        
        if (data.results.test_insert.code) {
          console.log(`\n✅ Successfully created and deleted test equipment with code:`);
          console.log(`   "${data.results.test_insert.code}"`);
          console.log(`   Length: ${data.results.test_insert.code_length} characters`);
        }
      }
    } else {
      console.log('\n❌ Database schema fix failed!');
      console.log(`Error: ${data.message}`);
    }
  })
  .catch(error => {
    console.error('\n❌ Failed to execute schema fix:');
    console.error(error.message);
  });

// Run guide_id AUTO_INCREMENT fix
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api/fix-guide-id-autoincrement.php';

console.log('🔧 Running guide_id AUTO_INCREMENT fix...\n');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('📋 RESULT:');
    console.log('='.repeat(70));
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Fix completed successfully!');
      
      if (data.results) {
        console.log('\n📊 Before:');
        const beforeGuideId = data.results.before.find(c => c.Field === 'guide_id');
        if (beforeGuideId) {
          console.log(`   guide_id: ${beforeGuideId.Type} ${beforeGuideId.Null} ${beforeGuideId.Extra || 'NO AUTO_INCREMENT'}`);
        }
        
        console.log('\n📊 After:');
        const afterGuideId = data.results.after.find(c => c.Field === 'guide_id');
        if (afterGuideId) {
          console.log(`   guide_id: ${afterGuideId.Type} ${afterGuideId.Null} ${afterGuideId.Extra || 'NO AUTO_INCREMENT'}`);
          
          if (afterGuideId.Extra && afterGuideId.Extra.includes('auto_increment')) {
            console.log('\n   ✅ AUTO_INCREMENT successfully added!');
          }
        }
        
        console.log('\n🧪 Test Insert:');
        if (data.results.test_insert.status === 'SUCCESS') {
          console.log(`   ✅ SUCCESS - guide_id auto-generated: ${data.results.test_insert.guide_id}`);
          console.log(`   ✅ Test data cleaned up`);
        } else {
          console.log(`   ❌ ${data.results.test_insert}`);
        }
      }
    } else {
      console.log('\n❌ Fix failed!');
      console.log(`Error: ${data.message}`);
    }
  })
  .catch(error => {
    console.error('\n❌ Failed to run fix:');
    console.error(error.message);
  });

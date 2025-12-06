// Check Database Schema via API
const API_BASE = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

async function checkSchema() {
  console.log('🔍 Checking Database Schema...\n');
  
  // 1. Get an equipment record to see structure
  const response = await fetch(`${API_BASE}/admin/equipment.php`);
  const data = await response.json();
  
  if (data && data.length > 0) {
    const firstEquipment = data[0];
    console.log('📋 Equipment Table Structure (from actual data):');
    console.log('='.repeat(60));
    
    Object.keys(firstEquipment).forEach(key => {
      const value = firstEquipment[key];
      const type = typeof value;
      let length = '';
      
      if (type === 'string') {
        length = ` (current length: ${value.length} chars)`;
        if (key === 'code') {
          console.log(`⚠️  ${key}: ${type}${length} <-- THIS IS THE PROBLEM FIELD`);
        } else {
          console.log(`   ${key}: ${type}${length}`);
        }
      } else {
        console.log(`   ${key}: ${type}`);
      }
    });
    
    console.log('\n📊 Sample code values:');
    data.slice(0, 5).forEach((item, idx) => {
      console.log(`   ${idx + 1}. code="${item.code}" (length: ${item.code ? item.code.length : 0})`);
    });
    
    // Test yang gagal tadi
    const testCode = `TEST-API-${Date.now()}`;
    console.log(`\n⚠️  Test code yang gagal: "${testCode}"`);
    console.log(`   Length: ${testCode.length} characters`);
    console.log(`   Problem: Mungkin kolom 'code' di database < ${testCode.length} VARCHAR`);
  }
}

checkSchema().catch(console.error);

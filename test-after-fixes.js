// COMPREHENSIVE TEST - AFTER ALL FIXES
const API_BASE = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

const results = {
  passed: [],
  failed: [],
  critical: []
};

async function testEndpoint(name, method, url, body = null, expectedStatus = 200) {
  console.log(`\n🧪 ${name}`);
  console.log(`   ${method} ${url}`);
  
  try {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { error: 'Invalid JSON' };
    }
    
    if (response.status === expectedStatus) {
      results.passed.push({ name, status: response.status });
      console.log(`   ✅ PASS`);
      return { success: true, data, response };
    } else {
      results.failed.push({ name, status: response.status, expected: expectedStatus, error: data });
      console.log(`   ❌ FAIL - Expected ${expectedStatus}, got ${response.status}`);
      return { success: false, data, response };
    }
  } catch (error) {
    results.failed.push({ name, error: error.message });
    console.log(`   ❌ FAIL - ${error.message}`);
    return { success: false, error };
  }
}

async function runTests() {
  console.log('🚀 POST-FIX COMPREHENSIVE TESTS');
  console.log('=' + '='.repeat(70));
  
  // ==================== FIXED ISSUES ====================
  console.log('\n\n🔧 === TESTING FIXED ISSUES ===');
  
  // 1. Test trips endpoint (was failing with "Body already read")
  await testEndpoint(
    '1. GET Trips (Fixed database.php path)',
    'GET',
    `${API_BASE}/trips.php`
  );
  
  // 2. Test equipment code with long value (was failing with VARCHAR too short)
  const createResult = await testEndpoint(
    '2. POST Equipment with Long Code (Fixed VARCHAR 50)',
    'POST',
    `${API_BASE}/admin/equipment.php`,
    {
      name: 'Test Long Code Equipment',
      code: `TEST-LONG-CODE-${Date.now()}`,  // 28 chars - would fail with VARCHAR(20)
      category: 'tenda',  // Valid category
      stock_quantity: 10,
      price_per_day: 50000
    }
  );
  
  let testEquipmentId = null;
  if (createResult.success && createResult.data.equipment_id) {
    testEquipmentId = createResult.data.equipment_id;
    console.log(`   📝 Created equipment_id: ${testEquipmentId}`);
  }
  
  // 3. Test UPDATE equipment (was failing with guide_id error - fixed in previous commit)
  if (testEquipmentId) {
    await testEndpoint(
      '3. PUT Update Equipment (Fixed transaction handling)',
      'PUT',
      `${API_BASE}/admin/equipment.php`,
      {
        equipment_id: testEquipmentId,
        name: 'Test Equipment Updated',
        code: `TEST-UPD-${Date.now()}`,
        category: 'tenda',
        stock_quantity: 15,
        price_per_day: 75000,
        usage_guide: [
          { step_number: 1, title: 'Step 1', description: 'Test step 1' }
        ]
      }
    );
  }
  
  // 4. Test DELETE non-existent equipment (was returning 200, now should return 404)
  await testEndpoint(
    '4. DELETE Non-existent Equipment (Fixed validation)',
    'DELETE',
    `${API_BASE}/admin/equipment.php?id=999999`,
    null,
    404  // NOW EXPECTS 404
  );
  
  // 5. Test DELETE existing equipment (should return 200)
  if (testEquipmentId) {
    await testEndpoint(
      '5. DELETE Existing Equipment (Should succeed)',
      'DELETE',
      `${API_BASE}/admin/equipment.php?id=${testEquipmentId}`
    );
  }
  
  // ==================== STOCK QUANTITY UPDATES ====================
  console.log('\n\n📊 === STOCK QUANTITY UPDATE TESTS ===');
  
  // 6. Create equipment for stock testing
  const stockTestResult = await testEndpoint(
    '6. Create Equipment for Stock Testing',
    'POST',
    `${API_BASE}/admin/equipment.php`,
    {
      name: 'Stock Test Equipment',
      code: `STOCK-${Date.now()}`,
      category: 'kompor',
      stock_quantity: 20,
      price_per_day: 30000
    }
  );
  
  let stockTestId = null;
  if (stockTestResult.success && stockTestResult.data.equipment_id) {
    stockTestId = stockTestResult.data.equipment_id;
    console.log(`   📝 Created stock test equipment_id: ${stockTestId}`);
  }
  
  // 7. Update stock quantity
  if (stockTestId) {
    await testEndpoint(
      '7. Update Stock Quantity (User\'s main request)',
      'PUT',
      `${API_BASE}/admin/equipment.php`,
      {
        equipment_id: stockTestId,
        name: 'Stock Test Equipment',
        code: `STOCK-${Date.now()}-UPD`,
        category: 'kompor',
        stock_quantity: 25,  // Increase from 20 to 25
        price_per_day: 30000
      }
    );
    
    // 8. Verify stock was updated
    const verifyResult = await testEndpoint(
      '8. Verify Stock Update',
      'GET',
      `${API_BASE}/admin/equipment.php?id=${stockTestId}`
    );
    
    if (verifyResult.success && verifyResult.data.stock_quantity === 25) {
      console.log(`   ✅ Stock correctly updated to 25`);
      results.passed.push({ name: 'Stock verification', status: 'verified' });
    } else {
      console.log(`   ⚠️  Stock not updated correctly`);
      results.critical.push({ name: 'Stock verification', issue: 'Stock quantity mismatch' });
    }
    
    // Cleanup
    await testEndpoint(
      '9. Cleanup Stock Test Equipment',
      'DELETE',
      `${API_BASE}/admin/equipment.php?id=${stockTestId}`
    );
  }
  
  // ==================== UPLOAD ENDPOINTS ====================
  console.log('\n\n📤 === UPLOAD ENDPOINT TESTS (OPTIONS) ===');
  
  // 10. Test OPTIONS on upload endpoints (was failing with "Body already read")
  await testEndpoint(
    '10. OPTIONS Profile Picture Upload (Fixed)',
    'OPTIONS',
    `${API_BASE}/upload-profile-picture.php`,
    null,
    200
  );
  
  await testEndpoint(
    '11. OPTIONS Multi Image Upload (Fixed)',
    'OPTIONS',
    `${API_BASE}/upload/multi_image.php`,
    null,
    200
  );
  
  await testEndpoint(
    '12. OPTIONS Payment Proof Upload (Fixed)',
    'OPTIONS',
    `${API_BASE}/packages_bookings/upload_payment_proof.php`,
    null,
    200
  );
  
  // ==================== SUMMARY ====================
  console.log('\n\n' + '='.repeat(72));
  console.log('📊 POST-FIX TEST SUMMARY');
  console.log('='.repeat(72));
  
  console.log(`\n✅ PASSED: ${results.passed.length} tests`);
  results.passed.forEach((test, idx) => {
    console.log(`   ${idx + 1}. ${test.name}`);
  });
  
  console.log(`\n❌ FAILED: ${results.failed.length} tests`);
  results.failed.forEach((test, idx) => {
    console.log(`   ${idx + 1}. ${test.name}`);
    if (test.error) console.log(`      Error:`, test.error);
  });
  
  if (results.critical.length > 0) {
    console.log(`\n⚠️  CRITICAL ISSUES: ${results.critical.length}`);
    results.critical.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. ${issue.name}: ${issue.issue}`);
    });
  }
  
  const successRate = ((results.passed.length / (results.passed.length + results.failed.length)) * 100).toFixed(1);
  console.log('\n' + '='.repeat(72));
  console.log(`📈 SUCCESS RATE: ${successRate}%`);
  console.log('='.repeat(72));
  
  if (successRate >= 90) {
    console.log('\n🎉 EXCELLENT! Most issues are FIXED!');
  } else if (successRate >= 70) {
    console.log('\n✅ GOOD! Major issues fixed, minor issues remain.');
  } else {
    console.log('\n⚠️  ATTENTION NEEDED: Several issues still exist.');
  }
  
  return results;
}

runTests().then(results => {
  console.log('\n✅ Testing complete!');
}).catch(error => {
  console.error('\n❌ Testing failed:', error);
});

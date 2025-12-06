// 🔍 COMPREHENSIVE API TESTING SCRIPT - TEST ALL ENDPOINTS
// Test all CRUD operations, uploads, and edge cases

const API_BASE = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

const results = {
  passed: [],
  failed: [],
  warnings: []
};

// ==================== HELPER FUNCTIONS ====================
async function testEndpoint(name, method, url, body = null, expectedStatus = 200) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { error: 'Invalid JSON response', text: await response.text() };
    }
    
    const hasCORS = response.headers.has('access-control-allow-origin');
    
    if (response.status === expectedStatus) {
      results.passed.push({
        name,
        status: response.status,
        hasCORS,
        data: data
      });
      console.log(`   ✅ PASS - Status ${response.status}, CORS: ${hasCORS ? '✅' : '❌'}`);
      return { success: true, data, response };
    } else {
      results.failed.push({
        name,
        status: response.status,
        expected: expectedStatus,
        hasCORS,
        error: data
      });
      console.log(`   ❌ FAIL - Expected ${expectedStatus}, got ${response.status}`);
      console.log(`   Error:`, data);
      return { success: false, data, response };
    }
  } catch (error) {
    results.failed.push({
      name,
      error: error.message
    });
    console.log(`   ❌ FAIL - ${error.message}`);
    return { success: false, error };
  }
}

async function runTests() {
  console.log('🚀 STARTING COMPREHENSIVE API TESTS');
  console.log('=' + '='.repeat(70));
  
  // ==================== PUBLIC ENDPOINTS ====================
  console.log('\n\n📦 === PUBLIC ENDPOINTS ===');
  
  // 1. Equipment List
  await testEndpoint(
    '1. GET Equipment List',
    'GET',
    `${API_BASE}/public/equipment.php`
  );
  
  // 2. Equipment Detail (assuming ID 1 exists)
  await testEndpoint(
    '2. GET Equipment Detail',
    'GET',
    `${API_BASE}/public/equipment.php?id=1`
  );
  
  // 3. Trips List
  await testEndpoint(
    '3. GET Trips List',
    'GET',
    `${API_BASE}/trips.php`
  );
  
  // 4. Packages List
  await testEndpoint(
    '4. GET Packages List',
    'GET',
    `${API_BASE}/public/packages.php`
  );
  
  // ==================== ADMIN EQUIPMENT ====================
  console.log('\n\n🔧 === ADMIN EQUIPMENT OPERATIONS ===');
  
  // 5. Get All Equipment (Admin)
  const adminEquipmentResult = await testEndpoint(
    '5. GET Admin Equipment List',
    'GET',
    `${API_BASE}/admin/equipment.php`
  );
  
  let testEquipmentId = null;
  if (adminEquipmentResult.success && adminEquipmentResult.data && adminEquipmentResult.data.length > 0) {
    testEquipmentId = adminEquipmentResult.data[0].equipment_id;
    console.log(`   📝 Using equipment_id: ${testEquipmentId} for tests`);
  }
  
  // 6. Get Single Equipment (Admin)
  if (testEquipmentId) {
    await testEndpoint(
      '6. GET Admin Equipment Detail',
      'GET',
      `${API_BASE}/admin/equipment.php?id=${testEquipmentId}`
    );
  }
  
  // 7. Check Code Availability
  await testEndpoint(
    '7. Check Equipment Code Availability',
    'GET',
    `${API_BASE}/admin/equipment.php?check_code=TEST-999`
  );
  
  // 8. POST Create Equipment (Test)
  const createEquipmentResult = await testEndpoint(
    '8. POST Create Equipment',
    'POST',
    `${API_BASE}/admin/equipment.php`,
    {
      name: 'Test Equipment API',
      code: `TEST-API-${Date.now()}`,
      description: 'Created by API test',
      category: 'Tenda',
      size_capacity: '4 orang',
      dimensions: '200x200x150 cm',
      weight: 5.5,
      material: 'Nylon',
      stock_quantity: 10,
      price_per_day: 50000,
      condition: 'baik'
    }
  );
  
  let newEquipmentId = null;
  if (createEquipmentResult.success && createEquipmentResult.data.equipment_id) {
    newEquipmentId = createEquipmentResult.data.equipment_id;
    console.log(`   📝 Created equipment_id: ${newEquipmentId}`);
  }
  
  // 9. PUT Update Equipment
  if (newEquipmentId) {
    await testEndpoint(
      '9. PUT Update Equipment (Basic Info)',
      'PUT',
      `${API_BASE}/admin/equipment.php`,
      {
        equipment_id: newEquipmentId,
        name: 'Test Equipment API Updated',
        code: `TEST-API-${Date.now()}-UPD`,
        description: 'Updated by API test',
        category: 'Tenda',
        size_capacity: '6 orang',
        dimensions: '250x250x180 cm',
        weight: 6.5,
        material: 'Polyester',
        stock_quantity: 15,
        price_per_day: 75000,
        condition: 'sangat baik'
      }
    );
  }
  
  // 10. PUT Update Equipment with Usage Guide
  if (newEquipmentId) {
    await testEndpoint(
      '10. PUT Update Equipment with Usage Guide',
      'PUT',
      `${API_BASE}/admin/equipment.php`,
      {
        equipment_id: newEquipmentId,
        name: 'Test Equipment with Guide',
        code: `TEST-API-${Date.now()}-GUIDE`,
        category: 'Tenda',
        stock_quantity: 15,
        price_per_day: 75000,
        usage_guide: [
          {
            step_number: 1,
            title: 'Step 1 Test',
            description: 'Description for step 1'
          },
          {
            step_number: 2,
            title: 'Step 2 Test',
            description: 'Description for step 2'
          }
        ],
        rental_terms: [
          {
            category: 'general',
            term_text: 'Test rental term 1',
            display_order: 1
          }
        ]
      }
    );
  }
  
  // 11. DELETE Equipment
  if (newEquipmentId) {
    await testEndpoint(
      '11. DELETE Equipment',
      'DELETE',
      `${API_BASE}/admin/equipment.php?id=${newEquipmentId}`
    );
  }
  
  // ==================== ADMIN TRIPS ====================
  console.log('\n\n🗺️  === ADMIN TRIPS OPERATIONS ===');
  
  // 12. Get All Trips (Admin)
  const adminTripsResult = await testEndpoint(
    '12. GET Admin Trips List',
    'GET',
    `${API_BASE}/admin/trips.php`
  );
  
  // ==================== ADMIN BOOKINGS ====================
  console.log('\n\n📋 === ADMIN BOOKINGS OPERATIONS ===');
  
  // 13. Get All Bookings (Admin)
  await testEndpoint(
    '13. GET Admin Bookings List',
    'GET',
    `${API_BASE}/admin/bookings.php`
  );
  
  // ==================== CUSTOMER OPERATIONS ====================
  console.log('\n\n👤 === CUSTOMER OPERATIONS ===');
  
  // 14. Get Package Cart (requires customer_id)
  // This will fail without valid customer_id, but we test the endpoint
  await testEndpoint(
    '14. GET Package Cart (No Auth)',
    'GET',
    `${API_BASE}/customer/package-cart.php?customer_id=999999`,
    null,
    200 // Might return empty array
  );
  
  // ==================== UPLOAD OPERATIONS ====================
  console.log('\n\n📤 === UPLOAD ENDPOINTS (Structure Check) ===');
  
  // 15. Profile Picture Upload (OPTIONS check)
  await testEndpoint(
    '15. OPTIONS Profile Picture Upload',
    'OPTIONS',
    `${API_BASE}/upload-profile-picture.php`
  );
  
  // 16. Multi Image Upload (OPTIONS check)
  await testEndpoint(
    '16. OPTIONS Multi Image Upload',
    'OPTIONS',
    `${API_BASE}/upload/multi_image.php`
  );
  
  // 17. Payment Proof Upload (OPTIONS check)
  await testEndpoint(
    '17. OPTIONS Payment Proof Upload',
    'OPTIONS',
    `${API_BASE}/packages_bookings/upload_payment_proof.php`
  );
  
  // ==================== EDGE CASES ====================
  console.log('\n\n⚠️  === EDGE CASES & ERROR HANDLING ===');
  
  // 18. Invalid Equipment ID
  await testEndpoint(
    '18. GET Invalid Equipment ID',
    'GET',
    `${API_BASE}/admin/equipment.php?id=999999`,
    null,
    404
  );
  
  // 19. Create Equipment with Missing Fields
  await testEndpoint(
    '19. POST Equipment Missing Required Fields',
    'POST',
    `${API_BASE}/admin/equipment.php`,
    {
      name: 'Incomplete Equipment'
      // Missing code and category
    },
    500 // Expect error
  );
  
  // 20. Update Non-existent Equipment
  await testEndpoint(
    '20. PUT Update Non-existent Equipment',
    'PUT',
    `${API_BASE}/admin/equipment.php`,
    {
      equipment_id: 999999,
      name: 'Ghost Equipment',
      code: 'GHOST-01',
      category: 'Tenda',
      stock_quantity: 1,
      price_per_day: 1000
    },
    200 // Will succeed but affect 0 rows
  );
  
  // 21. Delete Non-existent Equipment
  await testEndpoint(
    '21. DELETE Non-existent Equipment',
    'DELETE',
    `${API_BASE}/admin/equipment.php?id=999999`,
    null,
    404
  );
  
  // ==================== SUMMARY ====================
  console.log('\n\n' + '='.repeat(72));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(72));
  
  console.log(`\n✅ PASSED: ${results.passed.length} tests`);
  results.passed.forEach((test, idx) => {
    console.log(`   ${idx + 1}. ${test.name} - Status ${test.status}, CORS: ${test.hasCORS ? '✅' : '❌'}`);
  });
  
  console.log(`\n❌ FAILED: ${results.failed.length} tests`);
  results.failed.forEach((test, idx) => {
    console.log(`   ${idx + 1}. ${test.name}`);
    if (test.status) {
      console.log(`      Expected ${test.expected}, got ${test.status}`);
    }
    if (test.error) {
      console.log(`      Error:`, test.error);
    }
  });
  
  console.log(`\n⚠️  WARNINGS: ${results.warnings.length}`);
  results.warnings.forEach((warning, idx) => {
    console.log(`   ${idx + 1}. ${warning}`);
  });
  
  // Check CORS on all passed tests
  const corsIssues = results.passed.filter(t => !t.hasCORS);
  if (corsIssues.length > 0) {
    console.log(`\n⚠️  CORS MISSING on ${corsIssues.length} endpoints:`);
    corsIssues.forEach(test => {
      console.log(`   - ${test.name}`);
    });
  }
  
  console.log('\n' + '='.repeat(72));
  console.log(`📈 SUCCESS RATE: ${((results.passed.length / (results.passed.length + results.failed.length)) * 100).toFixed(1)}%`);
  console.log('='.repeat(72));
  
  return results;
}

// Run tests
runTests().then(results => {
  console.log('\n✅ Testing complete!');
  console.log(`\nFinal Score: ${results.passed.length}/${results.passed.length + results.failed.length} tests passed`);
}).catch(error => {
  console.error('\n❌ Testing failed with error:', error);
});

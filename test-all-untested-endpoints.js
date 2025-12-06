// COMPREHENSIVE TEST - ALL UNTESTED ENDPOINTS
const API_BASE = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

const results = {
  passed: [],
  failed: [],
  summary: {}
};

async function test(name, method, url, body = null, expectedStatus = 200) {
  console.log(`\n🧪 ${name}`);
  try {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({ error: 'Invalid JSON' }));
    
    if (response.status === expectedStatus) {
      results.passed.push({ name, status: response.status });
      console.log(`   ✅ PASS - ${response.status}`);
      return { success: true, data, response };
    } else {
      results.failed.push({ name, status: response.status, expected: expectedStatus });
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
  console.log('🚀 COMPREHENSIVE TEST - ALL UNTESTED ENDPOINTS');
  console.log('='.repeat(70));
  
  // ==================== MERCHANDISE OPERATIONS ====================
  console.log('\n\n🛍️  === MERCHANDISE OPERATIONS (UNTESTED) ===');
  
  // 1. Get All Merchandise
  const merchResult = await test(
    '1. GET All Merchandise',
    'GET',
    `${API_BASE}/admin/merchandise.php`
  );
  
  let testMerchId = null;
  if (merchResult.success && merchResult.data && merchResult.data.length > 0) {
    testMerchId = merchResult.data[0].merchandise_id;
    console.log(`   📝 Using merchandise_id: ${testMerchId}`);
  }
  
  // 2. Get Single Merchandise
  if (testMerchId) {
    await test(
      '2. GET Merchandise Detail',
      'GET',
      `${API_BASE}/admin/merchandise.php?id=${testMerchId}`
    );
  }
  
  // 3. Create Merchandise
  const createMerchResult = await test(
    '3. POST Create Merchandise',
    'POST',
    `${API_BASE}/admin/merchandise.php`,
    {
      name: 'Test Merch API',
      category: 'Apparel',
      price: 150000,
      stock: 20,
      description: 'Created by API test'
    }
  );
  
  let newMerchId = null;
  if (createMerchResult.success && createMerchResult.data.merchandise_id) {
    newMerchId = createMerchResult.data.merchandise_id;
    console.log(`   📝 Created merchandise_id: ${newMerchId}`);
  }
  
  // 4. Update Merchandise
  if (newMerchId) {
    await test(
      '4. PUT Update Merchandise',
      'PUT',
      `${API_BASE}/admin/merchandise.php`,
      {
        merchandise_id: newMerchId,
        name: 'Test Merch Updated',
        category: 'Apparel',
        price: 175000,
        stock: 25,
        description: 'Updated by API test'
      }
    );
  }
  
  // 5. Delete Merchandise
  if (newMerchId) {
    await test(
      '5. DELETE Merchandise',
      'DELETE',
      `${API_BASE}/admin/merchandise.php?id=${newMerchId}`
    );
  }
  
  // ==================== TRIPS OPERATIONS ====================
  console.log('\n\n🗺️  === TRIPS OPERATIONS (UNTESTED) ===');
  
  // 6. Get All Trips (Admin)
  const tripsResult = await test(
    '6. GET All Trips (Admin)',
    'GET',
    `${API_BASE}/admin/trips.php`
  );
  
  let testTripId = null;
  if (tripsResult.success && tripsResult.data && tripsResult.data.length > 0) {
    testTripId = tripsResult.data[0].trip_id;
    console.log(`   📝 Using trip_id: ${testTripId}`);
  }
  
  // 7. Get Single Trip
  if (testTripId) {
    await test(
      '7. GET Trip Detail',
      'GET',
      `${API_BASE}/admin/trips.php?id=${testTripId}`
    );
  }
  
  // 8. Create Trip
  const createTripResult = await test(
    '8. POST Create Trip',
    'POST',
    `${API_BASE}/admin/trips.php`,
    {
      title: 'Test Trip API',
      location: 'Test Location',
      difficulty: 'mudah',
      duration: '2 hari 1 malam',
      price: 500000,
      total_quota: 10,
      remaining_quota: 10,
      start_date: '2025-01-15',
      end_date: '2025-01-16',
      description: 'Created by API test',
      category: 'Gunung',
      status: 'active'
    }
  );
  
  let newTripId = null;
  if (createTripResult.success && createTripResult.data.trip_id) {
    newTripId = createTripResult.data.trip_id;
    console.log(`   📝 Created trip_id: ${newTripId}`);
  }
  
  // 9. Update Trip
  if (newTripId) {
    await test(
      '9. PUT Update Trip',
      'PUT',
      `${API_BASE}/admin/trips.php`,
      {
        trip_id: newTripId,
        title: 'Test Trip Updated',
        location: 'Test Location Updated',
        difficulty: 'sedang',
        duration: '3 hari 2 malam',
        price: 750000,
        total_quota: 15,
        remaining_quota: 15,
        start_date: '2025-02-15',
        end_date: '2025-02-17',
        description: 'Updated by API test',
        category: 'Pantai',
        status: 'active'
      }
    );
  }
  
  // 10. Delete Trip
  if (newTripId) {
    await test(
      '10. DELETE Trip',
      'DELETE',
      `${API_BASE}/admin/trips.php?id=${newTripId}`
    );
  }
  
  // ==================== PACKAGE CART OPERATIONS ====================
  console.log('\n\n🛒 === PACKAGE CART OPERATIONS (UNTESTED) ===');
  
  // 11. Get Empty Cart (no customer_id)
  await test(
    '11. GET Package Cart (Empty)',
    'GET',
    `${API_BASE}/customer/package-cart.php?customer_id=999999`
  );
  
  // ==================== BOOKINGS OPERATIONS ====================
  console.log('\n\n📋 === BOOKINGS OPERATIONS (UNTESTED) ===');
  
  // 12. Get All Bookings
  await test(
    '12. GET All Bookings',
    'GET',
    `${API_BASE}/admin/bookings.php`
  );
  
  // 13. Get Booking by Status
  await test(
    '13. GET Bookings by Status (pending)',
    'GET',
    `${API_BASE}/admin/bookings.php?status=pending`
  );
  
  // ==================== USAGE GUIDE & RENTAL TERMS ====================
  console.log('\n\n📖 === USAGE GUIDE & RENTAL TERMS (UNTESTED) ===');
  
  // 14. Get Usage Guide for Equipment
  if (testMerchId) {
    await test(
      '14. GET Usage Guide',
      'GET',
      `${API_BASE}/admin/usage_guide.php?equipment_id=1`
    );
  }
  
  // 15. Get Rental Terms for Equipment
  await test(
    '15. GET Rental Terms',
    'GET',
    `${API_BASE}/admin/rental_terms.php?equipment_id=1`
  );
  
  // ==================== PUBLIC ENDPOINTS ====================
  console.log('\n\n🌐 === PUBLIC ENDPOINTS (RE-TEST) ===');
  
  // 16. Public Equipment List
  await test(
    '16. GET Public Equipment List',
    'GET',
    `${API_BASE}/public/equipment.php`
  );
  
  // 17. Public Packages List
  await test(
    '17. GET Public Packages List',
    'GET',
    `${API_BASE}/public/packages.php`
  );
  
  // 18. Public Trips List
  await test(
    '18. GET Public Trips List',
    'GET',
    `${API_BASE}/trips.php`
  );
  
  // ==================== SUMMARY ====================
  console.log('\n\n' + '='.repeat(72));
  console.log('📊 COMPREHENSIVE TEST SUMMARY');
  console.log('='.repeat(72));
  
  const total = results.passed.length + results.failed.length;
  const successRate = ((results.passed.length / total) * 100).toFixed(1);
  
  console.log(`\n✅ PASSED: ${results.passed.length}/${total} (${successRate}%)`);
  results.passed.forEach((test, idx) => {
    console.log(`   ${idx + 1}. ${test.name}`);
  });
  
  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED: ${results.failed.length}/${total}`);
    results.failed.forEach((test, idx) => {
      console.log(`   ${idx + 1}. ${test.name}`);
      if (test.status) {
        console.log(`      Expected ${test.expected}, got ${test.status}`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(72));
  if (successRate >= 90) {
    console.log('🎉 EXCELLENT! Almost all features working!');
  } else if (successRate >= 70) {
    console.log('✅ GOOD! Most features working, some need attention.');
  } else {
    console.log('⚠️  ATTENTION NEEDED: Several features need fixing.');
  }
  console.log('='.repeat(72));
  
  return results;
}

runTests().then(results => {
  console.log('\n✅ Comprehensive testing complete!');
}).catch(error => {
  console.error('\n❌ Testing failed:', error);
});

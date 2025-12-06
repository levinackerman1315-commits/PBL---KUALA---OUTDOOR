/**
 * Test Script untuk Railway API Endpoints
 * Run: node test-railway-endpoints.js
 */

// Railway API Base URL
const API_BASE = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

const endpoints = [
  // Public endpoints (should work without auth)
  { url: `${API_BASE}/public/equipment.php`, method: 'GET', name: 'Get Equipment List' },
  { url: `${API_BASE}/public/trips.php`, method: 'GET', name: 'Get Trips List' },
  { url: `${API_BASE}/public/packages.php`, method: 'GET', name: 'Get Packages List' },
  
  // Admin endpoints (need auth, expecting 401/403)
  { url: `${API_BASE}/admin/equipment.php`, method: 'GET', name: 'Admin Equipment' },
  { url: `${API_BASE}/admin/bookings.php`, method: 'GET', name: 'Admin Bookings' },
  { url: `${API_BASE}/admin/trips.php`, method: 'GET', name: 'Admin Trips' },
];

console.log('🧪 Testing Railway API Endpoints...\n');
console.log(`Base URL: ${API_BASE}\n`);
console.log('='.repeat(80));

async function testEndpoint(endpoint) {
  try {
    const startTime = Date.now();
    
    const response = await fetch(endpoint.url, {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const duration = Date.now() - startTime;
    const status = response.status;
    const statusText = response.statusText;
    
    // Try to parse response
    let data = null;
    let errorMsg = null;
    
    try {
      const text = await response.text();
      data = JSON.parse(text);
    } catch (e) {
      errorMsg = 'Invalid JSON response';
    }
    
    // Determine result
    let result = '❌ FAIL';
    let reason = '';
    
    if (status >= 200 && status < 300) {
      result = '✅ PASS';
      reason = `${status} OK`;
    } else if (status === 401 || status === 403) {
      result = '⚠️  AUTH';
      reason = `${status} (Auth required - Expected)`;
    } else if (status === 404) {
      result = '❌ FAIL';
      reason = `${status} NOT FOUND`;
    } else if (status >= 500) {
      result = '❌ FAIL';
      reason = `${status} SERVER ERROR`;
    } else {
      result = '⚠️  WARN';
      reason = `${status} ${statusText}`;
    }
    
    // Check CORS headers
    const corsOrigin = response.headers.get('Access-Control-Allow-Origin');
    const corsMethods = response.headers.get('Access-Control-Allow-Methods');
    const hasCORS = corsOrigin !== null;
    
    console.log(`${result} ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);
    console.log(`   Status: ${reason}`);
    console.log(`   Duration: ${duration}ms`);
    console.log(`   CORS: ${hasCORS ? '✅ Present' : '❌ Missing'}`);
    
    if (hasCORS) {
      console.log(`   - Origin: ${corsOrigin}`);
      console.log(`   - Methods: ${corsMethods || 'Not set'}`);
    }
    
    if (data) {
      if (Array.isArray(data)) {
        console.log(`   Data: Array with ${data.length} items`);
      } else if (data.error) {
        console.log(`   Error: ${data.message || 'Unknown error'}`);
      } else {
        console.log(`   Data: Object received`);
      }
    }
    
    if (errorMsg) {
      console.log(`   ⚠️  ${errorMsg}`);
    }
    
    console.log('');
    
    return {
      name: endpoint.name,
      url: endpoint.url,
      status,
      duration,
      hasCORS,
      success: status >= 200 && status < 300,
    };
    
  } catch (error) {
    console.log(`❌ FAIL ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);
    console.log(`   Error: ${error.message}`);
    console.log('');
    
    return {
      name: endpoint.name,
      url: endpoint.url,
      status: 0,
      duration: 0,
      hasCORS: false,
      success: false,
      error: error.message,
    };
  }
}

async function runTests() {
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
  }
  
  // Summary
  console.log('='.repeat(80));
  console.log('📊 SUMMARY\n');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success && r.status !== 401 && r.status !== 403).length;
  const auth = results.filter(r => r.status === 401 || r.status === 403).length;
  const corsEnabled = results.filter(r => r.hasCORS).length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Auth Required: ${auth}`);
  console.log(`🌐 CORS Enabled: ${corsEnabled}/${results.length}`);
  
  console.log('\n' + '='.repeat(80));
  
  if (failed > 0) {
    console.log('\n❌ SOME TESTS FAILED!');
    console.log('\nFailed endpoints:');
    results
      .filter(r => !r.success && r.status !== 401 && r.status !== 403)
      .forEach(r => {
        console.log(`  - ${r.name}: ${r.error || r.status}`);
      });
    
    console.log('\n📋 Troubleshooting:');
    console.log('  1. Check if Railway deployment is complete');
    console.log('  2. Verify database connection in Railway');
    console.log('  3. Check Railway logs for PHP errors');
    console.log('  4. Ensure all PHP files exist in Railway');
    console.log('  5. Test locally with XAMPP first\n');
  } else if (passed > 0) {
    console.log('\n✅ ALL PUBLIC ENDPOINTS WORKING!');
    console.log('\n📋 Next steps:');
    console.log('  1. ✅ Railway backend is accessible');
    console.log('  2. ✅ CORS is configured');
    console.log('  3. Deploy frontend to Vercel');
    console.log('  4. Update Google OAuth settings');
    console.log('  5. Test complete flow on production\n');
  }
  
  if (corsEnabled < results.length) {
    console.log('⚠️  WARNING: Some endpoints missing CORS headers!');
    console.log('   Run: node add-cors-to-all-php.js\n');
  }
}

runTests().catch(console.error);

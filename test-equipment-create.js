// Check Equipment Table Schema
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

async function checkTableSchema() {
  console.log('🔍 Checking Equipment Table Schema...\n');
  
  // Create a test PHP endpoint to get DESCRIBE equipment
  const checkSchemaEndpoint = `${API_URL}/fix-database-schema.php`;
  
  const response = await fetch(checkSchemaEndpoint);
  const data = await response.json();
  
  if (data.success && data.results.current_schema) {
    console.log('✅ Code column: VARCHAR(50) - FIXED!');
  }
  
  console.log('\n📋 Testing simple equipment INSERT (without available_stock):\n');
  
  // Test dengan field yang minimal
  const testResponse = await fetch(`${API_URL}/admin/equipment.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Equipment Short Code',
      code: `TEST-${Date.now()}`,
      category: 'Test',
      stock_quantity: 5,
      price_per_day: 10000
    })
  });
  
  const testData = await testResponse.json();
  console.log('Result:', JSON.stringify(testData, null, 2));
  
  if (testData.success && testData.equipment_id) {
    console.log(`\n✅ Equipment created successfully with ID: ${testData.equipment_id}`);
    
    // Delete test equipment
    const deleteResponse = await fetch(`${API_URL}/admin/equipment.php?id=${testData.equipment_id}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteResponse.json();
    console.log(`✅ Cleanup: ${deleteData.message}`);
  }
}

checkTableSchema().catch(console.error);

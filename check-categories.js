// Get valid equipment categories
const API_URL = 'https://pbl-kuala-outdoor-production.up.railway.app/api';

async function getValidCategories() {
  console.log('🔍 Checking Valid Equipment Categories...\n');
  
  // Get existing equipment to see what categories are used
  const response = await fetch(`${API_URL}/admin/equipment.php`);
  const equipment = await response.json();
  
  if (equipment && equipment.length > 0) {
    const categories = [...new Set(equipment.map(e => e.category))];
    console.log('📋 Categories currently in use:');
    categories.forEach((cat, idx) => {
      console.log(`   ${idx + 1}. "${cat}"`);
    });
    
    console.log('\n📊 Sample equipment by category:');
    equipment.slice(0, 5).forEach(e => {
      console.log(`   - ${e.name}: category="${e.category}"`);
    });
  }
}

getValidCategories().catch(console.error);

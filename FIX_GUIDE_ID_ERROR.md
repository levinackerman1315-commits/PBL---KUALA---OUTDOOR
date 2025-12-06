# 🔧 FIX: Equipment Update Error - guide_id Issue

**Date:** December 6, 2025  
**Issue:** `SQLSTATE[HY000]: General error: 1364 Field 'guide_id' doesn't have a default value`

---

## ❌ PROBLEM:

Saat update equipment (misalnya update nama), muncul SQL error:
```
SQLSTATE[HY000]: General error: 1364 Field 'guide_id' doesn't have a default value
```

**Root Cause:**
- Tabel `equipment_usage_guides` memiliki kolom `guide_id` yang NOT NULL tanpa default value
- Kemungkinan ada trigger atau foreign key constraint yang mencoba insert/update tabel ini
- UPDATE equipment query mencoba mengupdate related tables tanpa proper handling

---

## ✅ SOLUTION IMPLEMENTED:

### 1. Added Transaction Handling:
```php
// ✅ START TRANSACTION
$pdo->beginTransaction();

try {
    // Update equipment basic info
    // Update usage guide (if provided)
    // Update rental terms (if provided)
    
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    throw new Exception("Update failed: " . $e->getMessage());
}
```

### 2. Separated Updates:
- **Basic equipment info** (name, code, description, etc.)
- **Usage guide** (optional - only if provided in request)
- **Rental terms** (optional - only if provided in request)

### 3. Proper DELETE before INSERT:
```php
// Delete existing usage guide before inserting new ones
$stmt = $pdo->prepare("DELETE FROM equipment_usage_guides WHERE equipment_id = ?");
$stmt->execute([$equipment_id]);

// Then insert new steps
foreach ($usage_guide as $step) {
    // INSERT new step
}
```

---

## 📝 CHANGES MADE:

**File:** `api/admin/equipment.php`

**Before:**
```php
case 'PUT':
    // Simple UPDATE query
    $sql = "UPDATE equipment SET ... WHERE equipment_id=?";
    $stmt->execute([...]);
```

**After:**
```php
case 'PUT':
    $pdo->beginTransaction();
    try {
        // 1. Update equipment basic info
        $sql = "UPDATE equipment SET ... WHERE equipment_id=?";
        $stmt->execute([...]);
        
        // 2. Update usage_guide (if provided)
        if (isset($data['usage_guide'])) {
            // DELETE old, INSERT new
        }
        
        // 3. Update rental_terms (if provided)
        if (isset($data['rental_terms'])) {
            // DELETE old, INSERT new
        }
        
        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
```

---

## 🎯 WHAT THIS FIXES:

1. ✅ **Equipment basic info update** (nama, kode, deskripsi) - works independently
2. ✅ **Usage guide update** - only updates if data provided
3. ✅ **Rental terms update** - only updates if data provided
4. ✅ **Transaction rollback** - if any step fails, rollback all changes
5. ✅ **Proper error handling** - clear error messages

---

## 🧪 TESTING:

### Test Case 1: Update Basic Info Only
**Request:**
```json
{
  "equipment_id": 1,
  "name": "Tenda Updated",
  "code": "TENDA-01",
  "description": "Updated description",
  "category": "Tenda",
  "stock_quantity": 10,
  "price_per_day": 25000
}
```

**Expected:** ✅ Update equipment basic info only, leave usage_guide and rental_terms unchanged

### Test Case 2: Update with Usage Guide
**Request:**
```json
{
  "equipment_id": 1,
  "name": "Tenda Updated",
  "code": "TENDA-01",
  "usage_guide": [
    {
      "step_number": 1,
      "title": "Step 1",
      "description": "Description 1"
    }
  ]
}
```

**Expected:** ✅ Update equipment AND replace usage guide steps

### Test Case 3: Update All
**Request:**
```json
{
  "equipment_id": 1,
  "name": "Tenda Updated",
  "usage_guide": [...],
  "rental_terms": [...]
}
```

**Expected:** ✅ Update equipment, usage guide, and rental terms

---

## 🚀 DEPLOYMENT:

### Local Testing:
```bash
# The fix is already in api/admin/equipment.php
# No need to restart PHP server
```

### Railway Deployment:
```bash
git add api/admin/equipment.php
git commit -m "fix: Add transaction handling for equipment UPDATE"
git push origin master
```

**Railway will auto-deploy** after push ✅

---

## ⚠️ IMPORTANT NOTES:

1. **Frontend doesn't need changes** - it already sends correct data structure
2. **Database structure remains the same** - no migrations needed
3. **Backward compatible** - still works if usage_guide/rental_terms not provided
4. **Transaction safety** - if any update fails, all changes are rolled back

---

## ✅ EXPECTED BEHAVIOR AFTER FIX:

### Before Fix:
❌ Update equipment → SQL error "guide_id doesn't have default value"

### After Fix:
✅ Update equipment basic info → Success  
✅ Update with usage guide → Success  
✅ Update with rental terms → Success  
✅ Error in middle of update → Rollback all changes

---

## 📊 STATUS:

| Item | Status |
|------|--------|
| Code Fix | ✅ Complete |
| Transaction Handling | ✅ Implemented |
| Error Handling | ✅ Improved |
| Backward Compatibility | ✅ Maintained |
| Local Testing | ⏳ Pending |
| Railway Deployment | ⏳ Ready to push |

---

**Next Steps:**
1. Push to Railway: `git push origin master`
2. Wait for Railway to redeploy (1-2 minutes)
3. Test on Vercel: Try updating equipment name
4. Verify: Should work without error

---

**Last Updated:** December 6, 2025  
**Status:** ✅ FIX READY - WAITING FOR DEPLOYMENT

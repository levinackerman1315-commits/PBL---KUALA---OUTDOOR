-- FIX DATABASE SCHEMA ISSUES
-- Execute this on Railway MySQL database

-- 1. Fix equipment.code column - expand from VARCHAR(10/15) to VARCHAR(50)
ALTER TABLE equipment 
MODIFY COLUMN code VARCHAR(50) NOT NULL;

-- Verify the change
DESCRIBE equipment;

-- Check existing code lengths
SELECT 
    code, 
    LENGTH(code) as code_length,
    name
FROM equipment
ORDER BY LENGTH(code) DESC
LIMIT 10;

-- Test with a long code (should now work)
-- This is just a test query, will be deleted after
INSERT INTO equipment (
    name, code, description, category, size_capacity, 
    dimensions, weight, material, stock_quantity, 
    available_stock, price_per_day, `condition`, equipment_type
) VALUES (
    'Test Long Code Equipment',
    'TEST-API-LONG-CODE-123456789',
    'Test equipment with long code',
    'Test',
    '1',
    '10x10x10',
    1.0,
    'Test Material',
    1,
    1,
    1000,
    'baik',
    'rental'
);

-- Clean up test
DELETE FROM equipment WHERE code LIKE 'TEST-API%';

SELECT '✅ equipment.code column successfully expanded to VARCHAR(50)' as status;

#!/usr/bin/env python3
"""Fix TambahEquipment.tsx by removing duplicate code"""

# Read file
with open('src/pages/TambahEquipment.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep only first 2390 lines (0-2389 in index)
clean_lines = lines[:2390]

# Replace last line (comment) with actual export
clean_lines[-1] = 'export default TambahEquipment\n'

# Write back
with open('src/pages/TambahEquipment.tsx', 'w', encoding='utf-8') as f:
    f.writelines(clean_lines)

print(f"✅ Fixed TambahEquipment.tsx")
print(f"   Original: {len(lines)} lines")
print(f"   Cleaned: {len(clean_lines)} lines")
print(f"   Removed: {len(lines) - len(clean_lines)} lines of duplicate code")

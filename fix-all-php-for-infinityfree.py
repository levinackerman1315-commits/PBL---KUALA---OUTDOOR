#!/usr/bin/env python3
"""
Script untuk auto-fix semua file PHP di folder api/ untuk InfinityFree hosting
Mengubah:
1. Hardcoded database credentials -> require_once database.php
2. localhost URLs -> https://kualaoutdoor.free.nf
3. Error display settings untuk production
"""

import os
import re
from pathlib import Path

# ✅ Configuration
BASE_DIR = Path(__file__).parent / "api"
PRODUCTION_URL = "https://kualaoutdoor.free.nf"
BACKUP_DIR = Path(__file__).parent / "api_backup"

# ✅ Patterns to replace
REPLACEMENTS = [
    # Database credentials patterns
    (
        re.compile(r'\$host\s*=\s*["\']localhost["\'];?\s*\n\s*\$db_name\s*=\s*["\']kuala_outdoor["\'];?\s*\n\s*\$username\s*=\s*["\']root["\'];?\s*\n\s*\$password\s*=\s*["\']["\'];?', re.MULTILINE),
        '// ✅ Use shared database config\nrequire_once __DIR__ . \'/../config/database.php\';\n$database = new Database();\n$pdo = $database->connect();'
    ),
    (
        re.compile(r'\$host\s*=\s*["\']localhost["\'];?\s*\n\s*\$db_name\s*=\s*["\']kuala_outdoor["\'];?\s*\n\s*\$username\s*=\s*["\']root["\'];?\s*\n\s*\$password\s*=\s*["\']["\'];?\s*\n\s*try\s*{\s*\n\s*\$pdo\s*=\s*new\s+PDO\([^)]+\);?', re.MULTILINE | re.DOTALL),
        '// ✅ Use shared database config\nrequire_once __DIR__ . \'/../config/database.php\';\n\ntry {\n    $database = new Database();\n    $pdo = $database->connect();'
    ),
    (
        re.compile(r'\$host\s*=\s*["\']localhost["\'];?\s*\n\s*\$db_name\s*=\s*["\']kuala_outdoor["\'];?\s*\n\s*\$username\s*=\s*["\']root["\'];?\s*\n\s*\$password\s*=\s*["\']["\'];?\s*\n\s*try\s*{\s*\n\s*\$conn\s*=\s*new\s+mysqli\([^)]+\);?', re.MULTILINE | re.DOTALL),
        '// ✅ Use shared database config\nrequire_once __DIR__ . \'/../config/database.php\';\n\ntry {\n    $database = new Database();\n    $conn = $database->connect();'
    ),
    
    # Localhost URLs to production
    (
        re.compile(r'["\']http://localhost/PBL-KELANA-OUTDOOR["\']', re.IGNORECASE),
        f'\'{PRODUCTION_URL}\''
    ),
    (
        re.compile(r'["\']http://localhost["\']', re.IGNORECASE),
        f'\'{PRODUCTION_URL}\''
    ),
    
    # Error display for production
    (
        re.compile(r'ini_set\(["\']display_errors["\']\s*,\s*1\);', re.IGNORECASE),
        'ini_set(\'display_errors\', 0); // Production'
    ),
]

# ✅ Files to skip
SKIP_FILES = {
    'database.php',  # Already manually fixed
    'test.php',      # Test files
    'setup-database.php',  # Setup script
}

def should_process_file(filepath: Path) -> bool:
    """Check if file should be processed"""
    if filepath.name in SKIP_FILES:
        return False
    if filepath.suffix != '.php':
        return False
    if 'vendor' in filepath.parts:
        return False
    return True

def backup_file(filepath: Path):
    """Create backup of original file"""
    relative_path = filepath.relative_to(BASE_DIR)
    backup_path = BACKUP_DIR / relative_path
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    
    if not backup_path.exists():
        backup_path.write_text(filepath.read_text(encoding='utf-8'), encoding='utf-8')
        print(f"  📦 Backup: {relative_path}")

def fix_php_file(filepath: Path) -> bool:
    """Fix a single PHP file"""
    try:
        content = filepath.read_text(encoding='utf-8')
        original_content = content
        
        # Apply all replacements
        changes_made = False
        for pattern, replacement in REPLACEMENTS:
            new_content = pattern.sub(replacement, content)
            if new_content != content:
                content = new_content
                changes_made = True
        
        # Write if changed
        if changes_made:
            backup_file(filepath)
            filepath.write_text(content, encoding='utf-8')
            return True
        
        return False
        
    except Exception as e:
        print(f"  ❌ Error processing {filepath.name}: {e}")
        return False

def main():
    """Main processing function"""
    print("🚀 Starting InfinityFree PHP Auto-Fixer...")
    print(f"📁 Base directory: {BASE_DIR}")
    print(f"🌐 Production URL: {PRODUCTION_URL}")
    print(f"💾 Backup directory: {BACKUP_DIR}\n")
    
    # Create backup directory
    BACKUP_DIR.mkdir(exist_ok=True)
    
    # Process all PHP files
    total_files = 0
    fixed_files = 0
    skipped_files = 0
    
    for filepath in BASE_DIR.rglob('*.php'):
        if not should_process_file(filepath):
            skipped_files += 1
            print(f"⏭️  Skipped: {filepath.relative_to(BASE_DIR)}")
            continue
        
        total_files += 1
        relative_path = filepath.relative_to(BASE_DIR)
        
        print(f"\n🔧 Processing: {relative_path}")
        if fix_php_file(filepath):
            fixed_files += 1
            print(f"  ✅ Fixed!")
        else:
            print(f"  ℹ️  No changes needed")
    
    # Summary
    print("\n" + "="*60)
    print("📊 SUMMARY:")
    print(f"  Total files processed: {total_files}")
    print(f"  Files fixed: {fixed_files}")
    print(f"  Files skipped: {skipped_files}")
    print(f"  Backups created in: {BACKUP_DIR}")
    print("="*60)
    print("\n✅ Done! Upload folder 'api/' to InfinityFree now!")
    print("⚠️  Don't forget to update password in api/config/database.php!")

if __name__ == "__main__":
    main()

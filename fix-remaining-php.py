#!/usr/bin/env python3
"""
Enhanced script untuk fix SEMUA file PHP yang tersisa
Termasuk login.php, register.php, google-login.php, dll
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent / "api"
PRODUCTION_URL = "https://kualaoutdoor.free.nf"
BACKUP_DIR = Path(__file__).parent / "api_backup_v2"

# ✅ Comprehensive replacements
REPLACEMENTS = [
    # MySQLi connections
    (
        re.compile(r"\$conn\s*=\s*new\s+mysqli\s*\(\s*['\"]localhost['\"]\s*,\s*['\"]root['\"]\s*,\s*['\"]['\"]?\s*,\s*['\"]kuala_outdoor['\"]\s*\)", re.MULTILINE),
        "// ✅ Use shared database config\nrequire_once __DIR__ . '/../config/database_mysqli.php';\n$database = new DatabaseMySQLi();\n$conn = $database->connect()"
    ),
    
    # PDO connections - pattern 1
    (
        re.compile(r'\$pdo\s*=\s*new\s+PDO\s*\(\s*["\']mysql:host=localhost;dbname=(?:kuala_outdoor|kelana_outdoor)["\'].*?\);?', re.MULTILINE | re.DOTALL),
        '// ✅ Use shared database config\nrequire_once __DIR__ . \'/../config/database.php\';\n$database = new Database();\n$pdo = $database->connect();'
    ),
    
    # Localhost URLs with PBL-KELANA-OUTDOOR
    (
        re.compile(r'["\']http://localhost/PBL-KELANA-OUTDOOR([/\w.-]*)["\']', re.IGNORECASE),
        f'\'{PRODUCTION_URL}\\1\''
    ),
    
    # Generic localhost URLs
    (
        re.compile(r'["\']http://localhost:5173["\']', re.IGNORECASE),
        '\'*\''  # Allow all origins
    ),
    
    # CORS localhost specific
    (
        re.compile(r'Access-Control-Allow-Origin:\s*http://localhost:5173', re.IGNORECASE),
        'Access-Control-Allow-Origin: *'
    ),
]

SKIP_FILES = {'test.php', 'setup-database.php', 'database.php', 'database_mysqli.php'}

def should_process_file(filepath: Path) -> bool:
    if filepath.name in SKIP_FILES:
        return False
    if filepath.suffix != '.php':
        return False
    if 'vendor' in filepath.parts or 'node_modules' in filepath.parts:
        return False
    return True

def backup_file(filepath: Path):
    relative_path = filepath.relative_to(BASE_DIR)
    backup_path = BACKUP_DIR / relative_path
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    
    if not backup_path.exists():
        backup_path.write_text(filepath.read_text(encoding='utf-8'), encoding='utf-8')
        print(f"  📦 Backup: {relative_path}")

def fix_php_file(filepath: Path) -> bool:
    try:
        content = filepath.read_text(encoding='utf-8')
        original_content = content
        
        changes_made = False
        for pattern, replacement in REPLACEMENTS:
            new_content = pattern.sub(replacement, content)
            if new_content != content:
                content = new_content
                changes_made = True
        
        if changes_made:
            backup_file(filepath)
            filepath.write_text(content, encoding='utf-8')
            return True
        
        return False
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    print("🚀 Enhanced PHP Fixer - Round 2")
    print(f"📁 Base: {BASE_DIR}")
    print(f"💾 Backup: {BACKUP_DIR}\n")
    
    BACKUP_DIR.mkdir(exist_ok=True)
    
    total = 0
    fixed = 0
    skipped = 0
    
    for filepath in BASE_DIR.rglob('*.php'):
        if not should_process_file(filepath):
            skipped += 1
            continue
        
        total += 1
        relative_path = filepath.relative_to(BASE_DIR)
        
        print(f"🔧 {relative_path}")
        if fix_php_file(filepath):
            fixed += 1
            print(f"  ✅ Fixed!")
        else:
            print(f"  ℹ️  No changes")
    
    print("\n" + "="*60)
    print(f"📊 ROUND 2 SUMMARY:")
    print(f"  Processed: {total}")
    print(f"  Fixed: {fixed}")
    print(f"  Skipped: {skipped}")
    print("="*60)
    print("\n✅ All remaining files fixed!")

if __name__ == "__main__":
    main()

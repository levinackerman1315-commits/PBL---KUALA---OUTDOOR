#!/usr/bin/env python3
"""
FINAL COMPREHENSIVE CHECK - Verify semua file PHP sudah production-ready
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent / "api"

# ✅ Patterns yang TIDAK BOLEH ada di production
BAD_PATTERNS = [
    (r'new PDO\([^)]*localhost[^)]*kuala_outdoor', 'Hardcoded localhost PDO connection'),
    (r'new mysqli\([^)]*localhost[^)]*kuala_outdoor', 'Hardcoded localhost mysqli connection'),
    (r'\$host\s*=\s*["\']localhost["\'];?\s*\n\s*\$db_name\s*=\s*["\']kuala_outdoor', 'Hardcoded localhost credentials'),
    (r'http://localhost/PBL-KELANA-OUTDOOR', 'Localhost URL in code'),
    (r'http://localhost:5173', 'Localhost frontend URL'),
]

SKIP_FILES = {'test.php', 'setup-database.php'}
CRITICAL_FILES = [
    'config/database.php',
    'config/database_mysqli.php',
    'public/equipment.php',
    'public/trips.php',
    'public/login.php',
    'public/register.php',
    'public/google-login.php',
    'admin/equipment.php',
    'admin/login.php',
]

def check_file(filepath: Path) -> dict:
    """Check single file for issues"""
    try:
        content = filepath.read_text(encoding='utf-8')
        issues = []
        
        for pattern, description in BAD_PATTERNS:
            if re.search(pattern, content, re.IGNORECASE | re.MULTILINE):
                issues.append(description)
        
        return {
            'path': filepath.relative_to(BASE_DIR),
            'issues': issues,
            'size': len(content)
        }
    except Exception as e:
        return {
            'path': filepath.relative_to(BASE_DIR),
            'issues': [f'Error reading: {e}'],
            'size': 0
        }

def main():
    print("🔍 FINAL COMPREHENSIVE CHECK")
    print("="*70)
    print()
    
    all_files = []
    issues_found = []
    critical_missing = []
    
    # Check all PHP files
    for filepath in BASE_DIR.rglob('*.php'):
        if filepath.name in SKIP_FILES:
            continue
        
        result = check_file(filepath)
        all_files.append(result)
        
        if result['issues']:
            issues_found.append(result)
    
    # Check critical files exist
    for critical in CRITICAL_FILES:
        critical_path = BASE_DIR / critical
        if not critical_path.exists():
            critical_missing.append(critical)
    
    # Report
    print(f"📊 STATISTICS:")
    print(f"  Total PHP files scanned: {len(all_files)}")
    print(f"  Files with issues: {len(issues_found)}")
    print(f"  Critical files missing: {len(critical_missing)}")
    print()
    
    if issues_found:
        print("❌ FILES WITH ISSUES:")
        print("-" * 70)
        for item in issues_found:
            print(f"  📄 {item['path']}")
            for issue in item['issues']:
                print(f"     ⚠️  {issue}")
            print()
    else:
        print("✅ NO ISSUES FOUND IN PHP FILES!")
        print()
    
    if critical_missing:
        print("⚠️  CRITICAL FILES MISSING:")
        print("-" * 70)
        for missing in critical_missing:
            print(f"  ❌ {missing}")
        print()
    else:
        print("✅ ALL CRITICAL FILES PRESENT!")
        print()
    
    # Verify key files
    print("🔑 KEY FILES VERIFICATION:")
    print("-" * 70)
    
    # Check database.php password
    db_file = BASE_DIR / 'config' / 'database.php'
    if db_file.exists():
        content = db_file.read_text(encoding='utf-8')
        if 'private $password = "";' in content or "private \$password = '';" in content:
            print("  ⚠️  database.php: PASSWORD NOT SET!")
        else:
            print("  ✅ database.php: Password configured")
    
    # Check database_mysqli.php password
    db_mysqli_file = BASE_DIR / 'config' / 'database_mysqli.php'
    if db_mysqli_file.exists():
        content = db_mysqli_file.read_text(encoding='utf-8')
        if 'private $password = "";' in content or "private \$password = '';" in content:
            print("  ⚠️  database_mysqli.php: PASSWORD NOT SET!")
        else:
            print("  ✅ database_mysqli.php: Password configured")
    
    print()
    print("="*70)
    
    if not issues_found and not critical_missing:
        print("🎉 ALL CHECKS PASSED!")
        print("✅ Ready for production deployment!")
    else:
        print("⚠️  PLEASE FIX ISSUES ABOVE BEFORE DEPLOYMENT!")
    
    print("="*70)

if __name__ == "__main__":
    main()

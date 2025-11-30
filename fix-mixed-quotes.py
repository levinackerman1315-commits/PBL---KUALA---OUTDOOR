#!/usr/bin/env python3
"""Fix all mixed quotes in fetch calls"""

import os
import glob
import re

# Pattern untuk detect mixed quotes: backtick di awal, single quote di akhir
pattern = re.compile(r"fetch\(`\$\{API_BASE_URL\}(.*?)'")

fixed_count = 0
files_fixed = []

# Cari semua .tsx files
for filepath in glob.glob('src/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if ada mixed quotes
    if pattern.search(content):
        # Replace mixed quotes dengan backticks yang benar
        new_content = pattern.sub(r'fetch(`${API_BASE_URL}\1`', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        matches = len(pattern.findall(content))
        fixed_count += matches
        files_fixed.append(f"{filepath} ({matches} fixes)")
        print(f"✅ Fixed {matches} mixed quotes in: {filepath}")

if files_fixed:
    print(f"\n📊 Summary:")
    print(f"   Files fixed: {len(files_fixed)}")
    print(f"   Total fixes: {fixed_count}")
    for f in files_fixed:
        print(f"   - {f}")
else:
    print("✅ No mixed quotes found!")

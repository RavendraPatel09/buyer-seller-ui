import os
import re

apps_dirs = [
    '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/buyer/src',
    '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/seller/src',
    '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/admin/src'
]

pattern = r'from [\'"](\.\./)+design-system/components/[^/]+/[^\'"]+[\'"]'
repl = 'from "@medicycle/ui"'

for d in apps_dirs:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                content = re.sub(pattern, repl, content)
                
                # Also fix the ThemeToggle wrapper type issue
                if 'ThemeToggleWrapper.tsx' in path:
                    content = content.replace('setTheme={setTheme}', 'setTheme={setTheme as (theme: string) => void}')
                    
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'Updated {path}')

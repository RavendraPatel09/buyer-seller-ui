import os
import re

buyer_dir = '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/buyer/src'

patterns = [
    (r'from [\'"]\.\./\.\./design-system/utils/cn[\'"]', 'from "@medicycle/utils"'),
    (r'from [\'"]\.\./\.\./\.\./design-system/utils/cn[\'"]', 'from "@medicycle/utils"'),
    (r'from [\'"]\.\./design-system/utils/cn[\'"]', 'from "@medicycle/utils"'),
    (r'from [\'"]\.\./\.\./design-system/components/Button/Button[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./\.\./design-system/components/Button/Button[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./design-system/components/Button/Button[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./components/common/LoadingScreen[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./\.\./components/common/LoadingScreen[\'"]', 'from "@medicycle/ui"')
]

for root, dirs, files in os.walk(buyer_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for pattern, repl in patterns:
                content = re.sub(pattern, repl, content)
                
            # Specifically for ThemeToggle wrapper in layouts
            if 'MainLayout.tsx' in path or 'AuthLayout.tsx' in path:
                content = re.sub(r'from [\'"]\.\./components/common/ThemeToggle[\'"]', 'from "./ThemeToggleWrapper"', content)
                content = re.sub(r'<ThemeToggle \/>', '<ThemeToggleWrapped />', content)
                content = re.sub(r'import \{ ThemeToggle \}', 'import { ThemeToggleWrapped }', content)
                
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {path}')

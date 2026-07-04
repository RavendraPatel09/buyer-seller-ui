import os
import re

admin_dir = '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/admin/src'

patterns = [
    (r'from [\'"]\.\./\.\./design-system/utils/cn[\'"]', 'from "@medicycle/utils"'),
    (r'from [\'"]\.\./\.\./\.\./design-system/utils/cn[\'"]', 'from "@medicycle/utils"'),
    (r'from [\'"]\.\./\.\./design-system/components/Button/Button[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./\.\./design-system/components/Button/Button[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./lib/seo/SEO[\'"]', 'from "../lib/seo/SEO"'),
    (r'from [\'"]\.\./components/common/LoadingScreen[\'"]', 'from "@medicycle/ui"'),
    (r'from [\'"]\.\./\.\./components/common/LoadingScreen[\'"]', 'from "@medicycle/ui"'),
    (r'import \{ ThemeToggle \} from [\'"]\.\./\.\./\.\./components/common/ThemeToggle[\'"]', 'import { ThemeToggleWrapped as ThemeToggle } from "./ThemeToggleWrapper"')
]

for root, dirs, files in os.walk(admin_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for pattern, repl in patterns:
                content = re.sub(pattern, repl, content)
                
            if 'AdminRouteGuard' in path:
                content = re.sub(r'from [\'"]\.\./\.\./components/common/LoadingScreen[\'"]', 'from "@medicycle/ui"', content)
                
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {path}')

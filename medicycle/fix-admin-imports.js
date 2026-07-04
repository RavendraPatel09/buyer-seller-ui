const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    }
    else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const adminDir = '/Users/ravendrapatel/Documents/Buyer seller new /medicycle/apps/admin/src';
const files = walkSync(adminDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/from "\.\.\/\.\.\/design-system\/utils\/cn"/g, 'from "@medicycle/utils"');
  content = content.replace(/from "\.\.\/\.\.\/\.\.\/design-system\/utils\/cn"/g, 'from "@medicycle/utils"');
  content = content.replace(/from "\.\.\/\.\.\/design-system\/components\/Button\/Button"/g, 'from "@medicycle/ui"');
  content = content.replace(/from "\.\.\/\.\.\/\.\.\/design-system\/components\/Button\/Button"/g, 'from "@medicycle/ui"');
  content = content.replace(/from "\.\.\/\.\.\/lib\/seo\/SEO"/g, 'from "../lib/seo/SEO"');
  content = content.replace(/from "\.\.\/components\/common\/LoadingScreen"/g, 'from "@medicycle/ui"');
  content = content.replace(/from "\.\.\/\.\.\/components\/common\/LoadingScreen"/g, 'from "@medicycle/ui"');
  content = content.replace(/import { ThemeToggle } from "\.\.\/\.\.\/\.\.\/components\/common\/ThemeToggle"/g, 'import { ThemeToggleWrapped as ThemeToggle } from "./ThemeToggleWrapper"');
  
  // Specific fix for AdminRouteGuard LoadingScreen
  if (file.includes('AdminRouteGuard')) {
      content = content.replace(/from "\.\.\/\.\.\/components\/common\/LoadingScreen"/g, 'from "@medicycle/ui"');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

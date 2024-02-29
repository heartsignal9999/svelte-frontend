// scripts/generateBlogList.js
import fs from 'fs';
import path from 'path';

const blogContentsDir = path.join(process.cwd(), 'src/pages/blog-contents');
const files = fs.readdirSync(blogContentsDir);
const blogList = files.map(file => {
  const filePath = path.join(blogContentsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/export const title: string = "(.*?)";/);
  const title = titleMatch ? titleMatch[1] : 'Unknown Title';
  return {
    file: file.replace('.ts', ''),  // 확장자 제거
    title
  };
});

fs.writeFileSync(
  path.join(process.cwd(), 'src/stores/blogList.js'),
  `export const blogList = ${JSON.stringify(blogList)};`
);

// scripts/generateBlogList.js
import fs from 'fs';
import path from 'path';

const blogContentsDir = path.join(process.cwd(), 'src/pages/blog-contents');
const files = fs.readdirSync(blogContentsDir);
const blogList = files
  .filter(file => {
    // 파일이면 true를 반환하여 필터링
    const filePath = path.join(blogContentsDir, file);
    return fs.statSync(filePath).isFile();
  })
  .map(file => {
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

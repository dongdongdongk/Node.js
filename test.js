const fs = require('fs');

// 명령줄에서 전달된 폴더명을 가져옴 (디폴트는 'Project')
const folderName = process.argv[2] || 'Project';

try {
  // 폴더 생성 (동기 방식)
  fs.mkdirSync(folderName); // 동기적으로 폴더 생성 
  console.log(`Folder '${folderName}' created.`);

  // 세 개의 파일 생성 (동기 방식)
  fs.writeFileSync(`${folderName}/index.html`, '');
  fs.writeFileSync(`${folderName}/app.js`, '');
  fs.writeFileSync(`${folderName}/style.css`, '');

  console.log('Three files created in the folder.');
} catch (err) {
  console.error('SOMETHING WENT WRONG!!!', err);
}
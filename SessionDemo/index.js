const express = require('express');
const session = require('express-session');

const app = express();

const sessionOptions = {
    secret: 'thisisnotagoodsecret',  // 세션을 암호화하는 데 사용되는 키
    resave: false,  // 세션 데이터가 변경되지 않아도 항상 저장 여부를 설정
    saveUninitialized: false  // 초기화되지 않은 세션도 저장 여부를 설정
  };
// Express 세션 미들웨어 설정
app.use(session(sessionOptions));



// 이후에 세션을 활용한 기능을 추가할 수 있음

// 예시: 페이지 조회 수 세션 기록
app.get('/viewcount', (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} times`);
});

app.get('/register', (req, res) => {
    const { username ='Anonymous' } = req.query; // // 쿼리 문자열에서 'username' 값을 받아오고, 없으면 'Anonymous'로 설정
    req.session.username = username; // 세션에 'username' 속성으로 저장
    res.send("register")
})

app.get('/greet', (req, res) => {
    const { username } = req.session // 세션에서 'username' 값을 가져오기
    res.send(`Welcome ${username}`)
}) 

// 앱을 포트 3000에서 실행
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const express = require("express");
//Express를 불러와서 변수에 저장 (일반적으로 app 변수로 명명)
const app = express();
const path = require('path');

app.use('/assets',express.static(path.join(__dirname, 'React/dist/assets')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/React/dist/index.html'));
  });

//메서드를 사용하여 서버를 시작하고, 지정된 포트에서 들어오는 요청을 수락
app.listen(8080, () => {
    console.log("SERVER PORT ON 8080");
})
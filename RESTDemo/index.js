const express = require('express'); // express 모듈을 불러오고, express()를 통해 새로운 Express 애플리케이션을 생성.
const app = express(); //app 변수에 Express 앱을 할당

app.use(express.urlencoded({extended : true})) //미들웨어는 POST 요청의 본문을 해석하기 위해 사용
app.use(express.json());

app.get('/tacos',(req,res) => {
    res.send("GET / tacos response")
})

app.post('/tacos',(req,res) => {
    const { meat , qty } = req.body;
    res.send(`text : ${meat} number : ${qty}`)
})

app.listen(3000, () => {
    console.log("PORT 3000")
})
const express = require("express");
//Express를 불러와서 변수에 저장 (일반적으로 app 변수로 명명)
const app = express();
//객체의 속성을 트리 구조로 표시
console.dir(app)

//.use 들어오는 요청이 있다면 무조건 응답
// app.use(() => {
//     console.log("NEW REQUEST");
// })

app.get('/cats',(req,res) => {
    res.send("GET CAT")
})

app.get('/dog',(req,res) => {
    res.send("GET DOG")
})

app.post('postCat',(req,res) => {
    res.send("POST CAT")
})

app.get('/',(req,res) => {
    res.send("HOME")
})

app.get('*',(req,res) => {
    res.send("지정된 경로가 없습니다.")
})

//메서드를 사용하여 서버를 시작하고, 지정된 포트에서 들어오는 요청을 수락
app.listen(8080, () => {
    console.log("SERVER PORT ON 8080");
})
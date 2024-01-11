const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));  //안에 문자가 쿠키 파서가 쿠키에 사인할 때 쓰임 그리고 쿠키를 돌려받았을 때 변함이 없는지도 확인

app.get('/greet', (req, res) =>{
    const { name = "기본값" } = req.cookies;
    res.send(`${name} Hi THERE`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'dongdongk')
    res.send('OK Cookie')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed : true}) // 비밀키 설정 true
    res.send("OK SIGNED")
}) 

app.get('/verifyfruit', (req, res) =>{
    console.log(req.signedCookies)
    res.send(req.signedCookies);
})

app.listen(4000, () => {
    console.log('Server---3000')
})
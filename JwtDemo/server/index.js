const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
} = require('./controller') // index.js 로 만들면 이렇게 폴더만 가져와도 자동으로 인식

const app = express();
dotenv.config();

// 기본 설정을 해준다 
app.use(express.json());
// 쿠키를 사용하여 JWT 를 사용할 예정이기 떄문에 사용
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}))

app.post('/login', login);
app.get('/accessToken', accessToken);
app.get('/refreshToken', refreshToken);
app.get('/login/success', loginSuccess);
app.post('/logout', logout);


app.listen(process.env.PORT, () => {
    console.log(`server is on ${process.env.PORT}`);
})

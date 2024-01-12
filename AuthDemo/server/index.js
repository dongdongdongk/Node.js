const express = require('express');
const cors = require('cors')
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const { default: reportWebVitals } = require('../client/src/reportWebVitals');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 쿼리스트링 
app.use(cors());
app.use(session({ secret : 'secret'}))

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authDemo'); // 마지막 부분이 DB명
    console.log("Mongo Connect Success")
}
// 연결 확인 코드 
const db = mongoose.connection; // MongoDB 연결에 대한 정보를 얻는다. 이 정보를 db 변수에 할당 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // 최신 버전의 드라이버와의 호환성을 유지
    useUnifiedTopology: true,
});
db.once("open", () => { // 한 번만 실행되는 이벤트 리스너 등록 MongoDB에 성공적으로 연결되었을 때 메세지
    console.log("Database connected");
});

// 사용자 등록 엔드포인트
app.post('/register', async (req, res) => {
    // 클라이언트에서 전송된 사용자 정보를 받아옵니다.
    const { password, username } = req.body;
    
    // 받아온 비밀번호를 bcrypt를 사용해 해시값으로 변환합니다.
    const hash = await bcrypt.hash(password, 12);
    
    // 새로운 사용자 객체를 생성하고 MongoDB에 저장합니다.
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    
    // 클라이언트에게 해시값을 응답으로 보냅니다.
    res.send(hash);
})

// 사용자 로그인 엔드포인트
app.post('/login', async (req, res) => {
    // 클라이언트에서 전송된 사용자 정보를 받아옵니다.
    const { username, password } = req.body;
    
    // MongoDB에서 해당 사용자를 찾습니다.
    const user = await User.findOne({ username }) // 사용자명이 고유하다고 가정하고 있기 때문에 findOne
    
    // 비밀번호를 bcrypt.compare를 사용해 해시와 비교하여 인증을 수행합니다.
    const validPassword = await bcrypt.compare(password, user.password)
    
    // 인증이 성공하면 "Success"를, 실패하면 "Fail"을 클라이언트에게 응답으로 보냅니다.
    if(validPassword) {
        req.session.user.user_id = user._id;
        res.send("Success")
    } else {
        res.send('Fail')
    }
})

app.get('/secret', (req, res) => {
    if(!req.session.user_id) {
        res.send("Fail")
    } else {

    }
})




app.listen(4000, () => {
    console.log("Success");
})
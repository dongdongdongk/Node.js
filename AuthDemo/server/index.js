const express = require('express');
const cors = require('cors')
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 쿼리스트링 
app.use(cors({
    origin: 'http://localhost:3000', // 리액트 앱의 주소
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // 쿠키 전달을 허용하려면 true로 설정
  }));
const sessionOptions = {
    secret: 'thisisnotagoodsecret',  // 세션을 암호화하는 데 사용되는 키
    resave: false,  // 세션 데이터가 변경되지 않아도 항상 저장 여부를 설정
    saveUninitialized: false  // 초기화되지 않은 세션도 저장 여부를 설정
  };

app.use(session(sessionOptions))

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
    const user = new User({username, password})
    await user.save()
    // req.session.user_id = user._id; // 등록하고 바로 로그인 하려면 바로 발급
    
    // 클라이언트에게 해시값을 응답으로 보냅니다.
    res.send({success : true, user});
})

// 사용자 로그인 엔드포인트
app.post('/login', async (req, res) => {
    // 클라이언트에서 전송된 사용자 정보를 받아옵니다.
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    
    if(foundUser) {
        req.session.user_id = foundUser._id;
        res.json({ success: true, user: { username: foundUser.username } });
    }

});

// 사용자 로그인 확인 엔드포인트
app.get('/login/check', async (req, res) => {
    // 세션에서 사용자 ID를 가져옵니다.
    const userId = req.session.user_id;
    console.log(userId)

    if (userId) {
        // 세션에 사용자 ID가 존재하면 사용자 정보를 응답으로 전송합니다.
        const user = await User.findById(userId);
        res.json({ success: true, user: user.username });
    } else {
        // 세션에 사용자 ID가 없으면 로그인되지 않은 상태로 응답합니다.
        res.json({ success: false });
    }
});

// 로그 아웃 
app.post('/logout', (req, res) => {
    console.log('Logout!!!!!!!!!!!!!!!!')
    req.session.user_id = null; // 반드시 null 로 설정해야함
    // req.session.destroy(); // 사용자에 대한 정보를 완전 삭제하고 로그아웃
    res.status(200).json({ success: true, message: 'LogoutSuccess' });
})




app.listen(4000, () => {
    console.log("Success");
})
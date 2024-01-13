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
    
    // 받아온 비밀번호를 bcrypt를 사용해 해시값으로 변환합니다.
    const hash = await bcrypt.hash(password, 12);
    
    // 새로운 사용자 객체를 생성하고 MongoDB에 저장합니다.
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    // req.session.user_id = user._id; // 등록하고 바로 로그인 하려면 바로 발급
    
    
    // 클라이언트에게 해시값을 응답으로 보냅니다.
    res.send(hash);
})

// 사용자 로그인 엔드포인트
app.post('/login', async (req, res) => {
    // 클라이언트에서 전송된 사용자 정보를 받아옵니다.
    const { username, password } = req.body;
    
    // MongoDB에서 해당 사용자를 찾습니다.
    const user = await User.findOne({ username }); // 사용자명이 고유하다고 가정하고 있기 때문에 findOne
    
    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않으면 인증 실패로 응답합니다.
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ success: false, message: 'Authentication failed' });
    }

    // 인증이 성공하면 세션에 사용자 ID를 저장하고 클라이언트에게 성공과 사용자 정보를 응답합니다.
    req.session.user_id = user._id;
    res.json({ success: true, user: { username: user.username } });
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




app.listen(4000, () => {
    console.log("Success");
})
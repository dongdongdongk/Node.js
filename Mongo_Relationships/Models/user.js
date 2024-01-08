const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo') // 몽구스를 이용해서 몽고DB 연결

// 연결 확인 코드 
const db = mongoose.connection; // MongoDB 연결에 대한 정보를 얻는다. 이 정보를 db 변수에 할당 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // 최신 버전의 드라이버와의 호환성을 유지
    useUnifiedTopology: true,
});
db.once("open", () => { // 한 번만 실행되는 이벤트 리스너 등록 MongoDB에 성공적으로 연결되었을 때 메세지
    console.log("Database connected");
});

const userSchema = new mongoose.Schema({
    first : String,
    last : String,
    addresses : [
        {
            _id : {_id : false}, // 자동으로 생성되는 id 끄기 
            street : String,
            city : String,
            state : String,
            county : String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first : 'Harry',
        last : 'Potter'
    })
    u.addresses.push({
        street : '123 sesame St.',
        city : 'New York',
        state : 'NY',
        county : 'USA'
    })
    const res = await u.save();
    console.log(res);
}

makeUser();
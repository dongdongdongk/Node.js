const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.once("open", () => { 
    console.log("Database connected");
});

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    username : String,
    age : Number,

})
// 트윗 스키마 정의
const tweetSchema = new mongoose.Schema({
    text : String,
    likes : Number,
    user : {type :mongoose.Schema.Types.ObjectId, ref : 'User'}
})

// 사용자와 트윗 모델 생성
const User = mongoose.model('User',userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// 비동기 함수로 사용자와 트윗 생성 및 저장
// tweet , user 만들기 
// const makeTweets = async () => {
//     const user = new User({username : 'Dongk', age : 64})
//     const tweet1 = new Tweet({text : 'omg', likes : 5})
//     tweet1.user = user;
//     user.save();
//     tweet1.save();
// }

// makeTweets();

// tweet 찾기 ( 모든속성)
// const findTweet = async () => {
//     const t = await Tweet.findOne({})
//         .populate('user')
//     console.log(t);
// }

// 원하는 속성만 가져오기 
const findTweet = async () => {
    const t = await Tweet.findOne({})
        .populate('user','username')
    console.log(t);
}

findTweet();
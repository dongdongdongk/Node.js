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

// ����� ��Ű�� ����
const userSchema = new mongoose.Schema({
    username : String,
    age : Number,

})
// Ʈ�� ��Ű�� ����
const tweetSchema = new mongoose.Schema({
    text : String,
    likes : Number,
    user : {type :mongoose.Schema.Types.ObjectId, ref : 'User'}
})

// ����ڿ� Ʈ�� �� ����
const User = mongoose.model('User',userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// �񵿱� �Լ��� ����ڿ� Ʈ�� ���� �� ����
// tweet , user ����� 
// const makeTweets = async () => {
//     const user = new User({username : 'Dongk', age : 64})
//     const tweet1 = new Tweet({text : 'omg', likes : 5})
//     tweet1.user = user;
//     user.save();
//     tweet1.save();
// }

// makeTweets();

// tweet ã�� ( ���Ӽ�)
// const findTweet = async () => {
//     const t = await Tweet.findOne({})
//         .populate('user')
//     console.log(t);
// }

// ���ϴ� �Ӽ��� �������� 
const findTweet = async () => {
    const t = await Tweet.findOne({})
        .populate('user','username')
    console.log(t);
}

findTweet();
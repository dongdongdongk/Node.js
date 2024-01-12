const express = require('express');
const cors = require('cors')
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const { default: reportWebVitals } = require('../client/src/reportWebVitals');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ������Ʈ�� 
app.use(cors());
app.use(session({ secret : 'secret'}))

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authDemo'); // ������ �κ��� DB��
    console.log("Mongo Connect Success")
}
// ���� Ȯ�� �ڵ� 
const db = mongoose.connection; // MongoDB ���ῡ ���� ������ ��´�. �� ������ db ������ �Ҵ� 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // �ֽ� ������ ����̹����� ȣȯ���� ����
    useUnifiedTopology: true,
});
db.once("open", () => { // �� ���� ����Ǵ� �̺�Ʈ ������ ��� MongoDB�� ���������� ����Ǿ��� �� �޼���
    console.log("Database connected");
});

// ����� ��� ��������Ʈ
app.post('/register', async (req, res) => {
    // Ŭ���̾�Ʈ���� ���۵� ����� ������ �޾ƿɴϴ�.
    const { password, username } = req.body;
    
    // �޾ƿ� ��й�ȣ�� bcrypt�� ����� �ؽð����� ��ȯ�մϴ�.
    const hash = await bcrypt.hash(password, 12);
    
    // ���ο� ����� ��ü�� �����ϰ� MongoDB�� �����մϴ�.
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    
    // Ŭ���̾�Ʈ���� �ؽð��� �������� �����ϴ�.
    res.send(hash);
})

// ����� �α��� ��������Ʈ
app.post('/login', async (req, res) => {
    // Ŭ���̾�Ʈ���� ���۵� ����� ������ �޾ƿɴϴ�.
    const { username, password } = req.body;
    
    // MongoDB���� �ش� ����ڸ� ã���ϴ�.
    const user = await User.findOne({ username }) // ����ڸ��� �����ϴٰ� �����ϰ� �ֱ� ������ findOne
    
    // ��й�ȣ�� bcrypt.compare�� ����� �ؽÿ� ���Ͽ� ������ �����մϴ�.
    const validPassword = await bcrypt.compare(password, user.password)
    
    // ������ �����ϸ� "Success"��, �����ϸ� "Fail"�� Ŭ���̾�Ʈ���� �������� �����ϴ�.
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
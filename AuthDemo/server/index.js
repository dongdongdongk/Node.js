const express = require('express');
const cors = require('cors')
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ������Ʈ�� 
app.use(cors({
    origin: 'http://localhost:3000', // ����Ʈ ���� �ּ�
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // ��Ű ������ ����Ϸ��� true�� ����
  }));
const sessionOptions = {
    secret: 'thisisnotagoodsecret',  // ������ ��ȣȭ�ϴ� �� ���Ǵ� Ű
    resave: false,  // ���� �����Ͱ� ������� �ʾƵ� �׻� ���� ���θ� ����
    saveUninitialized: false  // �ʱ�ȭ���� ���� ���ǵ� ���� ���θ� ����
  };

app.use(session(sessionOptions))

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
    // req.session.user_id = user._id; // ����ϰ� �ٷ� �α��� �Ϸ��� �ٷ� �߱�
    
    
    // Ŭ���̾�Ʈ���� �ؽð��� �������� �����ϴ�.
    res.send(hash);
})

// ����� �α��� ��������Ʈ
app.post('/login', async (req, res) => {
    // Ŭ���̾�Ʈ���� ���۵� ����� ������ �޾ƿɴϴ�.
    const { username, password } = req.body;
    
    // MongoDB���� �ش� ����ڸ� ã���ϴ�.
    const user = await User.findOne({ username }); // ����ڸ��� �����ϴٰ� �����ϰ� �ֱ� ������ findOne
    
    // ����ڰ� �������� �ʰų� ��й�ȣ�� ��ġ���� ������ ���� ���з� �����մϴ�.
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ success: false, message: 'Authentication failed' });
    }

    // ������ �����ϸ� ���ǿ� ����� ID�� �����ϰ� Ŭ���̾�Ʈ���� ������ ����� ������ �����մϴ�.
    req.session.user_id = user._id;
    res.json({ success: true, user: { username: user.username } });
});

// ����� �α��� Ȯ�� ��������Ʈ
app.get('/login/check', async (req, res) => {
    // ���ǿ��� ����� ID�� �����ɴϴ�.
    const userId = req.session.user_id;
    console.log(userId)

    if (userId) {
        // ���ǿ� ����� ID�� �����ϸ� ����� ������ �������� �����մϴ�.
        const user = await User.findById(userId);
        res.json({ success: true, user: user.username });
    } else {
        // ���ǿ� ����� ID�� ������ �α��ε��� ���� ���·� �����մϴ�.
        res.json({ success: false });
    }
});




app.listen(4000, () => {
    console.log("Success");
})
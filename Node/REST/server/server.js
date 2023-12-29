const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

const comments = [
    {
        id : 1,
        username : '동현',
        comment : '가나다라마바'
    },

    {
        id : 2,
        username : '민수2',
        comment : '민수가 2 입니다'
    },
    {
        id : 3,
        username : '민수3',
        comment : '민수가 3 입니다'
    },
    {
        id : 4,
        username : '민수4',
        comment : '민수가 4 입니다'
    },
    {
        id: 5,
        username : '민수5',
        comment : '민수가 5 입니다'
    }
]

// 전체 댓글 조회
app.get('/comments', (req,res) => {
    res.json(comments);
});

// 댓글 추가 
app.post('/comments/new',(req,res) => {
    const { username, comment} = req.body;
    comments.push({
        username,
        comment
    });
    //res.redirect("/")
    return res.send("Success");
});

// 상세 조회
app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    const comment = comments.find(c => c.username === username);
    res.json(comment)
});


app.listen(4000, () =>{
    console.log("Server Start")
});
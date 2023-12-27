const app = express();
const path = require('path');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const comments = [
    {
        username : 'Todd',
        comment : 'lol that is so funny'
    },
    {
        username : 'bill',
        comment : 'I like to go bird'
    },
    {
        username : 'SkBerBoi',
        comment : 'Plz delete your account'
    },
    {
        username : 'John',
        comment : 'Woof Woof Woof'
    }
]
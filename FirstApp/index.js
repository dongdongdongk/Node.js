const express = require("express");
const app = express();
console.dir(app)

//.use 들어오는 요청이 있다면 무조건 응답
app.use(() => {
    console.log("NEW REQUEST");
})

app.listen(8080, () => {
    console.log("SERVER PORT ON 8080");
})
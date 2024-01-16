const { json } = require('express');
const userDatabase = require('../Database');
const jwt = require('jsonwebtoken');

// 로그인 
const login = (req, res, next) => {
    const { email, password } = req.body;

    // email 을 비교해서 유저의 정보를 가져오기 ( 몽고DB는 findOne 가 되겠다 )
    const userInfo = userDatabase.filter(item => {
        return item.email === email
    })[0]; // 첫번째 요소 가져오기 
    if (!userInfo) { // 알맞은 유저가 없다면 오류 생성
        res.status(403).json("Not Authorized");
    } else {
        try {
            // access Token 발급
            const accessToken = jwt.sign({ // 3개의 인자를 받는다 
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email
            }, process.env.ACCESS_SECRET, { expiresIn: '1m', issuer: 'About Tech' }); 

            // refresh Token 발급
            const refreshToken = jwt.sign({ // 리프레쉬는 똑같은데 시간이 더 길다 
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email
            }, process.env.REFRESH_SECRET, { expiresIn: '24h', issuer: 'About Tech' });

            // token 전송
            res.cookie('accessToken', accessToken, {
                secure: false, //http 와 https 의 차이를 명시 
                httpOnly: true
            })

            res.cookie('refreshToken', refreshToken, {
                secure: false,
                httpOnly: true,
            })

            res.status(200).json("login Success")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    next();
}
// 토큰 확인 (엑세스 토큰 로그인 확인)
const accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken; // 요청에서 쿠키에 엑세스 토큰값 가져오기 
        const data = jwt.verify(token, process.env.ACCESS_SECRET); // 주어진 토큰과 비밀 키를 사용하여 토큰의 유효성을 검사 첫번째 인자 토큰 , 두번째 인자 비밀키 

        const userData = userDatabase.find(item => { //데이터 베이스의 email 과 같은 사용자 정보를 찾는다 
            return item.email === data.email;
        })

        const { password, ...others } = userData // password를 분리하고, 나머지 속성들을 others에 담아 활용 ( 비밀번호 노출을 피하기 위해서 )
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


// 용도 액세스 토큰을 갱신 
const refreshToken = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);

        const userData = userDatabase.find(item => { //데이터 베이스의 email 과 같은 사용자 정보를 찾는다 
            return item.email === data.email;
        })

        // access Token 재발급
        const accessToken = jwt.sign({ // 새로 발급해줄때는 userData 에서 가져온다 
            id: userData.id,
            username: userData.username,
            email: userData.email
        }, process.env.ACCESS_SECRET, { expiresIn: '1m', issuer: 'About Tech' }); 

        res.cookie('accessToken', accessToken, {
            secure: false, //http 와 https 의 차이를 명시 
            httpOnly: true
        })

        res.status(200).json("Access Token Recreate");



        // 액세스 토큰 새로 발급
    } catch (error) {
        res.status(500).json(error)  
    }
}

const loginSuccess = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userData = userDatabase.find(item=>{
            return item.email === data.email;
        })
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

//로그아웃
const logout = (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
}
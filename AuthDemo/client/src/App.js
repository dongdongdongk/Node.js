import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Secret from './pages/secret';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  // 로그인 상태와 사용자 정보를 관리하는 state
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // React Router의 네비게이션을 활용하기 위한 함수
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 로그인 상태 확인을 위한 useEffect
  useEffect(() => {
    // 서버에 로그인 상태를 확인하는 요청을 보냄
    axios.get('http://localhost:4000/login/check', { withCredentials: true })
      .then(res => {
        // 서버에서 받은 응답에 따라 상태 업데이트
        if (res.data.success) {
          setLoggedIn(true);
          setUser(res.data.user);
        }
      })
      .catch(err => console.error(err));
  }, [loggedIn]); // 로그인 상태가 변경될 때마다 useEffect 실행

  return (
    <div>
      {/* 네비게이션을 위한 링크 목록 */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* 로그인 상태에 따라 로그인 또는 로그아웃 버튼 및 Secret 페이지로 이동하는 링크 표시 */}
          {loggedIn ? (
            <>
              <button onClick={() => setLoggedIn(false)}>Logout</button>
              <Link to="/secret">Secret</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>

      {/* 페이지 컴포넌트를 라우팅하기 위한 Routes 컴포넌트 */}
      <Routes>
        {/* Home 페이지: 로그인된 상태에서만 접근 가능, 사용자 정보 전달 */}
        <Route path="/" element={loggedIn ? <Home user={user} /> : <Navigate to="/" />} />
        {/* Login 페이지: 로그인되지 않은 상태에서만 접근 가능 */}
        <Route path='/login' element={<Login />} />
        {/* Register 페이지: 로그인되지 않은 상태에서만 접근 가능 */}
        <Route path='/register' element={<Register />} />
        {/* Secret 페이지: 로그인된 상태에서만 접근 가능, 사용자 정보 전달 */}
        <Route path='/secret' element={loggedIn ? <Secret user={user} /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;

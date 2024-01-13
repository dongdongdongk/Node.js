import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Secret from './pages/secret';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/login/check',{ withCredentials: true }) // 수정된 부분: /user 대신 /login/check 엔드포인트 사용
      .then(res => {
        if (res.data.success) {
          setLoggedIn(true);
          setUser(res.data.user);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {loggedIn ? (
              <>
                <button onClick={() => setLoggedIn(false)}>Logout</button>
                <Link to="/secret">Secret</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul> */}

      <Routes>
        <Route path="/" element={loggedIn ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/secret' element={loggedIn ? <Secret user={user}/> : <Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;

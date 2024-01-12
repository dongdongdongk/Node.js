import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/register" element={< Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  );
}

export default App;

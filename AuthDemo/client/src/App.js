import './App.css';
import Register from './pages/register';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/register" element={< Register/>} />
    </Routes>
  );
}

export default App;

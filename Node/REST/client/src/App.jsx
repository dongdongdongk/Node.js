import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './pages/AddUser';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/AddUser' element={<AddUser />}/>
    </Routes>
  );
}


export default App;

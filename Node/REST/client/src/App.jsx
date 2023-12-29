import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './pages/AddUser';
import CommentInfo from './pages/CommentInfo';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CommentUpdate from './pages/CommentUpdate';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/AddUser' element={<AddUser />}/>
      <Route path='/profile/:id' element={<CommentInfo/>}/>
      <Route path='/profile/:id/update' element={<CommentUpdate/>}/>
    </Routes>
  );
}


export default App;

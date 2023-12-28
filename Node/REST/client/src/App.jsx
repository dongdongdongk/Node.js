import './App.css';
import CommentList2 from './CommentList2';
import { useEffect,useState } from "react";
import axios from 'axios';



function App() {
  const[comments, setComments] = useState([]);
  const fetchData = async () => {
    const res = await axios.get('http://localhost:4000/comments');
    setComments(res.data);
  };
useEffect(() => {fetchData()},[]);

  return (
    <>
      <h1>List</h1>
      <CommentList2 comments={comments}/>
    </>
  );
}


export default App;

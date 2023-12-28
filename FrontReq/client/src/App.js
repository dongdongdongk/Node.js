import { useEffect,useState } from "react";
import axios from 'axios';

function App() {
  const[todoList, setTodoList] = useState([]);

  // 재사용을 위해서 함수를 따로 빼줬다 
  const fetchData = async () => {
    const response = await axios.get('http://localhost:4000/api/todo');
    setTodoList(response.data);
  };
  
  // 이제 함수를 받아서 실행 
  useEffect(() => {fetchData()},[]);

     const onSubmitHandler = async (e) => {
      e.preventDefault();
      const text = e.target.text.value;
      const done = e.target.done.checked;
      
      await axios.post('http://localhost:4000/api/todo',{text, done});
      fetchData();
     };
    
  return (
    <div className="App">
      <h1>todoList</h1>
      {/* 데이터 입력 */}
      <form onSubmit={onSubmitHandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value='추가' />
      </form>

      {todoList.map((todo) => (
        <div key={todo.id} style={{display : 'flex'}}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'Y' : 'N'}</div>
        </div>
      ))}
    </div>
  );
}

export default App;

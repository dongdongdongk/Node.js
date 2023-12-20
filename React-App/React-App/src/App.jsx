import './App.css'
import ShoppingList from './ShoppingList'
const data = [
  {item : 'egg', quantity : 12, completed : false},
  {item : 'milk', quantity : 1, completed : true},
  {item : 'chicken breasts', quantity : 4, completed : false},
  {item : 'carrots', quantity : 6, completed : false},  
  {item : 'test', quantity : 8, completed : true}
]

function App() {
  return (
    <div>
      <ShoppingList item={data}
      />
    </div>
  )

}

export default App

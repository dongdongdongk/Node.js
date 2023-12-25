import { useState} from "react";
import ShoppingListForm from "./ShoppingListForm";
function ShoppingList() {
    const [item,setItem] = useState([
        { id:1, product:"Bananas",quantity:8},
        { id:2, product:"Egg",quantity:12},
]);
    const addItem = (item) => {
        setItem((currItems) =>{
            return [...currItems, {...item, id:9}]
        });
    }; 
return(
    <div>
        <h1>ShoppingList</h1>
        <ul>
            {item.map(i=><li key={i.id}>{i.product}-{i.quantity}</li>)}
        </ul>
        <ShoppingListForm addItem={addItem}/>
    </div>
)
}

export default ShoppingList;
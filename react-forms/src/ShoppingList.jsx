import { useState} from "react";
import { v4 as uuid } from "uuid";
import ShoppingListForm from "./ShoppingListForm";
import ValidatedShoppingListForm from "./ValidatedShoppingListForm";
function ShoppingList() {
    const [item,setItem] = useState([
        { id:uuid(), product:"Bananas",quantity:8},
        { id:uuid(), product:"Egg",quantity:12},
]);
    const addItem = (item) => {
        setItem((currItems) =>{
            return [...currItems, {...item, id:uuid()}]
        });
    }; 
return(
    <div>
        <h1>ShoppingList</h1>
        <ul>
            {item.map(i=><li key={i.id}>{i.product}-{i.quantity}</li>)}
        </ul>
        <ValidatedShoppingListForm addItem={addItem}/>
    </div>
)
}

export default ShoppingList;
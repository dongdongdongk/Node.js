import ShoppingListItem from "./ShoppingListItem";
function ShoppingList({item}) {
 return (
    <ul>
        {item.map((i) => ( 
            <ShoppingListItem
                key={i.id} {...i}
                // item={i.item}
                // quantity={i.quantity}
                // completed={i.completed}
            />
            ))}
    </ul>
 )

}

export default ShoppingList; 
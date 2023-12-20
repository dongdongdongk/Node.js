function ShoppingList({item}) {
 return (
    <ul>
        {item.map(i => 
            <li style={{color : i.completed ? "grey" : "red",
                        textDecoration : i.completed ? "line-through" : "none"
            }}>
                {i.item}-{i.quantity}
            </li>)}
    </ul>
 )

}

export default ShoppingList;
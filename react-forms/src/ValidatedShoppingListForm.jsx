import { useState } from "react";
function ValidatedShoppingListForm({addItem}) {
    const [formData,setFormData] = useState({product:"",quantity:0});
    const [productIsValid,setProductIsValid] = useState(false);
    
    const validate = (product) => {
        if(product.length === 0) {
            setProductIsValid(false);
        } else {
            setProductIsValid(true);
        }
    }
    
    
    const handleChange = (evt) => {
        if(evt.target.name === "product"){
            validate(evt.target.value);
        }
        setFormData(currData => {
            return {
                ...currData,[evt.target.name]: evt.target.value,
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(productIsValid){
            console.log("submit");
            addItem(formData);
            setFormData({product:"", quantity:0}); // 폼 제출 후 입력란 비우기 
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <h1>Product is : {formData.product} and quantity is : {formData.quantity}</h1>
            <label htmlFor="product">Product Name</label>
            <input type="text" placeholder="product name" name="product" id="product" onChange={handleChange} value={formData.product}/>
            
            {!productIsValid && (<p style={{color:"red"}}>Product name cannot be empty</p>)}
            
            <label htmlFor="quantity">Quantity</label>
            <input type="number" placeholder="1" name="quantity" id="quantity" onChange={handleChange} value={formData.quantity}/>
            <button disabled={!productIsValid}>AddItem</button>
        </form>
    );
}

export default ValidatedShoppingListForm;
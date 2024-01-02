import axios from 'axios';

const ProductUpdatePage = () => {
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const category = e.target.category.value;
        await axios.patch
    }

    return (
        <>
            <h1>ProductUpdatePage</h1>
            <form>
                <label for="name">ProductName</label>
                <input type="text" name="name" id="name"/>
                <label for="price">Price</label>
                <input type="number" name="price" id="price"></input>
                <label for="category">Category</label>
                <select name="category" id="category">
                    <option value="fruit">fruit</option>
                    <option value="vegetable">vegetable</option>
                    <option value="dairy">dairy</option>
                </select>
            </form>
        </>

    )

};

export default ProductUpdatePage;
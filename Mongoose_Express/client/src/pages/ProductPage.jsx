import { useEffect, useState } from "react";
import { Link, useSearchParams  } from 'react-router-dom';
const ProductPage = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log("카테고리는",category)
        fetch('http://localhost:4000/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <>
            <h1>ProductPage</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to={"/product/new"}>상품등록</Link>
        </>
        
        
    )
}

export default ProductPage;
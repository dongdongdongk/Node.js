import { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const apiUrl = category ? `http://localhost:4000/products?category=${category}` : 'http://localhost:4000/products';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, [category]);

    return (
        <>
            <h1>{category ? `${category}Page` : 'AllPage'}</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to={"/product/new"}>상품등록</Link>
            {category && <Link to={"/products"}>AllPage</Link>}
        </>
    );
}

export default ProductPage;
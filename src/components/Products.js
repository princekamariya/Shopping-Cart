import React, { useState, useEffect } from "react";
import "../index.css";

import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            console.log(data);
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAdd = (product) => {
        dispatch(add(product));
    };
    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h5>{product.title}</h5>
                    <h6>{product.price}</h6>
                    <button
                        onClick={() => {
                            handleAdd(product);
                        }}
                        className="btn"
                    >
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;

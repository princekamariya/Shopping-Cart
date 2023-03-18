import React, { useState, useEffect } from "react";
import "../index.css";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUES } from "../store/productSlice";

const Products = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        dispatch(fetchProducts()); // here if we want to pass props here then we can use that inside fetchProducts() also
        // const fetchProducts = async () => {
        //     const res = await fetch("https://fakestoreapi.com/products");
        //     const data = await res.json();
        //     console.log(data);
        //     setProducts(data);
        // };
        // fetchProducts();
    }, []);

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    if(status === STATUES.LOADING){
        return <h2>Loading.....</h2>
    }

    if(status === STATUES.ERROR){
        return <h2>Something went wrong!</h2>
    }

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

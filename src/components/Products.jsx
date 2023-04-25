//Create a React component that fetches a list of products from an e-commerce API endpoint using useEffect hook and displays the product name, description, price, and quantity on the screen using the useState hook. Add a button which allows the user to sort the products by price (lowest to highest).

import { useEffect, useState } from "react"
import { fakeFetchSeven } from "../apis/fakeFetchSeven"

export function Products () {

    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])

    async function getProducts() {
        try {
            const {status, data:{products}} = await fakeFetchSeven('https://example.com/api/products')
            if(status ===200)
                setProducts(products)
        } catch (error) {
            
        }
    }

    useEffect(()=> {
        getProducts()
    }, [])

    function handleAscendingOrder() {
        setSortedProducts([...products].sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price))
    }

    function handleDescendingOrder () {
        setSortedProducts([...products].sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price))
    }

    function handleReset() {
        setSortedProducts(products)
    }
    
    return(
        <>
            <h1>Products</h1>
            <button onClick={handleAscendingOrder}>Low to high</button>
            <button onClick={handleDescendingOrder}>High to low</button>
            <button onClick={handleReset}>Reset</button>
            <ul>
                {   !sortedProducts.length &&
                    products.map(({name, description, price, quantity}) => <li>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>{price}</p>
                        <p>{quantity}</p>
                    </li>)
                }
            </ul>

            <ul>
                {  
                    sortedProducts.map(({name, description, price, quantity}) => <li>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>{price}</p>
                        <p>{quantity}</p>
                    </li>)
                }
            </ul>
        </>
    )
}
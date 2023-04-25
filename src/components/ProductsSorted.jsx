//Create a React component that uses the useEffect hook to fetch the product data from the API endpoint using the fakeFetch function provided below. The component should use the useState hook to store the fetched data and a second state variable to store the sorted data. The sorted data should be sorted in descending order by rating.

import { useEffect, useState } from "react"
import { fakeFetchEight } from "../apis/fakeFetchEight"

export function ProductsSorted() {

    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])

    async function getProducts() {
        try {
            const { status, data: { products } } = await fakeFetchEight('https://example.com/api/products')
            if (status === 200) {
                setProducts(products)
                //setSortedProducts(products)
                setSortedProducts([...products].sort((firstProduct, secondProduct) => secondProduct.rating - firstProduct.rating))
                //getSortedProduct()
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        getProducts()
        
    }, [])

    /*function getSortedProduct() {
        setSortedProducts([...products].sort((firstProduct, secondProduct) => secondProduct.rating - firstProduct.rating))
    }*/

    function handleSearch(event) {
        setSortedProducts(products.filter(({name}) => name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <>
            <h1>Products</h1>
            <input type="text" onChange={handleSearch}/>

            {
                sortedProducts.map(({ name, price, quantity, rating }) => 
                <div style={{border: "1px solid grey", margin: "5px 10px", borderRadius: "5px"}}>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{quantity}</p>
                    <p>{rating}</p>
                </div>)
            }
        </>
    )
}
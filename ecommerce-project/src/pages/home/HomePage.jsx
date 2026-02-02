import { useEffect, useState } from "react"
import axios from "axios"
import { Header } from "../../components/Header"
import { ProductsGrid } from "./ProductsGrid"
import HomeFavicon from "../../assets/home-favicon.png"
import "./HomePage.css"
export function HomePage({ cart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get("/api/products")
            .then((response) =>{
                setProducts(response.data)
            })
    }, [])
    

    return (
        <>
            <link rel="icon" href={HomeFavicon} />
            <title>Ecommerce Project</title>
            <Header cart={cart}/>
            <div className="home-page"> 
                <ProductsGrid products={products} />
            </div>
        </>
    )
}
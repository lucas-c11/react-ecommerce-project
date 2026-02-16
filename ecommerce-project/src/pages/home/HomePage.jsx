import { useEffect, useState } from "react"
import axios from "axios"
import { Header } from "../../components/Header"
import { ProductsGrid } from "./ProductsGrid"
import HomeFavicon from "../../assets/home-favicon.png"
import "./HomePage.css"
export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get("/api/products")
                setProducts(response.data)
        }

        getHomeData();

    }, []);
    

    return (
        <>
            <link rel="icon" href={HomeFavicon} />
            <title>Ecommerce Project</title>
            <Header cart={cart}/>
            <div className="home-page"> 
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    )
}
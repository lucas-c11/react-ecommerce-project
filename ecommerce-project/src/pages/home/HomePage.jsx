import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import axios from "axios"
import { Header } from "../../components/Header"
import { ProductsGrid } from "./ProductsGrid"
import HomeFavicon from "../../assets/home-favicon.png"
import "./HomePage.css"
export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const searchText = searchParams.get("search") || ""
    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get(`/api/products${searchText && `?search=${searchText}`}`)
                setProducts(response.data)
        }
        getHomeData();
    }, [searchText]);
    

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
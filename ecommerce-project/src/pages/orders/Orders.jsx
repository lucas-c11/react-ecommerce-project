import { useState, useEffect } from "react"
import axios from "axios"
import { Header } from "../../components/Header"
import { OrdersGrid } from "./OrdersGrid";
import OrdersFavicon from "../../assets/orders-favicon.png"
import "./Orders.css"

export function Orders({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("/api/orders?expand=products")
            .then((response) => {
                setOrders(response.data)
            })
    }, [])



    return (
        <>
            <link rel="icon" href={OrdersFavicon} />
            <title>Orders</title>
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>


                {orders.map((order) => {
                    return (
                        <div key={order.id} className="order-container">
                            <OrdersGrid order={order} loadCart={loadCart} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
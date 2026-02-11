import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"
import dayjs from "dayjs"
import { Header } from "../components/Header"
import "./Tracking.css"
export function Tracking({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchTrackingData();

    }, [orderId])

    if (!order) { return null; }
    return (
        <>
            <title>Tracking</title>
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(order.products.find(product => product.productId === productId).estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                    </div>

                    <div className="product-info">
                        {order.products.find(product => product.productId === productId).product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {order.products.find(product => product.productId === productId).quantity}
                    </div>

                    <img className="product-image" src={order.products.find(product => product.productId === productId).product.image} />
                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
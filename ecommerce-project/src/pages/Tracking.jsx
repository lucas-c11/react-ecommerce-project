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
    let isPreparing, isShipped, isDelivered;
    const orderProduct = order.products.find(product => product.productId === productId)
    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs
    const passedTimeMs = dayjs().valueOf() - order.orderTimeMs;
    let orderProgress = (passedTimeMs / totalDeliveryTimeMs) * 100
    if(orderProgress >= 100){
        orderProgress=100;
        isDelivered=true;
    }
    if(orderProgress >= 33 & orderProgress<100){
        isShipped=true;
    }
    if (orderProgress < 33){
        isPreparing=true;
    }

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
                        {`${orderProgress>=100 ? "Delivered on" : "Arriving on"} ${dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}`}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />
                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && "current-status"}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && "current-status"}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && "current-status"}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width:`${orderProgress}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
import { useState, useEffect } from "react"
import axios from "axios"
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import CartFavicon from "../../assets/cart-favicon.png";
import "./Checkout.css";

export function Checkout({ cart }) {
    const [paymentSummary, setPaymentSummary] = useState(null);
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    useEffect(() => {
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            .then((response) => {
                setDeliveryOptions(response.data);
            })
        axios.get("/api/payment-summary")
            .then((response) => {
                setPaymentSummary(response.data);
            })
    }, [])

    
    return (
        <>
            <link rel="icon" href={CartFavicon} />
            <title>Checkout</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    )
}
import { useState, useEffect } from "react"
import axios from "axios"
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import CartFavicon from "../../assets/cart-favicon.png";
import "./Checkout.css";

export function Checkout({ cart, loadCart }) {
    const [paymentSummary, setPaymentSummary] = useState(null);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    useEffect(() => {
        const fetchCheckoutData = async () => {
            let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            setDeliveryOptions(response.data)

            response = await axios.get("/api/payment-summary")
            setPaymentSummary(response.data);
        };
        fetchCheckoutData();
    }, [cart])


    return (
        <>
            <link rel="icon" href={CartFavicon} />
            <title>Checkout</title>
            <CheckoutHeader cart={cart}/>
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    )
}
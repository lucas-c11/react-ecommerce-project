import { useState } from "react"
import axios from "axios";
import { formatMoney } from "../../utils/money"
export function CartItemDetails({ cartItem, loadCart }) {
    const [updatingQuantity, setUpdatingQuantity] = useState(true);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const updateQuantity = async () => {
        setQuantity(cartItem.quantity)
        if (updatingQuantity){
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity:parseInt(quantity)
            })
        }
        setUpdatingQuantity(!updatingQuantity)
    }
    const updateQuantityKeyPress = async (event) => {
        if (event.key === "Enter"){
            updateQuantity()
        }
        if (event.key === "Escape"){
            setUpdatingQuantity(false)
            setQuantity(cartItem.quantity)
        }
    }
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    {updatingQuantity &&
                        <input
                            type="text"
                            value={quantity}
                            className="update-quantity-input"
                            onChange={(event) => { setQuantity(event.target.value) }} 
                            onKeyDown = {updateQuantityKeyPress}/>
                    }
                    <span 
                        className="update-quantity-link link-primary" 
                        onClick = {updateQuantity}>
                        {updatingQuantity ? "Save" : "Update"}
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}
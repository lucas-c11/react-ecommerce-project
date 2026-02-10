import { OrderHeader } from "./OrderHeader"
import { OrderDetailsGrid } from "./OrderDetailsGrid"

export function OrdersGrid({ order }) {
    return (
        <div className="orders-grid">
            <div className="order-container">
                <OrderHeader order={order}/>
                <OrderDetailsGrid order={order}/>
            </div>
        </div>
    )
}
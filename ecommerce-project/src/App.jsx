import { useEffect, useState } from "react"
import axios from "axios"
import { HomePage } from "./pages/home/HomePage"
import { Checkout } from "./pages/checkout/Checkout"
import { Orders } from "./pages/orders/Orders"
import { Tracking } from "./pages/Tracking"
import { NotFound } from "./pages/NotFound"

import { Routes, Route } from "react-router"
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  useEffect(() => {
    const fetchAppData = async () =>{
      const response = await axios.get("/api/cart-items?expand=product")
      setCart(response.data)
    }
    fetchAppData();
  })


  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>} />
        <Route path="checkout" element={<Checkout cart={cart}/>} />
        <Route path="orders" element={<Orders cart={cart}/>}/>
        <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
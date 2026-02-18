import { useState } from "react"
import { NavLink, useNavigate, useSearchParams } from "react-router"
import CartIcon from "../assets/images/icons/cart-icon.png"
import SearchIcon from "../assets/images/icons/search-icon.png"
import LogoWhite from "../assets/images/logo-white.png"
import "./Header.css"


export function Header({ cart }){
    const [searchParams] = useSearchParams()
    const search = searchParams.get("search") || ""
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState(search || "")



    let totalQuantity = 0;
    cart.forEach((cartItem)=>{
        totalQuantity += cartItem.quantity;
    })

    const submitSearch = () => {
        console.log(searchText)
        navigate(`/?search=${searchText}`)
    }
    return(
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={LogoWhite} />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input 
                        className="search-bar" 
                        type="text" placeholder="Search" 
                        onChange = {(event) => {setSearchText(event.target.value)}}/>

                    <button 
                      className="search-button"
                      onClick={submitSearch}>
                    <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}
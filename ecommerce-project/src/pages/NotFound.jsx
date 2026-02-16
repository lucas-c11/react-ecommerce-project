import { Header } from "../components/Header"
import "./NotFound.css"
export function NotFound({ cart }){
    return(
        <div className="container">
            <Header cart={cart}/>
            <h1 className="not-found">404 Not Found</h1>
        </div>
    )
}
import { Link } from "react-router-dom";
import { CartContext } from './CartContext';
import { useContext } from "react";
const CartWidget = () => {
    const { cart } = useContext(CartContext);
    const totalProductos = cart.reduce((total, item) => total + item.quantity, 0);
    return(
        <div className="flex">
            {totalProductos === (0) ? (
                <p className="hydden"></p>
            ) : (
                <span className="font-bold">{totalProductos}</span>
            )}
            <Link to={"/cart"} className="material-icons cartWidget " > shopping_cart </Link>
            
        </div>
    )
}
export default CartWidget
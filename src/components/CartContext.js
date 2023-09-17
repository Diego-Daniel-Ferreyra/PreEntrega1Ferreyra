import React, { useState, createContext } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();
const { Provider } = CartContext;

function CartContextProvider(props) {
    const [cart, setCart] = useState([]);
    const addToCart = (item, quantity) => {
        const enCarrito = cart.findIndex((cartItem) => cartItem.id === item.id);

        if (enCarrito !== -1) {
            const agregar = [...cart];
            agregar[enCarrito].quantity += quantity;
            setCart(agregar);
        } else {
            const nuevoItem = { ...item, quantity };
            setCart([...cart, nuevoItem]);
        }
    };

    const eliminar = (itemId)=> {
        const eliminar = cart.filter((item) => item.id !== itemId);
        setCart(eliminar);
        toast.success("producto eliminado del carrito")
    }
    const vaciarCarrito = () =>{
        setCart([]);
        toast.success("Carrito eliminado")
    }


    return (
        <Provider value={{ cart, addToCart, eliminar,vaciarCarrito }}>
            {props.children}
        </Provider>
    );
}

export { CartContext, CartContextProvider };

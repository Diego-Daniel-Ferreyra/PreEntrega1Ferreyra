import React, { useContext, useState } from 'react';
import ItemCount from './ItemCount';
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "./CartContext.js";

function ItemDetail({ producto }) {
    const { addToCart } = useContext(CartContext);
    const [cantidad,setCantidad]= useState(0)

    const onAdd = (cantidad) => {
        // Llama a la función addToCart del contexto para agregar el producto al carrito
        addToCart(producto, cantidad);
        setCantidad(cantidad)
    };
    return (
        <>
        <article className="grid sm:grid-cols-1 md:grid-cols-2 border border-black card shadow-md p-2 w-1/2">
            <div className='flex-col justify-center'>
                <img className='w-64 object-fill' src={producto.imagen} alt={producto.descripcion} />
                <ItemCount stock={producto.cantidad} cantidad={cantidad} onAdd={onAdd} id={producto.id} />
            </div>
            <div className='flex-col justify-center mx-8'>
                <h2 className="text-start font-bold">{producto.descripcion}</h2>
                <p >Precio <b>${producto.precio}</b></p>
                <div className='flex '>
                    <NavLink to={"/cart"} className='bg-blue-500 hover:font-bold font-semibold border border-black rounded m-4 p-1' > Ir al Carrito </NavLink>
                    <Link to={"/"} className='flex justify-center bg-blue-500 font-semibold border border-black rounded m-4 p-1'> Ir a productos</Link>
                </div>
            </div>
        </article>
        </>
    );
}

export default ItemDetail;

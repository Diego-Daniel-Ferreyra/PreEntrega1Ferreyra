
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function ItemCount(props) {
    
    const stockDisponible = props.stock;
    const [stock, setStock] = useState(stockDisponible);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);

    
    const sumar = () => {
        if (stock > 0) {
            setCantidadSeleccionada(cantidadSeleccionada + 1);
            setStock((stockprevio) => stockprevio - 1);
        }
    };

    const restar = () => {
        if (cantidadSeleccionada > 0) {
            setCantidadSeleccionada(cantidadSeleccionada - 1);
            setStock((stockprevio) => stockprevio + 1);
        }
    };
    
    const add = () => {
        props.onAdd(cantidadSeleccionada, stock);
        toast.success("producto agregado al carrito");
    };

    useEffect(() => {
        setStock(stockDisponible);
    }, [stockDisponible]);

    return (
        <div className='flex flex-col items-around '>
            <p key={props.i}>  consolas disponibles: <b> {stock} </b></p>
            <div className='flex justify-center'>
                <button className="material-icons font-semibold border border-black rounded m-1" onClick={restar}>remove</button>
                <p className='border border-black rounded px-6 cantidad m-1'>{cantidadSeleccionada}</p>
                <button className="material-icons font-semibold border border-black rounded m-1" onClick={sumar}>add</button>
            </div>
                <button className='bg-blue-500 hover:font-bold font-semibold border border-black rounded m-1 p-1' 
                        onClick={add}>
                    add to cart
                </button>
        </div>
    );
}

export default ItemCount;

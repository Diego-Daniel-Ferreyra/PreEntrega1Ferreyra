import React from 'react';
import { NavLink } from 'react-router-dom';

function Item({ producto }) {
    return (
        <article
            key={producto.id} className="grid sm:grid-cols-1 md:grid-cols-1 border border-black card shadow-md p-2 rounded-md">   
            <NavLink to={`/prod/${producto.id}`}>
                <div className='flex justify-center '>
                    <img className=" rounded w-80 h-60" src={producto.imagen} alt={producto.descripcion}/>
                </div>
                <div className='flex-col justify-center'>
                    <h2 className="h-12 text-start font-bold uppercase truncate text-blue-700">
                        {producto.descripcion}
                    </h2>
                    <p className="font-font-semibold justify-items-center"> <b>$ {producto.precio}</b></p>
                </div>
            </NavLink>
        </article>
    );
}

export default Item;

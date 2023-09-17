import React from 'react';
import Item from './Item';



function ItemList({data}) {
    return (
            <section className=" gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
                {data.length === 0 ? (
                    <p className="font-bold">
                        CARGANDO CATALOGO DE PRODUCTOS...
                    </p>
                ) : (
                    data.map((item, i) => {
                        return <Item key={i} producto={item} />;
                    })
                )}                   
            </section>
    );
}

export default ItemList;

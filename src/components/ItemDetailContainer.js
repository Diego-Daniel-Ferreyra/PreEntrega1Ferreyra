import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ItemDetail from "./ItemDetail";
import { db } from "../firebase";
import { getDoc, doc, collection } from "firebase/firestore";
import { toast } from "sonner";


function ItemDetailContainer() {
    const [producto, setProducto] = useState({});
    const { id } = useParams();

    useEffect(() => {

        const productosCollection = collection(db,"productos");
        
        const referenciaDelDocumento = doc(productosCollection,id)

        const consulta = getDoc(referenciaDelDocumento);
        
        toast.promise(consulta, {
            loading: 'Cargando',
            success: (resultado) => {
                const producto = resultado.data()
                producto.id =resultado.id
                setProducto(producto)
                return 'Producto cargado';
            },
            error: (error) =>{
                return error
            },
            });
    }, [id]);
    return (
        <>
            <div className="flex justify-center">
            {Object.keys(producto).length === 0? (
                    <h2 className="flex justify-center font-bold texto-aparecer-desaparecer">
                    CARGANDO PRODUCTO...
                </h2>
                ) : (
                    <ItemDetail producto={producto} />
                )}
            </div>
        </>
    );
}

export default ItemDetailContainer;




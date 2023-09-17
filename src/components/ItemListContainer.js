import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ItemList from "./ItemList";
import { db } from "../firebase";
import { getDocs, collection, query, where} from "firebase/firestore";
import { toast } from 'sonner'

function ItemListContainer({ greeting }) {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        const productosCollection = collection(db,"productos");
        
        const filtroConsulta = id
        ? query(productosCollection, where("marca", "==", id,))
        : productosCollection;
        
        const consulta = getDocs(filtroConsulta);

            toast.promise(consulta, {
            loading: 'Cargando',
            success: (resultado) => {
                const aux = resultado.docs.map((doc) =>{
                    const producto = doc.data()
                    producto.id= doc.id
                    return producto
                })
                setData(aux)
                return 'Productos cargados';
            },
            error: (error) =>{
                return error
            },
            });
    }, [id]);


    return (
        <>
            <h2 className="flex justify-center font-bold mb-4">{greeting}</h2>
            <ItemList data={data} />
        </>
    );
}

export default ItemListContainer;

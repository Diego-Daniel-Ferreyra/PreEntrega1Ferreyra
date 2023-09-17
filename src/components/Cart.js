import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { NavLink, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection,addDoc,serverTimestamp } from 'firebase/firestore';

function Cart() {
    const { cart, eliminar, vaciarCarrito} = useContext(CartContext);
    const [token,setToken] = useState("")
    const [formData, setFormData] = useState({
        nombre: '',
        Numero: '',
        email: '',
        dirección: '',
    });

    const totalPago = cart.reduce((accumulator, item) => {
        return accumulator + item.precio * item.quantity;
    }, 0); 
    const laVenta =  () => {
        const totalPago = cart.reduce((accumulator, item) => {
            return accumulator + item.precio * item.quantity;
        }, 0); 
        
        const ventasCollection = collection(db, 'ventas');
        const venta = {
            cliente: {
                nombre: formData.nombre,
                Numero: formData.Numero,
                email: formData.email,
            },
            fecha: serverTimestamp(),
            productos: cart.map((item) => ({
                id: item.id,
                cantidad: item.quantity,
                price: item.precio,
            })),
            totalPago: totalPago,
        };
            const pedido = addDoc(ventasCollection, venta);
            pedido
            .then((resultado) => {
                setToken(resultado.id)
            })
            .catch((error) => { 
                return error
            })
    };
    

    
    const change = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };
    return (
        <div> 
            {cart.length === 0 ? (
                <div className='flex flex-col'>
                    <h2 className='material-icons flex justify-center font-black text-5xl w-300'>production_quantity_limits</h2>
                    <div className='flex justify-center'>
                        <Link to={"/"} className='flex justify-center bg-blue-300 font-semibold hover:text-slate-100 border border-black rounded m-1 p-1 h-10'> Ir a productos</Link>
                    </div>
                </div>
                ) : (
                <div className='flex-col'>
                    <h2 className='flex justify-center font-bold text-4xl'>Tu carrito</h2>
                    <div className='flex justify-center'>
                    <section>
                        <div className='border border-black rounded  bg-green-100'>
                        <form className="max-w-md mx-auto my-8 p-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                Apellido y Nombre  
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Ingresa tu apellido y nombre"
                                name="nombre" 
                                value={formData.nombre}  
                                onChange={change}  
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                Numero de teléfono
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Ingresa tu Numero de teléfono"
                                name="Numero" 
                                value={formData.Numero}  
                                onChange={change} 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                Correo Electrónico
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                name="email" 
                                value={formData.email}  
                                onChange={change} 
                                />
                            </div>
                            <div className="mb-4">
                                <Link onClick={() => { laVenta(); vaciarCarrito(); }} 
                                    className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    FINALIZAR COMPRA
                                </Link>
                            </div>
                        </form>                     
                    </div>
                        </section>
                    <section className="rounded-md w-1/3">
                            {cart.map((item) => (
                            <section className='grid sm:grid-cols-1 border border-black rounded m-4 mt-2rem p-4' key={item.id}>
                                <div className='text-center '>
                                    <p className='font-bold flex justify-center'>PRODUCTO</p>
                                    <p className='font-bold flex justify-center truncate'>{item.marca}</p>
                                </div>
                                <div >
                                    <p className='font-bold flex justify-center'>PRECIO</p>
                                    <p className='flex justify-center' >$ {item.precio}</p>
                                </div>
                                <div >
                                    <p className='font-bold flex justify-center'>CANTIDAD</p>
                                    <div className='flex justify-center '>
                                        <button onClick={() => {
                                            eliminar(item.id);
                                            }} className=' w-9 text-red-700 font-semibold material-icons'>
                                            delete forever
                                        </button>
                                        <p className='flex justify-center  border border-black rounded px-4 m-1'>{item.quantity}</p>
                                        <NavLink to={`/prod/${item.id}`} className="border border-black font-semibold rounded px-2 h-6 m-1 material-icons">add</NavLink>
                                    </div>
                                </div>
                                <div>
                                    <p className='font-bold flex justify-center'>SUB totalPago</p>
                                    <p className='flex justify-center'>$ {item.precio * item.quantity}</p>
                                </div>                                
                            </section>
                            ))}
                            <div className=' w-2/2 flex justify-center m-8'>
                                <Link to={"/"} className='flex justify-center bg-blue-500 font-semibold hover:text-slate-100 border border-black rounded m-1 p-1 h-10'> Seguir Comprando</Link>
                                <button onClick={() => {
                                    vaciarCarrito();
                                    }} className='flex justify-center bg-red-500 hover:text-slate-100 font-semibold border border-black rounded m-1 p-1 h-10'>
                                    Vaciar
                                </button>
                            </div>
                            <h2 className='flex justify-center font-black text-2xl'>totalPago a pagar: ${totalPago}</h2>
                    </section>
                        
                </div>
                </div>
            )}
            {!token  ? (
                <p className="hydden"></p>
            ) : (
                <p>Su token de compra es:  {token}</p>
            )}
            
        </div>
    );   
}

export default Cart;

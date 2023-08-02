import CartWidget from "./Cartwidget";


function NavBar (){
    return(
        <div className='flex justify-evenly bg-sky-500'>
            <div className=' flex justify-start basis-1/4'>
                <h1 className="px-4">Todo Gamers</h1>
                <button className="px-4">Consolas</button>
                <button className="px-4">Accesorios</button>
            </div>
            <div className="basis 1/2">
            <CartWidget/>
            </div>
        </div>
    )
}

export default NavBar;
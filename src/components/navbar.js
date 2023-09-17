import { Link, NavLink } from "react-router-dom";
import CartWidget from "./Cartwidget";



function NavBar (){
    return(
        <div className='flex justify-around bg-blue-400 p-4 '>
            <Link to={"/"}> <h1 className='basis-1/4 text-2xl italic'>TODO GAMERS</h1> </Link>
            <NavLink to="/cat/Sony" className="hover:text-white">Sony</NavLink>
            <NavLink to="/cat/Microsoft" className="hover:text-white">Microsoft</NavLink>
            <NavLink to="/cat/Nintendo" className="hover:text-white">Nintendo</NavLink>
            <CartWidget/>
        </div>
    )
}

export default NavBar;
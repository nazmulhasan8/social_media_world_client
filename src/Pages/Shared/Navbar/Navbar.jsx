import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import logo from '../../../assets/icons/download.jpg';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/SAMSUNG">Media</Link></li>
        <li><Link to="/Messages">Blog</Link></li>
        
        <li><Link to="/About">About</Link></li>
        <li><Link to="/searchyou">Search</Link></li>

        
        
        {user?.uid ?
            <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogOut}>Sign out</button></li>
                <span>{user?.displayName}</span>
            </>
            : <li><Link to="/login">Login</Link></li>}





    </>

 

    return (
        <div className="navbar h-20 mb-12 py-30 bg-base-300 ">
            <div className="navbar-start">
            {/* bg-black text-white */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img className=' rounded-full' 
                    style={{ height: '60px' }} src={logo} alt="" />SAMSUNG BOOK
                </Link> 
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            
        </div>
    );
};

export default Navbar;
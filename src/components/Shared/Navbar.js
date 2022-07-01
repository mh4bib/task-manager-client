import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const Menu = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/to-do'}>To-Do</Link></li>
        <li><Link to={'/completed-tasks'}>Completed Tasks</Link></li>
        <li><Link to={'/calendar'}>Calendar</Link></li>
    </>

    return (
        <div className="navbar bg-blue-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {Menu}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">Task Master</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {Menu}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
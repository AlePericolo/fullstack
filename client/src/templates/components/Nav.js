import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaChevronDown, FaChevronUp, FaBars, FaTimes, FaUser, FaPowerOff } from 'react-icons/fa';

import { logout } from '@/store/actions';

import { isNil } from 'lodash';

export default function Nav() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.app.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const menu = [
        { link: "/articles", name: "articles" },
        { link: "/test", name: "test" }
    ]

    const handleUser = () => {
        if (isNil(user))
            return (
                <Link to="/auth"
                    className="inline-block text-xs uppercase font-bold leading-snug p-3 rounded
                        bg-yellow-400 text-yellow-700 hover:bg-yellow-300 hover:text-yellow-800 
                        transition ease-in duration-150">
                    Login
                </Link>
            )

        return (
            <div className="dropdown inline-block relative">
                <div className="p-3 flex items-center justify-between text-xs uppercase font-bold leading-snug text-white hover:opacity-75 border-white lg:border-l lg:border-r"
                    role="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {user.email} &nbsp; {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <ul className={`dropdown-menu absolute mt-3 w-full lg:border-indigo-700 lg:border-l lg:border-b lg:border-r ${dropdownOpen ? 'block' : 'hidden'}`}>
                    <li>
                        <Link to="/profile"
                            className="p-3 flex items-center justify-around text-xs uppercase leading-snug bg-white text-indigo-700 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaUser /> profile
                        </Link>
                    </li>
                    <li>
                        <span className="p-3 flex items-center justify-around text-xs uppercase leading-snug bg-white text-red-700 hover:bg-gray-200" 
                            role="button"
                            onClick={()=> {setDropdownOpen(!dropdownOpen); dispatch(logout())}}>
                            <FaPowerOff className='text-red-700'/> logout
                        </span>
                    </li>
                </ul>
            </div>)

    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <nav className="relative py-3 flex flex-wrap items-center justify-between bg-indigo-700">
                    <div className="container mx-auto flex flex-wrap items-center justify-between lg:px-4">
                        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                            <Link to="/"
                                className="flex items-center text-xs uppercase font-bold leading-snug text-white">
                                    <img src="/assets/images/ale.png" width="30" alt="logo" className='mr-2' /> 
                                    <span className="hover:opacity-75">home</span>
                            </Link>
                            <button
                                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                        <div className={`lg:flex flex-grow items-center ${menuOpen ? "flex" : "hidden"}`}>
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                {menu.map((e, index) =>
                                    <li key={index} className="nav-item">
                                        <Link to={e.link}
                                            className="p-3 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                            {e.name}
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    {handleUser()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
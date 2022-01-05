import React, { useState } from 'react';

import { Link, Outlet } from 'react-router-dom';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function NavArticle() {
    
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="relative w-full flex flex-wrap items-center justify-between bg-gray-200 shadow p-3">
                <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-end">
                    <Link to="/articles"
                        className="flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                        onClick={() => setMenuOpen(false)}>
                        articles
                    </Link>
                    <div className="block lg:hidden" role="button" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                </div>
                <div className={`lg:flex flex-grow items-center lg:justify-end ${menuOpen ? "flex" : "hidden"}`}>
                    <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-5">
                        <li className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to="user"
                                className="flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75 transition ease-in duration-150">
                                my articles
                            </Link>
                        </li>
                        <li className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to="new"
                                className="flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75 transition ease-in duration-150">
                                new article
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaChevronDown, FaChevronUp, FaBars, FaTimes, FaUser, FaPowerOff } from 'react-icons/fa';

import Auth from '@/templates/pages/Auth'

import Button from '@/templates/components/Button'
import Modal from '@/templates/components/Modal'

import { logout, handleAuthModal } from '@/store/actions';

import { isNil } from 'lodash';

export default function Nav() {

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.app);
    const {authModal} = useSelector((state) => state.ui)
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const menu = [
        { link: "articles", name: "articles" },
        { link: "test", name: "test" }
    ]

    const handleUser = () => {
        if (isNil(user))
            return <Button btn="warning"
                    size="sm"
                    text="login"
                    onClick={() => dispatch(handleAuthModal(true))}/>

        return (
            <div className="dropdown relative">
                <div className="px-3 flex items-center justify-between text-xs uppercase font-bold leading-snug text-white hover:opacity-75 lg:pl-3 lg:border-white lg:border-l"
                    role="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {user.email} &nbsp; {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <ul className={`dropdown-menu absolute z-10 shadow w-screen bg-white text-xs uppercase leading-snug lg:w-full mt-3 lg:mt-5 ${dropdownOpen ? 'block' : 'hidden'}`}>
                    <li className='p-3 hover:bg-gray-200' onClick={() => { setMenuOpen(!menuOpen); setDropdownOpen(!dropdownOpen) }} role="button">
                        <Link to="profile"
                            className="flex items-center justify-evenly text-indigo-700">
                            <FaUser /> profile
                        </Link>
                    </li>
                    <li className='p-3 hover:bg-gray-200' onClick={() => { setMenuOpen(!menuOpen); setDropdownOpen(!dropdownOpen); dispatch(logout()) }} role="button">
                        <div className="flex items-center justify-evenly text-red-700">
                            <FaPowerOff className='text-red-700' /> logout
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

    const handleAuth = () => {
        if(!authModal) return null

        return <Modal title="auth">
                    <Auth />
                </Modal>
    }

    return (
        <>
        <nav className="relative w-full flex flex-wrap items-center justify-between bg-indigo-700 shadow">
            <div className="p-3 w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <Link to="/"
                    className="flex items-center text-xs uppercase font-bold leading-snug text-white">
                    <img src="/assets/images/ale.png" width="30" alt="logo" className='mr-2' />
                    <span className="hover:opacity-75">home</span>
                </Link>
                <button
                    className="text-white cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <div className={`py-3 lg:flex flex-grow items-center bg-indigo-500 lg:bg-indigo-700 ${menuOpen ? "flex" : "hidden"}`}>
                <ul className="space-x-0 space-y-3 flex flex-col lg:flex-row lg:ml-auto lg:items-center lg:space-x-3 lg:space-y-0">
                    {menu.map((e, index) =>
                        <li key={index} className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to={e.link}
                                className="px-3 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                {e.name}
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        {handleUser()}
                    </li>
                </ul>
            </div>
        </nav>
        {handleAuth()}
        </>
    )
}
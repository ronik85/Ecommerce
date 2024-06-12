import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const user = { _id: "df", role: "" }
const Header = () => {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const logoutHandler = () => {
        setIsOpen(false)
    }
    return (
        <nav className='header'>
            <Link onClick={() => setIsOpen(false)} to={'/'}>HOME</Link>
            <Link onClick={() => setIsOpen(false)} to={'/search'}>
                <FaSearch />
            </Link>
            <Link onClick={() => setIsOpen(false)} to={'/cart'}>
                <FaShoppingBag />
            </Link>
            {
                user?._id ? (
                    <>
                        <button onClick={() => setIsOpen((prev) => !prev)}>
                            <FaUser />
                        </button>
                        <dialog open={isopen}>
                            <div>
                                {user.role === "admin" &&
                                    (
                                        <Link to={'/admin/dashboard'}>Dashboard</Link>
                                    )}

                                <Link to={'/orders'}>Orders</Link>
                                <button onClick={logoutHandler}><FaSignOutAlt /></button>
                            </div>
                        </dialog>
                    </>
                ) : (
                    <Link to={'/login'}>
                        <FaSignInAlt />
                    </Link>
                )
            }
        </nav>
    )
}

export default Header

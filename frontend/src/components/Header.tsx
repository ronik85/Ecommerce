import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../types/types'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import toast from 'react-hot-toast'


interface PropsType {
    user: User | null
}

const Header = ({ user }: PropsType) => {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const logoutHandler = async () => {
        try {
            await signOut(auth)
            toast.success("Sign out successfully")
            setIsOpen(false)
        } catch (error) {
            toast.error("Error while Signing out")
        }
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
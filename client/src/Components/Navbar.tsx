'use client'

import { setIsAuthenticated } from "@/Redux/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/v1/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials:'include'
            })
            const data = await response.json()
            if (response.status === 200) {
                dispatch(setIsAuthenticated(false))
            }
            else {
                console.log('Something went wrong when logged out !')
            }
            console.log(data.msg)
        }
        catch (error) {
            console.log('Something went wrong when logged out !')
        }
    }

    return (
        <nav className='flex justify-end px-4  border-b overflow-hidden'>
            <button
                onClick={handleLogout}
                className='hover:bg-gray-200 rounded px-2 text-center py-4'
            >
                Logout
            </button>
        </nav>
    )
}

export default Navbar
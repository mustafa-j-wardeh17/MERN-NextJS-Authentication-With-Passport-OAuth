'use client'

import { setIsAuthenticated } from "@/Redux/authSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ErrorMessage from "./ErrorMessage"

const EmailRegisterForm = () => {

    const [error, setError] = useState<string>('')
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })



    const dispatch = useDispatch()



    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/auth/v1/email/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials:'include'
            })

            const data = await response.json()
            if (!response.ok) {
                setError(data.msg)
            }
            else {
                setError('')
                dispatch(setIsAuthenticated(true))
            }
        }
        catch (error) {
            console.log("An error occurred while registering your account.")
        }
    }
    return (
        <form
            className="flex flex-col space-y-4"
            onSubmit={handleRegister}
        >
            <div className="flex justify-between">
                <input
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    type='text'
                    placeholder='First Name'
                    className="w-[48%] border border-gray-300 rounded px-3 py-[4px]"
                />
                <input
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    type='text'
                    placeholder='Last Name'
                    className="w-[48%] border border-gray-300 rounded px-3 py-[4px]"
                />
            </div>
            <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type='email'
                placeholder='Email'
                className="border border-gray-300 rounded px-3 py-[4px]"
            />
            <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type='password'
                placeholder='Password'
                className="border border-gray-300 rounded px-3 py-[4px]"
            />
            <input
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                type='password'
                placeholder='Confirm Password'
                className="border border-gray-300 rounded px-3 py-[4px]"
            />
            {
                error !== '' && (
                    <ErrorMessage error={error} />
                )
            }
            <button
                type="submit"
                className="font-bold tracking-wider text-white bg-blue-500 py-2 text-[14px] rounded-md hover:bg-blue-400"
            >
                Register
            </button>
            <div className="flex justify-center ">
                <p className="text-[12px] text-neutral-500">
                    New user? &nbsp;
                    <Link
                        className=" text-blue-500 font-bold tracking-wide hover:text-blue-300"
                        href={'/login'}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default EmailRegisterForm
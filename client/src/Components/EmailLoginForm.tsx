'use client'

import { authStateType, setIsAuthenticated } from "@/Redux/authSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CiWarning } from "react-icons/ci";
import ErrorMessage from "./ErrorMessage"

const EmailLoginForm = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()
  // Function to handle the login process
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/auth/v1/email/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        }
        , body: JSON.stringify(user),
        credentials:"include"
      })
      const data = await response.json();
      if (!response.ok) {
        setError(data.msg)
      }
      else {
        setError('')
        dispatch(setIsAuthenticated(true))
        console.log(response.status)
      }
    }
    catch (err) {
      console.log("Error in Fetching")
    }
  }


  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleLogin}
    >
      <input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type='email'
        placeholder='Email'
        className="border border-gray-300  rounded px-3 md:py-[4px] py-[2px] "
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type='password'
        placeholder='Password'
        className="border border-gray-300  rounded px-3 md:py-[4px] py-[2px]"
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
        Login
      </button>
      <div className="flex justify-center ">
        <p className="text-[12px] text-neutral-500">
          New user? &nbsp;
          <Link
            className=" text-blue-500 font-bold tracking-wide hover:text-blue-300"
            href={'/register'}
          >SignUp</Link>
        </p>
      </div>
    </form>
  )
}

export default EmailLoginForm
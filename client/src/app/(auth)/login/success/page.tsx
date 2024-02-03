'use client'
import { setIsAuthenticated } from '@/Redux/authSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Success = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const verifyOAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/v1/verifyoauth', {
          method: 'GET',
          headers: {
            'Content-Type': "application/json"
          }
        })
        
        if (response.status ===200) {
          dispatch(setIsAuthenticated(true))
          // setTimeout(() => {
          //   router.push('/')
          // }, 1000)
        }
        else {
          router.push('/login')
        }
      }
      catch (error) {
        router.push('/login')
      }
    }
    verifyOAuth()
  }, [])
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[50px] h-[50px]  border-neutral-800 border-t-2 rounded-full  animate-spin' />
    </div>
  )
}

export default Success
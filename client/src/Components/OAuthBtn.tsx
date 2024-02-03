'use client'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { VscGithubInverted } from 'react-icons/vsc'

const OAuthBtn = ({ method }: { method: 'google' | 'github' }) => {

    const handleOAuth = ()=>{
        window.location.href= `http://localhost:4000/auth/v1/${method}/login`;
    }
    return (
        <button
            onClick={handleOAuth}
            className="w-full md:py-[8px] py-[6px] relative border-gray-200 justify-center border flex hover:bg-slate-50 rounded-md "
        >
            <div className="absolute left-2 transform -translate-y-[50%] top-[50%]">
                {
                    method === 'google' ?
                        <FcGoogle className='md:text-[28px] text-[24px]' />
                        :
                        <VscGithubInverted className='md:text-[28px] text-[24px]' />
                }
            </div>
            <p className="md:text-[15px] text-[13px] font-semibold text-neutral-500">
                Login With &nbsp;
                <span className='capitalize'>
                    {method}
                </span>
            </p>
        </button>)
}

export default OAuthBtn
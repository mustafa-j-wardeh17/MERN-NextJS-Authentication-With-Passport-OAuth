'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const router = useRouter()

    useEffect(() => {
        const checkIsAuth = () => {
            if (isAuthenticated) {
                router.push('/');
            }
        };

        checkIsAuth();
    }, [isAuthenticated]);



    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            {children}
        </div>
    );
}

export default Layout;

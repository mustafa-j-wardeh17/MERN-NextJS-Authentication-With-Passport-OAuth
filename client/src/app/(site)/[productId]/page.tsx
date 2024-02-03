import Link from 'next/link';
import { notFound } from 'next/navigation'
import React from 'react'
import { IoMdArrowBack } from "react-icons/io";

const ProductPage = ({ params }: { params: { productId: string } }) => {

    if (typeof (parseInt(params.productId)) !== 'number') {
        notFound()
    }
    return (
        <div className='relative w-full h-[700px] flex justify-center items-center'>
            <Link
                href={'/'}
                className='absolute left-4 top-2 border flex justify-center items-center px-2 py-2 rounded-md hover:bg-slate-100'
                >
                <IoMdArrowBack size={24}/>
            </Link>
            productId {parseInt(params.productId)}
        </div>
    )
}

export default ProductPage
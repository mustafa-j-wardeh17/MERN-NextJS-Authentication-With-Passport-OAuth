import React from 'react'
import { CiWarning } from 'react-icons/ci'

const ErrorMessage = ({error}:{error:string}) => {
    return (
        <div className="pl-2 text-[12px] text-red-600 flex space-x-1 items-center">
            <CiWarning size={18} />
            <p>{error}</p>
        </div>)
}

export default ErrorMessage
import React from 'react'
import { FaCircleNotch } from 'react-icons/fa';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button = ({ children, className, loading, ...props }: Props) => {
  return (
    <button
        className={`rounded-lg border h-10 border-smoke px-3 py-2 text-sm disabled:cursor-not-allowed
        disabled:opacity-50 font-semibold flex justify-center items-center hover:opacity-85 ${className}`}
        {...props}
    >
      {loading ? <FaCircleNotch className='animate-spin text-lg' /> : children}
    </button>
  )
}

export default Button

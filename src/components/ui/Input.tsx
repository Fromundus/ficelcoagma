// src/components/ui/Input.tsx
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  loading?: boolean;
  error?: string;
  label?: string;
  withExistingData?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  className = '',
  loading,
  error,
  label,
  withExistingData,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <div className='w-full flex flex-col gap-2 items-start'>
      {label && <label className='text-sm text-primary cursor-pointer font-medium' htmlFor={props.id}>{label}</label>}
      <div className='w-full relative'>
        <input
          disabled={loading}
          type={type === "password" ? showPassword ? "text" : "password" : type}
          className={`w-full rounded-lg border h-10 border-smoke px-3 py-2 placeholder-ash
            focus:border-smoke focus:ring-4 focus:ring-smoke focus:outline focus:outline-ash disabled:cursor-not-allowed
            disabled:opacity-50 ${className} ${withExistingData && "bg-smoke"}`}
          {...props}
        />
        {type === "password" && <div className='absolute right-3 top-[11px] cursor-pointer' onClick={handleToggleShowPassword}>
          {showPassword ? <FaRegEye className='text-lg text-ash' /> : <FaRegEyeSlash className='text-lg text-ash' />}
        </div>}
      </div>
      {error && <span className='text-red-500 text-xs'>{error}</span>}
    </div>
  )
}

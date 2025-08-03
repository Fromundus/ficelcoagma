import React from 'react'

type Option = {
    id?: string;
    name: string;
}

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: Option[];
    className?: string;
    label?: string;
    placeholder?: string;
    loading: boolean;
    error?: string;
    withExistingData?: boolean;
}

const Select = ({ className, options, label, error, placeholder, loading, withExistingData, ...props } : Props) => {
  return (
    <div className='relative w-full flex flex-col gap-2'>
        <label className='text-sm text-primary cursor-pointer font-medium' htmlFor={props.id}>{label}</label>
        <select 
            disabled={loading}
            className={`w-full rounded-lg border h-10 border-smoke px-3 py-2 text-sm placeholder-ash focus:border-smoke focus:ring-4 focus:ring-smoke focus:outline focus:outline-ash disabled:cursor-not-allowed disabled:opacity-50 ${className} ${withExistingData && "bg-smoke"}`}
            value={props.value}
            {...props}
        >
            {placeholder && <option className='text-ash' value="">{placeholder}</option>}
            {options?.map((item: Option) => {
                return (
                    <option className='text-primary' key={item.id} value={item.id}>{item.name}</option>
                )
            })}
        </select>
      {error && <span className='text-red-500 text-xs'>{error}</span>}
    </div>
  )
}

export default Select

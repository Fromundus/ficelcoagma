import React from 'react'

type Props = {
    onSubmit: (e: React.FormEvent) => Promise<void>;
    children: React.ReactNode;
    className?: string;
}

const Form = ({ onSubmit, children, className }: Props) => {
  return (
    <form className={`flex flex-col gap-4 ${className}`} onSubmit={onSubmit}>
        {children}
    </form>
  )
}

export default Form

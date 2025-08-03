import React from 'react'

type Props = {
    className?: string;
    children: React.ReactNode;
}

const AdminPage = ({ className, children }: Props) => {
  return (
    <div className={`${className} w-full`}>
      {children}
    </div>
  )
}

export default AdminPage

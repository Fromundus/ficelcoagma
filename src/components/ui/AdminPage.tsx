import React from 'react'

type Props = {
    className?: string;
    children: React.ReactNode;
}

const AdminPage = ({ className, children }: Props) => {
  return (
    <div className={`${className} w-full p-4`}>
      {children}
    </div>
  )
}

export default AdminPage

import React from 'react'

type Props = {
    className?: string;
    children: React.ReactNode;
}

const Page = ({ className, children }: Props) => {
  return (
    <div className={`min-h-[100vh] p-4 bg-blue-100 text-slate ${className}`}>
      {/* <div className="absolute top-0 -z-10 h-full w-full bg-smoke"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div> */}
        {children}
    </div>
  )
}

export default Page

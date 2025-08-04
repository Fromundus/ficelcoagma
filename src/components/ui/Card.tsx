import { motion } from 'framer-motion';
import React from 'react'

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string | React.ReactNode;
    titleClassName?: string;
    childrenClassName?: string;
}

const Card = ({ children, className, childrenClassName, title, titleClassName } : Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border z-1 bg-white rounded-2xl shadow-xl ${className}`}>
      {title && <div className='w-full p-6 border-b flex justify-center text-center'>
        <span className={`font-semibold text-lg ${titleClassName}`}>{title}</span>
      </div>}
      <div className={`${childrenClassName}`}>
        {children}
      </div>
    </motion.div>
  )
}

export default Card

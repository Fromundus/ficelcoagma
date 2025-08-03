import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
    children: React.ReactNode;
    className?: string;
    title: string;
    withClose?: boolean;
    popUp: boolean;
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
}

const PopUp = ({ children, className, title, withClose, popUp, setPopUp, loading }: Props) => {
  return (
    <>
        {popUp && <div
            className={`fixed inset-0 bg-black/50 grid place-items-center p-4 sm:p-8 not-printable-components text-sm font-normal ${className}`}
            style={{ zIndex: 1000 }}
            onClick={(e) => e.stopPropagation()}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl max-w-xl w-full relative border border-border
                /* Make the panel scroll instead of the overlay */
                max-h-[90dvh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex items-center justify-center w-full relative p-6 border-b border-border'>
                        <span className='font-semibold text-lg text-center'>{title}</span>
                        {withClose && <button
                            className="absolute right-4 p-2 border rounded-lg hover:bg-pearl"
                            disabled={loading}
                            onClick={() => setPopUp(false)}
                        >
                            <IoClose className="text-xl" />
                        </button>}
                    </div>
                    <div className='p-6'>
                        {children}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>}
    </>
  )
}

export default PopUp

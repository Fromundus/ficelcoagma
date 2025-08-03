import React from 'react'
import { IoClose } from 'react-icons/io5'
import Button from './Button';

type Props = {
    label: string | React.ReactNode;
    title: string;
    loading?: boolean;
    children: React.ReactNode;
    buttonClassName?: string;
    modalClassName?: string;
}

function Modal({ label, title, loading, children, modalClassName, buttonClassName }: Props) {
    const [modal, setModal] = React.useState<boolean>(false);

    const handleToggleModal = () => {
        if(modal){
            document.body.classList.remove('no-scroll');
        } else {
            document.body.classList.add('no-scroll');
        }

        setModal((prev) => {
            return !prev
        });
    }
    
    return (
        <>
            <Button type='button' className={`${buttonClassName}`} onClick={handleToggleModal}>
                {label}
            </Button>

            {modal && <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-2 sm:p-8 md:p-8 lg:p-8 overflow-y-auto not-printable-components text-sm font-normal ${modalClassName}`}
                style={{ zIndex: 5000 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="bg-white rounded-2xl shadow-xl max-w-lg w-full h-auto relative border border-border"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex items-center justify-center w-full relative p-6 border-b border-border'>
                        <span className='font-semibold text-lg'>{title}</span>
                        <button
                            className="absolute right-4 p-2 border rounded-lg hover:bg-pearl"
                            disabled={loading}
                            onClick={handleToggleModal}
                        >
                            <IoClose className="text-xl" />
                        </button>
                    </div>
                    <div className='p-6'>
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Modal
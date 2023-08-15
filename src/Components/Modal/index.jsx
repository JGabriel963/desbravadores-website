import { MdClose } from 'react-icons/md'

export default function Modal({isOpen, setIsOpen, title, message, deleteDbv}) {
    if (isOpen) {
        return (
            <div className="fixed bg-black/30 top-0 bottom-0 left-0 right-0 bg-tertiary-color/50 z-50">
                <div className="h-full w-full  flex justify-center items-start">
                    <div
                        className="flex flex-col  bg-green-100 p-6  rounded-2xl w-[90%] md:w-[50%] relative mt-8 shadow-md"
                    >
                        <h2 className='text-2xl font-bold text-green-700'>
                            {title}
                        </h2>
                        <hr className='border-1 border-green-500'/>
                        <p className='mt-4 font-semibold text-green-900'>
                            {message}
                        </p>
                        <button 
                            onClick={deleteDbv}
                            className='self-start mt-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white'
                        >
                            Confirmar
                        </button>
                        <button
                            className='absolute right-5 bottom-5 bg-green-600 text-white p-2 rounded-full'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MdClose />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Model = ({onclose, isopen, children}) => {
  return createPortal (
    <>
    {isopen && ( 
     <div className='grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur'>
     <div className=' z-50 relative min-h-[200px] min-w-[60%] bg-white p-4 m-auto'>
     
     <div  className='flex justify-end'>
          <AiOutlineClose onClick={onclose}  className='text-2xl'/>
     </div>
     {children}
     </div>

     </div>
     )}  
       </>
  ,document.getElementById("modal-root")
)
}

export default Model

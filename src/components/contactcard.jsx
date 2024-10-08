import React from 'react'
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Addandupdatecontact from './addandupdatecontact';
import Usedisclouser from '../hooks/usedisclouser';
import { toast } from 'react-toastify';




const Contactcard = ({ contact }) => {

  const { isopen, onclose, onopen } = Usedisclouser()


  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <div key={contact.id} className='bg-yellow flex items-center justify-between p-2 rounded-lg'>
        <div className='flex gap-1'>
          <HiOutlineUserCircle className='text-4xl text-orange' />
          <div className=''>
            <h2 className='font-medium'>{contact.name}</h2>
            <p className='text-sm'>{contact.email}</p>
          </div>
        </div>
        <div className='flex text-3xl'>
          <RiEditCircleLine onClick={onopen} className='cursor-pointer' />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)} className='text-orange cursor-pointer'></IoMdTrash>
        </div>
      </div>

      <Addandupdatecontact contact={contact} isupdate isopen={isopen} onclose={onclose}></Addandupdatecontact>
    </>
  )
}

export default Contactcard;
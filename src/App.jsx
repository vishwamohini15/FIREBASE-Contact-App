import React, { useEffect, useState } from 'react'
import Navbar from './config/navbar'
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contactcard from './components/contactcard';
import Model from './components/model';
import Addandupdatecontact from './components/addandupdatecontact';
import Usedisclouser from './hooks/usedisclouser';
import Notfoundcontact from './notfoundcontact';


const App = () => {

  const [contacts, setcontacts] = useState([])

  const { isopen, onclose, onopen } = Usedisclouser()


  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactsref = collection(db, "contacts")

        onSnapshot(contactsref, (snapshort) => {

          const contactlist = snapshort.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
          // console.log(contactlist);
          setcontacts(contactlist)
        })


      } catch (error) {
        console.log(error);

      }
    }
    getcontacts()

  }, [])

  const filtercontacts = (e) => {
    const value = e.target.value;

    const contactsref = collection(db, "contacts")

    onSnapshot(contactsref, (snapshort) => {

      const contactlist = snapshort.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })

      const filtercontacts = contactlist.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      )

      setcontacts(filtercontacts)
      return filtercontacts;
    })
  }

  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
        <Navbar></Navbar>
        <div className='flex gap-2'>
          <div className='flex flex-grow items-center relative'>
            <CiSearch className='text-white text-3xl  items-center ml-1 absolute' />
            <input
              onChange={filtercontacts}
              type='text' className='bg-transparent border-[2px]  h-10 flex-grow rounded-md text-white pl-9'></input>
          </div>
          <FaPlusCircle onClick={onopen} className='text-5xl  text-white cursor-pointer' />
        </div>

        <div className='mt-4 gap-3 flex flex-col'>
          {contacts.length <= 0 ? (
            <Notfoundcontact></Notfoundcontact>
          ) : (
            contacts.map((contact) => (
              <Contactcard key={contact.id} contact={contact}></Contactcard>
            ))
          )}
        </div>
      </div>
      <Addandupdatecontact onclose={onclose} isopen={isopen}></Addandupdatecontact>
      <ToastContainer
        position='bottom-center'
      ></ToastContainer>
    </>

  )
}

export default App
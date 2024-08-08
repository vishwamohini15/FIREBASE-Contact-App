import React from 'react'
import Model from './model'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { db } from '../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as yup from "yup";


const contactschemavalidation = yup.object().shape({
     name: yup.string().required("Name is Required"),
     email: yup.string().email("Invalide Email").required("Email is Required"),

})
const Addandupdatecontact = ({ isopen, onclose, isupdate, contact }) => {

     const addcontact = async (contact) => {
          try {
               const contactref = collection(db, "contacts")
               await addDoc(contactref, contact)
               onclose()
               toast.success("Contact Added Successfully")

          } catch (error) {
               console.log((error));

          }
     }

     const updatecontact = async (contact, id) => {
          try {
               const contactref = doc(db, "contacts", id)
               await updateDoc(contactref, contact)
               onclose()
               toast.success("Contact Updated Successfully")

          } catch (error) {
               console.log((error));

          }
     }

     return (
          <div>
               <Model isopen={isopen}
                    onclose={onclose}
               >
                    <Formik
                         validationSchema={contactschemavalidation}
                         initialValues={isupdate
                              ? {
                                   name: contact.name,
                                   email: contact.email,
                              }
                              :
                              {
                                   name: "",
                                   email: "",
                              }
                         }
                         onSubmit={(values) => {
                              console.log(values);
                              isupdate ?
                                   updatecontact(values, contact.id) :
                                   addcontact(values)

                         }}
                    >
                         <Form className='flex flex-col gap-4'>
                              <div className='flex flex-col gap-1'>
                                   <label htmlFor='name'>Name</label>
                                   <Field name="name" className='h-10 border'></Field>
                                   <div className='text-red-500'>
                                        <ErrorMessage name='Name' />
                                   </div>
                              </div>

                              <div className='flex flex-col gap-1'>
                                   <label htmlFor='email'>Email</label>
                                   <Field name="email" className='h-10 border'></Field>
                                   <div className='text-red-500'>
                                        <ErrorMessage name='email' />
                                   </div>
                              </div>

                              <button className='bg-orange px-3 py-1 self-end' type='submit'>
                                   {isupdate ? "Update" : "ADD"} Contact
                              </button>
                         </Form>
                    </Formik>

               </Model>
          </div>
     )
}

export default Addandupdatecontact

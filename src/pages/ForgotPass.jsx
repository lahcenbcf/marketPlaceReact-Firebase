import { getAuth ,sendPasswordResetEmail} from 'firebase/auth'
import React, { useRef } from 'react'
import {MdEmail} from 'react-icons/md'
import { toast } from 'react-toastify'
function ForgotPass() {
  const emailRef=useRef()
  const resetPass=async(e)=>{
    e.preventDefault()
    if(!emailRef.current.value) return toast.error("your field is empty !");
    try {
      const auth=getAuth();
      await sendPasswordResetEmail(auth,emailRef.current.value)
      toast.success("successufuly send to your email")
    } catch (
      error
    ) {
      toast.error("error")
    }
  }

  return (
    <div className='min-h-screen'>
      <h1 className='p-3 font-bold text-2xl text-[#0d0510]'>forgot password</h1>
      <form onSubmit={resetPass} className='flex flex-col items-center my-4 max-w-md p-4'>
          <div className='h-10 rounded-md bg-white flex items-center w-full border-2'>
              <MdEmail className='mx-2' />
              <input type='email' className='h-full w-full outline-none' placeholder='email' ref={emailRef} />
          </div>
          <button type='submit' className='font-bold ml-2 text-[#57ba36] self-start my-4 py-0'>send reset link</button>
      </form>
    </div>
  )
}

export default ForgotPass
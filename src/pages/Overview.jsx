import React, { useEffect } from 'react'
import logo from '../assets/logo_transparent.png'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
function Overview() {
    const navigate=useNavigate()
    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth,user=>{
            if(user) navigate("/explore")
        })
    },[])
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-white'>
            {/*logo */}
            <img src={logo} width={180} className=' animate-bounce' />
            <h1 className='text-3xl font-bold uppercase mb-6 animate-pulse w-full text-center'>Let's  Shop with Manina</h1>
            <div className='flex gap-4 my-3'>
            <Link to="/signUp" className="bg-[#0d0510] p-2 text-white rounded-md">
               Get started
            </Link>
            <Link to="/signIn" className="bg-[#0d0510] p-2 text-white rounded-md">
                login
            </Link>
            </div>
    </div>
  )
}

export default Overview
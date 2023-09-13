import React from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'
import {AiOutlineShop} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BiSolidOffer} from 'react-icons/bi'
import {BsFillInboxFill} from 'react-icons/bs'
function Navbar() {

  const location=useLocation()
  const pathMatch=(currentRoute)=>{
    return currentRoute===location.pathname
  }
  return (
    <div
    className='w-full md:container mx-auto btm-nav-md flex items-center justify-center shadow-lg rounded-md py-4 fixed bottom-2 left-[50%] translate-x-[-50%] bg-[white]'
    >
    <NavLink to="/" className="flex flex-col items-center gap-2 px-8" >
    <AiOutlineShop fill={pathMatch("/") ? '#57ba36':'#0d0510'} size={30} className='mt-2' />
    <span className='btm-nav-label font-bold'>explore</span>
    </NavLink>
    

  
    
      <NavLink to="/myProfile" className="flex flex-col items-center gap-2 px-8">
    <CgProfile size={30} fill={pathMatch("/myProfile") ? '#57ba36' : '#0d0510'} className='mt-2' />
      <span className='btm-nav-label font-bold'>myProfile</span>
      </NavLink>
      
      <NavLink to="/offers" className="flex flex-col items-center gap-2 px-8">
      <BiSolidOffer size={30} fill={pathMatch("/myProfile") ? '#57ba36' : '#0d0510'} className='mt-2' />
        <span className='btm-nav-label font-bold'>offers</span>
        </NavLink>

        <NavLink to="/myInbox" className="flex flex-col items-center gap-2 px-8">
        <BsFillInboxFill size={30} fill={pathMatch("/myProfile") ? '#57ba36' : '#0d0510'} className='mt-2' />
          <span className='btm-nav-label font-bold'>inbox</span>
          </NavLink>
    
    </div>
  )
}

export default Navbar
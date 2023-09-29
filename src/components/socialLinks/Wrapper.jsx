import React from 'react'
import "./style.css"
function Wrapper({Icon,text,id}) {
    const addActiveClass=()=>{
        document.querySelectorAll(".wrapper")[id-1].classList.add("active")
    }
    const removeActiveClass=()=>{
        document.querySelectorAll(".wrapper")[id-1].classList.remove("active")
    }

  return (
    <div className='w-36 h-7 relative'>
        <div className='wrapper h-full w-8 relative'>
                <p className='text absolute h-full w-full top-0 left-0 right-0 overflow-hidden text-sm'>{text}</p>
                <Icon onMouseOver={addActiveClass} onMouseLeave={removeActiveClass} className="searchIcon absolute w-8 h-full right-0 bg-[#f4e7f8]" />
        </div>
    </div>
  )
}

export default Wrapper
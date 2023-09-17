import React from 'react'
import {Link} from 'react-router-dom'
import {BsPhoneFill} from 'react-icons/bs'
import './categorie.css'
function Categorie({categorie}) {
  return (
    <div>
        <Link to={'/categorie/'+categorie.title}>
        <div className='w-42 h-42 bg-[#117DF9] px-6 py-4 rounded-md shadow-lg'>
        <div className='rounded-full bg-[#EADDCD]'>
            {categorie.icon}
        </div>
        <h3 className='text-[#181E25] font-semibold'>{categorie.title}</h3>
        </div>
            
            
        </Link>
    </div>
  )
}

export default Categorie
import React from 'react'
import {Link} from 'react-router-dom'
import './categorie.css'
function Categorie({categorie}) {
  return (
    <div>
        <Link to={'/categorie/'+categorie.title}>
        <div className='relative w-42 h-32'>
        <img src={categorie.imageUrl} alt={categorie.title} className='w-full h-full brightness-75 rounded-md bg-cover z-0' />
        <h3 className='absolute bottom-2 left-2  text-[white] shadow-md opacity-60 hover:opacity-100 text-sm font-semibold z-10 '>{categorie.title}</h3>
        </div>
            
            
        </Link>
    </div>
  )
}

export default Categorie
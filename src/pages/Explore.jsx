import React, { useEffect } from 'react'
import Categorie from '../components/categories/Categorie'
import {categories} from '../outils/categories'
import Slider from '../components/slider/Slider'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
function Offers() {
  const navigate=useNavigate()

  useEffect(()=>{
    const auth=getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(!user) navigate("/signIn")
    })
  },[])
  return (
    <div className='container mx-auto min-h-screen p-3 pb-28'>
        <h1 className='text-4xl  font-bold py-4'>Explore</h1>
        {/* Slider */}
        <Slider />
        <div className='categories'>
        <h2 className='font-semibold'>categories</h2>
        <div className='mt-3 flex gap-2 w10/12 md:w-3/5'>
        {/* listing our categories */}
        {
          categories.map(cat=>(
            <Categorie categorie={cat} />
          ))
        }
        </div>
        
        </div>
    </div>
  )
}

export default Offers
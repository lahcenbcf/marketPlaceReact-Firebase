import React, { useState } from 'react'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
function Rate() {
    const [stars,setStars]=useState([
        ...Array.from({
            length:5
        },()=>AiOutlineStar)
    ])
    const setStar=(index)=>{
            //based on Index
            setStars(prev=>[...Array.from({length:index+1},()=>AiFillStar),...prev.slice(index+1)])
    }
  return (
    <div className='flex'>
        {
            stars.map((Star,index)=>(<Star key={index} color={Star===AiFillStar ? "#4ecca3" : null} onClick={()=>setStar(index)} size={20} />))
        }
    </div>
  )
}

export default Rate
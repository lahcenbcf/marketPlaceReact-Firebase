import React from 'react'
import mobilePng from '../../assets/mobilePng.png'
import SocialBar from '../socialLinks/SocialBar'
function Hero({filterProd}) {

  return (
    <div className='container mx-auto rounded-md bg-[#f4e7f8] py-3 px-10 h-[400px] flex items-center'>
            <div className='w-[50%]'>
            <h1 className='font-extrabold text-4xl '>Unlock Deals, Chat with Sellers, and Find Your perfect Match !</h1>
            <input type='search' placeholder='search ...' className='my-6 h-8 w-[80%] bg-white p-4 rounded-md outline-none' onChange={(e)=>filterProd(e.target.value)} />
            </div>
            <div className='h-full w-[50%] overflow-hidden'>
                <img src={mobilePng} className='w-full hover:-translate-y-[20px] duration-200 transition-all' />
            </div>
            <SocialBar />
    </div>
  )
}

export default Hero
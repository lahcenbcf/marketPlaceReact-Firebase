import React from 'react'
import mobilePng from '../../assets/mobilePng.png'
import SocialBar from '../socialLinks/SocialBar'
function Hero({filterProd}) {

  return (
    <div className=' rounded-md bg-[#f4e7f8] py-3 px-10 h-[400px] flex flex-col-reverse md:flex-row md:justify-between items-center relative'>
            <div className='w-full md:w-[50%]'>
            <h1 className='font-extrabold text-xl md:text-2xl xl:text-4xl '>Unlock Deals, Chat with Sellers, and Find Your perfect Match !</h1>
            <input type='search' placeholder='search ...' className='my-6 h-8 w-[80%] bg-white p-4 rounded-md outline-none' onChange={(e)=>filterProd(e.target.value)} />
            </div>
            <div className='absolute h-[50%] top-0 w-full md:w-[50%] md:h-[400px] md:right-16 md:top-2 overflow-hidden'>
                <img src={mobilePng} className='w-full hover:-translate-y-[20px] duration-200 transition-all' />
            </div>
            <SocialBar />
    </div>
  )
}

export default Hero
import React from 'react'
import mobilePng from '../../assets/mobilePng.png'
import SocialBar from '../socialLinks/SocialBar'
function Hero({setSearchField}) {
  
  return (
    <div className='rounded-md bg-[#f4e7f8] py-3 px-10 h-[400px] flex flex-wrap items-center overflow-hidden'>
            <div className=' flex-flexFluid max-w-md self-start lg:py-24 mx-auto'>
            <h1 className='font-extrabold text-xl md:text-2xl xl:text-4xl '>Unlock Deals, Chat with Sellers, and Find Your perfect Match !</h1>
            <input type='search' placeholder='search ...' className='my-6 h-8 w-[80%] bg-white p-4 rounded-md outline-none' onChange={(e)=>setSearchField(e.target.value)} />
            </div>
            <div className='flex-flexFluid self-start mx-auto'>
                <img src={mobilePng} className='w-full hover:-translate-y-[20px] duration-200 transition-all' />
            </div>
            <SocialBar />
    </div>
  )
}

export default Hero
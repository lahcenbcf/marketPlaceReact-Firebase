import React from 'react'
import {BsFacebook} from 'react-icons/bs'
import {BiLogoGmail} from 'react-icons/bi'
import {AiFillInstagram} from 'react-icons/ai'
import Wrapper from './Wrapper'
function SocialBar() {
  return (
    <div className='flex flex-col gap-10'>
        <Wrapper key={1} id={1} Icon={BsFacebook} text={"manina phone"} />
        <Wrapper key={2}  id={2} Icon={BiLogoGmail} text={"manina@shop.dz"} />
        <Wrapper key={3} id={3} Icon={AiFillInstagram} text={"maninaShop"} />
    </div>
  )
}

export default SocialBar
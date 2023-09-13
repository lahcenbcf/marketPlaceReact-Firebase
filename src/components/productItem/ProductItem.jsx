import React from 'react'
import {FiExternalLink} from 'react-icons/fi'
import {BsFillPhoneFill} from 'react-icons/bs'
import {BiMoney} from 'react-icons/bi'
import {Link,useNavigate} from 'react-router-dom'
import { DeleteProduct } from '../../api/products'
import { AiFillDelete } from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi'
function ProductItem({product:{id,data},isDelete,setListings}) {
  
  const navigate=useNavigate()
  const onDeleteProduct=(collectionName)=>{
    if(window.confirm("are you sure you want to delete your product ?")){
          DeleteProduct(id,collectionName).then(()=>{
            setListings(prev=>prev.filter(p=>p.id!=id))
          })
    }

  }
  
  return (
    <div className='flex gap-4 p-4 mt-5 relative'>
    {/* image background */}
    <div className='h-24 w-28 rounded-md shadow-md relative hover:brightness-50 z-0'>
        <img src={data.imgUrls[0]} className='w-full h-full' />
        <Link to={`/categorie/${data.category}/${id}`} state={data}><FiExternalLink size={30} color='white' className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 cursor-pointer opacity-60 hover:opacity-100' /></Link> 
    </div>
    {/* product content */}
    <div>
        <p className='text-slate-500 font-semibold text-sm'>{data.location}</p>
        <div className='flex items-center gap-2'>
        <BsFillPhoneFill />
        <h2 className='text-md lg:text-xl text-[#0d0510] font-bold px-2'>{data.name}</h2>
        </div>
        <div className='flex items-center gap-2'>
        <BiMoney />
        <p className='font-bold text-[#57ba36] mt-1'>{data.primaryPrice} DZ</p>
        </div>
        
    </div>
    {/* delete icon */}
    {isDelete &&
      <>
      <AiFillDelete className="absolute top-2 right-2" onClick={
        ()=>onDeleteProduct(data.category)
      } />
      <BiEdit className='absolute top-6 right-2 lg:top-2 lg:right-8' onClick={()=>navigate("/editProduct",{
        state:{
          data,id
        }
      })} />
      </>
      }
    </div>
  )
}

export default ProductItem
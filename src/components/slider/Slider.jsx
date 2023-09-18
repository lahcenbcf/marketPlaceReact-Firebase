import React ,{ useEffect,useState} from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Navigation,Pagination,Scrollbar,A11y} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import {AiFillStar} from 'react-icons/ai'
import { getProductsToExplore } from '../../api/products'
import { onAuthStateChanged,getAuth } from 'firebase/auth';
function Slider() {
    const [loading,setLoading]=useState(true)
    const [products,setProducts]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(!user) navigate("/")
            getProductsToExplore().then(ResolvedArray=>{
                ResolvedArray.forEach(item=>setProducts(prev=>[...prev,...item]))
                setLoading(false)
            })
        })
        
    },[])
    if(loading) return <h1>loading ...</h1>
  return (
    products.length ?
    <div className='w-full my-2'>
    <p className='font-bold my-2'>Recommended</p>
    <Swiper slidesPerView={1}
    modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      navigation
      className='h-auto'
    >
    {
        products.map(({data,id})=>(
            <SwiperSlide key={id} onClick={()=>{
                navigate(`/categorie/${data.category}/${id}`,{
                    state:data
                })
            }}>
                <div className='w-full relative flex justify-center bg-white rounded-md'>
                <img className='rounded-lg' src={data?.imgUrls[0]} /> 
                <p className="absolute bottom-10 left-4 text-[#181E25] font-semibold bg-white rounded-lg px-2 py-1" >{data.name}</p>
                
                <p className='p-1 rounded-md bg-[#117DF9] text-white absolute bottom-2 left-4 text-sm'>{data.primaryPrice} DZ</p>
                </div>
                {data.offer && <AiFillStar color="yellow" className="absolute top-2 right-2" />}
            </SwiperSlide>
        ))
    }
    </Swiper>
    </div>
    :null
    
  )
}

export default Slider
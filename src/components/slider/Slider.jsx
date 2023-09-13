import React ,{ useEffect,useState} from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Navigation,Pagination,Scrollbar,A11y} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import {AiFillStar} from 'react-icons/ai'
import { getProductsToExplore } from '../../api/products'
function Slider() {
    const [loading,setLoading]=useState(true)
    const [products,setProducts]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        getProductsToExplore().then(ResolvedArray=>{
            console.log(ResolvedArray)
            ResolvedArray.forEach(item=>setProducts(prev=>[...prev,...item]))
            setLoading(false)
        })
    },[])
    if(loading) return <h1>loading ...</h1>
  return (
    products.length ?
    <div className='w-full my-2'>
    <p className='font-bold my-2'>Recommended</p>
    <Swiper slidesPerView={1}
    modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
    {
        products.map(({data,id})=>(
            <SwiperSlide key={id} onClick={()=>{
                navigate(`/categorie/${data.category}/${id}`,{
                    state:data
                })
            }}>
                <div className='w-full h-42 relative'>
                <img className='w-full h-full brightness-75' height={100} src={data?.imgUrls[0]} style={{
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat"
                }} /> 
                <p className="absolute bottom-10 left-4 text-white ">{data.name}</p>
                
                <p className='p-1 rounded-md bg-white absolute bottom-2 left-4 text-sm'>{data.discountedPrice ?? data.primaryPrice} DZ</p>
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
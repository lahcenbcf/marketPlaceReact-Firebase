import { getAuth } from 'firebase/auth'
import React from 'react'
import {useState,useEffect} from 'react'
import {BiShareAlt} from 'react-icons/bi'
import {AiFillMessage} from 'react-icons/ai'
import {useLocation,Link} from 'react-router-dom'
import {Map} from '../components/map/Map'
import {Navigation,Pagination,Scrollbar,A11y} from 'swiper/modules'
import {Swiper,SwiperSlide, useSwiper} from 'swiper/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import useCoords from '../customHooks/getCoords'
function Product() {
  const swiper=useSwiper()
  const {state:prodDataToDisplay}=useLocation()
  //getCoords
  const {coords,loading}=useCoords(prodDataToDisplay.location)
  const auth=getAuth()
  const [shareLinkCopied,setShareLinkCopied]=useState(null)
  return (
    <main className='container mx-auto min-h-screen p-4 pb-80'> 
        
        <div className='' onClick={(e)=>{
          e.preventDefault()
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(()=>{
              setShareLinkCopied(false)
          },1000)
        }}>
        <div className='absolute top-4 right-4 p-3 bg-white rounded-full w-fit shadow-md'>
        <BiShareAlt />
        </div>
        {/*swiper sildes */}
        <div className='max-w-lg w-full mx-auto rounded-sm mb-6' style={{
          height:"300px"
        }}>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
        className='h-full w-full'>
        {
          prodDataToDisplay.imgUrls.map((image,i)=>(
            <SwiperSlide key={i} onClick={()=>swiper.slideNext()}>
                <img src={image}  style={{
                  backgroundSize:"cover",
                  backgroundPosition:"center",
                  width:"100%",
                  height:"100%",
                  borderRadius:"5px"

                }} />
            </SwiperSlide>
          ))
        }
        </Swiper>
        </div>
        
       
            
        </div>


        {
          shareLinkCopied && <p className=' text-black'>Link copied!</p>
        }

        {/**product details */}
        <div className='flex gap-3 items-center my-2'>
        <h1 className='text-3xl text-[#0d0510] font-semibold'>{prodDataToDisplay.name} - </h1>
        <h4 className='text-lg font-semibold w-fit p-1 bg-[#57ba36] rounded-sm text-white'>{prodDataToDisplay.primaryPrice} DZ</h4>
        </div>
        <h3 className='font-semibold text-md'>{prodDataToDisplay.location}</h3>
{/* category */}
        <div className='flex gap-2'>
        {
          prodDataToDisplay.offer &&
          <div className="stats shadow my-1">
  
                <div className="stat p-2">
                    <div className="stat-title text-lg font-semibold">discountedPrice</div>
                    <div className="stat-value text-sm">{prodDataToDisplay.discountedPrice} DZ</div>
                </div>

            </div>
        }
            <div className="stats shadow my-1">
  
                <div className="stat p-2">
                    <div className="stat-title text-lg font-semibold">category</div>
                    <div className="stat-value text-sm">{prodDataToDisplay.category}</div>
                </div>

            </div>
        </div>
        {auth?.currentUser?.uid !== prodDataToDisplay.userRef && 
          <Link to={`/contact/${prodDataToDisplay.userRef}?${prodDataToDisplay.name}`} className="p-1 flex rounded-sm bg-[#117DF9] text-white w-fit mt-5 items-center gap-2" ><AiFillMessage/>contact now</Link> }

        {/* MAP */}

        <div className='w-full h-[30vh]'>
            {/*
          
          <MapContainer className='border-2' style={{
              height:"100%",
              width:"90%"
            }} center={[6,-1]} zoom={13} scrollWheelZoom={false}>
              <TileLayer attribution='&copy; <a href="http://osm.org/copyright">Open street map</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              />
              <Marker position={[6,-1]}>
                  <Popup>{prodDataToDisplay.location}</Popup>
            </Marker>
            </MapContainer>


          */}

          {loading ? <h1>loading map ....</h1> :
          <Map location={coords} zoomLevel={13} />
        }
            
        </div>


        
    </main>
  )
}

export default Product
import React, { useEffect, useState } from 'react'
import { fetchProductsbyCategory } from '../api/products'
import ProductItem from '../components/productItem/ProductItem'
import {fetchMoreProducts} from '../api/products'
import LoadingSpinner from '../outils/Spinner'
function Affaires() {
    const [affaires,setAffaires]=useState([])
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing,setLastFetchedListing]=useState(null)
    useEffect(()=>{
     fetchProductsbyCategory('affaires',setLastFetchedListing).then((data)=>{
        setAffaires(data)
        setLoading(false)
     })  
     
    },[])

  if(loading) return <LoadingSpinner />
  else return (
    <div className="container mx-auto min-h-screen p-4">
    <h1 className='text-xl font-bold my-3'>Offers</h1>
    {
        
        !affaires.length ? <h1>no offers are available now</h1> :
        <div className='w-10/12 md:w-3/5'>
            {
                affaires.map((aff)=>(
                    <ProductItem key={aff.id} product={aff} />
                ))
            }
        </div>
    }
    {/* load more */}
    {
        lastFetchedListing && (
          <p className='loadMore text-[#57ba36] font-semibold text-center my-3' onClick={()=>fetchMoreProducts("affaires",lastFetchedListing,setLastFetchedListing,setAffaires)}>load More</p>
        )
      }
    </div>
    
  )
}

export default Affaires
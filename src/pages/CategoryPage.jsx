import React, { useEffect, useState } from 'react'
import { useParams,Outlet } from 'react-router-dom'
import {toast} from 'react-toastify'
import { fetchMoreProducts, fetchProductsbyCategory} from '../api/products'
import ProductItem from '../components/productItem/ProductItem'
import LoadingSpinner from '../outils/Spinner'
const CategoryPage = () => {
    const [prods,setProds]=useState([])
    const [loading,setLoading]=useState(true)
    const {categoryName}=useParams()
    const [lastFetchedListing,setLastFetchedListing]=useState(null)
    useEffect(()=>{
        setLoading(true)
        fetchProductsbyCategory(categoryName,setLastFetchedListing).then((data)=>{
            setProds(data)
            setLoading(false)
        })
    },[])

    if(loading) return <LoadingSpinner />
  else return (
    <div className='container mx-auto min-h-screen p-2'>
      <div className='header py-2'>
        <h1 className='text-3xl font-bold'>Explore {categoryName}</h1>
      </div>

      {
        /* body */
      }
      {
        !prods.length ?<h2>no listings for now</h2> :
            prods.map(p=>(
                <ProductItem key={p.id} product={p} />
            ))

      }
      {/* load more */}
      {
        lastFetchedListing && (
          <p className='loadMore text-[#57ba36] font-semibold text-center my-3' onClick={()=>fetchMoreProducts(categoryName,lastFetchedListing,setLastFetchedListing,setProds)}>load More</p>
        )
      }
    </div>
  )
}

export default CategoryPage

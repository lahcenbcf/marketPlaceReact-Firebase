import React, { useCallback, useEffect,useMemo,useState } from 'react'
import {categories} from '../outils/categories'
import { useAsyncError, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Hero from '../components/Hero/Hero'
import { getProductsToExplore } from '../api/products'
import ProductItem from '../components/productItem/ProductItem'
function Offers() {
  const navigate=useNavigate()
  const [prods,setProds]=useState([])
  const [loading,setLoading]=useState(false)
  const [selectedCat,setSelectedCat]=useState(null)
  const [filtredProds,setFilteredProds]=useState([])
  const filteredList=useMemo(()=>{
    if(prods && selectedCat) return prods.filter(p=>p.data.category===selectedCat)
  },[selectedCat])
  const filterProd=(query)=>{
    setFilteredProds(prods.filter(p=>p.data.name.toUpperCase().includes(query.toUpperCase())))
  }
  useEffect(()=>{
      console.log("render")
      console.log(filtredProds)
      console.log(filteredList)
  },[])
  useEffect(()=>{
    console.log("exectud")
    const auth=getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(!user) navigate("/")
      setLoading(true)
      getProductsToExplore().then(resultArray=>{
          resultArray.forEach((array)=>{
            setProds(prev=>[...prev,...array])
          })
          //setFilteredProds(prods)
      }).catch(e=>console.log(e)).finally(()=>{
        setFilteredProds(prods)  
        setLoading(false)
      })
    })
  },[])
  return (
    <div className='container mx-auto min-h-screen p-3 pb-28 pt-20'>
      {/* Hero section */}
      <Hero filterProd={filterProd} />
      {/* category bar */}
      <div className='w-3/4 mx-auto flex gap-10 my-8' >
      {
        categories.map(cat=>(
          <p className=
             "font-semibold text-slate-500  capitalize hover:text-[#0092ca]" 
           key={cat.id} onClick={()=>setSelectedCat(cat.title)} >{cat.title}</p>
        ))
      }
      </div>
      {
        loading ? <h1>loading ....</h1> : (
          <div className='flex flex-wrap gap-4'>
          
            
            {
           
              (!filteredList?.length && filteredList) ? <h1>empty</h1> :(filteredList?.length ? filteredList.map((p)=>(
                <ProductItem product={p} key={p.id} />
              )) : (filteredList?.length ?? (
                filtredProds.length ? 
                  filtredProds.map(p=>(<ProductItem product={p} key={p.id} />))
                 : (
                  prods.length ? 
                prods.map(p=>(
                  <ProductItem product={p} key={p.id} />
                  )) : <h1>empty</h1>
                
              ))) 
              )
                  }
            
         </div>
            
        )
      }
      {/*<h1 className='text-4xl font-bold py-4'>Explore</h1> */}
        {/* Slider
        <Slider />
      */}
        
    </div>
  )
}

export default Offers
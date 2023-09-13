import { getAuth, updateProfile,updateEmail } from 'firebase/auth'
import {doc,updateDoc} from 'firebase/firestore'
import React, { useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CiShoppingTag} from 'react-icons/ci'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import {Link} from 'react-router-dom'
import {FaRegUserCircle,FaInbox} from 'react-icons/fa'
import useAuthStatus from '../components/customHooks/useAuthStatus'
import { fetchUserProducts } from '../api/profile'
import ProductItem from '../components/productItem/ProductItem'
import LoadingSpinner from '../outils/Spinner'

function Profile() {
  const [isChange,setIsChange]=useState(false)
  const {currentUser,signOut}=getAuth()
  const {isLogged}=useAuthStatus()
  const [listings,setListings]=useState([])
  const [loading,setLoading]=useState(true)
  const auth=getAuth()
  /*const [userInfoData,setUserInfoData]=useState({
    name:auth?.currentUser?.displayName ||"",
    email:auth?.currentUser?.email ||""
  })
*/
//prefer using useRef for performance issue
const nameRef=useRef()
  /*const changeUserInfo=(e)=>{
    setUserInfoData({
      ...userInfoData,
      [e.target.id]:e.target.value
    })
  }*/
  //const {email,name}=userInfoData
  const navigate=useNavigate()
  const ChangeInfo=async ()=>{
    if(!nameRef.current.value) return toast.error("check your inputs")
    if(currentUser.displayName != nameRef.current.value){
      //update the username
      try {
        await updateProfile(currentUser,{
          displayName:nameRef.current.value
        })
        //update in firestore
        const userRef=doc(db,'users',currentUser)
        await updateDoc(userRef,{
         username: nameRef.current.value
        })
        toast.success("username is updated succesufuly")
      } catch (error) {
        toast.error("username can not be updated")
      }
      
    }
      

    nameRef.current.value=""
  }
  const logoutUser=()=>{
    signOut(auth).then(()=>navigate("/"))
  }
  useEffect(()=>{
    fetchUserProducts(currentUser).then(data=>{
      data.forEach(d=>setListings(prev=>[...prev,...d]))
      setLoading(false)
    })

  },[])
  if(loading) return <LoadingSpinner />
  return (
    <div className='container min-h-screen mx-auto p-4'>
        {/* profile header */}
        <div className='flex items-center justify-between'>
        <h1 className=' text-slate-950 font-bold text-3xl'>My Profile</h1>
         {isLogged && <button className='btn' onClick={logoutUser}>logout</button>} 
        </div>
        {/* profile body */}
        <main>
          <div className='p-2 flex items-center justify-between'>
              <p className='text-lg'>Personal details</p>
              <button className='font-bold text-[#57ba36] py-0 px-1' onClick={()=>{
                isChange && ChangeInfo()
                setIsChange(!isChange)
              }}>{
                isChange ? 'done' : 'change'
              }</button>
          </div>

          {/* profile card */}
          <div className='profileCard max-w-sm p-3 '>
              <form className='w-full'>
                  <div className='w-full h-10 rounded-sm bg-white my-4 flex items-center'>
                      <p className='font-bold text-[#0d0510]'><FaInbox className='inline-block mx-3' /> {currentUser.email}</p>
                  </div>
                  <div className='w-full h-10 rounded-sm bg-white my-4 flex items-center'>
                      <input placeholder='username' type='text' className={isChange ? "h-full w-full outline-none" :" hidden"} ref={nameRef} />
                      {!isChange && <p className='font-bold text-[#0d0510]'><FaRegUserCircle className=' inline-block mx-3' /> {currentUser.displayName}</p>}
                  </div>
              </form>
              
          </div>
          <Link to="/createProduct" className="bg-[#c4eece] p-2 flex items-center gap-2 w-fit "><CiShoppingTag /> sell product</Link>
        </main>

        {/* user products */}

        {
          
          listings.length ? 
            <div className="w-10/12 md:w-3/5">
              <p className='text-[#57ba36] font-semibold'>Your Products</p>
              {
                listings.map((listing,idx)=>(
                  <ProductItem key={idx} product={listing} isDelete={true} setListings={setListings} />
                ))
              }
            
              </div>
           : <h1 className='my-3'>no items for now</h1>
        }
    </div>
  )
}

export default Profile
import React, { useEffect,useState } from "react";
import {useLocation,Link } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsFillInboxFill } from "react-icons/bs";
import {FiShoppingCart,FiExternalLink} from 'react-icons/fi'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {BsFillBookmarkHeartFill,BsFillPhoneFill,BsLaptop} from 'react-icons/bs'
import {TbDeviceAirpodsCase} from 'react-icons/tb'
import LoadingSpinner from "../outils/Spinner";
import { fetchLikedProducts } from "../api/products";
function Navbar({isPhone}) {
  const location = useLocation();
  const pathMatch = (currentRoute) => {
    return currentRoute === location.pathname;
  };
  const [loading,setLoading]=useState(false)
const [showBox,setShowBox]=useState(false)
const [hidden,setHidden]=useState(true)
const [likesdProducts,setLikedProducts]=useState([])
  useEffect(()=>{
    const auth=getAuth()
      onAuthStateChanged(auth,user=>{
        if(!user){ setHidden(true)
        }else setHidden(false)
      })
  },[])
  useEffect(()=>{
    const auth=getAuth()
      if(showBox && !likesdProducts.length){
        setLoading(true)
        fetchLikedProducts().then(resolvedArray=>{
          resolvedArray.forEach(arr=>{
            setLikedProducts(prev=>[...prev,...arr.filter(p=>p.data.userRef===auth.currentUser?.uid)])
          })
          setLoading(false)
        })
      }
  },[showBox])
  if(hidden) return null
  if(!isPhone) return (<nav className="container mx-auto bg-white flex h-16 justify-between items-center absolute top-0 z-10 left-[50%] -translate-x-[50%] px-6">
       {
        /*logo */
       }
       <div className="flex items-center gap-3">
       <FiShoppingCart size={30} color="#2193b0" />
       <h1><span className="uppercase font-extrabold text-[#2193b0]">Manina</span> MarketPlace</h1>
       </div>
       
       {/*links */}
       <div className="flex justify-around gap-6">
          <Link to="/explore" className={"font-semibold hover:text-[#0092ca] text-slate-500 capitalize" 
          }>explore</Link>
          <Link to="/myProfile" className={"font-semibold hover:text-[#0092ca] text-slate-500 capitalize" 
        }>profile</Link>
          <Link to="/myInbox" className={"font-semibold hover:text-[#0092ca] text-slate-500 capitalize" 
        }>inbox</Link>
       </div>

       {/* love items list */}

       { 
        !hidden && <div className="w-10 h-10 rounded-sm grid place-content-center bg-[#e0e0e0] relative" onClick={()=>setShowBox(!showBox)}>
            <BsFillBookmarkHeartFill />
             {showBox && <div className="absolute top-12 max-h-[300px] overflow-y-scroll bg-white w-64 rounded-md shadow-lg right-[100%] translate-x-[50%] p-4">{
              loading ? <LoadingSpinner /> :  
              (
              likesdProducts.length ? likesdProducts.map(p=>(
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-center gap-3">
                    {p.data.category ==="phones" ? <BsFillPhoneFill /> :(p.data.category==="laptop" ? <BsLaptop /> : <TbDeviceAirpodsCase />) }
                    <p>{p.data.name}</p>
                    </div>
                    <Link to={`/categorie/${p.data.category}/${p.id}`} state={p.data} className="h-8 w-8 bg-[#eeeeee] grid place-content-center rounded-sm">{<FiExternalLink />}</Link>
                </div>
              )) : <h1>empty</h1>
              )
             }</div>}
        </div>
        
       }
    </nav>)
  return (
    <div className="max-w-lg w-full px-6 btm-nav-sm flex items-center justify-center shadow-lg rounded-md py-8 fixed bottom-0 bg-[white] left-[50%] -translate-x-[50%]">
      <NavLink to="/explore" className="flex flex-col items-center gap-2 px-8">
        <AiOutlineShop
          fill={pathMatch("/explore") ? "#117DF9" : "#0d0510"}
          size={30}
          className="mt-2"
        />
        <span className="btm-nav-label font-bold">explore</span>
      </NavLink>

      <NavLink
        to="/myProfile"
        className="flex flex-col items-center gap-2 px-8"
      >
        <CgProfile
          size={30}
          fill={pathMatch("/myProfile") ? "#117DF9" : "#0d0510"}
          className="mt-2"
        />
        <span className="btm-nav-label font-bold">myProfile</span>
      </NavLink>
      <NavLink to="/myInbox" className="flex flex-col items-center gap-2 px-8">
        <BsFillInboxFill
          size={30}
          fill={pathMatch("/myInbox") ? "#117DF9" : "#0d0510"}
          className="mt-2"
        />
        <span className="btm-nav-label font-bold">inbox</span>
      </NavLink>
    </div>
  );
}

export default Navbar;

import React, { useEffect,useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsFillInboxFill } from "react-icons/bs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Navbar() {
  const location = useLocation();
  const pathMatch = (currentRoute) => {
    return currentRoute === location.pathname;
  };
const [hidden,setHidden]=useState(true)
  useEffect(()=>{
    const auth=getAuth()
      onAuthStateChanged(auth,user=>{
        if(!user){ setHidden(true)
        }else setHidden(false)
      })
  },[])
console.log(hidden)
  if(hidden) return null
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

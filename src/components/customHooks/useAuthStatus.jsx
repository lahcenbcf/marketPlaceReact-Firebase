import React, { useEffect, useState } from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
function useAuthStatus() {
  const [isLogged,setIsLogged]=useState(false);
  const [isChecking,setIsChecking]=useState(true)
  useEffect(()=>{
    const auth=getAuth()
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setIsLogged(true)
        }
        setIsChecking(false)
    })
  })

  return {isChecking,isLogged}
}

export default useAuthStatus
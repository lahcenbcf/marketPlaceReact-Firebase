import React,{useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../../firebase.config'
import {toast} from 'react-toastify'
import {FcGoogle} from 'react-icons/fc'
import LoadingSpinner from '../../outils/Spinner'

function GoogleOauth() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const location=useLocation()
    const onGoogleClick=async ()=>{
        try {
            setLoading(true)
            {/* our inputs */}
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user
            //save to firestor
            const userRef=doc(db,'users',user.uid)
            //ceck if the user exist
            const docSnap=await getDoc(userRef)
            if(!docSnap.exists()){
                await setDoc(userRef,{
                    username:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            setLoading(false)
            navigate("/")
        } catch (error) {
            toast.error("something went wrong")
        }
    }
  return (
    <div className='flex flex-row-reverse gap-2 my-3 w-3/4 mx-auto border p-2 rounded-md justify-center items-center' onClick={onGoogleClick}>
    <p className='font-semibold'>sign {location.pathname =="/signUp" ? "up" :"in"} with</p>
    
        <FcGoogle  />

    {loading && <LoadingSpinner />}
    </div>
  )
}

export default GoogleOauth
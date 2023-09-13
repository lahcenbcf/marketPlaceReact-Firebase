import React,{useState,useRef, useEffect} from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'
import {BiMenuAltLeft, BiSolidUser} from 'react-icons/bi'
import {AiFillLock,AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'
import GoogleOauth from '../components/GoogleOauth/GoogleOauth'
function Register() {
  const [isShown,setIshown]=useState(false)
  const [loading,setLoading]=useState(false)
  const passRef=useRef()
  const emailRef=useRef()
  const navigate=useNavigate()
  const auth=getAuth()
  const signIn=async(e)=>{
    e.preventDefault()
    const email=emailRef.current.value;
    const pass=passRef.current.value
    if(
      !email || !pass
    )return;
    try {
      setLoading(true)
const userCredential=await signInWithEmailAndPassword(auth,email,pass)
const user= userCredential.user
if(user){
  setLoading(false)
  navigate("/")
  toast.success("logged successufuly")
}
    } catch(
      error
    ) {
      toast.error("something went wrong")
      console.log(error)
    }
   
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user) navigate("/")
    })
  },[])
  return (
    <div className='container min-h-screen flex flex-col justify-center items-center'>
      <h1>Welecome to our page</h1>
      <form className='max-w-md w-full rounded-md p-3 flex flex-col items-start' onSubmit={signIn}>
          
          <div className='formInputs w-full' >
          {/* email input */}
          <div className='formControl'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%]' />
          <input type="email" id='email' placeholder="" className=' border-none w-full px-4 py-2 rounded-sm outline-none' ref={emailRef} />
         
          <div className='inputLabel'>
            <label htmlFor='email'>username</label>
          </div>
          </div>
          {/* password input */}

          <div className='formControl'>
          
          <AiFillLock className='absolute left-0 bottom-[50%] translate-y-[50%]' />
          {/*show passord button */}
          <div className='absolute right-2 bottom-[50%] translate-y-[50%]' onClick={()=>console.log("called")}>
          {
            isShown ? <AiFillEye /> : <AiFillEyeInvisible /> 
          }
          </div>
          <input type={isShown ? "text":"password"} id='password' placeholder="" className=' border-none w-full px-4 py-2 rounded-sm outline-none' ref={passRef} />
          
          
          <div className='inputLabel'>
            <label htmlFor='password'>password</label>
          </div>
          </div>
          </div>
          {/*forgot password */}
      <Link to="/forgotPass" className="text-[#57ba36] opacity-70 font-bold hover:opacity-100">forgot password</Link>
          <button className='btn btn-outline my-3 py-0 hover:bg-[#57ba36] hover:border-[#57ba36]'>sign in</button>
      
      </form>

      <Link to="/signUp" className='font-bold text-[#92b234]'>sign up instead</Link>

      {/* googel Oauth */}

      <GoogleOauth />
    </div>
  )
}

export default Register
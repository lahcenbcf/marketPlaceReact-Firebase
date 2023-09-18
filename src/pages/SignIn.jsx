import React,{useState,useRef, useEffect} from 'react'
import './register.css'
import logo from '../assets/logo_transparent.png'
import {BiLogInCircle} from 'react-icons/bi'
import {Link, useNavigate} from 'react-router-dom'
import {BiMenuAltLeft, BiSolidUser} from 'react-icons/bi'
import {AiFillLock,AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'
import GoogleOauth from '../components/GoogleOauth/GoogleOauth'
import Or from '../outils/Or'
import LoadingSpinner from '../outils/Spinner'
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
      
      console.log(error)
    }
   
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user) navigate("/")
    })
  },[])

  if(loading) return <LoadingSpinner />
  return (
    <div className='container min-h-screen flex flex-col justify-center items-center'>
      <img src={logo} alt='manina phone' width={240} />
      <form className='max-w-lg w-full rounded-md px-8 py-4 flex flex-col items-start bg-white' onSubmit={signIn}>
      <div className='loginPng w-full flex justify-center my-6'>
        <BiLogInCircle size={30} color='#788BA5' className='bg-[#DEE4ED] box-content p-2 rounded-2xl' />
      </div>
      <h1 className='w-full text-2xl font-bold text-center text-[#181E25]'>Welcome back</h1>
      <p className='text-[#788BA5] w-full text-center my-4'>Use your email to log in to your workspace</p>    
      {
        /* Google OAUTH */
        <GoogleOauth />
      }

      {
        /* OR Componenet */
      }
      <Or />
      <div className='formInputs w-full' >
          {/* email input */}
          <div className='formControl'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%] mx-2' />
          <input type="email" id='email' placeholder="" className='border-none w-full p-4 px-8 rounded-sm outline-none cursor-pointer text-[#788BA5] text-md bg-white' ref={emailRef} />
         
          <div className='inputLabel'>
            <label htmlFor='email' className='text-[#474747] font-normal'>email</label>
          </div>
          </div>
          {/* password input */}

          <div className='formControl'>
          
          <AiFillLock className='absolute left-0 bottom-[50%] translate-y-[50%] mx-2' />
          {/*show passord button */}
          <div className='absolute right-2 bottom-[50%] translate-y-[50%]' onClick={()=>console.log("called")}>
          {
            isShown ? <AiFillEye /> : <AiFillEyeInvisible /> 
          }
          </div>
          <input type={isShown ? "text":"password"} id='password' placeholder="" className=' border-none w-full p-4 px-8 rounded-sm outline-none text-[#788BA5] text-md bg-white' ref={passRef} />
          
          
          <div className='inputLabel'>
            <label htmlFor='password' className='text-[#474747] font-normal'>password</label>
          </div>
          </div>
          </div>
          {/*forgot password */}
      <Link to="/forgotPass" className="text-[#117DF9] opacity-70 font-semibold hover:opacity-100">forgot password ?</Link>
          <button className='w-full  my-6 text-white p-2 bg-[#117DF9] rounded-md'>log in</button>
      
      </form>

      <p className='my-4 inline-block'>Don't have an account yet?  <Link to="/signUp" className='inline-block text-[#117DF9]'> sign up instead</Link></p>

      {/* googel Oauth */}

      
    </div>
  )
}

export default Register
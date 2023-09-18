import React,{useState,useRef,useEffect} from 'react'
import './register.css'
import Or from '../outils/Or'
import logo from '../assets/logo_transparent.png'
import {Link, useNavigate} from 'react-router-dom'
import {db} from '../firebase.config'
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import {BiSolidUser} from 'react-icons/bi'
import {VscAccount} from 'react-icons/vsc'
import {getAuth,createUserWithEmailAndPassword,updateProfile, onAuthStateChanged} from 'firebase/auth'
import {AiFillLock,AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleOauth from '../components/GoogleOauth/GoogleOauth'
import LoadingSpinner from '../outils/Spinner'
function Register() {
  const [isShown,setIshown]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const emailRef=useRef();
  const passRef=useRef()
  const nameRef=useRef()
  const auth=getAuth()
  const signUpuser=async(e)=>{
    e.preventDefault()
    const email=emailRef.current.value;
    const password=passRef.current.value;
    const username=nameRef.current.value;
    //const auth=getAuth()
    if(!email || !password || !username ) return;
    setLoading(true)
    try {
      const userCredential=await createUserWithEmailAndPassword(auth,email,password)
      const user=userCredential.user
      updateProfile(auth.currentUser,{
        displayName:username
      })
      //save to database
      const formData={
        email,
        username
      }

      formData.timestamp=serverTimestamp()
      await setDoc(doc(db,'users',user.uid),formData)
      toast.done("sign up done")
      setLoading(false)
      navigate("/")
      
      //clear field
      emailRef.current.value=""
      passRef.current.value=""
      nameRef.current.value=""

    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
   onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate("/")
      }
   })
},[])
if(loading) return <LoadingSpinner />
  return (
    <div className='container min-h-screen flex flex-col justify-center items-center'>
      
    {/* our logo */}
    <img src={logo} width={240} alt='maninaMarketPlace' />
      <form onSubmit={signUpuser} className='max-w-lg bg-white w-full rounded-md px-8 py-4 flex flex-col items-start'>
      <div className='registerPng w-full my-4 flex justify-center'>
      <VscAccount size={30} className='bg-[#DEE4ED] box-content p-2 rounded-2xl' />
      </div>
      <h1 className='text-2xl font-bold w-full text-center text-[#181E25]'>Welecome to manina marketPlace</h1>
      <p className='my-3 text-[#788BA5] w-full text-center'>Use your gmail and username to create a new account</p>

      {/* Google Aouth */}
      <GoogleOauth />

      {/**Or component */}
        <Or />
          <div className='formInputs w-full' >
          {/* username input */}
          <div className='formControl my-6'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%] mx-2' />
          <input autocomplete='off'  type="text" id='username' placeholder="" className=' border-none w-full p-4 px-8 rounded-sm outline-none text-[#788BA5] text-md bg-white' ref={nameRef} />
         
          <div className='inputLabel'>
            <label htmlFor='username' className='text-[#474747] font-normal'>username</label>
          </div>
          </div>

          {/* email input */}
          <div className='formControl my-6'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%] mx-2' />
          <input autoComplete='off' type="email" id='email' placeholder="" className=' border-none w-full p-4 px-8 rounded-sm outline-none text-[#788BA5] text-md bg-white' ref={emailRef} />
         
          <div className='inputLabel'>
            <label htmlFor='email' className='text-[#474747] font-normal'>email</label>
          </div>
          </div>
          {/* password input */}

          <div className='formControl my-6'>
          
          <AiFillLock className='absolute left-0 bottom-[50%] translate-y-[50%] mx-2' />
          {/*show passord button */}
          <div className='absolute right-2 bottom-[50%] translate-y-[50%]' onClick={()=>setIshown(!isShown)}>
          {
            isShown ? <AiFillEye /> : <AiFillEyeInvisible /> 
          }
          </div>
          <input type={isShown ? "text":"password"} id='password' autoComplete='false' placeholder="" className='border-none w-full p-4 px-8 rounded-sm outline-none text-[#788BA5] text-md bg-white' ref={passRef} />   
          <div className='inputLabel'>
            <label htmlFor='password' className='text-[#474747] font-normal'>password</label>
          </div>
          </div>
          </div>
          <button type='submit' className='w-full my-3 rounded-md bg-[#117DF9] text-white p-2'>create an account</button>
      
      </form>
          <p className='text-[#788BA5] '>have an account? <Link to="/signIn" className=' text-[#117DF9]'>sign In instead</Link> </p>
      
      
    </div>
  )
}

export default Register
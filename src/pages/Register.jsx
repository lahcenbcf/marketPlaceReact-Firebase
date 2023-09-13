import React,{useState,useRef,useEffect} from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'
import {db} from '../firebase.config'
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import {BiMenuAltLeft, BiSolidUser} from 'react-icons/bi'
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
      toast.error("something went wrong")
    }
    
  }

  useEffect(()=>{
   onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate("/")
      }
   })
},[])
  return (
    <div className='container min-h-screen flex flex-col justify-center items-center'>
      <h1>Welecome to our page</h1>
      <form onSubmit={signUpuser} className='max-w-md w-full rounded-md p-3 flex flex-col items-start'>
          
          <div className='formInputs w-full' >
          {/* username input */}
          <div className='formControl'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%]' />
          <input autoComplete='off'  type="text" id='username' placeholder="" className=' border-none w-full px-4 py-2 rounded-sm outline-none' ref={nameRef} />
         
          <div className='inputLabel'>
            <label htmlFor='username'>username</label>
          </div>
          </div>

          {/* email input */}
          <div className='formControl'>
         
          <BiSolidUser className='absolute left-0 bottom-[50%] translate-y-[50%]' />
          <input autoComplete='off' type="email" id='email' placeholder="" className=' border-none w-full px-4 py-2 rounded-sm outline-none' ref={emailRef} />
         
          <div className='inputLabel'>
            <label htmlFor='email'>email</label>
          </div>
          </div>
          {/* password input */}

          <div className='formControl'>
          
          <AiFillLock className='absolute left-0 bottom-[50%] translate-y-[50%]' />
          {/*show passord button */}
          <div className='absolute right-2 bottom-[50%] translate-y-[50%]'>
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
          <button type='submit' className='btn btn-outline my-3 py-0 hover:bg-[#57ba36] hover:border-[#57ba36]'>sign up</button>
      
      </form>

      <Link to="/signIn" className='font-bold text-[#92b234]'>sign In instead</Link>
      {/* google Oauth */}
      <GoogleOauth />
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Register
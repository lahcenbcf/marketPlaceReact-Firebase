import React, { useEffect, useState } from 'react'
import ChatRoom from '../components/chatRoom/ChatRoom'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
function Contact() {
    /*const [message,setMessage]=useState("")
    const [username,setUsername]=useState(null)
    const [searchParams,setSerachParams]=useSearchParams()
    const [loading,setLoading]=useState(true)
    const params=useParams()
*/
    /*useEffect(()=>{
        getUser(params.username).then((user)=>{
            setUsername(user)
            setLoading(false)
            console.log(user)
        })
    },[params,username])*/
   // if(loading) return <h1>loading ...</h1>
   const navigate=useNavigate()
    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(!user)navigate("/")
        })
    },[])
  return (
    <div className='w-full md:w-10/12 mx-auto p-4 pb-28'>
    {
        /*
        {
        username!=null && (
            <main>
                <h3 className='text-md font-semibold my-3'>Contact {username?.username}</h3>
                <form className="border-2">
                  <div className='formInput'>
                        <label className='text-sm'>message</label>
                        <textarea rows={10} cols={20} className='rounded-sm shadow-md w-full my-2' onChange={(e)=>setMessage(e.target.value)} />
                   </div>  


                  <a href={`mailto:${username?.email}?subject=${searchParams.get("name")}&body=${message}`}>
                  <button className="btn btn-secondary">send</button>
                  </a> 
                </form>
            
                </main>
        )
     }
        */
    } <h1 className='text-4xl font-bold my-3'>Chat room</h1>
     
    <ChatRoom />
     </div>
  )
}

export default Contact
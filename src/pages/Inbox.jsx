import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMychatRooms } from '../api/chat'
import {AiOutlineMessage} from 'react-icons/ai'
import LoadingSpinner from '../outils/Spinner'

const bgColors=[
    "#ffcbcb",
    "#bae8e8",
    "#e0ebeb",
    "#cca8e9",
    "#fcff82",
    "#ff8364"
]
function Inbox() {
    const [mychatRooms,setMychatRooms]=useState([])
    const [loading,setLoading]=useState(true)
    const auth=getAuth()
    const navigate=useNavigate()
    useEffect(()=>{
        setMychatRooms([])
        onAuthStateChanged(auth,(user)=>{
            if(!user) navigate("/signIn")
            getMychatRooms(auth.currentUser.uid)
        .then(data=>{
            data.forEach(doc=>{
                const otherUserMessages=doc.data().messages.filter(m=>m.userId!=auth.currentUser.uid)
                otherUserMessages.length && setMychatRooms(prev=>[...prev,{...doc.data(),messages:otherUserMessages}])
                
            })
            setLoading(false)
        })
        })

    },[])
    if(loading) return <LoadingSpinner />
  return (

    <div className='w-full md:container mx-auto min-h-screen p-4 pb-28'>
        
    <h1 className='text-[#0d0510] text-3xl mb-3'>My Inbox</h1>
    {
        mychatRooms.length ?
        mychatRooms.map((doc,index)=>(

            <Link to={`/contact/${auth.currentUser.uid==doc.firstWhoSend ?  doc.receiveuserInfo.id :doc.senduserInfo.id}`}>
            <div key={index} className="p-4 rounded-xl rounded-b-none my-3" style={{
                backgroundColor:bgColors[Math.floor(Math.random()*bgColors.length)]
            }}>
                <div className='flex items-center justify-between mb-4'>
                        <img width={80} height={80} className='rounded-full' src={auth.currentUser.uid==doc.firstWhoSend ?  doc.receiveuserInfo.photo :doc.senduserInfo.photo} />
                        
                </div>

                <div className='flex justify-between items-center'>
                             <div className='userInfo'>
                                <h1 className='text-xl font-semibold text-white'>{auth.currentUser.uid==doc.firstWhoSend ?  doc.receiveuserInfo.name :doc.senduserInfo.name}</h1>
                                {
                                    doc.messages.length && <p className='text-slate-600 text-lg'><AiOutlineMessage className="inline-block mx-2" /> {doc.messages[doc.messages.length-1].message}</p>
                                }
                                
                             </div>
                             <div className='displayTime flex flex-col items-end'>
                             {
                                doc.messages.length && <>
                                <h1 className='text-xl font-semibold text-white'>{doc.messages[doc.messages.length-1].createdAt}</h1>
                                    <p className='text-lg text-slate-600'>{doc.messages[doc.messages.length-1].time}</p>
                                </>
                                    
                                
                             }
                             
                                    
                             
                             
                                
                                </div>
                </div>
            </div>
            </Link>
            
        ))
        :<h1>inbox is empty</h1>
    }    
    <div className='rounded-md shadow-md'>
           
        </div>
    </div>
  ) 
}

export default Inbox
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React,{useEffect, useRef,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIfChatRoomExist , addChatRoom,updateRoomChatMessages} from '../../api/chat'
import { getUser } from '../../api/users'
import {AiOutlineSend} from 'react-icons/ai'
function SendMessage({set}) {
  const messageRef=useRef()
  const [userRefInfo,setUserRefInfo]=useState(null)
  const auth=getAuth()
  const navigate=useNavigate()
  const {userRef}=useParams()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!messageRef.current.value.trim()) toast.error("you can not send this message")
        //add the logic
      const send={
        id:auth.currentUser.uid,
        photo:auth.currentUser?.photoURL ? auth.currentUser.photoURL : "https://randomuser.me/api/portraits/men/81.jpg",
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
      }
      const receive={
        id:userRef,
        email:userRefInfo.email,
        name:userRefInfo.username,
        photo:"https://randomuser.me/api/portraits/men/81.jpg"
      }
    
      checkIfChatRoomExist(send,receive).then(async(result)=>{
        if(typeof(result)==="boolean"){
          await addChatRoom(send,receive,messageRef.current.value)
          messageRef.current.value=""
        }else{
          await updateRoomChatMessages(send,messageRef.current.value,result)
          messageRef.current.value=""
        }
        set(true)
      })
      
    }

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(!user) navigate("/signIn")
        getUser(userRef).then(userData=>setUserRefInfo(userData))

      })
    },[])
  return (
    <div className='w-full rounded-md rounded-t-none bg-[#e0e0e0] p-2'>
        <form onSubmit={handleSubmit} className='w-full flex'>
            <input type='text' className='w-full px-3 bg-[#e0e0e0] outline-none' ref={messageRef} />
            <button type='submit' className='btn rounded-sm rounded-l-none bg-[#e0e0e0]'><AiOutlineSend /></button>
        </form>    
        
    </div>
  )
}

export default SendMessage
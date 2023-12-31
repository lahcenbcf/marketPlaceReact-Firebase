import React, { useEffect,useState } from "react";
import { getMessages } from "../../api/chat";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
function ChatBox({set,change}) {
    const {userRef}=useParams()
    const [messages,setMessages]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const auth=getAuth()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(!user) navigate("/signIn")
        getMessages(auth.currentUser.uid,userRef).then(data=>{
            setMessages(data)
            setLoading(false)
            set(false)
        }).catch(e=>console.log(e))
    })},[change])
      if(loading) return <h1>loading </h1>
  return (
<div className="container mx-auto border border-[#e0e0e0] p-4 bg-white min-h-screen">
{
    messages.length ?    
    messages.map((m,index)=>(
        <div key={index} className={`chat ${m.userId===auth.currentUser.uid ? "chat-start" :"chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={m.photoUrl} />
        </div>
      </div>
      <div className="chat-header">
    {m.name}
    <time className="text-xs opacity-50 mx-2">{m.time}</time>
  </div>
      <div className="chat-bubble">
        {m.message}
      </div>
      <div className="chat-footer opacity-50">
    Delivered
  </div>
      </div>
    ))
    : <h2>no messages !</h2>
}
</div>
    
 
  );
}

export default ChatBox;

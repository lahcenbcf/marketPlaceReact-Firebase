import React,{useState} from 'react'
import ChatBox from './ChatBox'
import SendMessage from './SendMessage'

function ChatRoom() {
    const [change,setChange]=useState(false)
  return (
    <div>
        <ChatBox change={change} set={setChange} />
        <SendMessage set={setChange} />
    </div>
  )
}

export default ChatRoom
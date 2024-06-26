import React, { useEffect } from 'react'
import Message from './Message'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import { useState } from 'react'




const Messages = () => {

  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);




  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub();
    }

  },[data.chatId])

  return (
    <div className="messages">
      {messages.map(m=>(
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
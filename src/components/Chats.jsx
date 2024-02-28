import { updateCurrentUser } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext'


const Chats = () => {


  const[chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid])


  const hadleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  };
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => {
        if (currentUser.uid === chat[1].userInfo.uid) {
          return null; // Skip rendering current user's chat
        } else {
          return (
            <div className="userChat" key={chat[0]} onClick={hadleSelect(chat[1].userInfo)}>
              <img src={chat[1].userInfo.photoURL} alt="img" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>            
            </div>
          );
        }
      })}
    </div>
  )
}

export default Chats

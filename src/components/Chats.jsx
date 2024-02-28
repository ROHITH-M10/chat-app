import { updateCurrentUser } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore'


const Chats = () => {


  const[chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext);

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


  return (
    <div className="chats">
      <div className="userChat">
            <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
            <div className="userChatInfo">
              <span>Cat</span>
              <p>Hello</p>
            </div>
      </div>


      <div className="userChat">
            <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
            <div className="userChatInfo">
              <span>Cat</span>
              <p>Hello</p>
            </div>
      </div>

        <div className="userChat">
            <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
            <div className="userChatInfo">
            <span>Cat</span>
            <p>Hello</p>
        </div>
        </div>

        <div className="userChat">
            <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
            <div className="userChatInfo">
            <span>Cat</span>
            <p>Hello</p>
        </div>
        </div>



    </div>
  )
}

export default Chats
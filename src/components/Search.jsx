import React, { useState } from 'react';
import { collection, query, where, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { updateCurrentUser } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
        setUser(null); // Clear user data if not found
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(false); // Reset error state if user is found
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === 'Enter') {
      handleSearch(); // Just call handleSearch without expecting a return value
    }
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    
    try{
      const res = await getDoc(doc(db, "Chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc (db, "Chats",combinedId),{message:[]});


        // create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]:{
            uid: currentUser.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

        }
      }catch (err) {}

  setUser(null);
  setUsername('');
  };

  


  return (
    <div className="search">
      <div className="searchForm">
        <input 
        type="text" 
        placeholder='Search user' 
        onKeyDown={handleKey} 
        onChange={e => setUsername(e.target.value)} 
        value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="img" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

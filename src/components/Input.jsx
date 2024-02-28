import React, { useState, useContext } from 'react';
import Img from '../img/img.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleChange = async () => {
    try {
      if (!text && !img) return; // Prevent sending empty messages

      const messageData = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: serverTimestamp(), // Use serverTimestamp consistently
      };

      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed', null, (error) => {
          console.error('Error uploading image:', error);
        });

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateChatData({ ...messageData, img: downloadURL });
      } else {
        await updateChatData(messageData);
      }

      // Update userChats for both current user and the other user in the chat
      await Promise.all([
        updateLastMessage(currentUser.uid, data.chatId, text),
        updateLastMessage(data.user.uid, data.chatId, text)
      ]);

      // Reset input fields after sending message
      setText('');
      setImg(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const updateChatData = async (messageData) => {
    const chatDocRef = doc(db, 'chats', data.chatId);
    await updateDoc(chatDocRef, { messages: arrayUnion(messageData) });
  };

  const updateLastMessage = async (userId, chatId, text) => {
    const userChatDocRef = doc(db, 'userChats', userId);
    await updateDoc(userChatDocRef, {
      [chatId + '.lastMessage']: { text },
      [chatId + '.date']: serverTimestamp()
    });
  };

  return (
    <div className="input">
      <input type="text" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="send">
        <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="attach" />
        </label>
        <button onClick={handleChange}>Send</button>
      </div>
    </div>
  );
};

export default Input;

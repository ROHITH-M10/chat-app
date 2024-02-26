import React from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db,storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const[err,SetErr] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)


      const storageRef = ref(storage, res.user.uid);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(

        (error) => {
          SetErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
          await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');


          });
        }
      );
    }


    catch (err) {
      SetErr(true);
    }
    
  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat Zone</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display Name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <input type="file" id='file' />
                <label htmlFor="file">
                    <img src={Add} alt="add-image -icon" />
                    <span>Add Profile Picture</span>
                </label>
                <button>Sign up</button>
            </form>
            {err && <span>Something went wrong!</span>}
            <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}


export default Register
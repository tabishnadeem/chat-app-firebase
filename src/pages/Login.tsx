import LoginModal from "./LoginModal";
import { initializeApp, getApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { firebaseConfig } from "../config/firebase.config";
import { useState } from "react";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";

interface IPayload {
  email: string;
  pass: string;
}

initializeApp(firebaseConfig);
const auth = getAuth(getApp());

export default function Login() {
  // const [signInWithEmailAndPassword, user, loading, error] =
  //   useSignInWithEmailAndPassword(auth);

  const nav = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false)

  const getData = (payload: IPayload) => {
    console.log(payload);
    setBtnLoader(true)

    signInWithEmailAndPassword(auth,payload.email,payload.pass).then((user)=>{
      console.log(user);
      if(user){
        setBtnLoader(false)
        nav('/')

      }
      //invalid-email
      //wrong-password
      //too-many-requests
      
    }).catch((error)=>{
      console.log(error.code);
      console.log(error.message);
      
      let err = error.code.split('/')[1];
      
      switch (err) {
        case 'invalid-email':
          console.log('Invalid Email ID!');
          showModal();
          // message.error({content:'Invalid Email ID!',style:{zIndex:'999999'}});
          // alert('Invalid Email ID!')
          break;
        case 'wrong-password':
          message.error('Invalid Password!')
          break;
        case 'too-many-requests':
          message.error('Too many Failed Attempts, try again after some time')
          /*Access to this account has been temporarily disabled due
           to many failed login attempts. You can immediately restore
            it by resetting your password or you can try again later.
             (auth/too-many-requests
             */
          break;
      }
      setBtnLoader(false)
    }); 
  };

  const showModal = ()=>{
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after`,
      style:{display:'999999'}
    });

    setTimeout(() => {
      // clearInterval(timer);
      modal.destroy();
    },2000);
  };  
  
  return (
    <>
      <LoginModal loading={btnLoader} visible={true} emailPass={getData} />
    </>
  );
}

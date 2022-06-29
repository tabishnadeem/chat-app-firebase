import { Button, Checkbox, Input, Loading, Modal, Row, Text } from "@nextui-org/react";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Mail } from "../assets/svgs/Mail";
import { Password } from "../assets/svgs/Password";
import { firebaseConfig } from "../config/firebase.config";
import { setAddFriendModalVisible } from "../redux/addFriendModalSlice";
import { RootState } from "../redux/store";

initializeApp(firebaseConfig);
const auth = getAuth(getApp());

export default function AddFriendModal(props: { visible: boolean }) {
 
  // const [visible, setVisible] = useState(false);
  
  const [email, setEmail] = useState("");

  const [loader, setLoader] = useState(false);

  const visible = useSelector((state:RootState) => state.addFriendModalVisible.value)
  const dispatch = useDispatch();
  

  const closeHandler = () => {
    dispatch(setAddFriendModalVisible(false));
  };

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(getApp()),
      `/Users`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  const checkUserExist = async () => {
    console.log(auth.currentUser?.displayName);
    setLoader(true);
    let flag = 0;
    let username;
    let uid ;
    if(email){
      value?.docs.map((doc)=>{
        if(doc.id === email){
          flag = 1;
          username = doc.get('username');
          uid = doc.get('uid');
        }
      });
      // console.log(name);
      if(flag){
        handleAddFriend(username,uid)
      }else{
        setLoader(false);
        alert("Email ID does not exist")
      }
    }else{
      setLoader(false)
      alert('Enter Email Address')
    }
    
  };

  const handleAddFriend = async (username:any,uid:any) => {
    try {
   setDoc(
        doc(
          getFirestore(getApp()),
          `/${auth.currentUser?.uid}/Info/Friends/${username}`
        ),
        {}
      ).then(()=>{
        // adding the current user to friends's friend document 
        setDoc(
          doc(
            getFirestore(getApp()),
            `/${uid}/Info/Friends/${auth.currentUser?.displayName}`
          ),
          {}
        ).then(()=>{
          setLoader(false);
        })
      })
      closeHandler();
    } catch (error) {
      setLoader(false)
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            Enter Email Id of your Friend
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto color="secondary" onClick={checkUserExist}>
          <Loading style={{display: loader?'block':'none'}}/>
          <span style={{display: !loader?'block':'none'}}>

            Add Friend
          </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

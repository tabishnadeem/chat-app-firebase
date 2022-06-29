import "./Styles/SendChat.css";
import { Button, Input } from "@nextui-org/react";
// import { Send } from "react-iconly";
import { ReactComponent as SendIcon } from "../assets/Send.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCSUM } from "../redux/selectedUserMessagesSlice";
import { payloadTabish } from "../mock/tabishData";
import { getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { IPayload } from "../interfaces/IPayload";
import { useCollection } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import { RootState } from "../redux/store";

initializeApp(firebaseConfig);
const firestore = getFirestore(getApp());
const auth = getAuth(getApp());

export default function SendChat() {
  const [chatInput, setChatInput] = useState("");

  const dispatch = useDispatch();

  const [uidFriend, setUIDFriend] = useState('')
  const currentSelectedUsername = useSelector((state:RootState)=>state.csu.value);

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(getApp()),
      `/${auth.currentUser?.uid}/Info/Friends`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [valueFriendMessage, loadingFriendMessage, errorFriendMessage] = useCollection(
    collection(
      getFirestore(getApp()),
      `/${uidFriend?uidFriend:'User'}/Info/Friends`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  const [valueFriend, loadingFriend, errorFriend] = useCollection(
    collection(
      getFirestore(getApp()),
      `/Users`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [messagePayload, setMessagePayload] = useState<any>();
  const [friendMessagePayload, setFriendMessagePayload] = useState<any>();

  useEffect(() => {
    value?.docs.map((doc) => {
      setMessagePayload(doc.data()["messages"]);
      // console.log(doc.data()["messages"]);
    });
    let uid;
    valueFriend?.docs.map((doc)=>{
      let username = doc.get('username');
      if(username === currentSelectedUsername){
        uid = doc.get('uid');
        console.log(uid);
        
        setUIDFriend(uid)
      }
    });
    valueFriendMessage?.docs.map((doc)=>{
      setFriendMessagePayload(doc.data()["messages"])
      console.log(doc.data()["messages"]);
    })
  }, [value,valueFriend,valueFriendMessage,currentSelectedUsername]);




  const uploadToDB = async (data: any, dataFriend:any) => {
    const dataRef = doc(
      firestore,
      `/${auth.currentUser?.uid}/Info/Friends/${currentSelectedUsername}`
    );
    await setDoc(dataRef, data, { merge: true });

  

    const friendRef = doc(firestore, `/${uidFriend}/Info/Friends/${auth.currentUser?.displayName}`)
    await setDoc(friendRef, dataFriend, { merge: true });
  };

  const handleSendChat = () => {    
    console.log(messagePayload);
    let temp;
    let tempFriend;
    if(messagePayload){

       temp = {
        messages: [
          ...messagePayload,
          {
            message: chatInput,
            isSender: true,
          },
        ],
      };
      tempFriend = {
        messages: [
          ...friendMessagePayload,
          {
            message: chatInput,
            isSender: false,
          },
        ],
      };
    }else{
       temp = {
        messages: [
          {
            message: chatInput,
            isSender: true,
          },
        ],
      };
      tempFriend = {
        messages: [
          {
            message: chatInput,
            isSender: false,
          },
        ],
      };
      
    }
    
    console.log(tempFriend);
    
    uploadToDB(temp,tempFriend);
    setChatInput("");
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendChat();
    }
  };

  return (
    <>
      <div className="sendChatContainer">
        <Input
          size="lg"
          className="sendChatInput"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleEnterPress}
          placeholder="Type something..."
          css={{ w: "90%" }}
        />
        <Button
          ripple
          shadow
          animated
          color={"gradient"}
          icon={<SendIcon />}
          onClick={handleSendChat}
          className="sendChatBtn"
        />
      </div>
    </>
  );
}

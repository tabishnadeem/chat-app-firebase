import Message from "./Message";
import "./Styles/MessageContainer.css";
import { IPayload } from "../interfaces/IPayload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCSUM } from "../redux/selectedUserMessagesSlice";
import { firebaseConfig } from "../config/firebase.config";
import { getApp, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import mssgTone from "../assets/sounds/juntos.mp3";
import useSound from "use-sound";
import { RootState } from "../redux/store";

interface IMessageContainer {
  messagePayload: Array<IPayload>;
}

initializeApp(firebaseConfig);
const auth = getAuth(getApp());
// console.log(auth.currentUser);

export default function MessageContainer() {
  const currentSelectedUsername: string = useSelector(
    (state: RootState) => state.csu.value
  );
  console.log(currentSelectedUsername);

  const [play] = useSound(mssgTone);

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(getApp()),
      `/${auth.currentUser?.uid}/Info/Friends`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [messagePayload, setMessagePayload] = useState<Array<any>>();


  useEffect(() => {
    play();
    value?.docs.map((doc) => {
      if (doc.id === currentSelectedUsername) {
        setMessagePayload(doc.data()["messages"]);

        console.log(doc.data()["messages"]);
      }
    });
  }, [currentSelectedUsername, value]);


  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  // const messagePayload: any[] = useSelector((state: any) => state.csum);

  if (!value?.docs.length) {
    return (
      <>
        <div>No Message!</div>
      </>
    );
  } else {
    return (
      <>
        <div className="messagesContainer">
          {messagePayload?.map((mssg: any, index: number) => {
            return (
              <>
                <div
                  key={index}
                  className="messageDiv"
                  style={{ textAlign: mssg.isSender ? "end" : "start" }}
                >
                  <div className="subDiv">{mssg.message}</div>
                </div>
                <br />
                <div ref={messagesEndRef} />
              </>
            );
          })}
        </div>
      </>
    );
  }
}

import { Button, Input } from "@nextui-org/react";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { SyntheticEvent, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { firebaseConfig } from "../config/firebase.config";
import { IFriend } from "../interfaces/IFriend";
import { setFriendList } from "../redux/FriendListSlice";
import { RootState } from "../redux/store";
import { Input as InputAntd } from "antd";
const { Search } = InputAntd;

initializeApp(firebaseConfig);
const auth = getAuth(getApp());
export default function SearchChat() {
  const dispatch = useDispatch();
  const friendList:any = useSelector((state: RootState) => state.friendList.value);

  const [friendListCopy, setFriendListCopy] = useState<any>([]);


  const [value, loading, error] = useCollection(
    collection(
      getFirestore(getApp()),
      `/${auth.currentUser?.uid}/Info/Friends`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(()=>{
    let tempArr: any = [];
    value?.docs.map((doc) => {
      let temp = {
        username: "",
      };
      // console.log(doc.id);
      temp["username"] = doc.id;
      tempArr.push(temp);
    });
    setFriendListCopy(tempArr)
  },[value])


  const handleOnChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if(value){
      let tempArr: any = friendList.filter((item: IFriend) => {
        return item.username.toLowerCase().includes(value);
      });
      dispatch(setFriendList(tempArr));
    }else{
      handleClear();
    }

  };

  const handleClear = () => {
    dispatch(setFriendList(friendListCopy));
  };

  return (
    <>
      <Input
        clearable
        
        contentRightStyling={false}
        placeholder="Search for Chat..."
        size="lg"
        fullWidth
        shadow={false}
        onClearClick={handleClear}
        onChange={handleOnChange}
        css={{ padding: "$5" }}
        contentLeft={
          <FaSearch style={{color:'gray'}}/>
        }
        
      />

    </>
  );
}

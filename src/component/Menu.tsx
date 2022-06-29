import { Dropdown } from "@nextui-org/react";
import { Key, useState } from "react";
import {initializeApp, getApp} from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import AddFriendModal from "./AddFriendModal";
import { useDispatch } from "react-redux";
import { setAddFriendModalVisible } from "../redux/addFriendModalSlice";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

initializeApp(firebaseConfig)
const auth = getAuth(getApp());



export default function Menu() {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch()

  
    const handleAction = (key:Key) => {
        console.log(key);
        if(key === 'logout'){
            auth.signOut();
            console.log('signout success')
        }else{
          setModalVisible(true)
          dispatch(setAddFriendModalVisible(true))
        }
    }
    
  return (
    <>
      <Dropdown>
        <Dropdown.Button flat ></Dropdown.Button>
        <Dropdown.Menu aria-label="Static Actions" onAction={handleAction}>
          <Dropdown.Item key="add" icon={<FaUserPlus style={{fontSize:'22px'}}/>}>Add Friend</Dropdown.Item>
          <Dropdown.Item key="logout" color="error" icon={<BiLogOutCircle style={{fontSize:'21px'}}/> } >Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <AddFriendModal visible = {modalVisible}/>
    </>
  );
}

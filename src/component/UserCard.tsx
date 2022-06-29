import { Avatar, Card, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCSU } from "../redux/currentSelectedUsernameSlice";
import "./Styles/UserCard.css";
import user from "../assets/user.png"

interface IUser {
  username: string;
}
export default function UserCard(props: IUser) {
  const dispatch = useDispatch();
  // const [selectedUserName, setSelectedUserName] = useState("");



  const handleCardClick = (username: string) => {
    dispatch(setCSU(username));
    switch (username) {
      case "Tabish Nadeem":
        // dispatch(setCSUM(payloadTabish))
        // setSelectedUserName(username);
        
        break;

      case "John Doe":
        // setSelectedUserName(username);
        // dispatch(setCSUM(payloadJohn))
        break;

      default:
        break;
    }
  };
  return (
    <>
      <div className="mainContUser">
        <div className="userCardContainer">
          <div className="avatar" style={{  margin: "auto" ,paddingLeft:'20px'}}>
            <Avatar
              squared
              src={user}
            />
          </div>

          <div
            className="userName"
            style={{ flex: "auto" }}
            onClick={() => {
              handleCardClick(props.username);
            }}
          >
            <h3 style={{ float:'left', margin:'auto',paddingLeft:'30px'}}>{props.username}</h3>
            
          </div>
          
        </div>
        {/* <hr /> */}
      </div>
    </>
  );
}

import "./Styles/MainContainer.css";

import { Card, Text } from "@nextui-org/react";
import SearchChat from "../component/SearchChat";
import ChatList from "../component/ChatList";
import ChatHeader from "../component/ChatHeader";
import MessageContainer from "../component/MessageContainer";
import SendChat from "../component/SendChat";
import Menu from "../component/Menu";
import { useSelector } from "react-redux";
import NoUserSelected from "../pages/NoUserSelected";
import arrowRightHandDrawn from "../assets/arrowRightHandDrawn.gif";
import Lottie from "react-lottie";
import * as arrow from "../assets/arrow.json";
import { RootState } from "../redux/store";

export default function MainContainer() {
  const currentSelectedUsername: string = useSelector(
    (state: RootState) => state.csu.value
  );

  return (
    <>
      <div className="mainCont">
        <Card className="containerCard" css={{ width: "95vw", height: "90vh" }}>
          <div className="chatListContainer">
            <div className="chatListHeader">
              <SearchChat />
              <Menu />
            </div>

            <ChatList />
            {/* <div style={{marginLeft:'100px', marginTop:'35px'}}>
        <img src={arrowRightHandDrawn} alt="" width={240} style={{transform:'rotate(-50deg)'}}/>
      </div> */}
      
          </div>

          {currentSelectedUsername !== "No User" ? (
            <div className="chatContainer">
              <div>
                <ChatHeader />
              </div>
              <div style={{ flex: "auto", background: "", overflowY: "auto" }}>
                <MessageContainer />
              </div>
              <div>
                <SendChat />
              </div>
            </div>
          ) : (
            <>
              <div className="chatContainer">
                <NoUserSelected />
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

import { Avatar, Card } from "@nextui-org/react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import user from "../assets/user.png";
import { RootState } from "../redux/store";

export default function ChatHeader() {
  const currentSelectedUsername: string = useSelector(
    (state: RootState) => state.csu.value
  );

  return (
    <>
      <Card
        css={{
          w: "100",
          borderRadius: 10,
          padding: "1.1%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="avatarSection">
          <Avatar squared src={user} />
        </div>

        <div className="nameSection">
          <h3 style={{ margin: "auto" }}>{currentSelectedUsername}</h3>
        </div>

        <div className="activeSection">
          <span>Online</span>
        </div>
      </Card>
    </>
  );
}

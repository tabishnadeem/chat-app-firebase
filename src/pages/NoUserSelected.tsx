import { Text } from "@nextui-org/react";
import noUserImg from "../assets/noUser.jpg";


export default function NoUserSelected(){
    return(
        <>
        <div className="imgContainerNoUser">
            <img src={noUserImg} alt="" width={440}/>
            <Text  size={25}>Select a contact to start messaging</Text>
        </div>
        </>
    )
}
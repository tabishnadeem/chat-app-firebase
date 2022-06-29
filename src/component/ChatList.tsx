import UserCard from "./UserCard";
import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { collection, getFirestore } from "firebase/firestore";
import { getApp, initializeApp } from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseConfig } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { IFriend } from "../interfaces/IFriend";
import Lottie from "react-lottie";
import * as arrow from "../assets/arrow.json";
import { Card, Skeleton, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "../redux/FriendListSlice";
import { RootState } from "../redux/store";

initializeApp(firebaseConfig);
const auth = getAuth(getApp());

export default function ChatList() {
  // let arr = [1, 2, 3, 4, 5, 6, 2, 2, 4, 1, 4];
  const dispatch = useDispatch();
  const friendList = useSelector((state: RootState) => state.friendList.value);
  // const [friendList, setFriendList] = useState<IFriend[]>([]);

  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(getApp()),
      `/${auth.currentUser?.uid}/Info/Friends`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    let tempArr: any = [];
    value?.docs.map((doc) => {
      let temp = {
        username: "",
      };
      console.log(doc.id);
      temp["username"] = doc.id;
      tempArr.push(temp);
    });
    console.log(tempArr);
    dispatch(setFriendList(tempArr));
    console.log(friendList);

    // tempArr.forEach((obj) => {
    //   dispatch(setFriendList(obj));
    // });

    // setFriendList(tempArr);
    setSkeletonLoading(false);
  }, [value]);

  // console.log(friendList);

  let payload = [
    {
      username: "Tabish Nadeem",
    },
    {
      username: "John Doe",
    },
  ];

  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {[1, 2, 3].map((item: number) => {
          return (
            <>
              <Skeleton loading={skeletonLoading} active avatar></Skeleton>
            </>
          );
        })}
      </Space>
      {friendList.length ? (
        <div>
          {friendList.map((item: { username: string }, index: number) => {
            return (
              <div key={index} style={{ padding: "10px" }}>
                <Card
                  hoverable
                  bordered={false}
                  size="small"
                  style={{ borderRadius: "10px" }}
                >
                  <UserCard username={item.username} />
                </Card>
                {/* <Divider style={{margin:'auto', textAlign:'center'}}/> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {/* <Skeleton loading={skeletonLoading} active avatar></Skeleton> */}
          <div
            style={{
              transform: "rotate(-30deg)",
              marginLeft: "50px",
              opacity: "0.6",
            }}
          >
            <Lottie
              options={{ loop: false, autoplay: true, animationData: arrow }}
              height={200}
              width={250}
            />
          </div>
          <Text>Click on the menu to add friend </Text>
        </div>
      )}
    </>
  );
}

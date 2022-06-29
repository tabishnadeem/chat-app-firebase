import { configureStore } from "@reduxjs/toolkit";
import addFriendModalSlice from "./addFriendModalSlice";
import currentSelectedUsernameSlice from "./currentSelectedUsernameSlice";
import ErrorVisibleSlice from "./ErrorVisibleSlice";
import FriendListSlice from "./FriendListSlice";
import  currentSelectedUserMessageSlice  from "./selectedUserMessagesSlice";



export const store = configureStore({
    reducer : {
        csu: currentSelectedUsernameSlice,
        csum : currentSelectedUserMessageSlice,
        addFriendModalVisible: addFriendModalSlice,
        errorVisible: ErrorVisibleSlice,
        friendList: FriendListSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

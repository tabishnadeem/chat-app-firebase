import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriend } from "../interfaces/IFriend";


// const initialState :[] = {
//     username:""
// }

// export const friendList = createSlice({
//     name: 'friendListSlice',
//     initialState:[],
//     reducers: {
//         setFriendList :(state:Array<IFriend>,action:PayloadAction<IFriend>)=>{
//             state.push(action.payload)
//         }
//     }
    
// });
export const friendList = createSlice({
    name: 'friendListSlice',
    initialState:{value:[]},
    reducers: {
        setFriendList: (state:any, action:PayloadAction<IFriend>) => {
            state.value = action.payload;
            // state.push(action.payload);
            
        }
    }
});

export const {setFriendList} = friendList.actions;
export default friendList.reducer;
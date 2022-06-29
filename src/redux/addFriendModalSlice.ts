import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IVisibility{
    value : boolean;
}

const initialState : IVisibility = {
    value : false,
}


export const addFriendModalVisibile = createSlice({
    name: 'addFriendModalVisibleSlice',
    initialState,
    reducers: {
        setAddFriendModalVisible: (state:IVisibility, action:PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const {setAddFriendModalVisible} = addFriendModalVisibile.actions;
export default addFriendModalVisibile.reducer;
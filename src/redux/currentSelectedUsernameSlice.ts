import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ISelectedUser{
    value : string;
}

const initialState : ISelectedUser = {
    value : 'No User',
}


export const currentSelectedUsernameSlice = createSlice({
    name: 'csuSlice',
    initialState,
    reducers: {
        setCSU: (state:ISelectedUser, action:PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const {setCSU} = currentSelectedUsernameSlice.actions;
export default currentSelectedUsernameSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayload } from "../interfaces/IPayload";


export interface ISelectedUserMessages {
    message: string;
    isSender: boolean;
}

interface IArrayMessages{
    messages : Array<ISelectedUserMessages>
}


export const currentSelectedUserMessageSlice = createSlice({
    name: 'csumSlice',
    initialState:[],
    reducers: {
        setCSUM: (state:Array<any>, action:PayloadAction<ISelectedUserMessages>) => {
            state.push(action.payload)
        }
    }
});

export const {setCSUM} = currentSelectedUserMessageSlice.actions;
export default currentSelectedUserMessageSlice.reducer;
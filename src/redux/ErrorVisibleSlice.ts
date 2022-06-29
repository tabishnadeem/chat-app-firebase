
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IVisibility{
    value : boolean;
}
// export interface IContent{
//     backgroundColor: string;
//     errorHead: string;
//     errorDesc: string;
//     color: string;
// }

const initialState : IVisibility = {
    value : false,
}
// const initialStateContent : IContent = {
//     backgroundColor: "",
//     errorHead: "",
//     errorDesc: "",
//     color:""
// }


export const errorVisible = createSlice({
    name: 'errorVisibleSlice',
    initialState,
    reducers: {
        setErrorVisible: (state:IVisibility, action:PayloadAction<boolean>) => {
            state.value = action.payload;
        }
       
    }
});
// export const errorContent = createSlice({
//     name: 'errorContentSlice',
//     initialStateContent,
//     reducers: {
//         setErrorTexts: (state:IContent, action: PayloadAction<IContent>) => {
//             state = action.payload;
//         }
       
//     }
// });

export const {setErrorVisible} = errorVisible.actions;
export default errorVisible.reducer;
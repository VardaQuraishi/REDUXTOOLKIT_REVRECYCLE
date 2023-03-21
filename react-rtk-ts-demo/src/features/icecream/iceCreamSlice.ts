import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice';

type InitialState = {
    numOfIceCreams: number
}
const initialState: InitialState = {
    numOfIceCreams: 100,
}
const iceCreamSlice = createSlice({
    name: "iceCream",
    initialState,
    reducers: {
        ordered: (state)=>{
            state.numOfIceCreams--
        },
        restocked: (state, action: PayloadAction<number>)=>{
            state.numOfIceCreams += action.payload
        }
    },
    //free ice cream with every cake bought
    extraReducers: (builder) =>{
        builder.addCase(cakeOrdered, state => {
            state.numOfIceCreams--
        })

    }
})

export default iceCreamSlice.reducer
export const {ordered, restocked} = iceCreamSlice.actions


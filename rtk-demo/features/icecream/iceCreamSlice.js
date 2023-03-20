const { cakeActions } = require('../cake/cakeSlice');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfIceCreams: 100,
}
const iceCreamSlice = createSlice({
    name: "iceCream",
    initialState,
    reducers: {
        ordered: (state)=>{
            state.numOfIceCreams--
        },
        restocked: (state, action)=>{
            state.numOfIceCreams += action.payload
        }
    },
    //free ice cream with every cake bought
    extraReducers: (builder) =>{
        builder.addCase(cakeActions.ordered, state => {
            state.numOfIceCreams--
        })

    }
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions
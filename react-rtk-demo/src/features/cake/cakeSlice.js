import createSlice from '@reduxjs/toolkit'

const initialState = {
  numOfCakes: 10,
};
//createSlice automatically generates action creaters with same name as ordered and restocked
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const {ordered, restocked} = cakeSlice.actions

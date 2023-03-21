import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

// to read data from the redux store in the react component we use 
//useSelector hook(wrapper on store.getState())
export const CakeView = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes)
  const dispatch = useDispatch()
    return (
    <div>
      <h1>Number of Cakes - {numOfCakes}</h1>
      <button onClick={()=> dispatch(ordered())} >Order Cake</button>
      <button onClick={()=> dispatch(restocked(10))}>Restock Cake</button>
    </div>
  );
};

const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
console.log('from index.js');

//constant describing type of the action
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'; 
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';    

function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(quant = 1){
    return{
        type: CAKE_RESTOCKED,
        payload: quant
    }
}

function orderIcecream(){
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

function restockIcecream(quant = 1){
    return{
        type: ICECREAM_RESTOCKED,
        payload: quant
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 100
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 100
}
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action ) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
              ...state, //making a copy of the state object - spreading the state
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
             ...state, //making a copy of the state object 
                numOfCakes: state.numOfCakes + action.payload
            }
        case CAKE_ORDERED:
            return {
             ...state, //making a copy of the state object 
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action ) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
              ...state, //making a copy of the state object 
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
             ...state, //making a copy of the state object 
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger)); //store holding actual state
console.log('Initial state: ', store.getState());

//listener
const unsubscribe = store.subscribe(() => console.log('Update state: ', store.getState()));

//action
// store.dispatch(orderCake());
// store.dispatch(restockCake(10))

//binding actions
const actions = bindActionCreators({orderCake, restockCake,}, store.dispatch); //1st argument actions to be performed 2nd argument what we want to bind it to
actions.orderCake()
actions.restockCake(10)

unsubscribe();

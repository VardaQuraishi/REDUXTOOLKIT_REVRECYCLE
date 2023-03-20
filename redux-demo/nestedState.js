const redux = require('redux');
const createStore = redux.createStore
const produce = require('immer').produce

const initialState = {
    name: 'Varda',
    address: {
        street: 'Moscow',
        city: 'Moscow',
        country: 'Russia'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updatedStreet = (street) =>{
    return {
        type: STREET_UPDATED,
        payload:street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //   ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            //1st argument current state, 2nd argumnet funts that receives draft copy of state
            return produce(state, (draft)=>{
                draft.address.street = action.payload
            })
        default:
            return state
    }
}
const store = redux.createStore(reducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log('New state', store.getState())
})
store.dispatch(updatedStreet('Berlin'))
unsubscribe()
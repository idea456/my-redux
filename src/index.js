import {createStore} from "./createStore"

const INCREMENT = 'INCREMENT'

const initialState = {
    num: 0
}

function testReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                num: state.num + 1,
            }
        default:
            return state
    }
}

function logNum() {
    console.log('Incremented!')
}

const store = createStore(testReducer)
store.dispatch({
    type: INCREMENT
})
store.subscribe(logNum)
console.log(store.getState().num)



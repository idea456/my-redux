const createStore = require('./createStore')
const combineReducers = require('./combineReducers')

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

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

function minusReducer(state = initialState, action) {
    switch (action.type) {
        case DECREMENT:
            return {
                ...state, 
                num: state.num - 1,
            }
        default:
            return state
    }
}

function logNum() {
    console.log('Incremented!')
}

const rootReducer = combineReducers({
    add: testReducer,
    minus: minusReducer,
})

const store = createStore(rootReducer)
store.dispatch({
    type: INCREMENT
})
store.subscribe(logNum)
console.log(store.getState())

store.dispatch({
    type: DECREMENT
})

console.log(store.getState())



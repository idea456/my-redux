# My Redux state container
My own custom-made simple Redux implementation, which is just to learn Redux's source code functionality and implementation 🤯

# Usage

## createStore(reducer, enhancer)
Takes in a reducer (or root reducer, if you are implementing multiple reducers, in which case use `combineReducers` to combine the reducers into a single root reducer)
and creates a (single source of truth state) store in which the passed in reducer is used to transform old states into new states. An optional enhancer argument can be passed in as a store middleware to modify or perform some sort of action before the reducer is executed.

```
import createStore from './createStore'

const store = createStore(reducer)
```
To create an optional store enhancer, the enhancer must be a high-order function that accepts a next store creator, which in turn accepts an action. The enhancer will receive the `getState()` and `dispatch()` methods passed in as arguments.
```
function logger({ getState }) {
  return next => action => {
    console.log('Current state', getState())
    const ret = next(action)
    console.log('New state', getState())
    return ret
  }
}

const store = createStore(reducer, logger)
```
The created store will have the following methods:
### dispatch(action)
Dispatches an action to be performed to transform the state purely by returning a new state as specified by the reducer. The action must be an object type and has the `type` attribute specifying the action type to be performed.

### getState()
Returns the current state. If there are multiple reducers, returns an key-value object in which the keys represents the state names and the values are the current states for each particular reducer.

### subscribe(handler)
Subscribes a listener/handler, which is executed after the state has been reduced. Listeners/Handlers are functions which is executed after the store has finished dispatching.

### replaceReducer()
A helper function which replaces the current reducer.

## combineReducers(reducers)
Combines multiple reducers into a single root reducer which can be passed into the `createStore()` function. The `reducers` argument must be a key-value object, in which the keys identifies the state names and values are the reducer functions mapped to the state names.

```
const rootReducer = combineReducers({
  evenNum: evenReducer,
  oddNum: oddReducer,
  primeNum: primeReducer
})

const store = createStore(rootReducer)
```

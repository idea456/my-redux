/**
 * The store holds the application's state and also passes the dispatch() function to reduce the state to a new state.
 * Flow notation of the store based on documentation: https://redux.js.org/understanding/thinking-in-redux/glossary
    type Store = {
    dispatch: Dispatch
    getState: () => State
    subscribe: (listener: () => void) => () => void
    replaceReducer: (reducer: Reducer) => void
    }
 */

/**
 * createStore() function creates a new store that returns an object with several methods
 * @param reducer A function that takes in the previous state and action to reduce the current state into a new state
 * @param enhancer An enhancer is the store enhancer which is used to enhance the store with more functionalities. Examples of enhancers are middlewares
 */
export default function createStore(reducer, enhancer) {
    let currentState = undefined
    let dispatching = false
    let subscribers = []
    let storeReducer = reducer

    if (typeof reducer != 'undefined' && typeof reducer != 'function') {
        throw new Error("Expected reducer to be a function!")
    }

    if (typeof enhancer != 'undefined' && typeof enhancer != 'function') {
        throw new Error("Expected enhancer to be a function.")
    }


    function dispatch(action) {
        if (typeof action != 'object') {
            throw new Error("Expected action to be an object.")
        }

        try {
            dispatching = true
            // update the state in the store to the next state, which is returned by the reducer
            currentState = storeReducer(state, action)
        } finally {
            dispatching = false
        }
        // notify each subscriber after reducer has been executed
        subscribers.forEach(handler => handler())

        return action
    }

    function subscribe(handler) {
        if (typeof handler != 'undefined' && typeof handler != 'function') {
            throw new Error("Expected subscribe handler to be a function!")
        }

        subscribers.push(handler)
        return () => {
            const index = subscribers.indexOf(handler)
            subscribers.splice(index, 1)
        }
    }
    
    function getState() {
        return currentState
    }

    function replaceReducer(newReducer) {
        storeReducer = newReducer
    }

    return {
        dispatch,
        getState,
        subscribe,
        replaceReducer,
    }
}
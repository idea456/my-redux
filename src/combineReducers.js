
/**
 * 
 * @param {*} reducers 
 * @returns a reducer which invokes every reducer inside the reducers object passed in as argument
 */
function combineReducers(reducers) {
    // state is now a key-value object, where the value is the current state that is reduced by the reducer
    return (state = {}, action) => {
        let nextState = {}
        for (let stateKey of Object.keys(reducers)) {
            nextState[stateKey] = reducers[stateKey](state[stateKey], action);
        }
        return nextState;
    }
}

module.exports = combineReducers
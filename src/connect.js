import React from "react"

/**
 * Implementation of the high-order connect() function used in react-redux to connect the React Component to the Redux store
 * References taken from https://react-redux.js.org/api/connect and https://github.com/reduxjs/react-redux
 * 
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 * @returns 
 */
export const connect = (
    mapStateToProps = () => ({}), // mapStateToProps is expected to return an object, often referred to as stateProps
    mapDispatchToProps = () => ({})
    ) => Component => {
    class Connected extends React.Component {
        // mapStateToProps and mapDispatchToProps runs only when store state changes, or when the component's props has changed
        onStoreOrPropsChange(props) {
            // get the store from the context we passed in the Provider component
            const { store } = this.context;

            // 1st argument of mapStateToProps is the Redux store, obtained using store.getState()
            // 2nd argument is the optional ownProps, which is the component's own props which can be used if needed for the store
            const stateProps = mapStateToProps(store.getState(), props)
            const dispatchProps = mapDispatchToProps(store.dispatch, props)
            
            // Set the Component's state to the mapped store's state and dispatch methods
            // Also, React automatically re-renders if the store state changes OR the its own component props has changed!
            this.setState({
                ...stateProps,
                ...dispatchProps,
            })
        }

        componentWillMount() {
            const { store } = this.context;
            this.onStoreOrPropsChange(this.props)
            // add a listener which is called after an action is dispatched to the store
            // this will check if the store's state has changed, if it does this.setState() will re-render the component!
            this.unsubscribe = store.subscribe(() => this.onStoreOrPropsChange(this.props))
        }

        componentWillUnmount() {
            // unsubscribe the onStoreOrPropsChange listener
            this.unsubscribe()
        }

        componentWillReceiveProps(nextProps) {
            this.onStoreOrPropsChange(nextProps)
        }

        render() {
            return (
                // the spread operator on a component maps the key-value props object to the component
                // this is why mapStateToProps and mapDispatchToProps is expected to return a key-value object!
                <Component {...this.props} {...this.state} />
            )
        }
    }

    return Connected;
}
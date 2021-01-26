const totalReducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT_CART':
            return state + action.payload
        case 'DECREMENT_CART':
            return state - action.payload
        default:
            return state
    }
}
export default totalReducer
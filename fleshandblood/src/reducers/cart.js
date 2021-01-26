const initialCartState = {
    arr:[]
}

const cartReducer = (state = initialCartState, action) => {

    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                arr: [...state.arr,action.payload]
            }
        case 'REMOVE_FROM_CART':
            console.log('remove carte');
            return {
                ...state,
                arr: [
                    ...state.arr.slice(0, action.payload),
                    ...state.arr.slice(action.payload + 1)
                ],
            }
        case 'CHANGE_ORDER':
            return {
                ...state,
                arr: action.payload
            }
        default:
            return state
    }
}
export default cartReducer
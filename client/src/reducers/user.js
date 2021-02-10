const initialUserState = {
    arr:{}
}

const userReducer = (state = initialUserState, action) => {

    switch(action.type){
        case 'ADD_USER':
            return {
                ...state,
                arr: action.payload
            }
        case 'RESET_USER':
            return {arr:{}}
        default:
            return state
    }
}
export default userReducer
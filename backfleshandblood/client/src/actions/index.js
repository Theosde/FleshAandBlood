//========================================================================================================================================================
/* 
ACTIONS DEFINIENT ICI
*/
//========================================================================================================================================================

export const increment = (number) => {
    return{
        type:'INCREMENT',
        payload : number
    }
}
export const decrement = () => {
    return{
        type:'DECREMENT'
    }
}
export const resetCounter = () => {
    return{
        type:'RESET'
    }
}
export const signin = () => {
    return{
        type:'SIGN_IN'
    }
}
export const navigate = (activeNav) => {
    return{
        type:'NAVIGATE',
        payload : activeNav
    }
}
export const addToCart = (productToAdd) => {
    return{
        type:'ADD_TO_CART',
        payload : productToAdd
    }
}
export const removeFromCart = (productToRemove) => {
    return{
        type:'REMOVE_FROM_CART',
        payload : productToRemove
    }
}
export const addToTotal = (priceValueToAdd) => {
    return{
        type:'INCREMENT_CART',
        payload : priceValueToAdd
    }
}
export const removeFromTotal = (priceValueToRemove) => {
    return{
        type:'DECREMENT_CART',
        payload : priceValueToRemove
    }
}
export const resetTotal = () => {
    return{
        type:'RESET_CART',
    }
}
export const changeOrder = (orderData) => {
    return{
        type:'CHANGE_ORDER',
        payload : orderData
    }
}
export const addUser = (userdata) => {
    return{
        type:'ADD_USER',
        payload : userdata
    }
}
export const resetUser = () => {
    return{
        type:'RESET_USER',
    }
}
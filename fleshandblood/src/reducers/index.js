//========================================================================================================================================================
/* 
ALL REDUCERS HERE FOR A SINGLE IMPORT IN APP.JS
*/
//========================================================================================================================================================

import counterReducer from './counter';
import loggedReducer from './isLogged';
import cartReducer from './cart';
import totalReducer from './totalCart';
import userReducer from './user';

import {combineReducers} from 'redux';



const AllReducers = combineReducers({
    counter:counterReducer,
    isLogged : loggedReducer,
    cart: cartReducer,
    totalCart:totalReducer,
    user:userReducer
})

export default AllReducers
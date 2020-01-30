import { combineReducers } from 'redux';
//root reducer to combine all reducer
import {cartReducer} from './cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer
});
export default rootReducer;
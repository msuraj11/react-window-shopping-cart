import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'; //for this it will take index.js from reducers folder automatically


const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
//Middleware is used to connect action and reducers
export default configureStore;
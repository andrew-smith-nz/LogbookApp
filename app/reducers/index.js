import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';
import { updateTitle, navReducer } from './navigation';
import { ping } from './connection'

const rootReducer = combineReducers({
    login,
    isLoggingIn,
    updateTitle,
    navReducer,
    ping
});

export default rootReducer; 
import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';
import { updateTitle } from './navigation';

const rootReducer = combineReducers({
    login,
    isLoggingIn,
    updateTitle
});

export default rootReducer; 
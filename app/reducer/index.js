import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';
import { updateTitle } from './navigation';

export default combineReducers({
    login,
    isLoggingIn,
    updateTitle
});
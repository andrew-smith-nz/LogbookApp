import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';

export default combineReducers({
    login,
    isLoggingIn
});
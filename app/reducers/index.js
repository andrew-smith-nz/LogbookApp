import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';
import { updateTitle, navReducer } from './navigation';
import { ping } from './connection'
import { loadEntries, updateSyncProgress } from './data'

const rootReducer = combineReducers({
    login,
    isLoggingIn,
    updateTitle,
    navReducer,
    ping,
    loadEntries,
    updateSyncProgress,
});

export default rootReducer; 
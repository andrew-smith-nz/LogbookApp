import { combineReducers } from 'redux';
import { login, isLoggingIn } from './user';
import { navReducer } from './navigation';
import { ping } from './connection'
import { loadEntries, updateSyncProgress, loadActivities, loadLogbooks, loadFields, loadFieldOptions } from './data'

const rootReducer = combineReducers({
    login,
    isLoggingIn,
    navReducer,
    ping,
    loadEntries,
    updateSyncProgress,
    loadActivities,
    loadLogbooks,
    loadFields,
    loadFieldOptions,
});

export default rootReducer; 
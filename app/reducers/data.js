import Reactotron from 'reactotron-react-native';

export function loadEntries(state = { logbookEntries: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_ENTRIES':
            return { logbookEntries: action.entries, syncProgress: 50 }
        default:
            return state;
    }
}

export function loadActivities(state = { activities: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_ACTIVITIES':
            return { activities: action.activities }
        default:
            return state;
    }
}

export function loadLogbooks(state = { logbooks: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_LOGBOOKS':
            return { logbooks: action.logbooks }
        default:
            return state;
    }
}

export function loadFields(state = { fields: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_FIELDS':
            return { fields: action.fields }
        default:
            return state;
    }
}

export function loadFieldOptions(state = { fieldOptions: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_FIELDOPTIONS':
            return { fieldOptions: action.fieldOptions }
        default:
            return state;
    }
}


export function updateSyncProgress(state = 0, action)
{
    if (action.type == "UPDATE_SYNC_PROGRESS")
        return { syncProgress: action.syncProgress }
    else
        return state;
}
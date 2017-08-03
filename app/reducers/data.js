import Reactotron from 'reactotron-react-native';

export function loadEntries(state = { logbookEntries: [] }, action)
{
    switch (action.type)
    {
        case 'LOAD_ENTRIES':
            return { logbookEntries: action.entries }
        case 'CREATE_ENTRY':
        {
            let entries = state.logbookEntries;
            entries.push(action.entry);
            return { 
                logbookEntries: entries
            }
        }
         case 'UPDATE_ENTRY':
        {
            let entries = state.logbookEntries;
            let newEntries = [];
            for (i = 0; i < entries.length; i++)
                {
                    if (entries[i].logbookEntryId === action.entry.logbookEntryId)
                        newEntries.push(action.entry);
                    else
                        newEntries.push(entries[i]);
                }
            return { 
                logbookEntries: newEntries
            }
        }
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
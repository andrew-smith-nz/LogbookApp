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

export function updateSyncProgress(state = 0, action)
{
    if (action.type == "UPDATE_SYNC_PROGRESS")
        return { syncProgress: action.syncProgress }
    else
        return state;
}
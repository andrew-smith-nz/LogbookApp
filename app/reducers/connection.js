export function ping (state = false, action){
    switch(action.type)
    {
        case 'PING_SUCCESS':
            return { connectionStatus: true };
        case 'PING_FAILURE':
            return { connectionStatus: false };
        default:
            return state;
    }
}
export function login (state = 0, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { loggedIn: true, userId: action.userId };
    case 'LOGIN_FAILURE':
        return { loggedIn: false, userId:'none', loginError:'An error occurred while logging in' };
    case 'LOGOUT':
        return { loggedIn: false, userId:'' };
    default:
        return state;
  }
}

export function isLoggingIn (state = false, action) {
    console.log('reducer, loggingIn = ' + action.loggingIn + ', type = ' + action.type);
    if (state) console.log('current state loggingIn = ' + state.loggingIn);
    switch (action.type) {
        case 'IS_LOGGING_IN':
            return { loggingIn: action.loggingIn };
        default:
            return state;
    }
}
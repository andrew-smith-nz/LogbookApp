export function login (state = { userId:'' }, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { userId: action.userId };
    case 'LOGIN_FAILURE':
        return { userId:'none', loginError:'An error occurred while logging in' };
    case 'LOGOUT':
        return { userId:'' };
    default:
        return state;
  }
}

export function isLoggingIn (state = false, action) {
    switch (action.type) {
        case 'IS_LOGGING_IN':
            return { loggingIn: action.loggingIn };
        default:
            return state;
    }
}
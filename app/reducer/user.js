export function login (state = 0, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { loggedIn: true, userId: action.userId };
    case 'LOGIN_FAILURE':
        return { loggedIn: false, userId:'', loginError:'An error occurred while logging in' };
    case 'LOGOUT':
        return { loggedIn: false, userId:'' };
    default:
        return state;
  }
}

export function isLoggingIn (state = false, action) {
    switch (action.type) {
        case 'IS_LOGGING_IN':
            return action.isLoggingIn;

        default:
            return state;
    }
}
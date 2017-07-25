export function loginResult(bool, userId) {
    if (bool)
        return {
            type: 'LOGIN_SUCCESS',
            userId: userId
        };
    else
        return {
            type: 'LOGIN_FAILURE'
        };
}

export function isLoggingIn(isLoggingIn) {
    return {
        type: 'IS_LOGGING_IN',
        isLoggingIn
    };
}

export function tryLogin(email, password) {
    return (dispatch) => {
        dispatch(isLoggingIn(true));
         var url = 'http://www.theoutdoorlogbook.com/api/login/';
          var result = fetch(url, {
              method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password })
          })
        .then((response) => { return response.json() })
        .then((responseData) => { // responseData = undefined
            dispatch(loginResult(responseData ? true : false, responseData));
        });
    }
}
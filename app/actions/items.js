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

export function onLoggingIn(loggingIn) {
    return {
        type: 'IS_LOGGING_IN',
        loggingIn: loggingIn
    };
}

export function tryLogin(email, password) {
    return (dispatch) => {
        dispatch(onLoggingIn(true));
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
        .then((responseData) => { 
            dispatch(onLoggingIn(false));
            dispatch(loginResult(responseData ? true : false, responseData));
            if (responseData)
                {
                    dispatch(NavigateTo('Home'));
                }
        }); 
    }
}

export function updateTitle(title) {
    return {
        type: 'UPDATE_TITLE',
        title
    };
}

export function NavigateTo(routeName) {
    return {
        type: 'NAVIGATE_TO',
        routeName
    };
}

export function pingResult(result) {
    return {
                type: result ? 'PING_SUCCESS' : 'PING_FAILURE'
            }
}

export function ping(){
    return (dispatch) => {
        var url = 'http://www.theoutdoorlogbook.com/api/ping/';
        return fetch(url)
            .then(function(data) { return true; }, function(error) {return false;})
            .then(function(result)
            {
                dispatch(pingResult(result));
            });    
    }
}
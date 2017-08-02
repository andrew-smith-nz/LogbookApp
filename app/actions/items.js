import Reactotron from 'reactotron-react-native'

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

export function NavigateTo(routeName) {
    return {
        type: 'NAVIGATE_TO',
        routeName
    };
}

export function pingResult(result) {
    return {
                type: result ? 'PING_SUCCESS' : 'PING_FAILURE'
            };
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

export function updateSyncProgress(syncProgress){
    return {
                type: 'UPDATE_SYNC_PROGRESS',
                syncProgress
            };
}

export function getEntries(userId){
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getentries/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadEntries(actualData));
              dispatch(updateSyncProgress(50));
           }.bind(this))
           .catch(function(error) {
               // If there is any error you will catch them here
           });
    }
}

export function loadEntries(entries){
    return {
                type: 'LOAD_ENTRIES',
                entries
            };
}

export function getActivities(userId)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/activities/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadActivities(actualData));
           }.bind(this))
           .catch(function(error) {
               // If there is any error you will catch them here
           });
    }
}

export function loadActivities(activities){
    return {
                type: 'LOAD_ACTIVITIES',
                activities
            };
}

export function getLogbooks(userId)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/logbooks/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadLogbooks(actualData));
           }.bind(this))
           .catch(function(error) {
               // If there is any error you will catch them here
           });
    }
}

export function loadLogbooks(logbooks){
    return {
                type: 'LOAD_LOGBOOKS',
                logbooks
            };
}
        

export function getFields(userId)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getFields/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadFields(actualData));
           }.bind(this))
           .catch(function(error) {
               // If there is any error you will catch them here
           });
    }
}

export function loadFields(fields){
    return {
                type: 'LOAD_FIELDS',
                fields
            };
}
        

export function getFieldOptions(userId)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getFieldOptions/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadFieldOptions(actualData));
           }.bind(this))
           .catch(function(error) {
               // If there is any error you will catch them here
           });
    }
}

export function loadFieldOptions(fieldOptions){
    return {
                type: 'LOAD_FIELDOPTIONS',
                fieldOptions
            };
}
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

export function getEntries(userId, progressCallback){
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getentries/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadEntries(actualData));
              progressCallback();
           }.bind(this))
           .catch(function(error) {
                Reactotron.log("Error in getEntries:");
                Reactotron.log(error);
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

export function getActivities(userId, progressCallback)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/activities/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadActivities(actualData));
              progressCallback();
           }.bind(this))
           .catch(function(error) {
                Reactotron.log("Error in getActivities:");
                Reactotron.log(error);
           });
    }
}

export function loadActivities(activities){
    return {
                type: 'LOAD_ACTIVITIES',
                activities
            };
}

export function getLogbooks(userId, progressCallback)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/logbooks/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadLogbooks(actualData));
              progressCallback();
           }.bind(this))
           .catch(function(error) {
                Reactotron.log("Error in getLogbooks:");
                Reactotron.log(error);
           });
    }
}

export function loadLogbooks(logbooks){
    return {
                type: 'LOAD_LOGBOOKS',
                logbooks
            };
}
        

export function getFields(userId, progressCallback)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getFields/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadFields(actualData));
              progressCallback();
           }.bind(this))
           .catch(function(error) {
                Reactotron.log("Error in getFields:");
                Reactotron.log(error);
           });
    }
}

export function loadFields(fields){
    return {
                type: 'LOAD_FIELDS',
                fields
            };
}
        

export function getFieldOptions(userId, progressCallback)
{
    return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/getFieldOptions/' + userId;
       fetch(url)
           .then(function(data) { return data.json(); })
           .then(function(actualData) {
              dispatch(loadFieldOptions(actualData));
              progressCallback();
           }.bind(this))
           .catch(function(error) {
                Reactotron.log("Error in getFieldOptions:");
                Reactotron.log(error);
           });
    }
}

export function loadFieldOptions(fieldOptions){
    return {
                type: 'LOAD_FIELDOPTIONS',
                fieldOptions
            };
}

export function createEntry(entry)
{
    return {
                type: 'CREATE_ENTRY',
                entry
            };
}

export function updateEntry(entry)
{
    return {
                type: 'UPDATE_ENTRY',
                entry
            };
}

export function deleteEntry(entry)
{
    return {
                type: 'DELETE_ENTRY',
                entry
            };
}

export function megaSync(userId, entries, logbooks, callback)
{
     return (dispatch) => {
    var url = 'http://www.theoutdoorlogbook.com/api/Upload/' + userId;
     return fetch(url, {
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({entries: entries.filter(e => e.syncStatus !== "SYNCED"), logbooks: logbooks.filter(l => l.syncStatus !== "SYNCED")})
      }).then(function(response) {
          return response.json();
      }).then(function(data) {
          if (data.ok)
            {
                dispatch(loadLogbooks(data.logbooks));
                dispatch(loadEntries(data.entries));
                dispatch(loadActivities(data.activities));
                dispatch(loadFields(data.fields));
                dispatch(loadFieldOptions(data.fieldOptions));
            }
            callback(data);
      })
      .catch(function(error) {
                Reactotron.log("Error in megaSync:");
                Reactotron.log(error);
            });
    }
}
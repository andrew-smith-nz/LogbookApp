import { AppNavigator } from '../navigator/appNavigator';
import { NavigationActions } from 'react-navigation';

export function updateTitle (state = '', action) {
  switch (action.type) {
    case 'UPDATE_TITLE':
        return { title: action.title };
    default:
        return state;
  }
}

export function navReducer(state, action) {
    console.log(action);
  let nextState = AppNavigator.router.getStateForAction(action, state);
  switch(action.type)
  {
    case 'NAVIGATE_TO':
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: action.routeName }),
            state
        ); 
        break;  
    default:
        nextState = AppNavigator.router.getStateForAction(action, state);
        break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
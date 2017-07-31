import { AppNavigator } from '../navigator/appNavigator';
import { NavigationActions } from 'react-navigation';

export function navReducer(state, action) {
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
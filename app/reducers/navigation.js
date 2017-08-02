import { AppNavigator } from '../navigator/appNavigator';
import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native'

export function navReducer(state, action) {
  let nextState = AppNavigator.router.getStateForAction(action, state);
  switch(action.type)
  {
    case 'NAVIGATE_TO':
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: action.routeName, params: action.props} ),
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
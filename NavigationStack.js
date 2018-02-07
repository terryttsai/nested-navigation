import React from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation'
import {
  StreetCleaningScreen,
  WalkthroughScreen,
  ReceiptScreen,
  HomeScreen,
  DetailsScreen,
  ModalScreen
} from './Screens';

const EndRideStack = StackNavigator(
  {
    StreetCleaning: {
      screen: StreetCleaningScreen,
    },
    Walkthrough: {
      screen: WalkthroughScreen
    },
    Receipt: {
      screen: ReceiptScreen
    }
  },
  {
    initialRouteName: 'StreetCleaning'
  }
);

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    },
    EndRide: {
      screen: ({ navigation }) => <EndRideStack screenProps={{ rootNavigation: navigation }} />
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

export const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  }
);

// this is super critical for everything playing nice with Redux
// did you read the React-Navigation docs and recall when it said
// most people don't hook it up correctly? well, yours is now correct.
// this is translating your state properly into Redux on initialization    
const INITIAL_STATE = RootStack.router.getStateForAction(NavigationActions.init())

// this is pretty much a standard reducer, but it looks fancy
// all it cares about is "did the navigation stack change?"    
// if yes => update the stack
// if no => pass current stack through
export default (state = INITIAL_STATE, action) => {
  const nextState = RootStack.router.getStateForAction(action, state)

  return nextState || state
}

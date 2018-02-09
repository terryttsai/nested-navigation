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

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    },
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
    initialRouteName: 'Home',
    // headerMode: 'none',
  }
);

const prevGetStateForActionMainStack = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'RemoveRouteFromStack') {
    const routesCopy = state.routes.slice();
    routesCopy.splice(routesCopy.findIndex(r => r.routeName === action.routeName), 1);
    return {
      ...state,
      routesCopy,
      index: routesCopy.length - 1
    }
    return null;
  }
  return prevGetStateForActionMainStack(action, state);
}

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

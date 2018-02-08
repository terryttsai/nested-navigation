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

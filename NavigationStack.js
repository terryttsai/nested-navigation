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
      screen: ({ navigation }) => <EndRideStack screenProps={{ parentNavigation: navigation }} />
    },
    Receipt: {
      screen: ReceiptScreen
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

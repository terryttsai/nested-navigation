import React from 'react';
import { BackHandler, Button, View, Text } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.props.navigation.state.key = 'HomeKey';
  }

  componentDidMount() {
    this._s0 = this.props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    });
    this._s2 = this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    });
  }

  componentWillUnmount() {
    this._s0.remove();
    this._s2.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen {JSON.stringify(this.props.navigation.state)}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details', {
            itemId: 100
          })}
        />
        <Button
          title="Go to Modal"
          onPress={() => this.props.navigation.navigate('MyModal')}
        />
        <Button
          title="Go to End Ride"
          onPress={() => this.props.navigation.navigate('StreetCleaning')}
        />
      </View>
    );
  }
}

export class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const itemId = params ? params.itemId : null;
    return {
      title: `Details itemId: ${itemId}`,
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen itemId: {itemId}</Text>
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ itemId: '200' })}
        />
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

export class StreetCleaningScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Street Cleaning'
    }
  };
  constructor(props) {
    super(props);
    this.props.navigation.state.key = 'StreetCleaning';
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Enter street cleaning {JSON.stringify(this.props.navigation.state)}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Walkthrough')}
          title="Next"
        />
      </View>
    );
  }
}

export class WalkthroughScreen extends React.Component {
  static navigationOptions = {
    title: 'End Your Ride',
  };
  render() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'Receipt' })
      ]
    });
    const createAction = (type, fn) => {
      fn.toString = () => type;
      return fn;
    };
    const customAction = createAction('RemoveRouteFromStack', (payload = {}) => ({
      type: 'RemoveRouteFromStack',
      routeName: payload.routeName
    }));
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Walkthrough checklist {JSON.stringify(this.props.navigation.state)}</Text>
        <Button
          onPress={() => this.props.navigation.dispatch(customAction({ routeName: 'StreetCleaning'}))}
          // onPress={() => this.props.navigation.navigate({ routeName: 'Receipt', key: 'asdf' })}
          // onPress={() => this.props.navigation.navigate({ routeName: 'Home', key: 'HomeKey' })}
          title="Remove Street Cleaning from stack"
        />
        <Button
          onPress={() => this.props.navigation.dispatch(resetAction)}
          // onPress={() => this.props.navigation.navigate({ routeName: 'Receipt', key: 'asdf' })}
          // onPress={() => this.props.navigation.navigate({ routeName: 'Home', key: 'HomeKey' })}
          title="Next"
        />
      </View>
    );
  }
}

export class ReceiptScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipt',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Your ride has ended  {JSON.stringify(this.props.navigation.state)}</Text>
        <Button
          onPress={() => this.props.navigation.pop()}
          title="End"
        />
      </View>
    );
  }
}

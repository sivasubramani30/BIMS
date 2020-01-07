import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

export default class Home extends React.Component {

  constructor(props) {
   super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
                        onPress={ ()=> {this.props.navigation.navigate('Test')}}
                        title={this.props.title}
                        color="#009933"
                    />
      </View>
    );
  }
}

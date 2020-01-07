import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, Alert, AsyncStorage } from 'react-native';

export default class logout extends Component {


  constructor(props)
  {
      super(props)

      this.state ={
        finish: false
      }


      this._loadData()
  }

  async _loadData ()
  {
      try
      {
          await AsyncStorage.setItem('validUser','');
          this.props.navigation.navigate('Home')
          this.setState({finish:true})

      } catch (error) {
            //Alert.alert('Test Me '+error)
      }
  };


  render()
  {

    if(this.state.finish== false)
    {
      return(
            <View><Text style={{color: '#000000'}}></Text></View>
        )
    }
    else {
      {

        return(
              <View></View>
          )
      }
    }
  }

}

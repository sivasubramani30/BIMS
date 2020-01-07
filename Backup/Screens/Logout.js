import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, AsyncStorage } from 'react-native';

export default class Logout extends React.Component {

	
  constructor(props)
  {
      super(props)
      this.state = {
        text:'',
        password: '',
        load: true
      }
      this._loadData()
  }


  render() 
  {
    return(
          <View><Text style={{color: '#000000'}}>ARUN</Text></View>
      )
  }

}





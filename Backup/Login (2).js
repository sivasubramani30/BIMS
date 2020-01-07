import React, { Component } from 'react';

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,Alert
} from 'react-native';



export default class Login extends Component {

  
constructor(props) {
 
    super(props)
    this.state = {
 
      TextInputName: '',
      TextInputPwd: ''
    }
  }

CheckTextInput = () => {
    
    if (this.state.TextInputName != '') {
      if (this.state.TextInputPwd != '') {
        //Checking with DB
 
      fetch('https://pm.spectacularsys.com/Android_App/src/User_Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
      username: this.state.TextInputName,
      password: this.state.TextInputPwd
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
 
        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {
            this.props.navigation.navigate('Profile')
         }
        else{
 
          alert(responseJson);
        }
 
      }).catch((error) => {
        console.error(error);
      });
 

        //End Checking With DB

     } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter Username');
    }
  };

  render() {
const { navigate } = this.props.navigation
let pic = {
      uri: 'https://pm.spectacularsys.com/Android_App/images/tulassi.png'
    };
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor="#442C2E"
        barStyle="light-content"
        />
 <Image source={pic} style={{width: 193, height: 110}}/>
   
   
    <TextInput 
            style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='Username' 
            onChangeText={TextInputName => this.setState({ TextInputName })}

    />
    <TextInput 
            style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='Password' 
            secureTextEntry={true}
            onChangeText={TextInputPwd => this.setState({ TextInputPwd })}
    />
    <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={this.CheckTextInput}>Login</Text>
    </TouchableOpacity>

    <Text style={{color:"#000000"}}>© Tulasi Technologies</Text>
      </View>
     
    );
  
}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#FEDBD0',
    alignItems:'center',
    flex:1,
    justifyContent:'center'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical:10
  },
  buttonText: {
    fontWeight:'500',
    fontSize:18,
    color:'#000000',
    textAlign:'center'
    
  },
  button:{
    backgroundColor:'#ef9a9a',
    borderRadius:25,
    marginVertical:10,
    width:300,
    paddingVertical:12
  }
});

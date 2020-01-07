import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {

	
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

  async _loadData () {
      try 
      {
        const value = await AsyncStorage.getItem('validUser');
        if (value !== null) {
         
          if(value == '')
          {
            this.setState({load:false})
          } 
          else
          {
          this.props.navigation.navigate('Dashboard', {
                  itemId: 86,
                  otherParam: value})

          }
        }
        else
        {
          this.setState({load:false})
        }
      } catch (error) {
        this.setState({load:false})
      }
    };

  CheckTextInput = async() => {

  	let user = this.state.text
  	console.log( 'Test'+user)
    
    if (this.state.text != '') {
      if (this.state.password != '') {
        //Checking with DB
 
      fetch('https://pm.spectacularsys.com/Android_App/src/User_Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
      username: this.state.text,
      password: this.state.password
  })
 
}).then((response) => response.json())
      .then( async (responseJson) => {
 
        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {
            //this.props.navigation.navigate('Profile')
            await AsyncStorage.setItem('validUser',''+user);
            this.props.navigation.navigate('Dashboard', {
                itemId: 86,
                otherParam: this.state.text})
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
  render() 
  {
	let pic = {
      uri: 'https://pm.spectacularsys.com/Android_App/images/tulassi.png'
    };

    if(this.state.load== true)

    {
      return (
            <View></View>
        )
    }

    return (
     <View style={styles.container}>
        <StatusBar
        backgroundColor="#442C2E"
        barStyle="light-content"
        />
        <Image source={pic} style={{width: 193, height: 110}}/>

      <TextInput
       style={styles.inputBox} 
        placeholder="UserName"
        onChangeText={text => this.setState({text})}
        
      />

      <TextInput
       style={styles.inputBox} 
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={password => this.setState({password})}
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
    backgroundColor:'#4dd0e1',
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
    backgroundColor:'#009faf',
    borderRadius:25,
    marginVertical:10,
    width:300,
    paddingVertical:12
  },
 
MainContainer :{
 
// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 10
 
}
 
});


import React,{Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Alert, Image, AsyncStorage } from 'react-native';

export default class HomeScreen extends Component {


  constructor()
  {
      super()
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
        const pwd = await AsyncStorage.getItem('validPwd');

        if (value !== null) {

          if(value == '')
          {
            this.setState({load:false})
          }
          else
          {
            this.setState({load:false})
	          this.props.navigation.navigate('Dashboard')
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

  async CheckTextInput() {

  	let user = this.state.text;
    let pwd = this.state.password;
  if (this.state.text != '')
  {
      if (this.state.password != '')
  {
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
            .then(async (responseJson) => {
             if(responseJson === 'Data Matched')
              {
                  await AsyncStorage.setItem('validUser',''+user);await AsyncStorage.setItem('validPwd',''+pwd);
      						this.setState({text: '',password:''})
                  this.props.navigation.navigate('Dashboard')
              }
              else
      				{
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
  <ImageBackground
        source={require('D:/Android_App/BIMS/images/wbg.png')}
        style={styles.backgroundImage}>
     <View style={styles.container}>
        <StatusBar
        backgroundColor="#442C2E"
        barStyle="light-content"
        />
        
        
    
        <Image source={pic} style={{width: 193, height: 110}}/>

      <TextInput
        style={styles.inputBox}
        placeholder="UserName"
        value= {this.state.text}
        onChangeText={text => this.setState({text})}

      />

      <TextInput
       style={styles.inputBox}
        placeholder="Password"
        secureTextEntry={true}
        value= {this.state.password}
        onChangeText={password => this.setState({password})}
      />


        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={ ()=> this.CheckTextInput()}>Login</Text>
    		</TouchableOpacity>
       		<Text style={{color:"#000000"}}>© Tulasi Technologies</Text>

      </View>
</ImageBackground>      
    );
  }
}



const styles = StyleSheet.create({
	container : {
    alignItems:'center',
    flex:1,
    justifyContent:'center'
  },
backgroundImage:{
    flex : 1,
    width : '100%'
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
    backgroundColor:'#bdb9b7',
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

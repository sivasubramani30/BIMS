import React from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, TouchableOpacity, 
  StatusBar, ImageBackground, Picker,Platform, ActivityIndicator,AsyncStorage } from 'react-native';

 let validUser;

export default class DailyEntry extends React.Component {

  constructor(props)
  {
      super(props)

      this.state = {
        isLoading: true,
        PickerValueHolder : '',
        flockarray: [],
        feedarray: []
      }

      this._loadData()
  }

  async _loadData() {
      validUser = await AsyncStorage.getItem('validUser');
  }
   componentDidMount() {
   
      //Checking with DB
 
      fetch('https://pm.spectacularsys.com/Android_App/src/GetData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db_name: 'duhokpoultry_test'
      })
 
}).then((response) => response.text())
      .then((responseJson) => { 
          var temp=[]
          var array= JSON.parse(responseJson)
          for(var i=0;i<array.length;i++)
          {
              temp.push(array[i].flockcode)
              this.setState({
              isLoading: false,
              flockarray: temp
              });
          }
          
        }).catch((error) => {
        console.error(error);
      });

        //For Feed
        fetch('https://pm.spectacularsys.com/Android_App/src/GetFeedData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db_name: 'duhokpoultry_test'
      })
 
}).then((response) => response.text())
      .then((responseJson) => { 
          var temp=[]
          var array= JSON.parse(responseJson)
          for(var i=0;i<array.length;i++)
          {
              temp.push(array[i].description)
              this.setState({
              feedarray: temp
              });
          }
          
        }).catch((error) => {
        console.error(error);
      });
 
        //End Checking With DB

        
    }
 

  CheckTextInput = () => 
  {
    
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
      .then((responseJson) => {
       if(responseJson === 'Data Matched')
        {
            //this.props.navigation.navigate('Profile')
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

  flocklist = () =>{
        return( this.state.flockarray.map( (x,i) => { 
              return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }
  feedlist = () =>{
        return( this.state.feedarray.map( (x,i) => { 
              return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }
  

  render() {
    const {state} = this.props.navigation;
 if (this.state.isLoading) {
     return (
      <ImageBackground
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //We are using online image to set background
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg',
        }}  >
       <View style={{flex: 1, paddingTop: 20, justifyContent: 'center'}}>
         <ActivityIndicator size="large" color="#0000ff" />
       </View>
       </ImageBackground>
     );
   }

    return (
      <ImageBackground
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //We are using online image to set background
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg',
        }}  >

         <Text style={{fontWeight: 'bold',textAlign:'center',fontSize:20}}>{validUser} Daily Entry Screen</Text>
         <ScrollView>
         <View style={styles.root}>
          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Flock</Text>
       
            <Picker style={{flex:1,justifyContent: 'center'}}
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                { this.flocklist() }
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Date</Text>
       
            <TextInput
           style={styles.inputBox}            
            onChangeText={date => this.setState({date})}
          />
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Age</Text>
       
            <TextInput
           style={styles.inputBox}            
            onChangeText={age => this.setState({age})}
          />
          </View>

          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Mort</Text>
       
            <TextInput
           style={styles.inputBox}            
            onChangeText={mort => this.setState({mort})}
          />
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Cull</Text>
       
            <TextInput
           style={styles.inputBox}            
            onChangeText={cull => this.setState({cull})}
          />
          </View>

          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Feed</Text>
       
            <Picker style={{flex:1}}
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                { this.feedlist() }
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Kgs</Text>
       
            <TextInput
           style={styles.inputBox}            
            onChangeText={kgs => this.setState({kgs})}
          />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={this.CheckTextInput}>Submit</Text>
        </TouchableOpacity>
         

      
      </View>
      </ScrollView>
      </ImageBackground>
      
    );
  }
}

 
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column"
  },
  container : {
    flex: 1 ,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  inputBox: {
    width:200,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:15,
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
  }
 
});
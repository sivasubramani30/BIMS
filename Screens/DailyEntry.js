import React from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, TouchableOpacity,StatusBar, ImageBackground, Picker,Platform, ActivityIndicator,AsyncStorage } from 'react-native';

 let validUser,validPwd;

export default class DailyEntry extends React.Component {

  constructor(props)
  {
      super(props);

      this.state = {
        isLoading: true,
        PickerValueHolder : '',
        PickerValueHolderA : '',
        flockarray: [],
        feedarray: [],
        date:'',
        age:'',
        mort:'',
        cull:'',
        kgs:''
      }
      this._loadData();
  }

  async _loadData() {
      validUser = await AsyncStorage.getItem('validUser');
      validPwd = await AsyncStorage.getItem('validPwd');
      this.setState({username: validUser})
  }
  async componentDidMount() {
    validUser = await AsyncStorage.getItem('validUser');
    validPwd = await AsyncStorage.getItem('validPwd');
      fetch('https://pm.spectacularsys.com/Android_App/src/GetData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: validUser,
        Pwd: validPwd,
        Type: 'flock'
      })

      }).then((response) => response.text())
      .then((responseJson) => {
          var temp=[]
          if(responseJson == '' || responseJson == 'undefined'){
            this.setState({
              isLoading: false,
              });
            alert('No Database Selected');
          }else{
          var array= JSON.parse(responseJson)
          for(var i=0;i<array.length;i++)
          {
              temp.push(array[i].flockcode)
              this.setState({
              isLoading: false,
              flockarray: temp
              });
          }
        }
        }).catch((error) => {
        console.error(error);
      });

        //For Feed
        fetch('https://pm.spectacularsys.com/Android_App/src/GetData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: validUser,
        Pwd: validPwd,
        Type: 'feed'
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
    }


   async CheckTextInput() {

        let flock = this.state.PickerValueHolder
        let date = this.state.date
        let age = this.state.age
        
        if (flock == '')
        {
            alert('Please Select Flock');
        } else if(date == ''){
            alert('Date Field Should not be Empty');
        }else if(age == ''){
            alert('Age Field Should not be Empty');
        }

        let collection = {}
        collection.flock=this.state.PickerValueHolder,
        collection.date=this.state.date,
        collection.age=this.state.age,
        collection.mort=this.state.mort,
        collection.cull=this.state.cull,
        collection.feed=this.state.PickerValueHolderA,
        collection.kgs=this.state.kgs

        //console.warn(collection);

        fetch('https://pm.spectacularsys.com/Android_App/src/SaveData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection)

      }).then((response) => response.text())
      .then((responseJson) => {
        alert(responseJson);
         if(responseJson == 1){
          alert('Data Saved Successfully');
          this.props.navigation.navigate('Dashboard');
        }
        else
          alert('Data Not Saved Successfully');
        
        }).catch((error) => {
        console.error(error);
      });

        
    };



  flocklist = () =>{
        return( this.state.flockarray.map( (x,i) => {
          var alldata = x.split('@'); var val = alldata[0];
              return( <Picker.Item label={val} key={i} value={x}  />)} ));
  }
  feedlist = () =>{
        return( this.state.feedarray.map( (x,i) => {
              return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }

  pickFunction = (itemValue,itemIndex) => {
    this.setState({PickerValueHolder : itemValue});
    var alldatan = itemValue.split('@'); 

    this.setState({date: alldatan[1]});
    this.setState({age: alldatan[2]});

  }
  render()
  {

     if (this.state.isLoading)
     {
         return (
          <ImageBackground
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            //We are using local image to set background
            source={require('D:/Android_App/BIMS/images/wbg.png')}  >
           <View style={{flex: 1, paddingTop: 20, justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff" />
           </View>
           </ImageBackground>
         );
     }

    return (
      <ImageBackground
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        source={require('D:/Android_App/BIMS/images/wbg.png')}  >

         
         <ScrollView>
         <View style={styles.root}>
          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Flock{"     "}</Text>

            <Picker style={{flex:1,justifyContent: 'center'}}
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="-Select-" value="" />
                { this.flocklist() }
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Date{"     "}</Text>

            <TextInput
           style={styles.inputBox} editable = {false}
            onChangeText={date => this.setState({date})}
            value={this.state.date}
          />
          </View>
          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Age{"     "}</Text>

            <TextInput
           style={styles.inputBox} editable = {false}
            onChangeText={age => this.setState({age})}
            value={this.state.age}
          />
          </View>

          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Mort{"     "}</Text>

            <TextInput
           style={styles.inputBox}
            onChangeText={mort => this.setState({mort})}
            keyboardType={'numeric'}
          />
          </View>
          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Cull{"     "}</Text>

            <TextInput
           style={styles.inputBox}
            onChangeText={cull => this.setState({cull})}
            keyboardType={'numeric'}
          />
          </View>

          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Feed{"     "}</Text>

            <Picker style={{flex:1}}
              selectedValue={this.state.PickerValueHolderA}
              onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolderA: itemValue})} >
              <Picker.Item label="-Select-" value="" />
                { this.feedlist() }
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={{fontFamily: 'sans-serif-medium',fontSize: 18}}>Kgs{"     "}</Text>

            <TextInput
            style={styles.inputBox}
            onChangeText={kgs => this.setState({kgs})}
            keyboardType={'numeric'}
          />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={ ()=> this.CheckTextInput()}>Submit</Text>
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
    width:250,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:15,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical:10
  },
  buttonText: {
    fontWeight:'500',
    fontSize:22,
    color:'#000000',
    textAlign:'center'

  },
  button:{
    backgroundColor:'#bdb9b7',
    borderRadius:25,
    marginVertical:10,
    width:300,
    paddingVertical:12
  }

});


//<Text style={{fontWeight: 'bold',textAlign:'center',fontSize:20}}>{validUser} Daily Entry Screen</Text>
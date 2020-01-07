import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Picker, Text, ImageBackground, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

let validUser,validPwd;

export default class DailyEntryDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      PickerValueHolder : '',
      farmarray: [],
      PickerValueHolderA : '',
      flockarray: [],
      tableHead: ['S.No', 'Date', 'Supervisor', 'Farm', 'Action'],
      tableData: [
        ['1', '2', '3', '4','5'],
        ['a', 'b', 'c', 'd','e'],
        ['1', '2', '3', '456\n789','5'],
        ['a', 'b', 'c', 'd','e']
      ]
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
        Type: 'farm'
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
              temp.push(array[i].code)
              this.setState({
              isLoading: false,
              farmarray: temp
              });
          }
        }
        }).catch((error) => {
        console.error(error);
      });
  }

pickFunction = (itemValue,itemIndex) => {

    this.setState({PickerValueHolder : itemValue});

    fetch('https://pm.spectacularsys.com/Android_App/src/GetData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: validUser,
        Pwd: validPwd,
        Type: 'flock',
        farm:itemValue
      })

      }).then((response) => response.text())
      .then((responseJson) => {
        alert(responseJson);
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
              temp.push(array[i].code)
              this.setState({
              isLoading: false,
              flockarray: temp
              });
          }
        }
        }).catch((error) => {
        console.error(error);
      });



  }


  farmlist = () =>{
        return( this.state.farmarray.map( (x,i) => {
          var alldata = x.split('@'); var val = alldata[0];
              return( <Picker.Item label={val} key={i} value={x}  />)} ));
  }
  

  render() {
    const state = this.state;
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
        style={{ flex: 1 }}
        source={require('D:/Android_App/BIMS/images/wbg.png')}  >
      
        <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Farm" value="" />
                { this.farmlist() }
            </Picker>
        </View>

        <View style={styles.inputWrap}>
          <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Flock" value="" />
               
            </Picker>
        </View>
         
        <View style={styles.inputWrap}>
          <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Month" value="" />
                { this.farmlist() }
            </Picker>
        </View>

        <View style={styles.inputWrap}>
          <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) => this.pickFunction(itemValue, itemIndex) } >
              <Picker.Item label="Year" value="" />
               
            </Picker>
        </View>
        </View>
         

      </ImageBackground>

    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },

  root: {
    flex: 1,
    flexDirection: "row"
  },
  container : {
    flex: 1 ,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  inputBox: {
    width:150,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius:15,
    paddingHorizontal:10,
    fontSize:16,
    color:'#000000',
    marginVertical:10,
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1,
    height:50,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: "space-between",
    borderRadius:15,
    marginVertical:10,
  }

});

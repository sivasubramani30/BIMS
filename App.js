// import React from 'react';
// import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
// import {
//   createAppContainer,
// } from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer'
// import {createStackNavigator} from 'react-navigation-stack'
// import DailyEntry from 'Test/Screen/DailyEntry'
// import HomeScreen from 'Test/Screen/Home'
// import external from 'Test/Screen/external'
// import { HeaderBackButton } from 'react-navigation';
//
//
// const MyDrawerNavigator = createDrawerNavigator({
//   DailyEntry: {
//     screen: DailyEntry,
//     navigationOptions: {
//             headerLeft: <HeaderBackButton onPress={() => navigation.navigate('DrawerOpen')} />
//         },
//   },
//   Mains: {
//     screen: external,
//
//   }
// });
//
//
// const AppNavigator = createStackNavigator({
//   Login: {
//     screen:  HomeScreen,
//     navigationOptions: {
//             header: null,
//         },
//   },
//   Drawer: {
//     screen:  MyDrawerNavigator,
//     navigationOptions: {
//             header: null,
//         },
//   }
// });
// export default createAppContainer(AppNavigator);
/*import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from 'BIMS/Source/Login'
import Dashboard from 'BIMS/Source/Dashboard'
const MainNavigator = createStackNavigator({ Home: {screen: Login}, Profile: {screen: Dashboard}, },
    {
      defaultNavigationOptions: {
      header: null,
    },
  });
const App = createAppContainer(MainNavigator);


export default App */

import React from 'react';
import { View, Text, Button, ImageBackground, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from 'BIMS/Screens/HomeScreen'
import logout from 'BIMS/Screens/logout'
import DailyEntryDisp from 'BIMS/Screens/DailyEntryDisp'

let validUser;

class Dashboard extends React.Component {
constructor(){
  super();
  this.state ={
    username: ''
  }
  this._loadData();
}

  render()
  {
    const {state} = this.props.navigation;

      return (

      <ImageBackground
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //We are using local image to set background
        source={require('D:/Android_App/BIMS/images/wbg.png')} >
         <Text>Welcome, {validUser}</Text>

      </ImageBackground>
    );

  }

  async _loadData() {
      validUser = await AsyncStorage.getItem('validUser');
      this.setState({username: validUser})
  }
}

const Drawer = createDrawerNavigator({

  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      //onPress={()=> navigation.toggleDrawer()}/>
    })
  },
  DailyEntry: {
    screen: DailyEntryDisp,
    navigationOptions: ({ navigation }) => ({
      title: 'DailyEntry'
      //onPress={()=> navigation.toggleDrawer()}/>
    })
  },
  Logout:{
    screen: logout
  }


});

const AppNavigator = createStackNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
          header: null
        })
       },
   Dashboard:{
     screen: Drawer,
     navigationOptions: ({ navigation }) => ({
         header: 0,
         title:'BIMS',
          headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                />  
            )
       })
   }

});



// Drawer Navigator


export default createAppContainer(AppNavigator);

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
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from 'BIMS/Screens/HomeScreen'
import Logout from 'BIMS/Screens/Logout'
import DailyEntry from 'BIMS/Screens/DailyEntry'


let validUser;




class Dashboard extends React.Component {
constructor(){
  super();
  this._loadData();
}

  render() 
  {
    const {state} = this.props.navigation;

      return (
      
      <ImageBackground
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //We are using online image to set background
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg',
        }}  >
         <Text>Welcome, {validUser}</Text>

      </ImageBackground>
    );
      
  }

  async _loadData() {
      validUser = await AsyncStorage.getItem('validUser');
  }
}


const AppNavigator = createStackNavigator({

  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: 'BIMS',
      headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                />  
            )
      //onPress={()=> navigation.toggleDrawer()}/>
    })
  },
  DailyEntry: {
    screen: DailyEntry,
    navigationOptions: ({ navigation }) => ({
      title: 'DailyEntry',
      headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                />  
            )
      //onPress={()=> navigation.toggleDrawer()}/>
    })
  }
});



// Drawer Navigator
const Drawer = createDrawerNavigator({
  
Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
         drawerLockMode: 'locked-closed',
       })
  },
    
  AppNavigator: {
    screen: AppNavigator,
    navigationOptions:{
      title:'Dashboard'
    }
  },
  DailyEntry: {
    screen: DailyEntry,
    navigationOptions: {
      title: 'Daily Entry',
      header: null
    }
  },
  Logout:{
    screen: Logout
  }
  
   
});

export default createAppContainer(Drawer);
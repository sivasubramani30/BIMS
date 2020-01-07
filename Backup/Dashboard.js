import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {
  createAppContainer,
} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons';
import TestScreen from 'BIMS/New_Src/TestScreen'
import Home from 'BIMS/New_Src/Home'
import logout from 'BIMS/Source/Login'
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Home title= {'Welcome'} navigation = {this.props.navigation} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
          title: 'HomeScreen',

          headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                />  
            ),
          headerStyle: {
            backgroundColor: '#f48fb1'
          },
          headerTintColor: '#fff',
        })
  },
  Test: {
    screen: TestScreen,
    navigationOptions: ({ navigation }) => ({
          title: 'TestScreen',


          headerStyle: {
            backgroundColor: '#f48fb1'
          },
          headerTintColor: '#fff',
        })
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  MainStack: {
    screen: AppNavigator,
    navigationOptions:
          {
            drawerLabel: 'HomeScreen',
          },
  },
  Mains: {
    screen: logout,
    navigationOptions:
          {
            drawerLabel: 'Logout',
          },
  }
});

export default createAppContainer(MyDrawerNavigator);
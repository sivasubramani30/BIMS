import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack'; 
import HomeScreen from 'BIMS/Screens/HomeScreen'
import ProfileScreen from 'BIMS/Screens/ProfileScreen'
const MainNavigator = createStackNavigator({ Home: {screen: HomeScreen}, Profile: {screen: ProfileScreen}, }); 
const App = createAppContainer(MainNavigator); 

export default App
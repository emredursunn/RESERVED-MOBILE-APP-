import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/CustomerScreens/Home"
import DetailedPlace from "../screens/CustomerScreens/DetailedPlace"
import Search from "../screens/CustomerScreens/Search"
import AuthStackNav from "./AuthStackNav"
import LoginScreen from "../screens/AuthScreens/Login"
import Menu from "../screens/CustomerScreens/Menu"

export type HomeStackParams = {
  Home: undefined,
  DetailedPlace: {
    id: number
  },
  Menu: {
    restaurantId:number
  },
  Search: {
    search: string | null
  },
  Login: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParams>()

const HomeStackNav = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerShown:true, headerStyle:{backgroundColor:'#f0a202'}, headerTitleAlign:'center'}}>
      <HomeStack.Screen name='Home' component={Home} options={{headerShown:false}} />
      <HomeStack.Screen name='DetailedPlace' component={DetailedPlace} options={{headerTitle:'Venue'}} />
      <HomeStack.Screen name='Menu' component={Menu} />
      <HomeStack.Screen name='Search' component={Search} />
      <HomeStack.Screen name='Login' component={LoginScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNav
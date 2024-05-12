import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/CustomerScreens/Home"
import DetailedPlace from "../screens/CustomerScreens/DetailedPlace"
import Profile from "../screens/CustomerScreens/Profile"
import Search from "../screens/CustomerScreens/Search"
import AuthStackNav from "./AuthStackNav"
import LoginScreen from "../screens/AuthScreens/Login"
import Menu from "../screens/CustomerScreens/Menu"

export type HomeStackParams = {
  Home: undefined,
  DetailedPlace: {
    id: number
  },
  Menu: undefined,
  Profile: undefined,
  Search: {
    search: string
  },
  Login: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParams>()

const HomeStackNav = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='DetailedPlace' component={DetailedPlace} />
      <HomeStack.Screen name='Menu' component={Menu} />
      <HomeStack.Screen name='Profile' component={Profile} />
      <HomeStack.Screen name='Search' component={Search} />
      <HomeStack.Screen name='Login' component={LoginScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNav
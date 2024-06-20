import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailedPlace from "../screens/CustomerScreens/DetailedPlace"
import Favorites from "../screens/CustomerScreens/Favorites"
import LoginScreen from "../screens/AuthScreens/Login"
import Reservations from "../screens/CustomerScreens/Reservations"

export type FavoriteStackParams = {
    Favorites: undefined,
    DetailedPlace: {
        id: number
    },
}

const FavoriteStack = createNativeStackNavigator<FavoriteStackParams>()

const FavoriteStackNav = () => {
    return (
        <FavoriteStack.Navigator initialRouteName='Favorites'  screenOptions={{headerShown:true, headerStyle:{backgroundColor:'#f0a202'}, headerTitleAlign:'center'}}>
            <FavoriteStack.Screen name='Favorites' component={Favorites} />
            <FavoriteStack.Screen name='DetailedPlace' component={DetailedPlace} options={{headerTitle:'Venue'}} />
        </FavoriteStack.Navigator>
    )
}

export default FavoriteStackNav
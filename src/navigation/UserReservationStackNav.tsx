import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailedPlace from "../screens/CustomerScreens/DetailedPlace"
import Reservations from "../screens/CustomerScreens/Reservations"
import AuthStackNav from "./AuthStackNav"
import LoginScreen from "../screens/AuthScreens/Login"
import Menu from "../screens/CustomerScreens/Menu"

export type ReservationStackParams = {
    Reservations: undefined,
    DetailedPlace: {
        id: number
    },
    Login: undefined
}

const ReservationStack = createNativeStackNavigator<ReservationStackParams>()

const ReservationStackNav = () => {
    return (
        <ReservationStack.Navigator initialRouteName='Reservations'  screenOptions={{headerShown:true, headerStyle:{backgroundColor:'#f0a202'}, headerTitleAlign:'center'}}>
            <ReservationStack.Screen name='Reservations' component={Reservations} options={{headerTitle:'My Reservations'}} />
            <ReservationStack.Screen name='DetailedPlace' component={DetailedPlace} options={{headerTitle:'Venue'}} />
            <ReservationStack.Screen name='Login' component={LoginScreen} options={{headerTitle:'Login'}} />
        </ReservationStack.Navigator>
    )
}

export default ReservationStackNav
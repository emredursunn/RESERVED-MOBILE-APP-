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
    Menu: undefined,
    Login: undefined
}

const ReservationStack = createNativeStackNavigator<ReservationStackParams>()

const ReservationStackNav = () => {
    return (
        <ReservationStack.Navigator initialRouteName='Reservations' screenOptions={{ headerShown: false }}>
            <ReservationStack.Screen name='Reservations' component={Reservations} />
            <ReservationStack.Screen name='DetailedPlace' component={DetailedPlace} />
            <ReservationStack.Screen name='Menu' component={Menu} />
            <ReservationStack.Screen name='Login' component={LoginScreen} />
        </ReservationStack.Navigator>
    )
}

export default ReservationStackNav
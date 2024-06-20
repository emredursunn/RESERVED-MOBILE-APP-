import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNav from "./UserHomeStackNav";
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import FavoriteStackNav from "./UserFavoriteStackNav";
import ReservationStackNav from "./UserReservationStackNav";

export type TabStackParams = {
    HomeStackNav: undefined,
    FavoriteStackNav: undefined,
    ReservationStackNav: undefined
}

const Tab = createBottomTabNavigator<TabStackParams>()


const UserTabNav = () => {
    return (
        <Tab.Navigator initialRouteName="HomeStackNav" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeStackNav" component={HomeStackNav} options={{
                tabBarLabel: "Home",
                tabBarLabelStyle: { fontSize: 14 },
                tabBarActiveTintColor:'#f0a202',
                tabBarIcon: () => (
                    <AntDesign name="home" size={24} color="#f0a202" />
                ),
            }} />
            <Tab.Screen name="FavoriteStackNav" component={FavoriteStackNav} options={{
                tabBarLabel: "Favorites",
                tabBarLabelStyle: { fontSize: 14 },
                tabBarActiveTintColor:'#f0a202',
                tabBarIcon: () => (
                    <MaterialIcons name="favorite-outline" size={24} color="#f0a202" />
                )
            }} />
            <Tab.Screen name="ReservationStackNav" component={ReservationStackNav} options={{
                tabBarLabel: "Reservations",
                tabBarLabelStyle: { fontSize: 14 },
                tabBarActiveTintColor:'#f0a202',
                tabBarIcon: () => (
                    <Feather name="book-open" size={24} color="#f0a202" />
                )
            }} />
        </Tab.Navigator>
    )
}

export default UserTabNav
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/Start'
import LoginScreen from '../screens/AuthScreens/Login'
import SignUpScreen from '../screens/AuthScreens/SignUp'
import Home from '../screens/CustomerScreens/Home'
import UserTabNav from './UserTabNav'
import Search from '../screens/CustomerScreens/Search'
import CreateRestaurant from '../screens/AuthScreens/CreateRestaurant'
import { PlaceCardProps } from '../components/PlaceCard'

export type AuthStackParams = {
    Start: undefined,
    Login: undefined,
    SignUp: undefined,
    CreateRestaurant: {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        passwordConfirmation: string,
        phone: string,
        age: number
    },
    UserTabNav: undefined,
    Search: {
        search: string | null
    }
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthStackNav = () => {
    return (
        <AuthStack.Navigator initialRouteName='Start' screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#f0a202' }, headerTitleAlign: 'center' }}>
            <AuthStack.Screen name='Start' component={StartScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='SignUp' component={SignUpScreen} />
            <AuthStack.Screen name='UserTabNav' component={UserTabNav} options={{ headerShown: false }} />
            <AuthStack.Screen name='CreateRestaurant' component={CreateRestaurant} />
            <AuthStack.Screen name='Search' component={Search} />
        </AuthStack.Navigator>
    )
}

export default AuthStackNav
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/Start'
import LoginScreen from '../screens/AuthScreens/Login'
import SignUpScreen from '../screens/AuthScreens/SignUp'
import Home from '../screens/CustomerScreens/Home'
import UserTabNav from './UserTabNav'
import Search from '../screens/CustomerScreens/Search'

export type AuthStackParams = {
    Start: undefined,
    Login: undefined,
    SignUp: undefined,
    UserTabNav: undefined,
    Search: {
        search: string
    }
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthStackNav = () => {
    return (
        <AuthStack.Navigator initialRouteName='Start' screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name='Start' component={StartScreen} />
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='SignUp' component={SignUpScreen} />
            <AuthStack.Screen name='UserTabNav' component={UserTabNav} />
            <AuthStack.Screen name='Search' component={Search} />
        </AuthStack.Navigator>
    )
}

export default AuthStackNav
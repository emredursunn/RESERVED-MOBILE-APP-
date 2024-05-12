import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminPanel from '../screens/AdminScreens/AdminPanel'
import AdminSettings from '../screens/AdminScreens/AdminSettings'
import AdminReservations from '../screens/AdminScreens/AdminReservations'
import AdminMenu from '../screens/AdminScreens/AdminMenu'
import AdminRequests from '../screens/AdminScreens/AdminRequests'
import AdminPhotoGallery from '../screens/AdminScreens/AdminPhotoGallery'


export type AdminStackParams = {
    Panel: undefined,
    PhotoGallery: undefined,
    Menu:undefined
    Settings:undefined
    Reservations:undefined
    Requests:undefined
}

const AdminStack = createNativeStackNavigator<AdminStackParams>()

const AdminStackNav = () => {
    return (
            <AdminStack.Navigator initialRouteName='Panel' screenOptions={{headerShown:false}}>
                <AdminStack.Screen name='Panel' component={AdminPanel}  />
                <AdminStack.Screen name='Settings' component={AdminSettings} />
                <AdminStack.Screen name='PhotoGallery' component={AdminPhotoGallery} />
                <AdminStack.Screen name='Menu' component={AdminMenu} />
                <AdminStack.Screen name='Reservations' component={AdminReservations} />
                <AdminStack.Screen name='Requests' component={AdminRequests} />
            </AdminStack.Navigator>
    )
}

export default AdminStackNav
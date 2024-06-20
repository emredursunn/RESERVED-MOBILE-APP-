import { TouchableOpacity, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AdminStackParams } from '../../navigation/AdminStackNav'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type PanelProps = NativeStackScreenProps<AdminStackParams>

const AdminPanel = ({ navigation }: PanelProps) => {

    const dimensions = Dimensions.get("screen")

    const restaurantName = useSelector((state:RootState) => state.admin.admin.name)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4e285' }}>
            <StatusBar animated={true} backgroundColor='#f0a202' />
            <Text style={{ fontStyle: 'italic', fontSize: 40, fontWeight: 'bold', shadowOffset: { height: 5, width: 5 }, shadowColor: 'gray', shadowOpacity: 1, margin: 10 }}>
                {restaurantName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('PhotoGallery')} style={{ borderRadius: 10, margin: 10, backgroundColor: '#f0a202', width: dimensions.width / 2.5, height: dimensions.height / 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#fff' }}>
                        PHOTO GALLERY
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={{ borderRadius: 10, margin: 10, backgroundColor: '#f0a202', width: dimensions.width / 2.5, height: dimensions.height / 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#fff' }}>
                        MENU
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Reservations')} style={{ borderRadius: 10, margin: 10, backgroundColor: '#f0a202', width: dimensions.width / 2.5, height: dimensions.height / 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#fff' }}>
                        RESERVATIONS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Requests')} style={{ borderRadius: 10, margin: 10, backgroundColor: '#f0a202', width: dimensions.width / 2.5, height: dimensions.height / 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#fff' }}>
                        REQUESTS
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ borderRadius: 10, margin: 10, backgroundColor: '#f0a202', width: dimensions.width / 2.5, height: dimensions.height / 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#fff' }}>
                        SETTINGS
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default AdminPanel
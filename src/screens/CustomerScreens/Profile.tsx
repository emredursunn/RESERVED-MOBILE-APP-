import { View, Text, TextInput, TouchableOpacity, Dimensions, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParams } from '../../navigation/UserHomeStackNav'
import { useDispatch } from 'react-redux'
import { clearToken } from '../../redux/tokenSlice'
import axios from 'axios'

type Props = NativeStackScreenProps<HomeStackParams, "Profile">

const Profile = ({ navigation }: Props) => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")

    const dispatch = useDispatch()
    const dimensions = Dimensions.get("screen")

    const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"


    const updateFullName = () => {
        const fullname = name + surname
        //update database
    }


    const updatePhone = () => {
        //update database
    }

    const handleConfirm = () => {
        try {
            updateFullName()
            updatePhone()
            Alert.alert("Değişiklikler kaydedildi.")
        } catch (error) {
            Alert.alert("Sorun meydana geldi.")
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/user-logout`)
            dispatch(clearToken())
        } catch (error) {
            console.log(error)
            Alert.alert("Sorun meydana geldi.")
        }
    }

    const deleteAccount = () => {
        //delete user from database
    }

    return (
        <ImageBackground source={require("../../../assets/imagebackground.png")} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 35, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>PROFILE</Text>

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder='EMRE'
                    style={{ borderRadius: 10, width: dimensions.width / 1.8, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Surname:</Text>
                <TextInput
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="DURSUN"
                    style={{ borderRadius: 10, width: dimensions.width / 1.8, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Phone:</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='905456563525'
                    style={{ borderRadius: 10, width: dimensions.width / 1.8, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 25, backgroundColor: 'tomato', alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600', color: '#fff' }}>{"<-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: 'tomato', padding: 15, borderRadius: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>UPDATE</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'tomato', padding: 15, borderRadius: 20, marginTop: '30%' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>LOGOUT</Text>
            </TouchableOpacity>
        </ImageBackground >
    );

}



export default Profile
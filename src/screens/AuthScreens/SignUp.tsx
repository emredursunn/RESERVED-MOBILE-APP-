import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/tokenSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/AuthStackNav';


type Props = NativeStackScreenProps<AuthStackParams>

const SignUpScreen = ({navigation} : Props) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [role, setRole] = useState("")

    const [isLoading, setIsLoading] = useState(false)


    const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"

    const handleRegister = async () => {
        setIsLoading(true)
        if(password === passwordConfirmation){
            try {
                const response = await axios.post(`${BASE_URL}/api/auth/${role}`, {
                "name": firstname,
                "email": email,
                "password": password,
                "password_confirmation": passwordConfirmation
            }
        )
            console.log(response.data)
            navigation.navigate("Login")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }else{
        Alert.alert("Passwords are not same!")
    }
    }

    const radioButtons = [
        {
            id: 'user-signup',
            label: 'Customer',
            value: 'Customer'
        },
        {
            id: 'admin-signup',
            label: 'Restaurant Owner',
            value: 'Restaurant Owner'
        }
    ]


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: '600', fontSize: 25, marginBottom: 40, shadowOffset: { height: 1, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, }}>Create Account</Text>
            <TextInput onChangeText={setFirstname} value={firstname} placeholder='Firstname' style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }} />
            <TextInput onChangeText={setLastname} value={lastname} placeholder='Lastname' style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }} />
            <TextInput onChangeText={setEmail} value={email} placeholder='E-mail Adress' style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }} />
            <TextInput onChangeText={setPassword} value={password} placeholder='Password' style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }} />
            <TextInput onChangeText={setPasswordConfirmation} value={passwordConfirmation} placeholder='Password Confirmation' style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }} />
            <RadioGroup
                radioButtons={radioButtons}
                onPress={setRole}
                selectedId={role}
                containerStyle={{ flexDirection: 'row' }}
            />
            {isLoading ?
                <ActivityIndicator style={{marginTop:50}} size={24} color={"blue"} />
                :
                <TouchableOpacity onPress={handleRegister} style={{ marginTop: 50, marginBottom: 25, borderRadius: 20, borderWidth: 2, padding: 10, paddingHorizontal: 50, backgroundColor: "orange" }}>
                    <Text>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            }
            <Text>
                Or create account using Google
            </Text>
            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, marginTop: 15, padding: 10 }}>
                <AntDesign name="google" size={24} color="orange" />
            </TouchableOpacity>
        </View>
    )
}

export default SignUpScreen
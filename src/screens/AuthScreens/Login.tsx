import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '../../navigation/AuthStackNav'
import axios from 'axios'
import { setToken } from '../../redux/tokenSlice'
import { useDispatch } from 'react-redux'
import { RadioGroup } from 'react-native-radio-buttons-group'

type Props = NativeStackScreenProps<AuthStackParams>

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState("emre@gmail.com")
    const [password, setPassword] = useState("123456")
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState("")


    const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"

    const dispatch = useDispatch()

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/${role}`, {
                "email": email,
                "password": password
            })
            console.log(response.data)
            const responsed_token = response.data.token
            const responsed_role = response.data.role
            dispatch(setToken({token:responsed_token,role:responsed_role}))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const radioButtons = [
        {
            id: 'user-login',
            label: 'Customer',
            value: 'Customer'
        },
        {
            id: 'admin-login',
            label: 'Restaurant Owner',
            value: 'Restaurant Owner'
        }
    ]

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 60, fontWeight: 'bold', shadowOffset: { height: 5, width: 5 }, shadowColor: 'gray', shadowOpacity: 1, }}>RESERVED</Text>
                <Text style={{ fontSize: 18 }}>Sign in to your account</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput value={email} onChangeText={setEmail} placeholder='E-mail' style={{ width: '70%', borderWidth: 1, borderRadius: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, padding: 20, marginBottom: 20 }} />
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={{ width: '70%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 10 }} />
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setRole}
                    selectedId={role}
                    containerStyle={{ flexDirection: 'row' }}
                />
                {isLoading ?
                    <ActivityIndicator style={{ marginTop: 50 }} size={24} color={"blue"} />
                    :
                    <TouchableOpacity onPress={handleLogin} style={{ marginTop: 30, borderRadius: 20, borderWidth: 2, padding: 10, paddingHorizontal: 50, backgroundColor: "orange" }}>
                        <Text>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flex: 1, alignItems:'center' }}>
                <TouchableOpacity style={{marginVertical:25 }}>
                    <Text style={{ paddingHorizontal:10}}>Forgot your password?</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row', paddingHorizontal:10}}>
                    <Text>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', fontStyle: 'italic' }}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen
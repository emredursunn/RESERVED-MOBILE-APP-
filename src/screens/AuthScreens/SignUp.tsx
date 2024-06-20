import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/AuthStackNav';
import { BASE_URL } from '../../utils/utils';
import Feather from '@expo/vector-icons/Feather';



type Props = NativeStackScreenProps<AuthStackParams>;

const SignUpScreen = ({ navigation }: Props) => {
    const [formState, setFormState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        age: 18,
        role: ""
    });

    const [isSecureText, setIsSecureText] = useState(true)

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (name: string, value: any) => {
        setFormState({ ...formState, [name]: value });
    };

    const handleRegister = async () => {
        setIsLoading(true);
        const { firstname, lastname, email, password, passwordConfirmation, phone, age, role } = formState;
        if (password === passwordConfirmation) {
            if (age >= 18) {
                try {
                    if (role === 'admin-signup') {
                        setIsLoading(false)
                        navigation.navigate("CreateRestaurant", {firstname, lastname, email, password, passwordConfirmation, phone, age})
                    }
                    else {
                        await axios.post(`${BASE_URL}/api/auth/user-signup`, {
                            name: firstname + " " + lastname,
                            email: email,
                            password: password,
                            password_confirmation: passwordConfirmation,
                            phone: phone,
                            age: age
                        });
                        navigation.navigate("Login");
                        setIsLoading(false);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                    throw error
                }
            } else {
                Alert.alert("You are younger than 18!")
                setIsLoading(false)
            }
        }
        else {
            setIsLoading(false);
            Alert.alert("Passwords are not the same!");
        }
    };


    const radioButtons = [
        { id: 'user-signup', label: 'Customer', value: 'Customer' },
        { id: 'admin-signup', label: 'Restaurant Owner', value: 'Restaurant Owner' }
    ];

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: '600', fontSize: 25, marginBottom: 40, marginTop: '20%', shadowOffset: { height: 1, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}>Create Account</Text>
            <TextInput
                onChangeText={(text) => handleInputChange('firstname', text)}
                value={formState.firstname}
                placeholder='Firstname'
                style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}
            />
            <TextInput
                onChangeText={(text) => handleInputChange('lastname', text)}
                value={formState.lastname}
                placeholder='Lastname'
                style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}
            />
            <TextInput
                onChangeText={(text) => handleInputChange('email', text)}
                value={formState.email}
                placeholder='E-mail Address'
                style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}>
                <TextInput
                    onChangeText={(text) => handleInputChange('password', text)}
                    value={formState.password}
                    placeholder='Password'
                    secureTextEntry={isSecureText}
                    style={{ flex: 1 }}
                />
                {isSecureText ? (
                    <Feather name="eye-off" size={24} color="black" onPress={() => setIsSecureText(false)} />
                ) : (
                    <Feather name="eye" size={24} color="black" onPress={() => setIsSecureText(true)} />
                )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}>
                <TextInput
                    style={{ flex: 1 }}
                    onChangeText={(text) => handleInputChange('passwordConfirmation', text)}
                    value={formState.passwordConfirmation}
                    placeholder='Password Confirmation'
                    secureTextEntry={isSecureText}
                />
                {isSecureText ? (
                    <Feather name="eye-off" size={24} color="black" onPress={() => setIsSecureText(false)} />
                ) : (
                    <Feather name="eye" size={24} color="black" onPress={() => setIsSecureText(true)} />
                )}
            </View>

            <TextInput
                onChangeText={(text) => handleInputChange('phone', text)}
                value={formState.phone}
                placeholder='phone'
                style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}
            />
            <TextInput
                onChangeText={(text) => handleInputChange('age', text)}
                value={formState.age.toString()}
                placeholder='age'
                style={{ width: '80%', borderWidth: 1, borderRadius: 20, padding: 20, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1, marginBottom: 15 }}
            />
            <RadioGroup
                radioButtons={radioButtons}
                onPress={(value) => handleInputChange('role', value)}
                selectedId={formState.role}
                containerStyle={{ flexDirection: 'row' }}
            />
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 50 }} size={24} color={"blue"} />
            ) : (
                <TouchableOpacity onPress={handleRegister} style={{ marginTop: 50, marginBottom: 25, borderRadius: 20, borderWidth: 2, padding: 10, paddingHorizontal: 50, backgroundColor: "orange" }}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            )}
            <Text>Or create account using Google</Text>
            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, marginVertical: 15, padding: 10 }}>
                <AntDesign name="google" size={24} color="orange" />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignUpScreen;
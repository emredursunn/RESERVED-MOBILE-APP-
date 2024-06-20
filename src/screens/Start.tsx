import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '../navigation/AuthStackNav'
import Loading from '../components/Loading'
import { getAllPlaces } from '../utils/utils'

type Props = NativeStackScreenProps<AuthStackParams>

const StartScreen = ({ navigation }: Props) => {

    const [searchText, setSearchText] = useState("")
    // const [location, setLocation] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleOnPress = () => {
        setIsLoading(true)
        setTimeout(() => {
            navigation.navigate("UserTabNav")
            navigation.navigate("Search", { search: searchText })
            setIsLoading(false)
        }, 500)
    }


    return (
        isLoading ?
            <Loading />
            :
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../assets/imagebackground.png')} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover'>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'orange' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ color: 'white', marginLeft: 20, marginTop: 15 }}>
                                RESERVED
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: 'white', marginHorizontal: 10 }}>
                                    LOGIN
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={{ color: 'white', marginHorizontal: 10 }}>
                                    REGISTER
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '700', fontSize: 24, alignSelf: 'center' }}>BOOK A TABLE WHERE</Text>
                        <Text style={{ fontWeight: '700', fontSize: 24, marginBottom: 20, alignSelf: 'center' }}>YOU WISH..</Text>
                        <TextInput placeholder={"Search what you wish"} placeholderTextColor={"gray"} value={searchText} onChangeText={setSearchText} style={{ color: "black", fontSize: 15, opacity: 0.5, borderRadius: 20, borderWidth: 2, padding: 20, width: '70%', margin: 10 }} />
                        <TouchableOpacity onPress={handleOnPress} style={{ marginTop: 30, borderRadius: 20, borderWidth: 2, padding: 10, paddingHorizontal: 50, backgroundColor: "orange" }}>
                            <Text style={{ color: 'white' }}>
                                FIND
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
    )
}

export default StartScreen


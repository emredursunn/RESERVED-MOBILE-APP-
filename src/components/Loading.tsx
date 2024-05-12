import { View, Text, ActivityIndicator, ImageBackground } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View style={{ flex: 1}}>
            <ImageBackground source={require('../../assets/imagebackground.png')} style={{ flex: 1, justifyContent: 'center', alignItems:'center' }} resizeMode='cover'>
                <ActivityIndicator color={'orange'} size={40} />
                <Text style={{ margin: 15, fontSize: 30 }}>Yükleniyor...</Text>
            </ImageBackground>
        </View>
    )
}

export default Loading
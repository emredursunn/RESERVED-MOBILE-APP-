import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

export type CategoryCardProps = {
    id: number,
    name: string,
    cover: string,
    onPress?: (id: number) => void
}

const CategoryCard = ({ id, name, cover, onPress }: CategoryCardProps) => {

    const dimensions = Dimensions.get("screen")

    return (
        <TouchableOpacity style={{
            width: dimensions.width / 3,
            height: dimensions.height / 7.6,
            backgroundColor: '#dce0d9',
            marginHorizontal: 10,
            shadowOffset: { height: 3, width: 3 },
            shadowOpacity: 1,
            shadowColor: 'gray',
            borderRadius: 20
        }}
            onPress={onPress ? () => onPress(id) : undefined}>
            <View style={{ width: '100%', height: '80%', paddingVertical: 10, alignItems: 'center' }}>
                <Image source={{ uri: cover }} resizeMode='cover' style={{ width: '80%', height: '100%', borderRadius: 10 }} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
            }}>
                <Text style={{ fontSize: 14, marginVertical: 3 }}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard

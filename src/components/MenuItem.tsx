import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export type MenuItemProps = {
    product_type_id: number,
    name: string,
    price: number,
    id?: number,
    description?: string,
    unit?: string,
    calories?: string,
    food_image?: string,
    is_special?: string
}


const MenuItem = ({ name, description, price }: MenuItemProps) => {

    const dimensions = Dimensions.get("screen")

    return (
        <View style={{ width: dimensions.width / 1.3, flexDirection: 'row', borderRadius: 20, padding: 8, alignSelf: 'center' }}>
            <View style={{ width: '75%', justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
                <Text style={{ fontWeight: '300', fontStyle: 'italic', fontSize: 16 }}>{description}</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 22, position: 'absolute', right: 10, alignSelf: 'center' }}>{price}</Text>
        </View>
    )
}

export default MenuItem
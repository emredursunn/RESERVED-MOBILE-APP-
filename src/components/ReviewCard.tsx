import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export type ReviewCardProps = {
    id: number,
    user_id: number,
    name:string,
    comment: string,
    star_count: number
    restaurant_id?: number,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string
}

const ReviewCard = ({ id, user_id,name, comment, star_count }: ReviewCardProps) => {

    const setStars = () => {
        const starArray = Array(star_count).fill(null).map((_, index) => (
            <AntDesign key={index} name="star" size={18} color="orange" style={{ opacity: .8 }} />
        ));
        return starArray;
    }

    return (
        <View style={{ width: '100%', marginVertical: 10 }}>
            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20 }}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {setStars()}
                </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{comment}</Text>
            </View>
        </View>
    )
}

export default ReviewCard
import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export type ReviewCardProps = {
    id: number,
    userId: number,
    placeId: number,
    comment: string,
    stars: number
}

const ReviewCard = ({ id, userId, comment, stars }: ReviewCardProps) => {

    const setStars = () => {
        const starArray = Array(stars).fill(null).map((_, index) => (
            <AntDesign key={index} name="star" size={18} color="orange" style={{ opacity: .8 }} />
        ));
        return starArray;
    }

    const name = "Emre Dursun" //userId kullanarak bul 


    return (
        <View style={{ width: '100%', marginVertical: 10 }}>

            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20 }}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {setStars()}
                </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontStyle:'italic' }}>{comment}</Text>
            </View>
        </View>
    )
}

export default ReviewCard
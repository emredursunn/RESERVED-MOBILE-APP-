import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToFavorite, deleteFromFavorite } from '../redux/favoriteSlice';
import { ReviewCardProps } from './ReviewCard';

export type PlaceCardProps = {
    id: number,
    categoryId: number,
    name: string,
    stars: number,
    cover: string,
    onPress?: (id: number) => void,
    reviews?: ReviewCardProps[]
}

const PlaceCard = ({ id, categoryId, name, stars, cover, onPress }: PlaceCardProps) => {

    const dimensions = Dimensions.get("screen")
    const dispatch = useDispatch()
    const isFavorite = useSelector((state: RootState) => state.favorite.favorites.some((place) => place.id === id))

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(deleteFromFavorite(id))
        } else {
            dispatch(addToFavorite(id))
        }
    }

    const setStars = () => {
        const starArray = Array(stars).fill(null).map((_, index) => (
            <AntDesign key={index} name="star" size={18} color="orange" style={{ opacity: .8 }} />
        ));
        return starArray;
    }

    return (
        <TouchableOpacity style={{ width: dimensions.width / 1.1, height: dimensions.height / 8, alignSelf: 'center', backgroundColor: '#dce0d9', padding: 10, flexDirection: 'row', borderRadius: 40, marginVertical: 8, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowColor: 'gray', }}
            onPress={onPress ? () => onPress(id) : undefined}>
            <TouchableOpacity onPress={handleFavorite} style={{ padding: 20, position: 'absolute', right: 1, top: -10 }}>
                {isFavorite ? <MaterialIcons name="favorite" size={24} color="tomato" />
                    : <MaterialIcons name="favorite-outline" size={24} color="black" />}
            </TouchableOpacity>
            <View style={{ width: '25%', }}>
                <Image source={{ uri: cover }} resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: 20 }} />
            </View>
            <View style={{ width: '50%', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {setStars()}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PlaceCard

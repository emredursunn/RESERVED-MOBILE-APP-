import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ReviewCardProps } from './ReviewCard';
import { formatImageUrl } from '../utils/utils';
import { addToFavoriteAsync, deleteFavoriteAsync } from '../redux/favoriteSlice';

export type PlaceCardProps = {
    id: number,
    categoryId: number,
    name: string,
    star_count: number,
    image_cover: string,
    address?: string,
    onPress?: (id: number) => void,
}

const PlaceCard = ({ id, name, star_count, image_cover, onPress }: PlaceCardProps) => {

    const dimensions = Dimensions.get("screen")
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.token.token)
    const favorites = useSelector((state: RootState) => state.favorite.favorites)
    const [isFavorite, setIsFavorite] = useState(favorites.includes(id))
    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setIsFavorite(favorites.includes(id));
    }, [favorites]);

    const handleFavorite = () => {
        if (token) {
            setDelay(true);
            try {
                if (isFavorite) {
                    dispatch(deleteFavoriteAsync({ restaurantId: id, token }))
                } else {
                    dispatch(addToFavoriteAsync({ restaurantId: id, token }))
                }
            } catch (error) {
                console.log(isFavorite ? "Silme başarısız" : "Ekleme başarısız");
            } finally {
                setDelay(false);
            }
        }
    };

    const setStars = () => {
        const starArray = Array(star_count).fill(null).map((_, index) => (
            <AntDesign key={index} name="star" size={18} color="#fff" style={{ opacity: .8 }} />
        ));
        return starArray;
    }

    const imageCover = image_cover ? formatImageUrl(image_cover) : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
    //f0a202 dce0d9
    return (
        <TouchableOpacity style={{ width: dimensions.width / 1.1, height: dimensions.height / 8, alignSelf: 'center', backgroundColor: '#f0a202', padding: 10, flexDirection: 'row', borderRadius: 40, marginVertical: 8, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowColor: 'gray', }}
            onPress={onPress ? () => onPress(id) : undefined}>
            <TouchableOpacity onPress={handleFavorite} style={{ padding: 20, position: 'absolute', right: 1, top: -10 }} disabled={delay}>
                {isFavorite ? <MaterialIcons name="favorite" size={24} color="red" />
                    : <MaterialIcons name="favorite-outline" size={24} color="#fff" />}
            </TouchableOpacity>
            <View style={{ width: '25%', }}>
                <Image source={{ uri: imageCover ? imageCover : undefined }} resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: 20 }} />
            </View>
            <View style={{ width: '50%', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, marginBottom: 10, fontStyle:'italic', fontWeight:'bold', color:'#fff' }}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {setStars()}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PlaceCard

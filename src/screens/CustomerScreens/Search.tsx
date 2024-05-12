import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParams } from '../../navigation/UserHomeStackNav'
import PlaceCard, { PlaceCardProps } from '../../components/PlaceCard'
import { allPlaces } from '../../utils/utils'

type Props = NativeStackScreenProps<HomeStackParams, "Search">

const Search = ({ navigation, route }: Props) => {

    const [searchedPlaces, setSearchedPlaces] = useState<PlaceCardProps[]>([])
    const { search } = route.params

    const getSearchedPlaces = (search: string) => {
        const places: PlaceCardProps[] = []
        for (const placeCategory of allPlaces) {
            placeCategory.map(place => {
                const splittedPlaceName = place.name.split(" ")
                for (const word of splittedPlaceName) {
                    if (search.toLowerCase().includes(word.toLowerCase())) {
                        places.push(place)
                        break
                    } else if (word.toLowerCase().includes(search.toLowerCase())) {
                        places.push(place)
                        break
                    }
                }
            })
        }
        setSearchedPlaces(places)
    }

    useEffect(() => {
        getSearchedPlaces(search)
    }, [])

    const handleOnPressPlace = (id: number) => {
        navigation.navigate("DetailedPlace", { id })
    }


    const renderPlace = ({ item, index }: { item: PlaceCardProps, index: number }) => (
        <PlaceCard key={item.id} id={item.id} categoryId={item.categoryId} name={item.name} stars={item.stars} cover={item.cover} onPress={() => handleOnPressPlace(item.id)} />
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', alignSelf: 'center', position: 'absolute', left: 1, bottom: 1, margin:20 }}>Featured</Text>
            </View>
            <View style={{ flex: 6 }}>
                <FlatList data={searchedPlaces} renderItem={renderPlace} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} />
            </View>
        </View>
    )
}

export default Search
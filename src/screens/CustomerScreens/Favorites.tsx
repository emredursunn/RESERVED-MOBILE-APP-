import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import PlaceCard, { PlaceCardProps } from '../../components/PlaceCard'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FavoriteStackParams } from '../../navigation/UserFavoriteStackNav'
import { getAllPlaces } from '../../utils/utils'

type Props = NativeStackScreenProps<FavoriteStackParams, "Favorites">

const Favorites = ({ navigation }: Props) => {

  const favoritePlacesIds = useSelector((state: RootState) => state.favorite.favorites)
  const token = useSelector((state: RootState) => state.token.token)
  const [favoritePlaces, setFavoritePlaces] = useState<PlaceCardProps[] | null>(null)

  useEffect(() => {
    if (token) {
      getAllPlaces()
        .then((placeCategories) => {
          const newFavoritePlaces : PlaceCardProps[] = [];
          placeCategories.forEach((places) => {
            places.forEach((place) => {
              if (favoritePlacesIds.includes(place.id)) {
                newFavoritePlaces.push(place);
              }
            });
          });
          setFavoritePlaces(newFavoritePlaces);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
        });
    }
  }, [favoritePlacesIds]);


  const handleOnPressPlace = (id: number) => {
    navigation.navigate("DetailedPlace", { id })
  }

  const renderPlace = ({ item, index }: { item: PlaceCardProps, index: number }) => (
    <PlaceCard key={item.id} id={item.id} categoryId={item.categoryId} name={item.name} star_count={item.star_count} image_cover={item.image_cover} onPress={() => handleOnPressPlace(item.id)} />
  );

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View>
        <FlatList data={favoritePlaces} renderItem={renderPlace} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} />
      </View>
    </View>
  )
}

export default Favorites
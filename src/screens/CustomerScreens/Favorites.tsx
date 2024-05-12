import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import PlaceCard, { PlaceCardProps } from '../../components/PlaceCard'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FavoriteStackParams } from '../../navigation/UserFavoriteStackNav'

type Props = NativeStackScreenProps<FavoriteStackParams, "Favorites">

const Favorites = ({ navigation }: Props) => {

  const favoritePlaces = useSelector((state: RootState) => state.favorite.favorites)

  const handleOnPressPlace = (id: number) => {
    navigation.navigate("DetailedPlace", { id })
  }

  const renderPlace = ({ item, index }: { item: PlaceCardProps, index: number }) => (
    <PlaceCard key={item.id} id={item.id} categoryId={item.categoryId} name={item.name} stars={item.stars} cover={item.cover} onPress={() => handleOnPressPlace(item.id)} />
  );

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 50, marginBottom:20 }}>Favorites</Text>
      <View>
        <FlatList data={favoritePlaces} renderItem={renderPlace} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} />
      </View>
    </View>
  )
}

export default Favorites
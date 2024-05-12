import { View, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { reservationProps } from '../../components/ReservationCard'
import { allPlaces } from '../../utils/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { deleteReservation } from '../../redux/reservationSlice'
import { ReservationStackParams } from '../../navigation/UserReservationStackNav'

type Props = NativeStackScreenProps<ReservationStackParams, "Reservations">

const Reservations = ({ navigation }: Props) => {

  const reservations = useSelector((state: RootState) => state.reservation.reservations)
  const dispatch = useDispatch()
  const dimensions = Dimensions.get("screen")

  const findPlaceById = (id: number) => {
    for (const placeCategory of allPlaces) {
      const foundPlace = placeCategory.find(place => place.id === id);
      if (foundPlace) {
        return foundPlace;
      }
    }
    return undefined;
  }

  const handleOnPress = (placeId: number) => {
    navigation.navigate("DetailedPlace", { id: placeId })
  }

  const handleCancelOnPress = (reservationId: number) => {
    Alert.alert("Warning", "Do you want to cancel this reservation?", [
      {
        text: "YES",
        onPress: () => dispatch(deleteReservation(reservationId.toString()))
      },
      {
        text: 'NO',
        style: 'cancel'
      }
    ])
  }

  const renderReservation = ({ item, index }: { item: reservationProps, index: number }) => {
    const place = findPlaceById(parseInt(item.placeId))

    return (
      <TouchableOpacity onPress={() => handleOnPress(parseInt(item.placeId))} style={{ borderRadius: 30, marginVertical: 20, backgroundColor: '#dce0d9', width: dimensions.width / 1.1, height: dimensions.height / 5, flexDirection: 'row' }}>
        <View style={{ width: '30%', height: '60%', alignSelf: 'center', paddingLeft: 10 }}>
          <Image style={{ borderRadius: 30, width: '100%', height: '100%' }} source={{ uri: place?.cover }} resizeMode='cover' />
        </View>
        <View style={{ width: '40%', justifyContent: 'center', paddingLeft: 5 }}>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
            Name: {item.name}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
            Table: {item.tableId}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
            Number of People: {item.numberOfPeople}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
            Date: {item.date}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
            Time: {item.time}
          </Text>
        </View>
        <View style={{ width: '30%', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => handleCancelOnPress(parseInt(item.reservationId))} style={{ padding: 20 }}>
            <Text style={{ fontSize: 14, color: 'red' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 50 }}>Reservations</Text>
      <View>
        <FlatList data={reservations} renderItem={renderReservation} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} />
      </View>
    </View>
  )
}

export default Reservations
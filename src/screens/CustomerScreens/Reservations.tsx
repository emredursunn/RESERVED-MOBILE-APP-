import { View, Text, TouchableOpacity, FlatList, Alert, Modal, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import ReservationCard, { Reservation } from '../../components/ReservationCardAdmin'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ReservationStackParams } from '../../navigation/UserReservationStackNav'
import { getUserReservationsAsync, updateUserReservationsAsync } from '../../redux/reservationSlice'
import ReservationCardUser from '../../components/ReservationCardUser'
import axios from 'axios'
import { BASE_URL } from '../../utils/utils'
import { AntDesign } from '@expo/vector-icons';

type Props = NativeStackScreenProps<ReservationStackParams, "Reservations">

const Reservations = ({ navigation }: Props) => {

  const reservations: Reservation[] = useSelector((state: RootState) => state.reservation.reservations)
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.token.token);
  const [filter, setFilter] = useState(1)
  const [data, setData] = useState<Reservation[]>(reservations)
  const [comment, setComment] = useState("")
  const [star_count, setStarCount] = useState(1)
  const [visible, setVisible] = useState(false)
  const [currentRestaurantId, setCurrentRestaurantId] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      dispatch(getUserReservationsAsync({ token: token }))
    }
  }, [])

  useEffect(() => {
    if (filter === 1) {
      const filteredReservations = reservations.filter((r) => r.status === 1 || r.status === 2)
      setData(filteredReservations)
    } else {
      const filteredReservations = reservations.filter((r) => r.status !== 1 && r.status !== 2)
      setData(filteredReservations)
    }
  }, [filter, reservations])


  const handleGoDetailedPlace = (id: number) => {
    navigation.navigate("DetailedPlace", { id })
  }

  const handleCancelOnPress = (reservationId: number) => {
    Alert.alert("Warning", "Do you want to cancel this reservation?", [
      {
        text: "YES",
        onPress: () => token && dispatch(updateUserReservationsAsync({ token: token, reservation_id: reservationId }))
      },
      {
        text: 'NO',
        style: 'cancel'
      }
    ])
  }

  const renderStars = () => {
    let stars: any[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setStarCount(i)}>
          <AntDesign
            name={i <= star_count ? 'star' : 'staro'}
            size={30}
            color={i <= star_count ? '#FFD700' : '#CCCCCC'}
            style={{ margin: 5 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleReview = async () => {
    if (currentRestaurantId !== null) {
      try {
        const response = await axios.post(`${BASE_URL}/api/reservation/reviews`, {
          restaurant_id: currentRestaurantId,
          comment: comment,
          star_count: star_count
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Review submitted successfully:", response.data);
        setComment("");
        setStarCount(1);
        setVisible(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Server responded with:", error.response.data);
          console.log("Status code:", error.response.status);
        } else {
          console.log("Error:", error);
        }
      }
    }
  };

  const renderReservation = ({ item }: { item: Reservation, index: number }) => (
    <ReservationCardUser key={item.id} id={item.id} restaurant_id={item.restaurant_id} person={item.person} date={item.date} check_in_time={item.check_in_time} note={item.note} status={item.status} handleCancel={handleCancelOnPress} handleGoDetailedPlace={handleGoDetailedPlace} handleReview={() => {
      setCurrentRestaurantId(item.restaurant_id);
      setVisible(true);
    }} />
  )


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setFilter(1)} style={{ borderWidth: 1, backgroundColor: '#f0a202', padding: 10, margin: 5, borderRadius: 10, width: 100, alignItems: 'center' }}>
          <Text style={{color:'#fff'}}>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter(2)} style={{ borderWidth: 1, backgroundColor: '#f0a202', padding: 10, margin: 5, borderRadius: 10, width: 100, alignItems: 'center' }}>
          <Text style={{color:'#fff'}}>Past</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={data} renderItem={renderReservation} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} />
      </View>
      <Modal visible={visible} onDismiss={() => setVisible(false)} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.starContainer}>{renderStars()}</View>
            <TextInput
              placeholder='How was it...'
              value={comment}
              onChangeText={(text) => setComment(text)}
              style={styles.textInput}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setVisible(false)} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReview} style={[styles.button, styles.sendButton]}>
                <Text style={styles.buttonText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
    borderColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#f0a202',
    borderColor: '#fff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});


export default Reservations
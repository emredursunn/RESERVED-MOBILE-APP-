import { View, Text, Modal, TouchableOpacity, FlatList, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReservationCard, { Reservation } from '../../components/ReservationCardAdmin';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAdminReservationsAsync, updateAdminReservationsAsync } from '../../redux/reservationSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';


const AdminReservations = () => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredDate, setFilteredDate] = useState<Date>(new Date())

  const dispatch = useDispatch<AppDispatch>()
  const reservations = useSelector((state: RootState) => state.reservation.reservations.filter((r) => r.status === 2))
  const token = useSelector((state: RootState) => state.token.token)
  const [filteredReservations, setFilteredReservations] = useState<Reservation[] | null>(null);

  useEffect(() => {
    if (token) {
      dispatch(getAdminReservationsAsync({ token: token }))
    }
  }, [])

  const handleCancel = (reservationId: number) => {
    //databaseden sil
    Alert.alert("Warning", "Do you want to delete the reservation?", [
      {
        text: "YES",
        onPress: () => {
          if (token) {
            dispatch(updateAdminReservationsAsync({ token: token, reservation_id: reservationId, status: 3 }))
              .then(() => {
                if (filteredReservations) {
                  const updatedList = filteredReservations.filter((r) => r.id !== reservationId);
                  setFilteredReservations(updatedList);
                }
              })
              .catch((error) => {
                // Hata durumunda uygun bir işlem yapılabilir
                console.error("Error deleting reservation:", error);
              });
          }
        }
      },
      {
        text: "NO",
        style: 'cancel'
      }
    ])
  }

  const handleDateChange = (selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFilteredDate(selectedDate);
      const newReservations = reservations.filter((r) => r.date === selectedDate.toISOString().slice(0, 10));
      setFilteredReservations(newReservations);
    } else {
      // Eğer tarih belirtilmezse, tüm rezervasyonları göstermek için filtrelemeyi kaldır
      setFilteredDate(new Date()); // Tarihi sıfırla
      setFilteredReservations(reservations); // Tüm rezervasyonları göster
    }
  };


  const renderReservation = ({ item, index }: { item: Reservation, index: number }) => (
    <ReservationCard key={item.id} id={item.id} restaurant_id={item.restaurant_id} person={item.person} note={item.note} date={item.date} check_in_time={item.check_in_time} handleCancel={handleCancel} />
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#f0a202' }}>

      <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20, justifyContent: 'flex-end', alignItems: 'center', marginRight: 20 }}>
        <TouchableOpacity onPress={() => handleDateChange()}
          style={{ borderWidth: 1, borderRadius: 25, padding: 10, marginHorizontal: 25 }}>
          <MaterialIcons name="filter-list-off" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}
          style={{ borderWidth: 1, borderRadius: 25, padding: 10, marginHorizontal: 25 }}>
          <AntDesign name="calendar" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={showDatePicker} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', backgroundColor: 'pink' }}>
            <DateTimePicker
              value={filteredDate}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => handleDateChange(selectedDate)}
            />
          </View>
        </View>
      </Modal>

      {reservations &&
        <FlatList
          data={filteredReservations ? filteredReservations : reservations}
          renderItem={renderReservation} />
      }
    </View>
  )
}

export default AdminReservations
import { View, Text, Modal, TouchableOpacity, FlatList, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReservationCard, { Reservation } from '../../components/ReservationCardAdmin';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAdminReservationsAsync, updateAdminReservationsAsync } from '../../redux/reservationSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';



const AdminRequests = () => {

    const [filteredDate, setFilteredDate] = useState<Date>(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const requests = useSelector((state: RootState) => state.reservation.reservations.filter((r) => r.status === 1))
    const token = useSelector((state: RootState) => state.token.token);

    const [filteredRequests, setFilteredRequests] = useState<Reservation[] | null>(null);

    useEffect(() => {
        if (token) {
            dispatch(getAdminReservationsAsync({ token: token })
            )
        }
    }, [])

    const handleApprove = (reservationId: number) => {
        Alert.alert("Warning", "Do you want to approve the reservation request?", [
            {
                text: "YES",
                onPress: () => {
                    if (token) {
                        dispatch(updateAdminReservationsAsync({ token: token, reservation_id: reservationId, status: 2 }))
                            .then(() => {
                                if (filteredRequests) {
                                    const updatedList = filteredRequests.filter((r) => r.id !== reservationId);
                                    setFilteredRequests(updatedList);
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

    const handleCancel = (reservationId: number) => {
        //databaseden sil
        Alert.alert("Warning", "Do you want to delete the reservation request?", [
            {
                text: "YES",
                onPress: () => {
                    if (token) {
                        dispatch(updateAdminReservationsAsync({ token: token, reservation_id: reservationId, status: 3 }))
                            .then(() => {
                                if (filteredRequests) {
                                    const updatedList = filteredRequests.filter((r) => r.id !== reservationId);
                                    setFilteredRequests(updatedList);
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
        setShowDatePicker(Platform.OS == 'ios');
        if (selectedDate) {
            setFilteredDate(selectedDate);
            const newRequests = requests.filter((r) => r.date === selectedDate.toISOString().slice(0, 10));
            setFilteredRequests(newRequests);
        } else {
            // Eğer tarih belirtilmezse, tüm rezervasyonları göstermek için filtrelemeyi kaldır
            setFilteredDate(new Date()); // Tarihi sıfırla
            setFilteredRequests(requests); // Tüm rezervasyonları göster
        }
    };

    const renderRequest = ({ item }: { item: Reservation }) => (
        <ReservationCard handleCancel={() => item.id && handleCancel(item.id)} handleApprove={() => item.id && handleApprove(item.id)} key={item.id} id={item.id} restaurant_id={item.restaurant_id} user_id={item.user_id} person={item.person} date={item.date} check_in_time={item.check_in_time} note={item.note} status={item.status} check_out_time={item.check_out_time} is_child={item.is_child} isAdmin={true} />
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#f0a202' }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20, justifyContent: 'space-around', alignItems: 'center', marginRight: 20 }}>
                <TouchableOpacity onPress={() => handleDateChange()}
                    style={{ borderWidth: 1, borderRadius: 25, padding: 10, marginHorizontal: 25 }}>
                    <MaterialIcons name="filter-list-off" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}
                    style={{ borderWidth: 1, borderRadius: 25, padding: 10, marginHorizontal: 25 }}>
                    <AntDesign name="calendar" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {/* 
            {filteredDate &&
                <Text style={{alignSelf:'center', fontSize:20, fontWeight:'700'}}>
                    {filteredDate.toISOString().slice(0, 10)}
                </Text>
            } */}

            <Modal visible={showDatePicker} animationType="slide" transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <DateTimePicker
                            value={filteredDate}
                            mode="date"
                            display="calendar"
                            minimumDate={new Date()}
                            onChange={(event, selectedDate) => handleDateChange(selectedDate)}
                        />
                    </View>
                </View>
            </Modal>
            {
                requests &&
                <FlatList
                    data={filteredRequests ? filteredRequests : requests}
                    renderItem={renderRequest}
                />
            }
        </View >
    )
}
export default AdminRequests
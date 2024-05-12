import { View, Text, Modal, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReservationCard, { reservationProps } from '../../components/ReservationCard';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker'
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../../redux/reservationSlice';
import { deleteRequest } from '../../redux/requestSlice';
import { RootState } from '../../redux/store';


const AdminRequests = () => {

    const [requests, setRequests] = useState<reservationProps[]>([])

    const today = new Date()
    const tomorrow = new Date(today.getTime()) // Add one day => + (1000 * 60 * 60 * 24)) 
    const startDate = tomorrow.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const dateParts = startDate.split('/')
    // Rebuild the date string in YYYY/MM/DD format
    const formattedStartDate = `${dateParts[2]}/${dateParts[0]}/${dateParts[1]}`

    const dispatch = useDispatch()
    const allRequests = useSelector((state: RootState) => state.request.requests)

    useEffect(() => {
        setRequests(allRequests)
    }, [allRequests])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("")
    console.log(selectedDate)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleApprove = (reservation: reservationProps) => {
        //database e kaydet
        Alert.alert("Warning", "Do you want to approve the reservation request?", [
            {
                text: "YES",
                onPress: () => {
                    dispatch(addReservation(reservation))
                    dispatch(deleteRequest(reservation.reservationId))
                }
            },
            {
                text: "NO",
                style: 'cancel'
            }
        ])

    }

    const handleCancel = (reservationId: string) => {
        //databaseden sil
        Alert.alert("Warning", "Do you want to delete the reservation request?", [
            {
                text: "YES",
                onPress: () => dispatch(deleteRequest(reservationId))
            },
            {
                text: "NO",
                style: 'cancel'
            }
        ])
    }

    const renderRequest = ({ item, index }: { item: reservationProps, index: number }) => (
        <ReservationCard handleCancel={() => handleCancel(item.reservationId)} handleApprove={() => handleApprove(item)} key={item.reservationId} reservationId={item.reservationId} placeId={item.placeId} name={item.name} tableId={item.tableId} numberOfPeople={item.numberOfPeople} date={item.date} time={item.time} />
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#f0a202' }}>
            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 40, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>REQUESTS</Text>
                <AntDesign onPress={showDatePicker} style={{ alignSelf: 'center', position: 'absolute', right: 15, }} name="calendar" size={30} color="black" />
            </View>
            <Modal visible={isDatePickerVisible} onDismiss={hideDatePicker}>
                <View style={{ width: '90%', alignSelf: 'center', alignItems: 'center', marginTop: '50%' }}>
                    <DatePicker mode='calendar'
                        selected={selectedDate}
                        minimumDate={formattedStartDate}
                        onDateChange={(newDate) => setSelectedDate(newDate)}
                        options={{ textHeaderColor: '#f0a202', borderColor: '#f0a202', textDefaultColor: '#f0a202', textSecondaryColor: 'black' }}
                    />
                    <TouchableOpacity onPress={hideDatePicker}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', color: 'black' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <FlatList
                data={requests}
                renderItem={renderRequest} />
        </View>
    )
}

export default AdminRequests
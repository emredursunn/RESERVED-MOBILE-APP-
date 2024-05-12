import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


export type reservationProps = {
    reservationId: string
    placeId: string,
    tableId: string,
    name: string,
    numberOfPeople: number,
    date: string,
    time: string,
    handleApprove?: (reservation: reservationProps) => void,
    handleCancel?: (reservationId: string) => void
}

const ReservationCard = ({ reservationId, placeId, name, tableId, numberOfPeople, date, time, handleApprove, handleCancel }: reservationProps) => {

    const dimensions = Dimensions.get("screen")

    const handleApprovePress = () => {
        if (handleApprove) {
            handleApprove({
                reservationId,
                placeId,
                tableId,
                name,
                numberOfPeople,
                date,
                time,
            });
        }
    };

    const handleCancelPress = () => {
        if (handleCancel) {
            handleCancel(reservationId);
        }
    };

    return (
        <View style={{
            width: dimensions.width / 1.1,
            borderRadius: 30,
            borderWidth: 1,
            padding: 10,
            alignSelf: 'center',
            marginVertical: 10,
            flexDirection: 'row',
            backgroundColor: '#fff'
        }}>
            <View style={{
                justifyContent: 'center',
                width: '50%'
            }}>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Name: {name}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Table: {tableId}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Number of People: {numberOfPeople}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Date: {date}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Time: {time}
                </Text>
            </View>
            <View style={{ width: '50%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                {handleApprove && (
                    <TouchableOpacity onPress={handleApprovePress}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500', color: 'green' }}>Approve</Text>
                    </TouchableOpacity>
                )}
                {handleCancel &&
                    <TouchableOpacity onPress={handleCancelPress}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500', color: 'red' }}>Delete</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default ReservationCard
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

export type Reservation = {
    restaurant_id: number;
    person: number;
    check_in_time: string | Date;
    date: string | Date;
    user_id?: number;
    note?: string;
    is_child?: boolean;
    status?: number;
    id?: number;
    check_out_time?: string;
    isAdmin?: boolean,
    handleApprove?: (reservationId: number) => void,
    handleCancel?: (reservationId: number) => void,
    handleGoDetailedPlace?: (reservationId: number) => void
    handleReview?: (restaurantId: number) => void,
};

const ReservationCardAdmin = ({
    id,
    user_id,
    restaurant_id,
    date,
    check_in_time,
    check_out_time,
    note,
    person,
    status,
    is_child,
    isAdmin,
    handleApprove,
    handleCancel,
    handleGoDetailedPlace,
}: Reservation) => {

    const dimensions = Dimensions.get("screen");
    const [isAvailable, setIsAvaliable] = useState(true)

    useEffect(() => {
        handleAvaliable()
    }, [status])

    const handleAvaliable = () => {
        switch (status) {
            case 1:
                setIsAvaliable(true)
                break
            case 2:
                setIsAvaliable(true)
                break
            case 3:
                setIsAvaliable(false)
                break
            case 4:
                setIsAvaliable(false)
                break
            case 4:
                setIsAvaliable(false)
                break
            default:
                break
        }
    }

    const handleApprovePress = () => {
        if (handleApprove && id) {
            handleApprove(id);
        }
    };

    const handleCancelPress = () => {
        if (handleCancel && id) {
            handleCancel(id)
        }
    };

    const handleGoDetailedPlacePress = () => {
        if (handleGoDetailedPlace && id) {
            handleGoDetailedPlace(restaurant_id)
        }
    }

    return (
        <View style={{
            width: dimensions.width / 1.1,
            borderRadius: 30,
            borderWidth: 1,
            padding: 25,
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
                    Reservation ID: {id}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Number of People: {person}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Date: {date.toString()}
                </Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                    Time: {check_in_time.toString().slice(0, 5)}
                </Text>
                {check_out_time && (
                    <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                        Check-out Time: {check_out_time}
                    </Text>
                )}
                {note && (
                    <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500' }}>
                        note: {note}
                    </Text>
                )}
            </View>
            <View style={{ width: '50%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                {isAdmin && handleApprove && (
                    <TouchableOpacity onPress={handleApprovePress}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500', color: 'green' }}>Approve</Text>
                    </TouchableOpacity>
                )}
                {isAvailable && handleCancel && (
                    <TouchableOpacity onPress={handleCancelPress}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500', color: 'red' }}>Cancel</Text>
                    </TouchableOpacity>
                )}
                {handleGoDetailedPlace && (
                    <TouchableOpacity onPress={handleGoDetailedPlacePress}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: '500', color: 'red' }}>{`>`}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ReservationCardAdmin;

import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Reservation } from './ReservationCardAdmin'
import { BASE_URL, getRestaurantDetails, statusList } from '../utils/utils'
import { DetailedPlace } from '../screens/CustomerScreens/DetailedPlace'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const ReservationCardUser = (props: Reservation) => {
    const { id, user_id, restaurant_id, date, check_in_time, check_out_time, note, person, status, is_child, handleCancel, handleGoDetailedPlace, handleReview } = props;

    const dimensions = Dimensions.get("screen");
    const WIDTH = dimensions.width / 1.2
    const HEIGHT = dimensions.height / 5

    const [place, setPlace] = useState<DetailedPlace | null>(null)
    const [isCancellable, setIsCancellable] = useState(true)
    const [isReviewable, setIsReviewable] = useState(false)
    const [statusText, setStatusText] = useState(status ? statusList[status - 1].name : "")
    const [statusColor, setStatusColor] = useState(status ? statusList[status - 1].color : "#fff")
    const token = useSelector((state: RootState) => state.token.token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const place = await getRestaurantDetails({ restaurantId: restaurant_id });
                setPlace(place)
                console.log("place", place)
            }
            catch (error) {
                console.log(error)
                throw error
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        handleOnChangeStatus()
        setStatusColor(status ? statusList[status - 1].color : "#fff")
        setStatusText(status ? statusList[status - 1].name : "")
    }, [status, isReviewable])

    const handleOnChangeStatus = async () => {
        switch (status) {
            case 1:
                setIsCancellable(true)
                setIsReviewable(false)
                break
            case 2:
                setIsCancellable(true)
                setIsReviewable(false)
                break
            case 3:
                setIsCancellable(false)
                setIsReviewable(false)
                break
            case 4:
                setIsCancellable(false)
                setIsReviewable(false)
                break
            case 5:
                setIsCancellable(false)
                if(await isReviewed()){
                    setIsReviewable(false)
                }else{
                    setIsReviewable(true)
                }
                break
            default:
                break
        }
    }

    const convertTime = (time: string): string => {
        return time.slice(0, 5)
    }

    const isReviewed = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/reservation/reviews/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const reviews : any[] = response.data.data;
            console.log("yorum",reviews)
            console.log("rid", restaurant_id)
            const hasReviewed = reviews.some(review => review.restaurant_id == restaurant_id);
            console.log(hasReviewed)
            return hasReviewed; 
        } catch (error) {
            console.error(error);
            return false;
        }
    };


    return (
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', height: HEIGHT, width: WIDTH, backgroundColor: '#dce0d9', borderRadius: 20, marginVertical: 10, padding:20 }} onPress={handleGoDetailedPlace && id ? () => handleGoDetailedPlace(restaurant_id) : undefined}>
            <View style={{ flex: 2, justifyContent: 'center', marginLeft: 20 }}>
                {place && <Image source={{ uri: place.image[0] ? place.image[0] : undefined }} resizeMode='cover' style={{ width: '100%', height: '80%', borderRadius: 20, paddingRight: 50 }} />}
            </View>
            <View style={{ flex: 5, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 25, color: '#f0a202', fontStyle: 'italic' }}>{place?.name}</Text>
                <Text style={{ fontSize: 18 }}>{date.toString()}</Text>
                <Text style={{ fontSize: 18 }}>{convertTime(check_in_time.toString())}</Text>
                <Text style={{ fontSize: 18 }}>Guests: {person}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: statusColor, marginRight: 20 }}>{statusText}</Text>
                    {isCancellable && <TouchableOpacity onPress={handleCancel && id ? () => handleCancel(id) : undefined}>
                        <Text style={{ fontSize: 18, color: '#f0a202' }}>Cancel</Text>
                    </TouchableOpacity>}
                    {isReviewable && <TouchableOpacity onPress={handleReview ? () => handleReview(restaurant_id) : undefined}>
                        <Text style={{ fontSize: 18, color: '#f0a202' }}>Review</Text>
                    </TouchableOpacity>}

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ReservationCardUser
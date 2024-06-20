import { View, Text, ImageBackground, TouchableOpacity, Modal, Dimensions, TextInput, Alert, FlatList, Image, Platform, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BASE_URL, formatImageUrl, getRestaurantDetails } from '../../utils/utils'
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { Reservation } from '../../components/ReservationCardAdmin'
import { ReservationStackParams } from '../../navigation/UserReservationStackNav'
import { AppDispatch, RootState } from '../../redux/store'
import ReviewCard, { ReviewCardProps } from '../../components/ReviewCard';
import { createReservationAsync } from '../../redux/reservationSlice';
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HomeStackParams } from '../../navigation/UserHomeStackNav';



type Props = NativeStackScreenProps<HomeStackParams, "DetailedPlace">

export type DetailedPlace = {
    id: number,
    name: string,
    address: string,
    image: Array<string | null>,
    reviews: ReviewCardProps[]
}


type SwiperImage = {
    id: number,
    url: string
}

const DetailedPlace = ({ navigation, route }: Props) => {

    const token = useSelector((state: RootState) => state.token.token)
    const dimensions = Dimensions.get("screen")
    const ITEM_WIDTH = dimensions.width
    const dispatch = useDispatch<AppDispatch>()
    const restaurantId = route.params.id
    const [selectedPlace, setSelectedPlace] = useState<DetailedPlace | null>(null)
    const [filteredImages, setFilteredImages] = useState<SwiperImage[]>([{ id: 0, url: "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" }])

    const guestsOptions = ['1-2', '2-5', '5-10', '10-15', '15-20'];

    const times = [
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:30',
        '18:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
    ];

    const [info, setInfo] = useState(0)
    const [visible, setVisible] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(guestsOptions[0]);

    const [formState, setFormState] = useState<{
        person: number;
        note: string;
        date: Date;
        check_in_time: string;
        isChild: boolean;
    }>({
        person: 0,
        note: "",
        date: new Date(),
        check_in_time: "",
        isChild: false,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const place = await getRestaurantDetails({ restaurantId });
                setSelectedPlace(place);
                const images = place.image.filter((i) => i !== null) as string[];
                if (images.length > 0) {
                    const formattedImages = images.map((url, index) => ({ id: index, url }));
                    setFilteredImages(formattedImages);
                }
            } catch (error) {
                console.error('Failed to fetch restaurant details:', error);
                throw error;
            }
        };

        fetchData();
    }, [restaurantId, token]);


    const setStars = () => {
        if (selectedPlace?.reviews && selectedPlace.reviews.length > 0) {
            const totalStars = selectedPlace.reviews.reduce((acc, review) => acc + review.star_count, 0);
            const rating = Math.floor(totalStars / selectedPlace.reviews.length); // round to the nearest integer
            return Array(rating).fill(null).map((_, index) => (
                <AntDesign key={index} name="star" size={18} color="orange" style={{ opacity: .8 }} />
            ));
        } else {
            return null;  // No reviews, no stars
        }
    };
    const handleBookTable = () => {
        const { person, date, check_in_time } = formState;
        if (person && date && check_in_time) {
            const newReservation: Reservation = {
                restaurant_id: restaurantId, ...formState
            }
            if (token) {
                dispatch(createReservationAsync({ reservation: newReservation, token: token }))
                setVisible(false)
                Alert.alert("Rezervasyon isteğiniz oluşturuldu.")
            }
        } else {
            Alert.alert("Zorunlu yerleri doldurunuz.")
        }
    }

    const handleModal = () => {
        if (token) {
            setVisible(true)
        } else {
            Alert.alert("Warning", "You have to login for booking", [
                {
                    text: 'Cancel',
                    style: 'cancel'
                }, {
                    text: "Login",
                    onPress: () => {
                        navigation.navigate("Login")
                    }
                }
            ])
        }
    }
    const handleInputChange = (field: string, value: string | number | Date) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const renderReview = ({ item, index }: { item: ReviewCardProps, index: number }) => (
        <ReviewCard key={index} id={item.id} user_id={item.user_id} name={item.name} comment={item.comment} restaurant_id={item.restaurant_id} star_count={item.star_count} />
    )


    return (
        selectedPlace &&
        <View style={{ flex: 1 }}>
            <StatusBar animated={true} backgroundColor='#f0a202' />
            <View style={{ flex: 4 }}>
                <Swiper showsButtons={true} autoplay horizontal loop activeDotColor='#f0a202' style={{ backgroundColor: 'white' }} dotStyle={{ backgroundColor: 'white' }} nextButton={<Text style={{ color: 'white', fontSize: 50 }}>›</Text>} prevButton={<Text style={{ color: 'white', fontSize: 50 }}>‹</Text>}>
                    {filteredImages.map((obj, index) => (
                        <Image key={index}
                            style={{ width: ITEM_WIDTH, height: '100%' }}
                            source={{ uri: obj.url }}
                        />
                    ))}
                </Swiper>

            </View >
            <View style={{ flex: 6 }}>
                <Text style={{ fontSize: 34, color: '#f0a202', fontStyle: 'italic', margin: 10 }}>{selectedPlace.name}</Text>
                <Text style={{ marginLeft: 10 }}>{setStars()}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => setInfo(0)}
                        style={{ borderBottomWidth: 2, borderBottomColor: info === 0 ? '#f0a202' : "transparent", margin: 10 }}>
                        <Text style={{ fontSize: 24 }}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInfo(1)}
                        style={{ borderBottomWidth: 2, borderBottomColor: info === 1 ? '#f0a202' : "transparent", margin: 10 }}>
                        <Text style={{ fontSize: 24 }}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Menu", { restaurantId: restaurantId })}
                        style={{ position: 'absolute', right: 1, margin: 10 }}>
                        <Text style={{ fontSize: 24, fontStyle: 'italic', color: '#f0a202', textDecorationLine: 'underline' }}>Menu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, marginHorizontal: 5 }}>
                    {info === 0 ?
                        <Text style={{ fontSize: 24, fontStyle: 'italic' }}>
                            Details
                        </Text>
                        :
                        <FlatList data={selectedPlace?.reviews} renderItem={renderReview} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} />
                    }
                </View>
                <View style={{ flex: 2, marginTop: 5 }}>
                    <TouchableOpacity onPress={handleModal} style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0a202', padding: 10, width: '80%' }}>
                        <Text style={{ fontSize: 24, color: '#fff' }}>Book a Table</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={visible} onRequestClose={() => setVisible(false)} onDismiss={() => { setVisible(false) }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Guests</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.radioContainer}>
                                {guestsOptions.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.radioButton, selectedGuests === option && styles.selectedRadioButton]}
                                        onPress={() => {
                                            setSelectedGuests(option)
                                            const splittedOption = option.split("-")[0]
                                            handleInputChange('person', parseInt(splittedOption))
                                        }
                                        }>
                                        <Text style={styles.radioText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Date</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }}>
                                <Text>{formState.date.toDateString()}</Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={formState.date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(Platform.OS === 'ios');
                                        if (selectedDate) {
                                            console.log(selectedDate)
                                            handleInputChange('date', selectedDate);
                                        }
                                    }}
                                />
                            )}
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pick Time</Text>
                            <View style={styles.timeContainer}>
                                {times.map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        style={[styles.timeButton, formState.check_in_time === time && styles.selectedTimeButton]}
                                        onPress={() => handleInputChange('check_in_time', time)}
                                    >
                                        <Text style={styles.timeText}>{time}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Write note</Text>
                            <TextInput multiline textAlignVertical='top' value={formState.note} onChangeText={(value) => handleInputChange("note", value)} style={{ borderRadius: 10, width: dimensions.width / 1.2, padding: 10, borderWidth: 1, marginVertical: 5, height: 90 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                            <TouchableOpacity onPress={() => setVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 25, backgroundColor: '#f0a202', alignItems: 'center', borderRadius: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '600', color: '#fff' }}>{"<-"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleBookTable} style={{ backgroundColor: '#f0a202', paddingHorizontal: 50,padding:10, borderRadius: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>Reserve</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scrollContainer: {
        padding: 20
    },
    section: {
        marginBottom: 20,

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    },
    radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    radioButton: {
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 10,
        width: '30%',
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        alignItems: 'center'
    },
    selectedRadioButton: {
        backgroundColor: '#f0a202',
        color: '#fff'
    },
    radioText: {
        fontSize: 14,
        color: '#000'
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center'
    },
    selectedDateButton: {
        backgroundColor: '#000',
        color: '#fff'
    },
    dateText: {
        color: '#000'
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    timeButton: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 10,
        width: '30%',
        alignItems: 'center'
    },
    selectedTimeButton: {
        backgroundColor: '#f0a202',
        color: '#fff'
    },
    timeText: {
        color: '#000'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    reserveButton: {
        backgroundColor: '#f0a202',
        padding: 10,
        borderRadius: 5
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});


export default DetailedPlace

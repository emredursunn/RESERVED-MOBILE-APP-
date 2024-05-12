import { View, Text, ImageBackground, TouchableOpacity, Modal, Dimensions, TextInput, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { allPlaces, tableCategories } from '../../utils/utils'
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { addReservation } from '../../redux/reservationSlice'
import { reservationProps } from '../../components/ReservationCard'
import { ReservationStackParams } from '../../navigation/UserReservationStackNav'
import { RootState } from '../../redux/store'
import ReviewCard, { ReviewCardProps } from '../../components/ReviewCard';


type Props = NativeStackScreenProps<ReservationStackParams, "DetailedPlace">

const DetailedPlace = ({ navigation, route }: Props) => {

    const isAuth = useSelector((state: RootState) => state.token.token)

    const dimensions = Dimensions.get("screen")
    const dispatch = useDispatch()
    const { id } = route.params
    const [info, setInfo] = useState(0)
    const [visible, setVisible] = useState(false)
    const [numberOfPeople, setNumberOfPeople] = useState("")
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [selectedTableCategory, setSelectedTableCategory] = useState(0)

    const findPlaceById = (id: number) => {
        for (const placeCategory of allPlaces) {
            const foundPlace = placeCategory.find(place => place.id === id);
            if (foundPlace) {
                return foundPlace;
            }
        }
        return undefined;
    }

    const selectedPlace = findPlaceById(id)

    const setStars = () => {
        const starArray = Array(selectedPlace?.stars).fill(null).map((_, index) => (
            <AntDesign key={index} name="star" size={18} color="orange" style={{ opacity: .8 }} />
        ));
        return starArray;
    }

    const handleBookTable = () => {
        //databaseye kaydet
        if (numberOfPeople && date && time) {
            const newReservation: reservationProps = {
                name: "Emre",
                reservationId: Math.floor(Math.random() * 10000).toString(),
                placeId: id.toString(),
                tableId: Math.floor(Math.random() * 10).toString(),
                numberOfPeople: parseInt(numberOfPeople),
                date: date,
                time: time
            }
            dispatch(addReservation(newReservation))
            setVisible(false)
            Alert.alert("Rezervasyon isteğiniz oluşturuldu.")
            navigation.navigate("Reservations")
        } else {
            Alert.alert("Zorunlu yerleri doldurunuz.")
        }
    }

    const handleModal = () => {
        if (isAuth) {
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

    const renderReview = ({ item, index }: { item: ReviewCardProps, index: number }) => (
        <ReviewCard key={index} id={item.id} userId={item.userId} comment={item.comment} placeId={item.placeId} stars={item.stars} />
    )


    return (
        selectedPlace &&
        <View style={{ flex: 1 }}>
            <StatusBar animated={true} backgroundColor='tomato' />
            <View style={{ flex: 4 }}>
                <ImageBackground source={{ uri: selectedPlace.cover }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ flex: 6 }}>
                <Text style={{ fontSize: 34, color: 'tomato', fontStyle: 'italic', margin: 10 }}>{selectedPlace.name}</Text>
                <Text style={{ marginLeft: 10 }}>{setStars()}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => setInfo(0)}
                        style={{ borderBottomWidth: 2, borderBottomColor: info === 0 ? 'tomato' : "transparent", margin: 10 }}>
                        <Text style={{ fontSize: 24 }}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInfo(1)}
                        style={{ borderBottomWidth: 2, borderBottomColor: info === 1 ? 'tomato' : "transparent", margin: 10 }}>
                        <Text style={{ fontSize: 24 }}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Menu")}
                        style={{ position:'absolute', right:1, margin: 10 }}>
                        <Text style={{ fontSize: 24, fontStyle:'italic', color:'tomato', textDecorationLine:'underline' }}>Menu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, marginHorizontal: 5}}>
                    {info === 0 ?
                        <Text style={{ fontSize: 24, fontStyle: 'italic' }}>
                            Details
                        </Text>
                        :
                        <FlatList data={selectedPlace?.reviews} renderItem={renderReview} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} />

                    }
                </View>
                <View style={{ flex: 2, marginTop: 5 }}>
                    <TouchableOpacity onPress={handleModal} style={{ borderRadius: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'tomato', padding: 10, width: '80%', marginBottom: 10 }}>
                        <Text style={{ fontSize: 24, color: '#fff' }}>Book a Table</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={visible} onRequestClose={() => setVisible(false)} onDismiss={() => { setVisible(false) }}>
                <ImageBackground source={require('../../../assets/imagebackground.png')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 30, alignSelf: 'center', marginBottom: 10, fontWeight: 'bold', fontStyle: 'italic' }}>BOOK A TABLE </Text>

                    <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ textAlign: 'left' }}>*People Count:</Text>
                        <TextInput keyboardType='decimal-pad' value={numberOfPeople} onChangeText={setNumberOfPeople} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
                    </View>
                    <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>*Date :</Text>
                        <TextInput value={date} onChangeText={setDate} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
                    </View>
                    <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>*Time :</Text>
                        <TextInput value={time} onChangeText={setTime} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
                    </View>
                    <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>Note :</Text>
                        <TextInput value={note} onChangeText={setNote} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
                    </View>
                    <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>Category :</Text>
                        <SelectList
                            boxStyles={{ width: dimensions.width / 1.9, borderColor: 'black', borderRadius: 20, borderWidth: 1, height: 60, alignItems: 'center', marginBottom: 15 }}
                            dropdownStyles={{ borderColor: '#fff' }} setSelected={(val: any) => setSelectedTableCategory(val)}
                            data={tableCategories}
                            save="key"
                            defaultOption={selectedTableCategory ? tableCategories[selectedTableCategory] : (tableCategories[0] && tableCategories[0])}
                            placeholder={selectedTableCategory ? tableCategories[selectedTableCategory].value : (tableCategories[0] && tableCategories[0].value)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 25, backgroundColor: 'tomato', alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '600', color: '#fff' }}>{"<-"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleBookTable} style={{ backgroundColor: 'tomato', padding: 15, borderRadius: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal >
        </View >
    )
}

export default DetailedPlace
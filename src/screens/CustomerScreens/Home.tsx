import { View, TextInput, TouchableOpacity, Text, Dimensions, Modal, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import CategoryCard, { CategoryCardProps } from '../../components/CategoryCard';
import PlaceCard, { PlaceCardProps } from '../../components/PlaceCard';
import { BASE_URL, Category, categoryPhotos, getAllPlaces, getPlaceCategories } from '../../utils/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/UserHomeStackNav';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { clearFavorites, getFavoritesAsync } from '../../redux/favoriteSlice';
import axios from 'axios';
import { clearToken } from '../../redux/tokenSlice';
import { clearReservations } from '../../redux/reservationSlice';
import { clearUser } from '../../redux/userSlice';

type Props = NativeStackScreenProps<HomeStackParams, "Home">


const Home = ({ navigation }: Props) => {

    const token = useSelector((state: RootState) => state.token.token)
    const [search, setSearch] = useState("");
    const dimensions = Dimensions.get("screen")
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [allPlaces, setAllPlaces] = useState<PlaceCardProps[][] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        getPlaceCategories()
            .then((categories) => setCategories(categories))
            .catch((error) => console.log('Error fetching categories:', error))
    }, [])

    useEffect(() => {
        if (token) {
            dispatch(getFavoritesAsync({ token }))
        }
    }, [])

    useEffect(() => {
        getAllPlaces()
            .then((places) => setAllPlaces(places))
            .catch((error) => console.error('Error fetching places:', error));
    }, []);

    const handleOnPressCategory = (id: number) => {
        setSelectedCategory(id)
    }

    const handleOnPressPlace = (id: number) => {
        navigation.navigate("DetailedPlace", { id })
    }

    const handleSearch = (search?: string) => {
        navigation.navigate("Search", { search: search ? search : "" })
    }

    const handleOnPressProfile = () => {
        if (token) {
            setDropdownVisible((value) => !value)
            setModalVisible(true)
        } else {
            Alert.alert("Warning", "Do you want to login?", [
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

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/user-logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            dispatch(clearReservations())
            dispatch(clearFavorites())
            dispatch(clearUser())
            dispatch(clearToken())
        } catch (error) {
            console.log(error)
            Alert.alert("Sorun meydana geldi.")
        }
    }

    const renderCategory = ({ item, index }: { item: Category, index: number }) => (
        <CategoryCard key={item.key - 1} id={item.key - 1} name={item.value} cover={categoryPhotos[item.key - 1]} onPress={() => handleOnPressCategory(item.key - 1)} />
    );

    const renderPlaceCards = ({ item, index }: { item: PlaceCardProps, index: number }) => (
        <PlaceCard key={item.id} id={item.id} categoryId={item.categoryId} name={item.name} star_count={item.star_count} image_cover={item.image_cover} onPress={() => handleOnPressPlace(item.id)} />
    );
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar animated={true} backgroundColor='#f0a202' />
                {/* SEARCH BAR */}
                <View style={{ width: dimensions.width, height: '15%', alignSelf: 'center', flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0a202' }}>
                    <Text style={{ fontStyle: 'italic', fontSize: 26, fontWeight: 'bold', color: '#fff' }}>RESERVED</Text>
                    <TouchableOpacity onPress={handleOnPressProfile} style={{ position: 'absolute', right: 10, padding: 10, borderRadius: 10, backgroundColor: '#fff' }}>
                        <FontAwesome5 name="user" size={30} color="#f0a202" />
                    </TouchableOpacity>
                </View>
                {dropdownVisible && (
                    <View style={{ width: '25%', alignSelf: 'flex-end', backgroundColor: 'white', borderRadius: 10, padding: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                        <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
                            <Text style={{ color: '#f0a202', fontSize: 16 }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={{ width: dimensions.width / 1.1, flexDirection: 'row', alignSelf: 'center', marginVertical: 10, borderColor: '#f0a202', borderWidth: 2, borderRadius: 12 }}>
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Search restaurant..'
                        style={{ flex: 1, backgroundColor: 'white', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                    />
                    <TouchableOpacity onPress={() => handleSearch(search)} style={{ backgroundColor: '#f0a202', padding: 12, borderTopEndRadius: 10, borderBottomRightRadius: 10, shadowOffset: { height: 2, width: 2 }, shadowColor: 'white', shadowOpacity: 0.8 }}>
                        <AntDesign name="search1" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', alignSelf: 'flex-start' }}>Categories</Text>
                </View>
                {/* CATEGORIES */}
                <View style={{ flexDirection: 'row' }}>
                    {categories && categories.map((item, index) => renderCategory({ item, index }))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', alignSelf: 'flex-start' }}>Featured</Text>
                    <TouchableOpacity onPress={() => handleSearch()}>
                        <Text style={{ fontSize: 14, color: 'gray' }}>Show all</Text>
                    </TouchableOpacity>
                </View>
                {/* RESTAURANTS */}
                {allPlaces && allPlaces[selectedCategory].map((item, index) => renderPlaceCards({ item, index }))}
            </ScrollView>
        </TouchableWithoutFeedback >
    );
};

export default Home;

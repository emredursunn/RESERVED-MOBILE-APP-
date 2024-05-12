import { View, FlatList, TextInput, TouchableOpacity, Text, Dimensions, KeyboardAvoidingView, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import CategoryCard, { CategoryCardProps } from '../../components/CategoryCard';
import PlaceCard, { PlaceCardProps } from '../../components/PlaceCard';
import { allPlaces, categories } from '../../utils/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/UserHomeStackNav';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = NativeStackScreenProps<HomeStackParams, "Home">

const Home = ({ navigation }: Props) => {

    const isAuth = useSelector((state: RootState) => state.token.token)

    const [search, setSearch] = useState("");
    const dimensions = Dimensions.get("screen")

    const [selectedCategory, setSelectedCategory] = useState(0)

    const handleOnPressCategory = (id: number) => {
        setSelectedCategory(id)
    }

    const handleOnPressPlace = (id: number) => {
        navigation.navigate("DetailedPlace", { id })
    }

    const handleSearch = (search: string) => {
        navigation.navigate("Search", { search })
    }

    const showAllPlaces = () => {
        navigation.navigate("Search", { search: "" })
    }

    const handleOnPressProfile = () => {
        if (isAuth){
            navigation.navigate("Profile")
        }else{
            Alert.alert("Warning", "Do you want to login?", [
                {
                    text:'Cancel',
                    style:'cancel'
                },{
                    text: "Login",
                    onPress: () => {
                        navigation.navigate("Login")
                    }
                }
            ])
        }
    }

    const renderPlace = ({ item, index }: { item: PlaceCardProps, index: number }) => (
        <PlaceCard key={item.id} id={item.id} categoryId={item.categoryId} name={item.name} stars={item.stars} cover={item.cover} onPress={() => handleOnPressPlace(item.id)} />
    );

    const renderCategory = ({ item, index }: { item: CategoryCardProps, index: number }) => (
        <CategoryCard key={item.id} id={item.id} name={item.name} cover={item.cover} onPress={() => handleOnPressCategory(item.id)} />
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <StatusBar animated={true} backgroundColor='tomato' />
            {/* SEARCH BAR */}
            <View style={{ width: dimensions.width / 1.1, alignSelf: 'center', flexDirection: 'row', marginTop: '15%', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontStyle: 'italic', fontSize: 26, fontWeight: 'bold', color:'tomato' }}>RESERVED</Text>
                <TouchableOpacity onPress={handleOnPressProfile} style={{ position: 'absolute', right: 1, padding: 10, borderRadius: 10, backgroundColor: 'gray' }}>
                    <FontAwesome5 name="user" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ width: dimensions.width / 1.1, flexDirection: 'row', alignSelf: 'center', marginVertical: 10, borderColor: 'lightblue', borderWidth: 2, borderRadius: 12 }}>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Search restaurant..'
                    style={{ flex: 1, backgroundColor: 'white', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                />
                <TouchableOpacity onPress={() => handleSearch(search)} style={{ backgroundColor: 'lightblue', padding: 12, borderTopEndRadius: 10, borderBottomRightRadius: 10, shadowOffset: { height: 2, width: 2 }, shadowColor: 'white', shadowOpacity: 0.8 }}>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', alignSelf: 'flex-start' }}>Categories</Text>
            </View>
            {/* CATEGORIES */}
            <View style={{ flex: 2 }}>
                <FlatList data={categories} renderItem={renderCategory} horizontal showsHorizontalScrollIndicator={false} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', alignSelf: 'flex-start' }}>Featured</Text>
                <TouchableOpacity onPress={showAllPlaces}>
                    <Text style={{ fontSize: 14, color: 'gray' }}>Show all</Text>
                </TouchableOpacity>
            </View>
            {/* RESTAURANTS */}
            <View style={{ flex: 5 }}>
                <FlatList data={allPlaces[selectedCategory]} renderItem={renderPlace} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} />
            </View>
        </KeyboardAvoidingView>

    );
};

export default Home;

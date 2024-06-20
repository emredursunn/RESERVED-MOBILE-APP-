import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '../../navigation/AuthStackNav'
import { SelectList } from 'react-native-dropdown-select-list'
import { BASE_URL, Category, getPlaceCategories } from '../../utils/utils'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setToken } from '../../redux/tokenSlice'
import { Admin, setAdmin } from '../../redux/adminSlice'

type Props = NativeStackScreenProps<AuthStackParams, 'CreateRestaurant'>

type Restaurant = {
    category_id: 1,
    name: string,
    code?: string,
    address: string,
    phone: string,
    max_capacity: string,
    opening_time: string,
    closed_time: string
}

const CreateRestaurant = ({ route }: Props) => {

    const { firstname, lastname, email, password, passwordConfirmation, phone, age } = route.params
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const dimensions = Dimensions.get("screen");
    const [categories, setCategories] = useState<Category[]>([]);
    const [formState, setFormState] = useState<Restaurant>({
        category_id: 1,
        name: "",
        address: "",
        phone: "",
        max_capacity: "",
        opening_time: "",
        closed_time: ""
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getPlaceCategories();
            if (categories) {
                setCategories(categories);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (field: string, value: string | number) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleConfirm = async () => {
        try {
            await axios.post(`${BASE_URL}/api/auth/admin-signup`, {
                name: firstname + " " + lastname,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                phone: phone,
                age: age
            }
            )
            const response = await axios.post(`${BASE_URL}/api/auth/admin-login`, {
                "email": email,
                "password": password
            })

            const token = await response.data.token
            const role = await response.data.role

            await axios.post(`${BASE_URL}/api/admin/restaurant`, {
                "category_id": formState.category_id,
                "name": formState.name,
                "address": formState.address,
                "phone": formState.phone,
                "max_capacity": formState.max_capacity,
                "opening_time": formState.opening_time,
                "closed_time": formState.closed_time
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            Alert.alert("Kayıt Başarılı.")

            const response2 = await axios.get(`${BASE_URL}/api/admin/restaurant/myRestaurant`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const adminData: Admin = await response2.data.data
            dispatch(setAdmin(adminData))
            dispatch(setToken({ token: token, role: role }))
        } catch (error) {
            console.log("create error", error)
            throw error
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f0a202', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 35, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>SETTINGS</Text>
            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Restaurant Name:</Text>
                <TextInput
                    value={formState.name}
                    onChangeText={(value) => handleInputChange("name", value)}
                    placeholder='Restaurant Name'
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Phone:</Text>
                <TextInput
                    value={formState.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    placeholder='Phone'
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Address:</Text>
                <TextInput
                    value={formState.address}
                    onChangeText={(value) => handleInputChange("address", value)}
                    placeholder="Address"
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Max Capacity:</Text>
                <TextInput
                    value={formState.max_capacity}
                    onChangeText={(value) => handleInputChange("max_capacity", value)}
                    placeholder="Max Capacity"
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Opening Time:</Text>
                <TextInput
                    value={formState.opening_time}
                    onChangeText={(value) => handleInputChange("opening_time", value)}
                    placeholder="Opening Time"
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Closing Time:</Text>
                <TextInput
                    value={formState.closed_time}
                    onChangeText={(value) => handleInputChange("closed_time", value)}
                    placeholder="Closing Time"
                    style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
                />
            </View>

            <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Place Type:</Text>
                <SelectList
                    defaultOption={categories.find(cat => cat.key === formState.category_id)}
                    placeholder={"Select type"}
                    searchPlaceholder='Select type'
                    boxStyles={{ width: dimensions.width / 1.9, borderColor: '#fff', borderRadius: 20, borderWidth: 1, height: 60, alignItems: 'center', marginBottom: 10 }}
                    dropdownStyles={{ borderColor: '#fff' }}
                    setSelected={(val: string) => handleInputChange("category_id", parseInt(val))}
                    data={categories}
                    save="key"
                />
            </View>

            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 50 }} size={24} color={"blue"} />
            ) : (
                <TouchableOpacity onPress={handleConfirm} style={{ marginTop: 50, marginBottom: 25, borderRadius: 20, borderWidth: 2, padding: 10, paddingHorizontal: 50, backgroundColor: "orange" }}>
                    <Text>Save</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    )
}

export default CreateRestaurant
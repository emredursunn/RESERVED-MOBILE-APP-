import { View, Text, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Category, getPlaceCategories } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../redux/tokenSlice';
import axios from 'axios';
import { RootState } from '../../redux/store';


const AdminSettings = () => {

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [restaurantName, setRestaurantName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [maxCapacity, setMaxCapacity] = useState("")
  const [openingTime, setOpeningTime] = useState("")
  const [closingTime, setClosingTime] = useState("")

  const dispatch = useDispatch()
  const dimensions = Dimensions.get("screen")

  const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"
  const token = useSelector((state: RootState) => state.token.token)

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get(`${BASE_URL}/api/admin/restaurant/myRestaurant`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      const data = response.data.data
      console.log(data)
      setRestaurantName(data.name)
      setAddress(data.address)
      setMaxCapacity(data.max_capacity)
      setPhone(data.phone)
      setSelectedCategoryId(data.category_id)
      setOpeningTime(data.opening_time)
      setClosingTime(data.closed_time)
    }
    fetchInfo()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getPlaceCategories();
      if (categories) {
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);



  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin-logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      dispatch(clearToken())
    } catch (error) {
      console.log(error)
      Alert.alert("Sorun meydana geldi.")
    }
  }

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/restaurant`, {

        "category_id": selectedCategoryId,
        "name": restaurantName,
        "address": address,
        "phone": phone,
        "max_capacity": maxCapacity,
        "opening_time": openingTime,
        "closed_time": closingTime

      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      Alert.alert("Değişiklikler kaydedildi.")
    } catch (error) {
      console.log(error)
      Alert.alert("Sorun meydana geldi.")
    }
  }

  const stopRequests = () => {

  }

  const deleteRestaurant = () => {

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#f0a202', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 35, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>SETTINGS</Text>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Restaurant Name:</Text>
        <TextInput
          value={restaurantName}
          onChangeText={setRestaurantName}
          placeholder='Restaurant Name'
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Phone:</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder='Phone'
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Address:</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Adress"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>
      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Max Capacity:</Text>
        <TextInput
          value={maxCapacity}
          onChangeText={setMaxCapacity}
          placeholder="Max Capacity"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>
      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Opening Time:</Text>
        <TextInput
          value={openingTime}
          onChangeText={setOpeningTime}
          placeholder="Opening Time"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>
      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Opening Time:</Text>
        <TextInput
          value={closingTime}
          onChangeText={setClosingTime}
          placeholder="Closing Time"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Place Type:</Text>
        <SelectList
          defaultOption={categories ? categories[selectedCategoryId] : undefined}
          placeholder={"Select type"}
          searchPlaceholder='Select type'
          boxStyles={{ width: dimensions.width / 1.9, borderColor: '#fff', borderRadius: 20, borderWidth: 1, height: 60, alignItems: 'center', marginBottom: 10 }}
          dropdownStyles={{ borderColor: '#fff' }}
          setSelected={(val: any) => setSelectedCategoryId(parseInt(val))}
          data={categories ? categories : []}
          save="key"
        />
      </View>

      <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: 'black', padding: 15, borderRadius: 20 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>CONFIRM</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'black', padding: 18, borderRadius: 20, marginVertical: 15 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );

}

export default AdminSettings
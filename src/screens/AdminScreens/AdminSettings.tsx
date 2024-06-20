import { View, Text, TextInput, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { BASE_URL, Category, getPlaceCategories } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../redux/tokenSlice';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { clearFavorites } from '../../redux/favoriteSlice';
import { clearReservations } from '../../redux/reservationSlice';

const AdminSettings = () => {
  const [formState, setFormState] = useState({
    selectedCategoryId: 0,
    restaurantName: "",
    address: "",
    phone: "",
    maxCapacity: "",
    openingTime: "",
    closingTime: ""
  });

  const dispatch = useDispatch();
  const dimensions = Dimensions.get("screen");
  const token = useSelector((state: RootState) => state.token.token);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get(`${BASE_URL}/api/admin/restaurant/myRestaurant`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data.data;
      console.log(data);
      setFormState({
        restaurantName: data.name,
        address: data.address,
        maxCapacity: data.max_capacity.toString(),
        phone: data.phone,
        selectedCategoryId: data.category_id,
        openingTime: data.opening_time,
        closingTime: data.closed_time
      });
    };
    fetchInfo();
  }, []);

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

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin-logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      dispatch(clearReservations())
      dispatch(clearToken());
    } catch (error) {
      console.log(error);
      Alert.alert("Sorun meydana geldi.");
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}/api/admin/restaurant`, {
        "category_id": formState.selectedCategoryId,
        "name": formState.restaurantName,
        "address": formState.address,
        "phone": formState.phone,
        "max_capacity": formState.maxCapacity,
        "opening_time": formState.openingTime,
        "closed_time": formState.closingTime
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Alert.alert("Değişiklikler kaydedildi.");
    } catch (error) {
      console.log(error);
      Alert.alert("Sorun meydana geldi.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f0a202', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: '80%', marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Restaurant Name:</Text>
        <TextInput
          value={formState.restaurantName}
          onChangeText={(value) => handleInputChange("restaurantName", value)}
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
          value={formState.maxCapacity}
          onChangeText={(value) => handleInputChange("maxCapacity", value)}
          placeholder="Max Capacity"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Opening Time:</Text>
        <TextInput
          value={formState.openingTime}
          onChangeText={(value) => handleInputChange("openingTime", value)}
          placeholder="Opening Time"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Closing Time:</Text>
        <TextInput
          value={formState.closingTime}
          onChangeText={(value) => handleInputChange("closingTime", value)}
          placeholder="Closing Time"
          style={{ fontStyle: 'italic', fontSize: 16, borderColor: '#fff', width: dimensions.width / 1.9, borderWidth: 1, borderRadius: 20, padding: 15, shadowOffset: { height: 2, width: 0 }, shadowColor: 'gray', shadowOpacity: 1 }}
        />
      </View>

      <View style={{ width: '80%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, width: '30%', marginRight: '5%' }}>Place Type:</Text>
        <SelectList
          defaultOption={categories.find(cat => cat.key === formState.selectedCategoryId)}
          placeholder={"Select type"}
          searchPlaceholder='Select type'
          boxStyles={{ width: dimensions.width / 1.9, borderColor: '#fff', borderRadius: 20, borderWidth: 1, height: 60, alignItems: 'center', marginBottom: 10 }}
          dropdownStyles={{ borderColor: '#fff' }}
          setSelected={(val: string) => handleInputChange("selectedCategoryId", parseInt(val))}
          data={categories}
          save="key"
        />
      </View>

      <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: 'black', padding: 15, borderRadius: 20 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>CONFIRM</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'black', padding: 18, borderRadius: 20, marginVertical: 15 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AdminSettings;

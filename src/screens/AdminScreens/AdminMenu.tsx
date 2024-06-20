import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem, { MenuItemProps } from '../../components/MenuItem'
import { SelectList } from 'react-native-dropdown-select-list'
import { AntDesign, Feather } from '@expo/vector-icons';
import { getMenuCategories } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addItemToMenuAsync, deleteFromMenuAsync, getMenuAsync, updateMenuAsync } from '../../redux/MenuSlice';

const AdminMenu = () => {

  const dimensions = Dimensions.get("screen")
  const dispatch = useDispatch<AppDispatch>()

  const token = useSelector((state: RootState) => state.token.token)
  const restaurantId = useSelector((state: RootState) => state.admin.admin.id)
  const menu: MenuItemProps[][] = useSelector((state: RootState) => state.menu.menu)

  //0-FOODS         1-DRINKS              2-ALCOHOLS          3- OTHER
  const [menuCategories, setMenuCategories] = useState<{ key: number; value: string; }[]>([]);
  const [visible, setVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState<MenuItemProps | null>(null)
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    selectedCategory: 0
  });

  useEffect(() => {
    const fetchMenuCategories = async () => {
      const categories = await getMenuCategories();
      if (categories) {
        setMenuCategories(categories)
      }
    };
    fetchMenuCategories();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      dispatch(getMenuAsync({ restaurantId: restaurantId}))
    }
  }, [])


  const handleInputChange = (field: string, value: any) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const addItemToMenu = () => {
    const { name, description, price, selectedCategory } = formState;

    if (price && name) {
      const priceNumber = price.match(/^\d+$/);
      if (priceNumber && priceNumber.length === 1 && parseInt(price) > 0) {
        const newItem: MenuItemProps = {
          product_type_id: selectedCategory,
          description: description,
          price: parseFloat(price),
          name: name
        }
        if (token) {
          dispatch(addItemToMenuAsync({ product: newItem, token: token }))
        }

        setFormState({ name: "", description: "", price: "", selectedCategory: selectedCategory });
        Alert.alert("Ürün başarıyla eklendi")
      } else {
        Alert.alert("Fiyatı düzgün giriniz")
      }
    } else {
      Alert.alert("Eksiksiz giriniz")
    }
  }


  const deleteItemFromMenu = (item: MenuItemProps) => {
    Alert.alert("Warning", "Do you want to delete the product?", [
      {
        text: 'YES',
        onPress: () => {
          if (item.id !== undefined && token) {
            dispatch(deleteFromMenuAsync({ productId: item.id, token: token }))
          }
        }
      },
      {
        text: 'NO',
        style: 'cancel'
      }
    ])
  }

  const openEditModal = (item: MenuItemProps) => {
    setVisible(true);
    setIsEditing(true);
    setEditedItem(item);
    setFormState({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      selectedCategory: item.product_type_id
    });
  };
  const editItemFromMenu = () => {
    const { name, description, price, selectedCategory } = formState;
    if (token) {
      if (editedItem) {
        const priceNumber = price.match(/^\d+$/);
        if (priceNumber && priceNumber.length === 1 && parseInt(price) > 0) {
          const updatedItem: MenuItemProps = {
            id: editedItem.id,
            name,
            description,
            price: parseInt(price),
            product_type_id: selectedCategory
          }
          dispatch(updateMenuAsync({ product: updatedItem, token: token }))
          Alert.alert("Ürün Düzenlendi")
        } else {
          Alert.alert("Fiyatı düzgün giriniz")
        }
      } else {
        Alert.alert("Bilgileri eksiksiz giriniz")
      }
    }
  }

  const printMenu = () => {
    return menu.map((category, index) => {
      if (category.length > 0) {
        return (
          <View key={index}>
            {menuCategories[index] && (
              <Text style={{ color: '#fff', backgroundColor: 'orange', padding: 8, marginLeft: 10, fontSize: 24, borderRadius: 10 }}>
                {menuCategories[index].value}
              </Text>
            )}
            {category.map((item, itemIndex) => (
              <View key={itemIndex} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <MenuItem key={itemIndex} {...item} />
                <TouchableOpacity onPress={() => deleteItemFromMenu(item)}
                  style={{ marginHorizontal: 10 }}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <Feather name="edit-2" size={24} color="orange" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )
      }
      return null
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
        <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>MENU</Text>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 10 }}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={{ fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {printMenu()}

        <Modal visible={visible} onDismiss={() => {
          setVisible(false);
          setIsEditing(false);
        }}
          onRequestClose={() => {
            setVisible(false);
            setIsEditing(false);
          }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
              isEditing ?
                <Text style={{ fontSize: 30, alignSelf: 'center', marginBottom: 10, fontWeight: 'bold', fontStyle: 'italic' }}>EDIT ITEM</Text>
                :
                <Text style={{ fontSize: 30, alignSelf: 'center', marginBottom: 10, fontWeight: 'bold', fontStyle: 'italic' }}>ADD ITEM</Text>
            }

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ marginVertical: 5 }}>Name :</Text>
              <TextInput value={formState.name} onChangeText={(value) => handleInputChange("name", value)} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>
            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ marginVertical: 5 }}>Description :</Text>
              <TextInput value={formState.description} onChangeText={(value) => handleInputChange("description", value)} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>
            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ marginVertical: 5 }}>Price :</Text>
              <TextInput value={formState.price} onChangeText={(value) => handleInputChange("price", value)} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Category :</Text>
              <SelectList
                boxStyles={{ width: dimensions.width / 1.9, borderColor: 'black', borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}
                dropdownTextStyles={{ fontSize: 20 }}
                inputStyles={{ fontSize: 18 }}
                data={menuCategories}
                save="key"
                setSelected={(value: number) => handleInputChange("selectedCategory", value)}
                defaultOption={menuCategories.find((cat) => cat.key === formState.selectedCategory) || undefined}
              />
            </View>
            {
              isEditing ?
                <TouchableOpacity onPress={editItemFromMenu} style={{ backgroundColor: '#7d5fff', borderRadius: 20, padding: 10, width: '40%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={addItemToMenu} style={{ backgroundColor: '#7d5fff', borderRadius: 20, padding: 10, width: '40%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                </TouchableOpacity>
            }
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AdminMenu
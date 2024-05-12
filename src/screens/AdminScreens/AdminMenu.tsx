import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem, { MenuItemProps } from '../../components/MenuItem'
import { SelectList } from 'react-native-dropdown-select-list'
import { AntDesign, Feather } from '@expo/vector-icons';
import { menuCategories } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addItem, deleteItem, editItem } from '../../redux/MenuSlice';

const AdminMenu = () => {

  const dimensions = Dimensions.get("screen")
  const dispatch = useDispatch()

  //0-FOODS         1-DRINKS              2-ALCOHOLS          3- OTHER
  const menu: MenuItemProps[][] = useSelector((state: RootState) => state.menu.menu)
  const [updatedMenu, setUpdatedMenu] = useState<MenuItemProps[][]>(menu)

  useEffect(() => {
    setUpdatedMenu(menu)
  }, [menu])


  //FOR ADDING ITEMS MODAL
  const [visible, setVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState<MenuItemProps | null>(null)
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("");


  useEffect(() => {
    // MENÜYÜ ÇEK VE LİSTEYE KAYDET
  }, [])

  const addItemToMenu = () => {
    if (selectedCategory && price && label) {
      const priceNumber = price.match(/^\d+$/);
      if (priceNumber && priceNumber.length === 1 && parseInt(price) > 0) {
        const newItem: MenuItemProps = {
          itemId: Math.floor(Math.random() * 10000).toString(),
          categoryId: parseInt(selectedCategory),
          description: description,
          price: parseInt(price),
          label: label
        }
        dispatch(addItem(newItem))
        setDescription("")
        setLabel("")
        setPrice("")
        Alert.alert("Ürün başarıyla eklendi")
      } else {
        Alert.alert("Fiyatı düzgün giriniz")
      }
    } else {
      Alert.alert("Eksiksiz giriniz")
    }
  }



  const deleteItemFromMenu = (item: MenuItemProps) => {
    //databaseden sil
    Alert.alert("Warning", "Do you want to delete the product?", [
      {
        text: 'YES',
        onPress: () => dispatch(deleteItem(item.itemId))
      },
      {
        text: 'NO',
        style: 'cancel'
      }
    ])

  }

  const openEditModal = (item: MenuItemProps) => {
    setVisible(true)
    setIsEditing(true)
    setEditedItem(item)
    setLabel(item.label)
    setDescription(item.description)
    setPrice(item.price.toString())
    setSelectedCategory(item.categoryId.toString())
  }

  const editItemFromMenu = () => {
    if (editedItem) {
      const priceNumber = price.match(/^\d+$/);
      if (priceNumber && priceNumber.length === 1 && parseInt(price) > 0) {
        const updatedItem: MenuItemProps = {
          itemId: editedItem.itemId,
          label,
          description,
          price: parseInt(price),
          categoryId: parseInt(selectedCategory)
        }
        dispatch(editItem(updatedItem))
        Alert.alert("Ürün Düzenlendi")
      } else {
        Alert.alert("Fiyatı düzgün giriniz")
      }
    } else {
      Alert.alert("Bilgileri eksiksiz giriniz")
    }
  }

  const printMenu = () => {
    return updatedMenu.map((category, index) => {
      if (category.length > 0) {
        return (
          <View key={index}>
            <Text style={{ color: '#fff', backgroundColor: 'orange', padding: 8, marginLeft: 10, fontSize: 24, borderRadius: 10 }}> {menuCategories[index].value} </Text>
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
          setVisible(false)
          setIsEditing(false)
        }}
          onRequestClose={() => {
            setVisible(false)
            setIsEditing(false)
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
              <TextInput value={label} onChangeText={setLabel} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>
            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ marginVertical: 5 }}>Description :</Text>
              <TextInput value={description} onChangeText={setDescription} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>
            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ marginVertical: 5 }}>Price :</Text>
              <TextInput value={price} onChangeText={setPrice} style={{ borderRadius: 10, width: dimensions.width / 1.9, padding: 10, borderWidth: 1, marginVertical: 5 }} />
            </View>

            <View style={{ width: '80%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{}}>Category :</Text>
              <SelectList
                boxStyles={{ width: dimensions.width / 1.9, borderColor: 'black', borderRadius: 20, borderWidth: 1, height: 60, alignItems: 'center', marginBottom: 15 }}
                dropdownStyles={{ borderColor: '#fff' }}
                setSelected={(val: any) => setSelectedCategory(val)}
                data={menuCategories}
                save="key"
                defaultOption={selectedCategory ? menuCategories[parseInt(selectedCategory)] : (menuCategories[0] && menuCategories[0])}
                placeholder={selectedCategory ? menuCategories[parseInt(selectedCategory)].value : (menuCategories[0] && menuCategories[0].value)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ paddingVertical: 12, paddingHorizontal: 25, backgroundColor: '#f0a202', alignItems: 'center', borderRadius: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>{"<-"}</Text>
              </TouchableOpacity>
              {
                isEditing ?
                  <TouchableOpacity onPress={editItemFromMenu} style={{ width: '60%', padding: 12, backgroundColor: '#f0a202', borderRadius: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Edit</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={addItemToMenu} style={{ width: '60%', padding: 12, backgroundColor: '#f0a202', borderRadius: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Add</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </Modal >
      </ScrollView >
    </View >
  )
}

export default AdminMenu
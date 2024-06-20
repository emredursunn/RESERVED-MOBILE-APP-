import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem, { MenuItemProps } from '../../components/MenuItem'
import { getMenuCategories } from '../../utils/utils'
import { getMenuAsync } from '../../redux/MenuSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParams } from '../../navigation/UserHomeStackNav'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

type Props = NativeStackScreenProps<HomeStackParams, 'Menu'>

const Menu = ({ route }: Props) => {

  const [menuCategories, setMenuCategories] = useState<{ key: number, value: string }[]>([]);
  const restaurantId = route.params.restaurantId
  const dispatch = useDispatch<AppDispatch>()
  const menu: MenuItemProps[][] = useSelector((state: RootState) => state.menu.menu)

  useEffect(() => {
    const fetchMenuCategories = async () => {
      const categories = await getMenuCategories();
      if (categories !== undefined) {
        setMenuCategories(categories)
      }
    };
    fetchMenuCategories();
  }, []);

  useEffect(() => {
    const fetchMenu = () => {
      dispatch(getMenuAsync({ restaurantId }))
    }
    fetchMenu()
  }, [])

  const printMenu = () => {
    return menu.map((category, index) => {
      if (category.length > 0 && menuCategories[index]) {
        return (
          <View key={index}>
            <Text style={{ color: '#fff', backgroundColor: 'orange', padding: 8, marginLeft: 10, fontSize: 24, borderRadius: 10 }}>
              {menuCategories[index].value}
            </Text>
            {category.map((item, itemIndex) => (
              <View key={itemIndex} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <MenuItem key={itemIndex} {...item} />
              </View>
            ))}
          </View>
        );
      }
      return null;
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
      <View style={{ flexDirection: 'row',  justifyContent: 'center', marginTop: 5 }}>
      </View>
      {printMenu()}
    </ScrollView >
  )
}


export default Menu

import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem, { MenuItemProps } from '../../components/MenuItem'
import { menuCategories } from '../../utils/utils'

const Menu = () => {

    const exampleMenu = [
        {
            itemId: "0",
            categoryId: 0,
            label: 'Patates Kızartması',
            description: 'Nefis kızarmış çıtır çıtır patates kızartması',
            price: 55
        }, {
            itemId: "1",
            categoryId: 0,
            label: 'Sosisli',
            description: 'Sosisli Sandviç',
            price: 60
        }, {
            itemId: "2",
            categoryId: 1,
            label: 'Kola',
            description: 'Pepsi 330 Ml',
            price: 30
        }, {
            itemId: "3",
            categoryId: 2,
            label: 'Vodka Kokteyl',
            description: 'Vodka Enerji',
            price: 200
        }, {
            itemId: "4",
            categoryId: 2,
            label: 'Cin Fizz',
            description: 'Cin pudra sekeri',
            price: 210
        }, {
            itemId: "5",
            categoryId: 2,
            label: 'Viski',
            description: 'Jack Daniels 1 shot',
            price: 180
        }
    ]
    
    // Menüyü kategorilere göre düzenleme
    const categorizedMenu: MenuItemProps[][] = Array.from({ length: Math.max(...exampleMenu.map(item => item.categoryId)) + 1 }, () => []);
    
    exampleMenu.forEach(item => {
        categorizedMenu[item.categoryId].push(item);
    });

    const printMenu = () => {
        return categorizedMenu.map((category, index) => {
            if (category.length > 0) {
                return (
                    <View key={index}>
                        <Text style={{ color: '#fff', backgroundColor: 'orange', padding: 8, marginLeft: 10, fontSize: 24, borderRadius: 10 }}> {menuCategories[index].value} </Text>
                        {category.map((item, itemIndex) => (
                            <View key={itemIndex} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <MenuItem key={itemIndex} {...item} />
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
                </View>
                {printMenu()}
            </ScrollView >
        </View >
    )
}


export default Menu
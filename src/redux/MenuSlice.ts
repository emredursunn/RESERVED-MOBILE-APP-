import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemProps } from '../components/MenuItem';

const exampleMenu: MenuItemProps[] = [
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


interface menuState {
    menu: MenuItemProps[][]
}

const initialState: menuState = {
    menu: categorizedMenu
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        deleteItem(state, action: PayloadAction<string>) {
            state.menu = state.menu.map(category => category.filter(item => item.itemId !== action.payload));
        },
        addItem(state, action: PayloadAction<MenuItemProps>) {
            const { categoryId } = action.payload;

            // Kategoriye ait menü dizisi yoksa oluştur
            if (!state.menu[categoryId]) {
                state.menu[categoryId] = [];
            }
            state.menu[categoryId].push(action.payload);
        },
        editItem(state, action: PayloadAction<MenuItemProps>) {
            const updatedItem = action.payload;
            const categoryId = updatedItem.categoryId;
            if (state.menu[categoryId]) {
                // Öğe bulunuyor mu kontrol et
                const index = state.menu[categoryId].findIndex(item => item.itemId === updatedItem.itemId);
                if (index !== -1) {
                    state.menu[categoryId][index] = updatedItem;
                }
            }
        }
    },
});

export const { deleteItem, addItem, editItem } = menuSlice.actions;
export default menuSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemProps } from '../components/MenuItem';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';


interface menuState {
    menu: MenuItemProps[][],
    loading: boolean,
    error: boolean
}

const initialState: menuState = {
    menu: [],
    loading: false,
    error: false
}


// Menüyü kategorilere göre düzenleme
function groupByProductType(menu: MenuItemProps[]): MenuItemProps[][] {
    const groupedMenu: MenuItemProps[][] = [];
    menu.forEach(item => {
        if (!groupedMenu[item.product_type_id - 1]) {
            groupedMenu[item.product_type_id - 1] = [];
        }
        groupedMenu[item.product_type_id - 1].push(item);
    });
    return groupedMenu;
}

export const getMenuAsync = createAsyncThunk(
    'get-menu',
    async ({ restaurantId }: { restaurantId: number}) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/restaurant/foods/food/${restaurantId}`);
            console.log(response.data)
            return response.data.data
        } catch (error) {
            console.log("get",error)
            throw error;
        }
    }
);

export const addItemToMenuAsync = createAsyncThunk(
    'add-item',
    async ({ product, token }: { product: MenuItemProps, token: string }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/admin/restaurant/food`, {
                "product_type_id": product.product_type_id + 1,
                "name": product.name,
                "price": product.price,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
);




export const deleteFromMenuAsync = createAsyncThunk(
    'delete-item',
    async ({ productId, token }: { productId: number, token: string }) => {
        try {
            await axios.delete(`${BASE_URL}/api/admin/restaurant/food/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return productId
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const updateMenuAsync = createAsyncThunk(
    'update-item',
    async ({ product, token }: { product: MenuItemProps, token: string }) => {
        try {
            const payload = {
                ...product,
                product_type_id: product.product_type_id + 1,
            };
            await axios.put(`${BASE_URL}/api/admin/restaurant/food/${product.id}`, payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            return payload
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(addItemToMenuAsync.fulfilled, (state, action: PayloadAction<MenuItemProps>) => {
                const { product_type_id } = action.payload;
                // Kategoriye ait menü dizisi yoksa oluştur
                if (!state.menu[product_type_id - 1]) {
                    state.menu[product_type_id - 1] = [];
                }
                state.menu[product_type_id - 1].push(action.payload);
                state.loading = false;
                state.error = false;
            })
            .addCase(addItemToMenuAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(addItemToMenuAsync.rejected, (state) => {
                state.loading = false
                state.error = true
            })

            .addCase(getMenuAsync.fulfilled, (state, action) => {
                state.menu = groupByProductType(action.payload)
                state.loading = false
                state.error = false
            })
            .addCase(getMenuAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(getMenuAsync.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(deleteFromMenuAsync.fulfilled, (state, action: PayloadAction<number>) => {
                state.menu = state.menu.map(category => category.filter(item => item.id !== action.payload));
                state.loading = false
                state.error = false
            })
            .addCase(deleteFromMenuAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteFromMenuAsync.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(updateMenuAsync.fulfilled, (state, action: PayloadAction<MenuItemProps>) => {
                const updatedProduct = action.payload;

                // Önce eski kategoriden öğeyi kaldır, eğer kategori değiştiyse
                const oldCategoryIndex = state.menu.findIndex(category =>
                    category.some(item => item.id === updatedProduct.id)
                );

                if (oldCategoryIndex !== -1 && oldCategoryIndex !== updatedProduct.product_type_id - 1) {
                    state.menu[oldCategoryIndex] = state.menu[oldCategoryIndex].filter(item => item.id !== updatedProduct.id);
                }

                // Yeni kategoriyi kontrol et, yoksa oluştur
                if (!state.menu[updatedProduct.product_type_id - 1]) {
                    state.menu[updatedProduct.product_type_id - 1] = [];
                }

                // Yeni kategoriye öğeyi eklemeden önce zaten var mı kontrol et
                const updatedCategory = state.menu[updatedProduct.product_type_id - 1];
                const alreadyExists = updatedCategory.some(item => item.id === updatedProduct.id);

                if (!alreadyExists) {
                    updatedCategory.push(updatedProduct);
                } else {
                    // Eğer zaten varsa, güncelle
                    const itemIndex = updatedCategory.findIndex(item => item.id === updatedProduct.id);
                    updatedCategory[itemIndex] = updatedProduct;
                }

                state.loading = false;
                state.error = false;
            })
            .addCase(updateMenuAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(updateMenuAsync.rejected, (state) => {
                state.error = true
                state.loading = false
            })
    }
});

export default menuSlice.reducer;


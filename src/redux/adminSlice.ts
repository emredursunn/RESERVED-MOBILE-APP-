
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Admin = {
    name: string,
    category_id: number,
    phone: string,
    id?: number,
    address?: string,
    max_capacity?: number,
    opening_time?: string,
    closed_time?: string
}

interface AdminState {
    admin: Admin
}

const initialState: AdminState = {
    admin: {
        "name": "",
        "category_id": 0,
        "phone": "",
    }
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin(state, action: PayloadAction<Admin>) {
            state.admin = action.payload;
        }
    },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    id?: number,
    name: string,
    phone?: string,
}

interface UserState {
    user: User
}

const initialState: UserState = {
    user: {
        "name": "",
        "phone": "",
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {
                "name": "",
                "phone": "",
            }
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

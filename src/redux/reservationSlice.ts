import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reservation } from '../components/ReservationCardAdmin';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';


interface reservationState {
    reservations: Reservation[]
}

const initialState: reservationState = {
    reservations: []
};

export const createReservationAsync = createAsyncThunk(
    'create-reservation',
    async ({ reservation, token }: { reservation: Reservation, token: string }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/reservation/user`, {
                ...reservation, notes: reservation.note
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            return response.data.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const getAdminReservationsAsync = createAsyncThunk(
    'get-admin-reservations',
    async ({ token }: { token: string }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/admin/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data: any[] = response.data.data
            const parsedData = data.map((reservation) => ({ ...reservation, person: reservation.people_count }))
            return parsedData
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const updateAdminReservationsAsync = createAsyncThunk(
    'update-admin-reservations',
    async ({ token, reservation_id, status }: { token: string, reservation_id: number, status: number }) => {
        try {
            await axios.put(`${BASE_URL}/api/admin/reservations/reservation_id/${reservation_id}/status_id/${status}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return { reservation_id, status }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


export const getUserReservationsAsync = createAsyncThunk(
    'get-user-reservations',
    async ({ token }: { token: string }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/reservation/user/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data: any[] = response.data.data
            const parsedData = data.map((reservation) => ({ ...reservation, person: reservation.people_count }))
            return parsedData
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const updateUserReservationsAsync = createAsyncThunk(
    'update-user-reservations',
    async ({ token, reservation_id }: { token: string, reservation_id: number }) => {
        try {
            await axios.post(`${BASE_URL}/api/reservation/user/delete/${reservation_id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return reservation_id
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        clearReservations: (state) => {
            state.reservations.splice(0,state.reservations.length)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReservationAsync.fulfilled, (state, action: PayloadAction<Reservation>) => {
                const reservation = action.payload
                state.reservations.push(reservation)
            })
            .addCase(getAdminReservationsAsync.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
                const reservationList = action.payload
                state.reservations = reservationList
            })
            .addCase(getUserReservationsAsync.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
                const reservationList = action.payload
                state.reservations = reservationList
            })
            .addCase(updateAdminReservationsAsync.fulfilled, (state, action: PayloadAction<{ reservation_id: number, status: number }>) => {
                const { reservation_id, status } = action.payload
                state.reservations = state.reservations.map((r) => {
                    if (r.id === reservation_id) {
                        return { ...r, status }
                    } else {
                        return r
                    }
                })
            })
            .addCase(updateUserReservationsAsync.fulfilled, (state, action: PayloadAction<number>) => {
                const reservation_id = action.payload
                state.reservations = state.reservations.map((r) => {
                    if (r.id === reservation_id) {
                        return { ...r, status: 3 }
                    } else {
                        return r
                    }
                })
            })
    }
});

export const  { clearReservations } = reservationSlice.actions
export default reservationSlice.reducer;

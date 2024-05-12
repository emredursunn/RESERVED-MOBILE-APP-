import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reservationProps } from '../components/ReservationCard';



interface reservationState {
    reservations: reservationProps[]
}

const initialState: reservationState = {
    reservations: [{ reservationId: "10", placeId: "1", name: "Talip Bey", tableId: "11", numberOfPeople: 4, date: "16/03/2024", time: "20:30" },
    { reservationId: "11", name: "Emre Bey", placeId: "2", tableId: "5", numberOfPeople: 2, date: "15/03/2024", time: "20:45" }
    ]
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        addReservation(state, action: PayloadAction<reservationProps>) {
            state.reservations.push(action.payload)
        },
        deleteReservation(state, action: PayloadAction<string>) {
            state.reservations = state.reservations.filter(r => r.reservationId !== action.payload)
        }
    },
});

export const { addReservation, deleteReservation } = reservationSlice.actions;
export default reservationSlice.reducer;

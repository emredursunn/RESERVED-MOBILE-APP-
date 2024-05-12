import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reservationProps } from '../components/ReservationCard';


interface requestState {
    requests: reservationProps[]
}

const initialState: requestState = {
    requests: [{ reservationId: "1", placeId: "1", name: "Emre Dursun", tableId: "11", numberOfPeople: 3, date: "15/03/2024", time: "20:30" },
    { reservationId: "2", placeId: "2", name: "Ali Kılınç", tableId: "5", numberOfPeople: 2, date: "15/03/2024", time: "20:45" },
    { reservationId: "3", placeId: "2", name: "Yiğit Tekcan", tableId: "8", numberOfPeople: 5, date: "15/03/2024", time: "19:30" },
    { reservationId: "4", placeId: "1", name: "Huseyin Ozdemir", tableId: "8", numberOfPeople: 3, date: "15/03/2024", time: "21:30" },
    { reservationId: "5", placeId: "3", name: "Emrecan Cinal", tableId: "9", numberOfPeople: 4, date: "16/03/2024", time: "21:30" },
    { reservationId: "6", placeId: "0", name: "Muhammet Kavakli", tableId: "10", numberOfPeople: 5, date: "18/03/2024", time: "21:30" },
    { reservationId: "7", placeId: "3", name: "Uygar Eren", tableId: "8", numberOfPeople: 7, date: "18/03/2024", time: "21:30" }],
};

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        deleteRequest(state, action: PayloadAction<string>) {
            state.requests = state.requests.filter(r => r.reservationId !== action.payload)
        }
    },
});

export const { deleteRequest } = requestSlice.actions;
export default requestSlice.reducer;

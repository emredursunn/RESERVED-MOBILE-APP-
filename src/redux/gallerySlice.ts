import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export type GalleryState = {
    cover: string,
    gallery: string[]
}

export type galleryPayload = {
    index: number,
    value: string
}


const initialState: GalleryState = {
    cover: "",
    gallery: ["", "", "", ""]
}


const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"


export const getImagesFromGalleryAsync = createAsyncThunk(
    'my-images',
    async (token: string) => {
        // Axios ile asenkron işlemi gerçekleştir

        const response = await axios.get(`${BASE_URL}/api/admin/restaurant/my-images`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        console.log(response.data)
        return response.data;
    }
);

export const addImageToGalleryAsync = createAsyncThunk(
    'gallery/addImageToGallery',
    async ({ cover, gallery, token }: { cover: string; gallery: string[]; token: string }) => {

        try {
            const formData = new FormData();

            // Append cover image

            formData.append('image_cover', cover);
            // Append gallery images
            gallery.forEach(async (imageUri, index) => {
                formData.append(`image${index + 1}`, imageUri);
            });
            // Log FormData
            console.log("FormData:", formData);

            const response = await axios.post(`${BASE_URL}/api/admin/restaurant/images`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log("hata:", error);
        }
    }
);
export const removeFromGalleryAsync = createAsyncThunk(
    'delete-images',
    async (index: number) => {
        // Axios ile asenkron işlemi gerçekleştir
        const response = await axios.delete(`${BASE_URL}/api/admin/restaurant/images${index}`);
        return response.data;
    }
);



const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addImageToGalleryAsync.fulfilled, (state, action) => {
                // Assuming the response data contains updated gallery information
                // state.gallery = action.payload.gallery;
                // state.cover = action.payload.cover;
            })
            .addCase(removeFromGalleryAsync.fulfilled, (state, action) => {
                const index = action.meta.arg;
                state.gallery[index] = "";
            })
            .addCase(getImagesFromGalleryAsync.fulfilled, (state, action) => {
                // Assuming the response data contains gallery images
                state.gallery = action.payload.gallery;
                state.cover = action.payload.cover;
            });
    },

});

export default gallerySlice.reducer;

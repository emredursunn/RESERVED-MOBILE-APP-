import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, formatImageUrl } from '../utils/utils';
import { Platform } from 'react-native';

export type GalleryState = {
  gallery: Array<string | null>
}

const initialState: GalleryState = {
  gallery: [null, null, null, null, null]
}


export const getImagesFromGalleryAsync = createAsyncThunk(
  'get-images',
  async (token: string) => {
    const response = await axios.get(`${BASE_URL}/api/admin/restaurant/my-images`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    const { image_cover, image1, image2, image3, image4 } = response.data.data;

    return [
      formatImageUrl(image_cover),
      formatImageUrl(image1),
      formatImageUrl(image2),
      formatImageUrl(image3),
      formatImageUrl(image4),
    ] as Array<string | null>
  }
);

export const storeImagesToGalleryAsync = createAsyncThunk(
  'store-images',
  async ({ gallery, token }: { gallery: Array<string | null>; token: string }) => {
    const sendRequest = async () => {
      const formData = new FormData();
      console.log("gallery", gallery);
      for (let i = 0; i <= 4; i++) {
        let uri = gallery[i];
        if (uri) {
          let filename = uri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename as string);
          let type = match ? `image/${match[1]}` : `image`;
          let fileData = {
            uri: Platform.select({ ios: uri.replace('file://', ''), android: uri }),
            name: filename,
            type: type,
          };
          if (i === 0) {
            formData.append('image_cover', fileData as any);
          } else {
            formData.append(`image${i}`, fileData as any);
          }
        }
      }
      console.log("FormData:");

      const response = await axios.post(`${BASE_URL}/api/admin/restaurant/images`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    };

    try {
      const response = await sendRequest();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("First attempt failed, retrying...");
      try {
        const response = await sendRequest();
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log("Second attempt failed:", error);
        throw error;
      }
    }
  }
);

export const removeFromGalleryAsync = createAsyncThunk(
  'delete-images',
  async (index: number) => {
    // Axios ile asenkron işlemi gerçekleştir
    try {
      const response = await axios.delete(`${BASE_URL}/api/admin/restaurant/images${index}`);
      console.log(response.data);
      return index
    } catch (error) {
      console.log(error)
      throw error
    }
  }
);


const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<{ uri: string, index: number }>) => {
      const { uri, index } = action.payload
      state.gallery[index] = uri
    },
    deleteImage: (state, action: PayloadAction<number>) => {
      const index = action.payload
      state.gallery[index] = null
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeImagesToGalleryAsync.fulfilled, (state, action) => {

      })
      .addCase(removeFromGalleryAsync.fulfilled, (state, action: PayloadAction<number>) => {
        const index = action.payload
        state.gallery[index] = null;
      })
      .addCase(getImagesFromGalleryAsync.fulfilled, (state, action) => {
        state.gallery = action.payload;
        console.log(action.payload)
      });
  },

});

export const { addImage, deleteImage } = gallerySlice.actions;
export default gallerySlice.reducer;

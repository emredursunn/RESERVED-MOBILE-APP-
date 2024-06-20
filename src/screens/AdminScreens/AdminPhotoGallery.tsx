import { View, Text, FlatList, ImageBackground, Image, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, deleteImage, getImagesFromGalleryAsync, storeImagesToGalleryAsync } from '../../redux/gallerySlice';
import { Ionicons } from '@expo/vector-icons';

const AdminPhotoGallery = () => {

  const dimensions = Dimensions.get("screen")
  const [visible, setVisible] = useState(false)

  const [selectedImage, setSelectedImage] = useState<any>()

  const gallery = useSelector((state: RootState) => state.gallery.gallery)

  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    if (token) {
      dispatch(getImagesFromGalleryAsync(token))
    }
  }, [])

  const uploadImage = async (index: number) => {
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          dispatch(addImage({ uri: result.assets[0].uri, index: index }))
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleConfirm = () => {
    if (token) {
      dispatch(storeImagesToGalleryAsync({ gallery: gallery, token: token }))
    }
  }
  const removeImage = (index: number) => {
    Alert.alert("Warning", "Do you want to delete image?", [
      {
        text: 'YES',
        onPress: () => {
          dispatch(deleteImage(index))
        }
      },
      {
        text: 'NO',
        style: 'cancel'
      }
    ])
  }

  //buraya yollarken listeden 0. indexi çıkarıyorum (cover_image) o yüzden gerçek indexiyle uyuşması için indexlere +1 giricem
  const renderPhotos = ({ item, index }: { item: any, index: number }) => {
    return (
      item
        ?
        <TouchableOpacity
          onPress={() => {
            setVisible(true)
            setSelectedImage(item)
          }}
          style={{ marginHorizontal: 10, marginVertical: 5 }}>
          <ImageBackground key={index} source={{ uri: item }} resizeMode='stretch' style={{
            width: dimensions.width / 3,
            height: dimensions.height / 5,
          }}>
            <TouchableOpacity onPress={() => removeImage(index + 1)} style={{ backgroundColor: '#f0a202', borderRadius: 15, padding: 8, marginTop: dimensions.height / 30, alignSelf: 'flex-end' }}>
              <AntDesign name="delete" size={20} color="white" />
            </TouchableOpacity>
          </ImageBackground>

        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={() => uploadImage(index + 1)}
          style={{ marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center', width: dimensions.width / 3, height: dimensions.height / 5 }}>
          <Ionicons name="add-circle-outline" size={56} color="black" />
        </TouchableOpacity>
    )

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f0a202' }}>
      {/* <View style={{ flex: 1, marginTop: 45 }}>
        <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>
          MY PLACE
        </Text>
      </View> */}
      <View style={{ flex: 5, borderWidth: 2, borderRadius: 30, marginBottom: 20, marginHorizontal: 10, backgroundColor: '#fff' }}>
        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 24, fontStyle: 'italic', marginBottom: 1 }}>Cover Photograph</Text>
        {gallery[0]
          ?
          <TouchableOpacity
            onPress={() => {
              setVisible(true)
              setSelectedImage(gallery[0])
            }}
            style={{ flex: 4, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <ImageBackground source={{ uri: gallery[0] }} resizeMode='contain' style={{
              width: '100%',
              height: '100%'
            }}>
              <TouchableOpacity onPress={() => removeImage(0)} style={{ backgroundColor: '#f0a202', borderRadius: 15, padding: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            </ImageBackground>

          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => uploadImage(0)}
            style={{ flex: 4, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="add-circle-outline" size={56} color="black" />
          </TouchableOpacity>}
      </View>
      <View style={{ flex: 10, marginHorizontal: 10 }}>
        <View style={{ width: '100%', height: '90%', borderWidth: 2, borderRadius: 30, backgroundColor: '#fff' }}>
          <Text style={{ alignSelf: 'center', fontSize: 24, marginBottom: 20, fontStyle: 'italic' }}>Photograph Gallery</Text>
          <FlatList
            data={gallery.slice(1)}
            renderItem={renderPhotos}
            numColumns={2}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleConfirm} style={{justifyContent:'center', alignItems:'center', alignSelf: 'center', flex: 1, borderWidth: 1, padding: 5, paddingHorizontal:25,borderRadius: 10, backgroundColor:'#fff' }}>
        <Text style={{fontSize:16}}>SAVE</Text>
      </TouchableOpacity>

      <Modal visible={visible}>
        <View style={{ width: dimensions.width / 1.2, height: dimensions.height / 1.5, borderWidth: 2, borderRadius: 30, alignItems: 'center', alignSelf: 'center', marginTop: '20%' }}>
          <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 5 }}>
            <Text style={{ fontSize: 24 }}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
        </View>
      </Modal>
    </View>
  )
}


export default AdminPhotoGallery
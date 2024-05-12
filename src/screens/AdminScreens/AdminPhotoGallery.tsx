import { View, Text, FlatList, ImageBackground, Image, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GalleryState, addImageToGalleryAsync } from '../../redux/gallerySlice';

const AdminPhotoGallery = () => {

  const dimensions = Dimensions.get("screen")
  const [visible, setVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any>()

  const reduxGallery = useSelector((state: RootState) => state.gallery.gallery)
  const reduxCoverImage = useSelector((state: RootState) => state.gallery.cover)

  const [imageGallery, setImageGallery] = useState(reduxGallery)
  const [coverImage, setCoverImage] = useState(reduxCoverImage)
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.token.token);



  useEffect(() => {
    setImageGallery(reduxGallery)
    setCoverImage(reduxCoverImage)
  }, [reduxGallery, reduxCoverImage])

  const uploadImage = async (index?: number) => {

    // No permissions request is necessary for launching the image library
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (index !== undefined) {
          if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            // İndex'e göre galeri listesini güncelle
            const updatedGallery = imageGallery.map((item, i) => {
              if (i === index) {
                return result.assets[0].uri;
              } else {
                return item;
              }
            });
            setImageGallery(updatedGallery);
          }
        } else {
          if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            const updatedCover = result.assets[0].uri
            setCoverImage(updatedCover)
            //dispatch(addCoverImage(result.assets[0].uri))
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const removeImage = (index?: number) => {
    // Alert.alert("Warning", "Do you want to delete image?", [
    //   {
    //     text: 'YES',
    //     onPress: () => {
    //       if (index !== undefined) {
    //         dispatch(removeFromGallery(index))
    //       } else {
    //         dispatch(removeCoverImage())
    //       }
    //     }
    //   },
    //   {
    //     text: 'NO',
    //     style: 'cancel'
    //   }
    // ])
  }


  const handleConfirm = () => {
    if (token){
      dispatch(addImageToGalleryAsync({ cover: coverImage, gallery: imageGallery, token: token }))
    }
  }


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
          <ImageBackground key={index} source={{ uri: item }} resizeMode='contain' style={{
            width: dimensions.width / 3,
            height: dimensions.height / 5,
          }}>
            <TouchableOpacity onPress={() => removeImage(index)} style={{ backgroundColor: '#f0a202', borderRadius: 15, padding: 8, marginTop: dimensions.height / 30, alignSelf: 'flex-end' }}>
              <AntDesign name="delete" size={20} color="white" />
            </TouchableOpacity>
          </ImageBackground>

        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={() => uploadImage(index)}
          style={{ marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center', width: dimensions.width / 3, height: dimensions.height / 5 }}>
          <Image source={require('../../../assets/add.png')} resizeMode='contain' style={{ tintColor: 'gray', width: '100%', height: '100%' }} />
        </TouchableOpacity>
    )

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f0a202' }}>
      <View style={{ flex: 1, marginTop: 45 }}>
        <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>
          MY PLACE
        </Text>
      </View>
      <View style={{ flex: 3, borderWidth: 2, borderRadius: 30, marginBottom: 20, marginHorizontal: 10, backgroundColor: '#fff' }}>
        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 24, fontStyle: 'italic', marginBottom: 1 }}>Cover Photograph</Text>
        {coverImage
          ?
          <TouchableOpacity
            onPress={() => {
              setVisible(true)
              setSelectedImage(coverImage)
            }}
            style={{ flex: 4, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <ImageBackground source={{ uri: coverImage }} resizeMode='contain' style={{
              width: '100%',
              height: '100%'
            }}>
              <TouchableOpacity onPress={() => removeImage()} style={{ backgroundColor: '#f0a202', borderRadius: 15, padding: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            </ImageBackground>

          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => uploadImage()}
            style={{ flex: 4, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/add.png')} resizeMode='contain' style={{ tintColor: 'gray', width: '90%', height: '90%', }} />
          </TouchableOpacity>}
      </View>
      <View style={{ flex: 8, marginHorizontal: 10, }}>
        <View style={{ width: '100%', height: '90%', borderWidth: 2, borderRadius: 30, backgroundColor: '#fff' }}>
          <Text style={{ alignSelf: 'center', fontSize: 24, marginBottom: 25, fontStyle: 'italic' }}>Photograph Gallery</Text>
          <FlatList
            data={imageGallery}
            renderItem={renderPhotos}
            numColumns={2}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </View>

        <TouchableOpacity onPress={handleConfirm} style={{ alignSelf: 'center' }}>
          <Text>SAVE</Text>
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
    </View>
  )
}


export default AdminPhotoGallery
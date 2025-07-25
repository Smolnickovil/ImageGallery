// navigation/AppNavigator.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import PhotoList from '../components/PhotoList';
import PhotoView from '../components/PhotoView';

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('PhotoList');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const navigateToPhotoView = (photo: any) => {
    setSelectedPhoto(photo);
    setCurrentScreen('PhotoView');
  };

  const navigateBack = () => {
    setCurrentScreen('PhotoList');
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'PhotoList' ? (
        <PhotoList onPhotoPress={navigateToPhotoView} />
      ) : (
        <PhotoView photo={selectedPhoto} onBackPress={navigateBack} />
      )}
    </View>
  );
};

export default AppNavigator;

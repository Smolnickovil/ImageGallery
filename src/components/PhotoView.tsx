// components/PhotoView.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoView = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.url }} style={styles.photo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default PhotoView;

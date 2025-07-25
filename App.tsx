// App.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import imageStore from './ImageStore';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 3;

const App = observer(() => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    imageStore.fetchImages();
  }, []);

  const handleScroll = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number } } }) => {
    const currentScrollY = nativeEvent.contentOffset.y;
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = currentScrollY;

    if (scrollDirection === 'down') {
      const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
      const paddingToBottom = 20;
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
        imageStore.fetchImages();
      }
    } else if (scrollDirection === 'up' && currentScrollY <= 0) {
      imageStore.resetImages();
      imageStore.fetchImages();
    }
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImageUri(imageUri);
  };

  const handleCloseFullScreen = () => {
    setSelectedImageUri(null);
  };

  const renderItem = ({ item }: { item: { id: string; uri: string; urif: string } }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.urif)} style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!imageStore.isLoading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <FlatList
        data={imageStore.images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
      />
      {selectedImageUri && (
        <TouchableOpacity style={styles.fullScreenOverlay} onPress={handleCloseFullScreen}>
          <Image source={{ uri: selectedImageUri }} style={styles.fullScreenImage} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    marginStart: 10,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    margin: 5,
    alignItems: 'center',
    width: itemWidth,
  },
  image: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 10,
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  loading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  }
});

export default App;

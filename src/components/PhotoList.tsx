// components/PhotoList.tsx
import React, { useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { observer } from 'mobx-react';
import photoStore from '../stores/PhotoStore';

const PhotoList = ({ onPhotoPress }: { onPhotoPress: (photo: any) => void }) => {
  useEffect(() => {
    photoStore.fetchPhotos();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => onPhotoPress(item)}>
      <Image source={{ uri: item.src.medium }} style={styles.photo} />
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    photoStore.refreshPhotos();
  };

  const handleLoadMore = () => {
    if (!photoStore.isLoading) {
      photoStore.loadMorePhotos();
    }
  };

  return (
    <View style={styles.container}>
      {photoStore.error && <Text style={styles.error}>{photoStore.error}</Text>}
      <FlatList
        data={photoStore.photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        refreshing={photoStore.isLoading}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={photoStore.isLoading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  photo: {
    width: 120,
    height: 120,
    margin: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
});

export default observer(PhotoList);

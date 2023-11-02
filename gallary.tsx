import React from 'react';
import { Image, StyleSheet } from 'react-native';

export interface ImageComponentProps {
  imageUrl: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl }) => {
  return <Image source={{ uri: imageUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    margin: 0,
  },
});

export default ImageComponent;

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import ImageComponent from './gallary';

interface Rating {
  rate: number;
  count: number;
}

interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface ProductComponentProps {
  product: ProductData;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  return (
    <SafeAreaView style={styles.productContainer}>
      <ScrollView>
      <ImageComponent imageUrl={product?.image}></ImageComponent>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  productContainer: {
    padding: 16,
    borderBottomWidth: 100,
    borderBottomColor: '#7500e9',
    marginBottom:30
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    marginTop: 5,
    fontWeight:'bold'
  },
});

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    // Make API request here
    axios.get<ProductData[]>('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.header}>Product Viewer</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductComponent product={item} />}
      />
    </SafeAreaView>
  );
};

export default App;

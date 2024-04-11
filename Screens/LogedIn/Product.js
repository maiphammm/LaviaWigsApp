import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

const Product = ({ route, navigation }) => {
  const {wigDB, imagePath } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
   

  const handleAddToCart = () => {
    // Create a new item object with the properties from wigDB, along with quantity and totalPrice
    const newItem = { ...wigDB, quantity, totalPrice: wigDB.price * quantity };

    // Update the totalItems count by adding the quantity of the new item
    setTotalItems(totalItems + quantity); 

    // Add the new item to the cartItems array
    setCartItems([...cartItems, newItem]);

    // Reset the quantity back to 1
    setQuantity(1); 

    // Navigate to the 'Cart' screen and pass the cartItems as a parameter
    navigation.navigate('Cart', { cartItems }); 
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={imagePath ? imagePath : { uri: wigDB.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{wigDB.name}</Text>
        <Text style={styles.price}>{wigDB.price}</Text>
        <TextInput
          style={styles.quantityInput}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(parseInt(text) || 1)}
        />
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart ({totalItems})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AF005F',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AF005F',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Product;
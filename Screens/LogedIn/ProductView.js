import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ProductView = ({ route, navigation }) => {
  const { wigDB, imagePath } = route.params;
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
      <View style={styles.TopView}>
        <Icon onPress={()=>{navigation.goBack()}} style={styles.Icons} name="chevron-left" />
      </View>
      <View style={styles.BottomView}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity> */}
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
            <Text style={styles.text}>{wigDB.cap}</Text>
            <Text style={styles.text}>{wigDB.length}</Text>
            <Text style={styles.text}>{wigDB.weight}</Text>
            <Text style={styles.text}>{wigDB.density}</Text>
            <Text style={styles.text}>{wigDB.handmade}</Text>
        </View>
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
  BottomView: {
    width: '100%',
    height: '75%',
    display: 'flex',
    alignItems: 'center',
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
    fontSize: 20,
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
    width: 50,
  },
  addToCartButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '50%',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  TopView: {
    width: '100%',
    paddingBottom: 20,
  },
  Icons:{
    marginLeft: 5,
    color: '#000',
    fontSize: 40,
  },
});

export default ProductView;
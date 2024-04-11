import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Cart = ({ route, navigation }) => {
  // Extract cartItems from route params
  const { cartItems } = route.params;

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.totalPrice}</Text>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total Price: {totalPrice}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Cart;

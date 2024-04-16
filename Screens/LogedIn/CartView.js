import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

const CartView = ({ route, navigation }) => {
  const cartItems = route?.params?.cartItems || [];
  const totalItems = route?.params?.totalItems || 0;
  const totalPrice = route?.params?.totalPrice || 0;
  
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Cart</Text>
      {cartItems && cartItems.length > 0 ? ( 
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        //keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} AUD</Text>
          </View>
        )}
      /> ) : (
        <Text style={styles.noItemText}>No items in the cart</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.totalItem}>Total Items: {totalItems}</Text>
        <Text style={styles.totalPrice}>Total Price: AUD {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  Heading: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 15,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalItem:{
    fontSize: 15,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  totalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  checkoutButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  checkoutButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  noItemText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
});

export default CartView;

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import {CartContext} from '../../contexts/CartContext';

const CartView = ({ navigation }) => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    reduceQuantity,
    removeItem, 
    updateTotalPriceAndItems
  } = useContext(CartContext);

  useEffect(() => {
    if (cartItems) {
      updateTotalPriceAndItems(); // Update total price and items whenever cartItems change
    }
  }, [cartItems]);

  const increaseItemQuantity = (itemId) => {
    increaseQuantity(itemId);
    updateTotalPriceAndItems(); // Update total price after increasing quantity
  };
  
  const decreaseItemQuantity = (itemId) => {
    reduceQuantity(itemId);
    updateTotalPriceAndItems(); // Update total price after decreasing quantity
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    updateTotalPriceAndItems();
  };



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart ({totalItems})</Text>
      {cartItems && cartItems.length > 0 ? ( 
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.column1}>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.column2}>
                <Text>AU$ {item.price}</Text>
              </View>
              <View style={styles.column3}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => increaseItemQuantity(item.id)}>
                  <Text>+</Text>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseItemQuantity(item.id)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        /> 
      ) : (
        <Text style={styles.noItemText}>No items in the cart</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.totalItem}>Total Items: {totalItems}</Text>
        <Text style={styles.totalPrice}>Total Price: AU$ {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => navigation.navigate('PaymentScreen', { totalPrice: totalPrice })}>
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
  column1: {
    flex: 3,
  },
  column2: {
    flex: 2,
  },
  column3: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
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
  quantityButton: {
    width: 25,
    height: 25,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#AF005F',
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
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartView;

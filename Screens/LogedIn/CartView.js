import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
const CartView = ({ route, navigation }) => {
  const cartItems = route?.params?.cartItems || [];
  const totalItems = route?.params?.totalItems || 0;
  const totalPrice = route?.params?.totalPrice || 0;
  const [cartItemsState, setCartItemsState] = useState(cartItems);
  const [totalPriceState, setTotalPriceState] = useState(totalPrice);

  //increase items by quantity
  const increaseQuantity = (itemId) => {
    const updatedCartItems = [...cartItemsState];
    const selectedItemIndex = updatedCartItems.findIndex(item => item.id === itemId);
    if (selectedItemIndex !== -1) {
      // If the item exists, increase its quantity
      updatedCartItems[selectedItemIndex].quantity += 1;
      updatedCartItems[selectedItemIndex].totalItemPrice = updatedCartItems[selectedItemIndex].price * updatedCartItems[selectedItemIndex].quantity;
    }
    setCartItemsState(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };


  //reduce items by quantity
  const reduceQuantity = (itemId) => {
    const updatedCartItems = [...cartItemsState];
    const selectedItemIndex = updatedCartItems.findIndex(item => item.id === itemId);
    if (selectedItemIndex !== -1) {
      // If the item exists and quantity is greater than 1, decrease its quantity
      if (updatedCartItems[selectedItemIndex].quantity > 1) {
        updatedCartItems[selectedItemIndex].quantity -= 1;
        updatedCartItems[selectedItemIndex].totalItemPrice = updatedCartItems[selectedItemIndex].price * updatedCartItems[selectedItemIndex].quantity;
      }
    }
    setCartItemsState(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  //remove item from cart
  const removeItem = (itemId) => {
    const updatedCartItems = cartItemsState.filter(item => item.id !== itemId);
    setCartItemsState(updatedCartItems);
  };

  //update total price
  const updateTotalPrice = (updatedCartItems) => {
    const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);
    setTotalPriceState(newTotalPrice);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Cart ({totalItems})</Text>
      {cartItems && cartItems.length > 0 ? ( 
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        //keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.column1}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.column2}>
              <Text>AU$ {item.price}</Text>
            </View>
            <View style={styles.column3}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(index)}>
                <Text>+</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => reduceQuantity(index)}>
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )}
      /> ) : (
        <Text style={styles.noItemText}>No items in the cart</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.totalItem}>Total Items: {totalItems}</Text>
        <Text style={styles.totalPrice}>Total Price: AU$ {totalPrice.toFixed(2)}</Text>
        {/* <Text>Total Price: {totalPriceState}</Text> */}
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

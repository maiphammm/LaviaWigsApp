import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const CartView = ({ route, navigation }) => {
  const cartItems = route?.params?.cartItems || [];
  const totalItems = route?.params?.totalItems || 0;
  const totalPrice = route?.params?.totalPrice || 0;
  const [cartItemsState, setCartItemsState] = useState(cartItems);
  const [totalPriceState, setTotalPriceState] = useState(totalPrice);
  const [totalQuantity, setTotalQuantity] = useState(totalItems);

  // Function to update total price and total quantity when cart items change
  useEffect(() => {
    updateTotalPriceAndQuantity(cartItemsState);
  }, [cartItemsState]);

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItemsState.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
          totalItemPrice: item.price * (item.quantity + 1)
        };
      }
      return item;
    });
  
    setCartItemsState(updatedCartItems);
  };

  const reduceQuantity = (itemId) => {
    const updatedCartItems = cartItemsState.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
          totalItemPrice: item.price * (item.quantity - 1)
        };
      }
      return item;
    });

    setCartItemsState(updatedCartItems);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItemsState.filter(item => item.id !== itemId);
    setCartItemsState(updatedCartItems);
  };
  

  const updateTotalPriceAndQuantity = (updatedCartItems) => {
    const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);
    const newTotalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalPriceState(newTotalPrice);
    setTotalQuantity(newTotalQuantity);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart ({totalQuantity})</Text>
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
                <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                  <Text>+</Text>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => reduceQuantity(item.id)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
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
        <Text style={styles.totalItem}>Total Items: {totalQuantity}</Text>
        <Text style={styles.totalPrice}>Total Price: AU$ {totalPriceState.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => navigation.navigate('PaymentScreen', { totalPrice: totalPriceState })}>
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

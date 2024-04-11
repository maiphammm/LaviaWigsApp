import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Your cart</Text>
      
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Heading: {
    fontSize: 20,
    marginTop: 60,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    height: 39,
    borderColor: '#AF005F',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 20,
    color: '#000',
    backgroundColor: '#EBEBEB',
  },
  mainPostView: {
    marginTop: 20,
    width: '90%',
  },
  postView: {
    marginTop: 20,
    width: '80%',
  }
})
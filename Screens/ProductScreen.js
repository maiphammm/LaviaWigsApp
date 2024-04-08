import {
    StyleSheet,
    Button,
    View,ScrollView,
    Text,
    Alert,
  } from 'react-native';
import React from 'react'

const ProductScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})

import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'





const Product = () => {
  //const productDb = useContext(ProductDb)
  

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>All products</Text>
    //   <ScrollView contentContainerStyle={styles.scrollView}>
    //     <FlatList>
    //       productDb={productDb},
    //       renderItem={({item}) => {
            
    //           <View style={styles.mainPostView}>
    //             <Text style={styles.text}>{item.name}</Text>
    //             <Text style={styles.text}>{item.price}</Text>
    //           </View>
          
    //       }}
    //     </FlatList>
    //   </ScrollView>
    // </View>
    <View></View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Heading: {
    fontSize: 32,
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
    width: '90%',
  }
})
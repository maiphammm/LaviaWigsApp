import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
const WigDatabse = require("../../Api/db.json");




const Product = () => {
  const [searchInput, setSearchInput] = useState('');
  const [post,setPost] = useState([])
  
  useEffect(() => {
    try {
      setPost(WigDatabse.db);
    } catch (error) {
      console.error('Error setting data:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>LaviaWigs</Text>
      <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#000"
            value={searchInput}
            onChangeText={(val) => setSearchInput(val)}
          />
    </View>
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, ActivityIndicator, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductView from './ProductView';

const wigDB = require("../../Api/db.json");

const Home = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [post, setPost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    try {
      // Simulate fetching data from JSON file
      setPost(wigDB.db);
      setFilteredPost(wigDB.db); // Initialize filteredPost with the full data
    } catch (error) {
      console.error('Error setting data:', error);
    }
  }, []);
  

  // Function to filter post based on searchInput
  const handleSearch = () => {
    const filteredData = post.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPost(filteredData);
  };

  // Call handleSearch whenever searchInput changes
  useEffect(() => {
    handleSearch();
  }, [searchInput]);


  
  const imagePaths = {
    "balayage_wig.png": require('../../assets/wig_assets/balayage_wig.png'),
    "natural_black_wig.png": require('../../assets/wig_assets/natural_black_wig.png'),
    "tea_bob_wig.png": require('../../assets/wig_assets/tea_bob_wig.png'),
    "red_wig.png": require('../../assets/wig_assets/red_wig.png'),
    "auburn_topper.png": require('../../assets/wig_assets/auburn_topper.png'),
    "bun.png": require('../../assets/wig_assets/bun.png'),
    "chocolate_brown_topper.png": require('../../assets/wig_assets/chocolate_brown_topper.png'),
    "fringe.png": require('../../assets/wig_assets/fringe.png'),
    "half_head_topper.png": require('../../assets/wig_assets/half_head_topper.png'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Lavia Wigs</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#000"
        value={searchInput}
        onChangeText={(val) => setSearchInput(val)}
      />
      <View style={styles.mainPostView}>
        {filteredPost.length < 1 ?
          <ActivityIndicator size="large" color="#AF005F" />
          :
          <FlatList
            data={filteredPost}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
              //console.log("Navigating to ProductView with params:", navigation)
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Product', { wigDB: item, imagePath: imagePaths[item.image] })}>
                  <View style={styles.postView}>
                    <Image source={imagePaths[item.image]} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text style={styles.text}>AU$ {item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        }
      </View>
    </View>
  );
};

export default Home;

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
  },
  postView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: 120,
    height: 120,
    margin: 8,
    borderRadius: 8
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
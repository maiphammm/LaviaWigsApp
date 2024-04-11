import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Image } from 'react-native';
const WigDatabse = require("../../Api/db.json");



const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [post, setPost] = useState([]);

  useEffect(() => {
    try {
      setPost(WigDatabse.db);
    } catch (error) {
      console.error('Error setting data:', error);
    }
  }, []);

  const imagePaths = {
    "balayage_wig.png": require('../../assets/wig_assets/balayage_wig.png'),
    "natural_black_wig.png": require('../../assets/wig_assets/natural_black_wig.png'),
    "tea_bob_wig.png": require('../../assets/wig_assets/tea_bob_wig.png'),
    "red_wig.png": require('../../assets/wig_assets/red_wig.png'),
  };

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
      <View style={styles.mainPostView}>
        {post.length < 1 ?
          <ActivityIndicator size="large" color="#AF005F" />
          :
          <FlatList
            data={post}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.postView}>
                  <Image source={imagePaths[item.image]} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.price}</Text>
                  </View>
                </View>
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
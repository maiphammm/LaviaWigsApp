import { StyleSheet,Image,ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
const WigDatabse = require("../../Api/db.json");


const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  
  const [post,setPost] = useState([])
  // useEffect(() => {
  //   fetch('http://192.168.88.121/db')
  //     //.then((re) => re.json())
  //     .then((re) => {
  //       setPost(re.db);
  //       console.log(re.db);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    try {
      setPost(WigDatabse.db);
      //console.log(WigDatabse.db)
    } catch (error) {
      console.error('Error setting data:', error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
              console.log('Image URL:', item.image); // Check the image URL/URI in the console
              return (
                <View style={styles.postView}>
                  <Image source={{ uri: item.image }} style={styles.image}   
                  onError={(error) => console.error('Image loading error:', error)}
                  />
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
    </SafeAreaView>
  )
}

export default Home

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
})
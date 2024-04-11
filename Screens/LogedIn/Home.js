import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'



const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  
  const [post,setPost] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/db')
      //.then((re) => re.json())
      .then((re) => {
        setPost(re.db);
        console.log(re.db);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
        <View style={styles.mainPostView}>
          {post.length < 1?
            <ActivityIndicator size={"large"} color={"#AF005F"}/>
            : <FlatList>
              data={post},
              keyExtractor={({item,index}) => {return item.id.toFixed()}}
              renderItem={({item,index}) => (
                <View style={styles.postView}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.price}</Text>
                </View>
              )}
            </FlatList>
          }
        </View>
    </View>
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
    width: '80%',
  }
})
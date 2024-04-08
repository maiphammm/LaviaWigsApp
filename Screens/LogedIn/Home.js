import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'


const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  


  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Coffee House</Text>
      <TextInput
            style={styles.input}
            placeholder="Find your favourite coffee..."
            placeholderTextColor="#000"
            value={searchInput}
            onChangeText={(val) => setSearchInput(val)}
          />
        <View style={styles.mainPostView}>

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
  }
})
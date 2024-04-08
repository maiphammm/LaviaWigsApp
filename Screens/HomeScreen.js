import React from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
//import { useNavigation } from '@react-navigation/native'




const HomeScreen = ({ navigation }) => {
  
  // const goToLoginScreen = () => {
  //   navigation.navigate('Login');
  // };

  // const goToRegisterScreen = () => {
  //   navigation.navigate('Register');
  // };

  // const goToInfoScreen = () => {
  //   navigation.navigate('Info');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          style={styles.image}
          //source={require('./')}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={()=>{navigation.navigate("Login")}}
        />
        <Button
          title="Go to Sign up"
          onPress={()=>{navigation.navigate("Register")}}
        />
        <Button
          title="Go to Info"
          onPress={()=>{navigation.navigate("Info")}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default HomeScreen;

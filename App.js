// App.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import screens
import { LoginScreen } from './Screens/LoginScreen';
import{RegisterScreen} from './Screens/RegisterScreen';
import Home from './Screens/LogedIn/Home';
import Product from './Screens/LogedIn/Product';
import {Profile} from './Screens/LogedIn/Profile';
import Cart from './Screens/LogedIn/Cart';
import ProductView from './Screens/LogedIn/ProductView';
//import contexts
import { AuthContext } from './contexts/AuthContext'
import { DbContext } from './contexts/DbContext'
import { StorageContext } from './contexts/StorageContext'
//Firebase
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword } 
from "firebase/auth";
import { firebaseConfig } from './Firebase/config';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();

//App start

export default function App() {
  const FBapp = initializeApp(firebaseConfig)
  const FBauth = getAuth(FBapp)
  const FBdb = getFirestore(FBapp)
  const FBstorage = getStorage(FBapp)

  // state
  const [auth, setAuth] = useState();
  const [isLogedIn,setIsLogedIn] = useState(false);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


  // authentication observer
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      // user is authenticated
      setAuth(user)
      setIsLogedIn(true)
    }
    else {
      // user is not authenticated
      setAuth(null)
      setIsLogedIn(false)
    }
  })

  const Login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(FBauth, email, password)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  if (isLogedIn == true) {
    return (
      <AuthContext.Provider value={FBauth}>
        <DbContext.Provider value={FBdb}>
          <StorageContext.Provider value={FBstorage}>
            <NavigationContainer>
              <Tab.Navigator initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'storefront'
                        : 'storefront-outline';
                    } else if (route.name === 'ProductView') {
                      iconName = focused ? 'sparkles' : 'sparkles-outline';
                    } else if (route.name === 'Cart') {
                      iconName = focused? 'cart' : 'cart-outline';
                    }
                    else {
                      iconName = focused? 'person' : 'person-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#AF005F',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {(props) => <Home />}
                </Tab.Screen>
                {/* <Tab.Screen name="Login" options={{ headerShown: false }}>
                  {(props) => <LoginScreen handler={Login} />}
                </Tab.Screen> */}
                {/* <Tab.Screen name="Product" options={{ headerShown: false }}>
                  {(props) => <Product />}
                </Tab.Screen> */}
                <Tab.Screen name="ProductView" component={ProductView} options={{ headerShown: false }} />
                <Tab.Screen name="Cart" options={{ headerShown: false }}>
                  {(props) => <Cart />}
                </Tab.Screen>
                <Tab.Screen name="Profile" options={{ headerShown: false }}>
                  {(props) => <Profile />}
                </Tab.Screen>
              </Tab.Navigator>
            </NavigationContainer>
          </StorageContext.Provider>
        </DbContext.Provider>
      </AuthContext.Provider>
    );
  }  else {
    return (
      <AuthContext.Provider value={FBauth}>
        <DbContext.Provider value={FBdb}>
          <StorageContext.Provider value={FBstorage}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" options={{ headerShown: false }}>
                  {(props) => <LoginScreen handler={Login} />}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ headerShown: false }}>
                  {(props) => <RegisterScreen />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </StorageContext.Provider>
        </DbContext.Provider>
      </AuthContext.Provider>
    );
  }

  

  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
//import Product from './Screens/LogedIn/Product';
import {Profile} from './Screens/LogedIn/Profile';
import CartView from './Screens/LogedIn/CartView';
import ProductView from './Screens/LogedIn/ProductView';
//import contexts
import { AuthContext } from './contexts/AuthContext'
import { DbContext } from './contexts/DbContext'
import { StorageContext } from './contexts/StorageContext'
import { CartProvider } from './contexts/CartContext';
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
import PaymentScreen from './Screens/LogedIn/PaymentGateway/PaymentScreen';

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();

//App start


//stripe payment integration
import { StripeProvider } from '@stripe/stripe-react-native';


export default function App() {
  const FBapp = initializeApp(firebaseConfig)
  const FBauth = getAuth(FBapp)
  const FBdb = getFirestore(FBapp)
  const FBstorage = getStorage(FBapp)
const Publishable_key = "pk_test_51P6WBnP7DYkfCAsDC8IhYTQcelYpc3kCMpduGO36a6BMNeOOBzqsjpLrSyxDNrKqbVlMtNbPO1QCwrohm5XI6Qpb00V3yzarYJ"

console.log("push:" , Publishable_key)

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
          <CartProvider>
          <NavigationContainer>
            <StripeProvider
              publishableKey={Publishable_key}
              merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
              <Tab.Navigator initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'storefront'
                        : 'storefront-outline';
                    // } else if (route.name === 'Product') {
                    //   iconName = focused ? 'sparkles' : 'sparkles-outline';
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
                      {(props) => (
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                          <Stack.Screen name="HomeScreen" component={Home} />
                          <Stack.Screen name="Product" component={ProductView} />
                          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                        </Stack.Navigator>
                      )}
                </Tab.Screen>
                {/* <Tab.Screen name="Product" component={ProductView} options={{ headerShown: false }} />
                <Tab.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
                */}
                <Tab.Screen name="Cart" component={CartView} options={{ headerShown: false }}>
                  {/* {(props) => <Cart />} */}
                </Tab.Screen>
                <Tab.Screen name="Profile" options={{ headerShown: false }}>
                  {(props) => <Profile />}
                </Tab.Screen>
              </Tab.Navigator>
              </StripeProvider>
            </NavigationContainer>
          </CartProvider>
            
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

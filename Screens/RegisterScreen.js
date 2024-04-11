//import { firebase } from '@react-native-firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
//components
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
//contexts
import { AuthContext } from '../contexts/AuthContext';
import { DbContext } from '../contexts/DbContext';
//firebase
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'



export function RegisterScreen(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validUsername, setValidUsername] = useState(false)
  
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [displayFormErr, setDisplayFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState()

  // const goToLoginScreen = () => {
  //   navigation.navigate('Login');
  // }
  const navigation = useNavigation()
  const Auth = useContext(AuthContext)
  const db = useContext(DbContext)
  

  useEffect(() => {
    if (Auth.currentUser) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] })
    }
  })

  //check the value of email
  useEffect(() => {
    if (email.indexOf('@') > 0) {
      setValidEmail(true)
    }
    else {
      setValidEmail(false)
    }
  }, [email])

  // check the value of password
  useEffect(() => {
    if (password.length >= 8) {
      setValidPassword(true)
    }
    else {
      setValidPassword(false)
    }
  }, [password])

   // check the value of username
   const allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890"
   const isAllowed = (str) => {
     let errors = []
     const chars = str.toLowerCase().split('')
     for (let i = 0; i < chars.length; i++) {
       if (!allowedChars.includes(chars[i])) {
         errors.push({ character: chars[i], position: i })
       }
     }
     if (errors.length > 0) {
       //return { status: false, errors: errors, message: `${errors.length} illegal characters found`}
       return false
     }
     else {
       //return { status: true, message: "all characters are legal" }
       return true
     }
   }

   useEffect(() => {
    if (fullName.length > 3 && isAllowed(fullName)) {
      setValidUsername(true)
    }
  }, [fullName])
  
  function fullNameChange(value) {
    setFullName(value);
  }
  
  //create user function
  function createUser() {
    setIsLoading(true);
    createUserWithEmailAndPassword(Auth, email, password).then(async (userCredential) => {
      const user = userCredential.user
      const userObject = { email: user.email, name: fullName, phone: phoneNumber, profileImg: "default.png", hasImage: false }
      const docRef = doc(db, "users", user.uid)
      const userDoc = await setDoc( docRef, userObject)
      
      setSuccessMessage("Account created successfully");
      
    })
    .catch(error => {
      setError(error.code)
        // wait 3000 milliseconds and then reset the error state to null
      setTimeout(() => {
        setError(null)
      }, 3000)
      setIsLoading(false);
      setErrMessage(error.message);
      setDisplayFormErr(true);
      console.log(error.message);
     });
  }
  
  //check validation function
  const validationForm = () => {
    var form_inputs = [fullName, email, phoneNumber, password, confirmPassword];
    var passwords_match = password === confirmPassword;
  
    if(form_inputs.includes('') || form_inputs.includes(undefined)){
      setErrMessage("Please fill in all fields");
      return setDisplayFormErr(true);
    }  
      
    if(!passwords_match) {
      setErrMessage("Passwords do not match");
      return setDisplayFormErr(true);
    } 

    if(passwords_match) return createUser();
  }

  // const submitHandler = () => {
  //   props.handler(email, password)
  //     .then((userCredential) => {
  //       // sign up successful
  //       // write the username into Firestore
  //       console.log(userCredential.user.uid)
  //       const docRef = doc(db, "users", userCredential.user.uid)
  //       setDoc(docRef, { email: user.email, name: fullName, phone: phoneNumber, profileImg: "default.png" })
  //         .then((res) => console.log(res))
  //     })
  //     .catch((error) => {


  //     })
  //   // reset the fields
  //   setEmail('')
  //   setPassword('')
  // }


  return (
    <View style={styles.container}>
      <View style={styles.TopView}>
        {<Image style={styles.ImageStyle} source={require('../assets/logo.png')} /> }
      </View>

      <ScrollView style={styles.BottomView}>
        <Icon onPress={()=>{navigation.navigate("Login")}} style={styles.Icons} name="chevron-left" />
        <Text style={styles.Heading}>
          Create account
        </Text>
        <View style={styles.FormView}>
          <TextInput
            style={styles.input}
            placeholder="Full Name*"
            placeholderTextColor="#fff"
            value={fullName}
            onChangeText={fullNameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address*"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={(val) => setEmailAddress(val)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number*"
            placeholderTextColor="#fff"
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password*"
            placeholderTextColor="#fff"
            secureTextEntry={true}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password*"
            placeholderTextColor="#fff"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
          />
          <TouchableOpacity style={styles.button} onPress={validationForm} >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {displayFormErr == true?
        <FormError hideErrOverlay={setDisplayFormErr} err={errMessage}/> 
        :
        null
      }
      {isLoading == true?
        <FormSuccess/> 
        :
        successMessage=="Account created successfully"?
          <FormSuccess successMessage={successMessage} close={setSuccessMessage}/>
        : 
        null
      }

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopView: {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '85%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  FormView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    width: '90%',
    height: 52,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    color: '#fff',
    
  },
  button: {
    width: '90%',
    height: 52,
    color: '#000',
    backgroundColor: '#AF005F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ImageStyle: {
    width: '50%',
    resizeMode: 'contain',
  },
  Heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 5,
  },
  SignupText: {
    color: 'gray',
  },
  signupButtonText: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  Icons:{
    marginLeft: 5,
    marginTop: 10,
    color: '#fff',
    fontSize: 40,
  },

});




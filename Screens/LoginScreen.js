import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//import navigation
import { useNavigation } from '@react-navigation/native'
//import components
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
//contexts
import { AuthContext } from '../contexts/AuthContext'

//firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../Firebase/config'

export function LoginScreen (props) {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrMessage] = useState('');
  const [displayFormErr, setDisplayFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const[validEmail, setValidEmail] = useState(false)
  const[validPassword, setValidPassword] = useState(false)
  const[error, setError ] = useState()

  const Auth = useContext(AuthContext)
  const navigation = useNavigation()

  useEffect( () => {
    if( email.indexOf('@' > 0) ) {
      setValidEmail(true)
    }
    else {
      setValidEmail(false)
    }
  }, [email])

  useEffect(() => {
    if( password.length >= 8 ) {
      setValidPassword(true)
    }
    else {
      setValidPassword( false)
    }
  })

  useEffect( () => {
    if( Auth.currentUser ) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] })
    }
  })

  // const validateInput = () => {
  //   var form_inputs =[email,password];

  //   if(form_inputs.includes('') || form_inputs.includes(undefined)){
  //     setErrMessage("Please fill in all filelds");
  //     return setDisplayFormErr(true);
  //   }  

  //   signInWithEmailAndPassword(Auth)
  //   .then(()=> {})
  //   .catch((error) => {
  //     setErrMessage(error.message);
  //     return setDisplayFormErr(true);
  //   })
  // }

  const submitHandler = () => {
    props.handler( email, password )
    .then( ( user ) => {
      // sign up successful
      setIsLoading(true);
    })
    .catch( (error) => {
      console.log(error.message)
      setErrMessage(error.message)
      setIsLoading(false)
      return setDisplayFormErr(true)
    } )
  }

  return (
    <View style={styles.container}>
      <View style={styles.TopView}>
        {<Image style={styles.ImageStyle} source={require('../assets/logoCoffee.png')} /> }
      </View>

      <View style={styles.BottomView}>
        <Text style={styles.Heading}>
          Welcome{'\n'}
          back
        </Text>
        <View style={styles.FormView}>
          <TextInput
            style={styles.input}
            placeholder="Email Address*"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={(val) => setEmailAddress(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password*"
            placeholderTextColor="#fff"
            secureTextEntry={true}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity style={styles.button} onPress={() => submitHandler() }>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signupButtonText} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={styles.SignupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {displayFormErr == true?
        <FormError hideErrOverlay={setDisplayFormErr} err={errorMessage}/> 
        :
        null
      }
      {isLoading == true?
        <FormSuccess/> 
        :
        successMessage=="Welcome to LaviaWigs"?
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
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '80%',
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
    width: 200,
    height: 250,
    resizeMode: 'contain',
  },
  Heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 60,
  },
  SignupText: {
    color: 'gray',
  },
  signupButtonText: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

});






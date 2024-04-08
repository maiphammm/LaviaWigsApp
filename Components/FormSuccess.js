import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/themed';

const FormSuccess = (props) => {
  return (
    props.successMessage?
      <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.close('')}>
        {<Image style={styles.successIcon} 
        source={require('../assets/success.png')} /> }
        <Text style={styles.successMessage}>
            {props.successMessage}
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>props.hideErrOverlay(false)}>
            <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </Overlay>
    :
    <Overlay overlayStyle={styles.Overlay} isVisible={true}>
      <ActivityIndicator size={"large"} color={"#AF005F"}/>
    </Overlay>
    
    
  )
}

export default FormSuccess

const styles = StyleSheet.create({
  Overlay:{
    width: '90%',
    height: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  successIcon:{
    width: 72,
    height: 72,
  },
  successMessage:{
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20
  },

  button:{
      width: 280,
      height: 51,
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

})
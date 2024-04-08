import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/themed';

const FormError = (props) => {
  return (
    <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideErrOverlay(false)}>
        {<Image style={styles.errorIcon} 
        source={require('../assets/error.png')} /> }
        <Text style={styles.errorMessage}>
            {props.err}
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>props.hideErrOverlay(false)}>
            <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
    </Overlay>
  )
}

export default FormError

const styles = StyleSheet.create({
    Overlay:{
        width: '90%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    errorIcon:{
        width: 72,
        height: 72,
    },

    errorMessage:{
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
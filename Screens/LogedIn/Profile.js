import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"

import { AuthContext } from '../../contexts/AuthContext'
import { DbContext } from '../../contexts/DbContext'

import { ProfileImage } from '../../Components/ProfileImage'

export function Profile( props ) {
  
  const defaultProfile = {
    name: "", 
    profileImg: "default.png"
  };
  
  const [user,setUser] = useState()
  const [ profile, setProfile ] = useState( defaultProfile )

  const Auth = useContext( AuthContext )
  const db = useContext( DbContext )

  const getUserData = async () => {
    const docRef = doc( db, "users", `${user.uid}` )
    const docSnap = await getDoc( docRef )
    if( docSnap.exists ) {
      setProfile( docSnap.data() )
    }
  }

  useEffect( () => {
    if( user ) {
      getUserData()
    }
  }, [user] )

  useEffect( () => {
    if( Auth.currentUser ) {
      setUser( Auth.currentUser )
    }
    else {
      setUser(null)
    }
  }, [Auth])


  if( !profile ) {
    return(
      <View style={ styles.container }>
        <Text>No user data available</Text>
      </View>
    )
  }
  else {
    return(
      <View style={ styles.container }>
        <ProfileImage img={profile.profileImg} custom={profile.hasImage} />
        <Text style={ styles.userDisplay }>Welcome back {profile.name}</Text>
        <Text>{profile.email}</Text>
        <Pressable 
          style={styles.button} 
          onPress={ () => {
            signOut( Auth ).then(()=> {})
          }
        }>
          <Text style={ styles.button.text }>Sign out</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginVertical: 15,
    padding: 8,
    backgroundColor: "#AF005F",
    borderRadius: 6,
    marginTop: 20,
    text: {
      color: "white",
      textAlign: "center",
    }
  },
  userDisplay: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 20
  }
})
import { Image, StyleSheet, View } from 'react-native'

export function ProfileImage () {
    return (
        <View style={styles.noimage}>
            {<Image style={styles.tinyLogo} source={require('../assets/default.png')} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100
      },
      noimage: {
        height: 100
      }
})
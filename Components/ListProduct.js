import { View, Text, StyleSheet, Pressable } from 'react-native'

import { DateDisplay } from '..Components/DateDisplay'

export function ListProduct ( props ) {
  const ProductDate = props.product.created
  return (
    <View style={ styles.product }>
      <Pressable onPress={ () => props.editor(props.product) } >
        <Text>{ props.product.name }</Text>
        <DateDisplay date={ ProductDate } />
      </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
  product: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    margin: 5,
  }
})
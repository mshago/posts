import React from 'react'
import { 
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'

const ButtonAddPost = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.button}>
        <Icon
            name='ios-add-outline'
            type='ionicon'
            color='#fff'
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
      position:'absolute',
      bottom:20,
      right:20,
      height:60,
      width:60,
      backgroundColor:'dodgerblue',
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center'
    },
})

export default ButtonAddPost
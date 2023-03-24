import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/index'
import {Container} from '../../components/container/Container'

export const ProfileScreenView = () => {
  return (
    <Container>
      <View style={styles.userInfo}>

      </View>
      <View style={[styles.userInfo,{backgroundColor:'tomato'}]}>

      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
    userInfo:{
      width:'100%',
      paddingVertical:50,
      backgroundColor:Colors.primary
    },
    button:{
        paddingHorizontal:40,
        paddingVertical:10,
        borderRadius:20,
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
    },
    username:{
        fontSize:16,
        color:'#a4a4a4'
    }
})

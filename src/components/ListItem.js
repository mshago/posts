import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Image,
} from 'react-native'
import { Icon } from 'react-native-elements'

const datePosted = (dateN, dateP) => {
  const difference = (dateN.getTime() - dateP.getTime())/1000 //sec

  if(difference<60){
    return Math.abs(Math.floor(difference))+'s'
  }
  if((difference/60)<60){
    const min = Math.floor(difference/60)
    return min+'m'
  }
  if((difference/60/60)<24){
    const hours = Math.floor(difference/60/60)
    return hours+'h'
  }
  const days = Math.floor(difference/60/60/24)
  return days+'d'
}


export default ({ post, user, me, onPress }) => {
  const now = new Date;
  const date = new Date(post.date) 
  const timePosted = _ => {
    if(now.getFullYear()-date.getFullYear()>0){
      return ((now.getFullYear()-date.getFullYear()).toString())+'y'
    }
    return datePosted(now,date)
  }

  return(
    <TouchableOpacity 
    onPress={onPress}
    style={styles.item}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Image
        style={{width:60,height:60,borderRadius:50}}
        source={{uri:'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'}}
        />
      </View>
      <View style={{flex:3,marginHorizontal:10}}>
        <View style={styles.row}>
          <Text style={styles.user}>{user.name}</Text>
          <Text style={styles.username}>{'@'+user.username}</Text>
          <Text style={styles.username}>{' . '+timePosted()}</Text>
        </View>
        <Text style={styles.description}>{post.description}</Text>
      </View>
      <View style={{flex:1}}>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item:{
        alignSelf:'stretch',
        flexDirection:'row',
        //paddingHorizontal:50,
        paddingVertical:20,
        borderBottomColor:'dodgerblue',
        borderBottomWidth:1
    },
    user:{
        fontSize:16,
        fontWeight:'700',
        marginRight:5,
    },
    username:{
      fontSize:16,
      color:'#959595',
    },
    row:{
      flexDirection:'row',
      alignSelf:'stretch',
      alignItems:'center',
      justifyContent:'flex-start',
    },
    description:{
      fontSize:16,
    },
})

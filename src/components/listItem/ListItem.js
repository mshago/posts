import React from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity,
  Image,
} from 'react-native'
import { datePosted } from '../../utils/datePosted'
import { styles } from './ListItem.styles'

export const ListItem =({ post, user, me, onPress }) => {
  const now = new Date;
  const date = new Date(post.date) 

  const timePosted = () => {
    if(now.getFullYear()-date.getFullYear()>0){
      return ((now.getFullYear()-date.getFullYear()).toString())+'y'
    }
    return datePosted(now,date)
  }

  return(
    <TouchableOpacity 
    onPress={onPress}
    style={styles.item}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center',paddingLeft:20}}>
        <Image
        style={{width:60,height:60,borderRadius:50}}
        source={require('../../../assets/defaultUserIcon.png')}
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
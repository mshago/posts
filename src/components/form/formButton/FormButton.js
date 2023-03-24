import React from 'react';
import { ActivityIndicator } from 'react-native';
import { 
  Dimensions, 
  StyleSheet, 
  Text,
  TouchableOpacity,
} from 'react-native';

export default ({ title, onPress, loading, ...rest}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.formButton}
    {...rest}>
      {
        loading?
        <ActivityIndicator color={'#fff'}/>
        :
        <Text style={{color:'#fff'}}>{title}</Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  formButton:{
    height:50,
    width:Dimensions.get('window').width-40,
    borderRadius:50,
    backgroundColor:'#000',
    alignItems:'center',
    justifyContent:'center'
  },
});

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'

import FormErrorMessage from './FormErrorMessage'

export default ({ title, value, onChangeText, onBlur, errors, touched, ...otherProps }) => {
  const [icon, setIcon] = useState('#000')
  const [visible, setVisible] = useState(false)

  const showPassword = () => {
    setIcon(icon === '#000' ? '#c4c4c4' : '#000')
    setVisible(!visible)
  }

  return(
    <View style={{alignSelf:'stretch',marginHorizontal:20,marginBottom:10}}>
      {(title && title.length > 0)?
      <Text style={styles.formTitle}>{title}</Text>
      :
      null}
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={styles.formInput}
        placeholder={'Enter your password'} 
        textContentType={'password'}
        secureTextEntry={!visible}
      />
      <TouchableOpacity
      style={{
        position:'absolute',
        right:0,
        bottom:0,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center'
      }}
      onPress={() => showPassword()}>
        <Icon
          style={styles.icon}
          name={visible ? 'ios-eye-outline' : 'ios-eye-off-outline'}
          type='ionicon'
          color='#000'
        />
      </TouchableOpacity>
      <FormErrorMessage error={errors} visible={touched} />
    </View>
  )
}

const styles = StyleSheet.create({
  formTitle:{
    fontSize:16,
    textTransform:'capitalize'
  },
  formInput:{
    alignSelf:'stretch',
    height:50,
    borderBottomColor:'#000',
    borderBottomWidth:1,
    paddingHorizontal:10,
  },
  icon:{
    width:50,
  }
});

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
} from 'react-native';

import FormErrorMessage from './FormErrorMessage'

export default ({ title, value, onChangeText, errors, touched, onBlur, ...otherProps }) => {

  return (
    <View style={{alignSelf:'stretch',marginHorizontal:20,marginBottom:10}}>
      {(title && title.length > 0)?
      <Text style={styles.formTitle}>{title}</Text>
      :
      null}
      <TextInput
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={styles.formInput}
        {...otherProps}
      />
      <FormErrorMessage error={errors} visible={touched} />
    </View>
  )
}

const styles = StyleSheet.create({
  formTitle:{
    fontSize:16,
    textTransform:'capitalize',
  },
  formInput:{
    alignSelf:'stretch',
    height:50,
    borderBottomColor:'#000',
    borderBottomWidth:1,
    paddingHorizontal:10,
  },
});

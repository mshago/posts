import React, { useContext, useState } from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import FormInput from '../components/Form/FormInput'
import PasswordFormInput from '../components/Form/PasswordFormInput'
import FormButton from '../components/Form/FormButton'
import { AuthContext } from '../hooks/authContext'

export default function Register({ navigation }) {
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Enter your email')
      .email('Enter a valid email'),
    username: Yup.string()
      .required('Enter an username'),
    password: Yup.string()
      .required('Enter your password'),
    name: Yup.string()
      .required('Enter your first name'),
    last_name : Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      email: '', username:'', password: '', name: '', last_name: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values)
  })

  const handleSubmit = (values) => {
    setLoading(true)
    fetch('https://auth-serverless-santiagolunav.vercel.app/api/auth/register',{
      method:'post',
      headers:{
        'Content-Type':'Application/json'
      },
      body: JSON.stringify(values),
    })
    .then(x => x.text())
    .then(x => {
      try{
        return JSON.parse(x)
      } catch {
        throw x
      }
    })
    .then(x => {
      AsyncStorage.setItem('userToken', x.token)
      AsyncStorage.setItem('userId', x.userId)
      signUp({
        token:x.token,
        userId:x.userId
      })
    })
    .catch(e => {
      setError(e)
      setLoading(false)
    })
  }


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <FormInput 
      title={'first name'}
      value={formik.values.name}
      onBlur={formik.handleBlur('name')}
      onChangeText={formik.handleChange('name')}
      placeholder={'Enter your first name'}
      autoFocus={true}
      errors={formik.errors.name}
      touched={formik.touched.name}
      />
      <FormInput 
      title={'last name'}
      value={formik.values.last_name}
      onBlur={formik.handleBlur('last_name')}
      onChangeText={formik.handleChange('last_name')}
      placeholder={'Enter your last name'}
      errors={formik.errors.last_name}
      touched={formik.touched.last_name}
      />
      <FormInput 
      title={'email'}
      value={formik.values.email}
      onBlur={formik.handleBlur('email')}
      onChangeText={formik.handleChange('email')}
      placeholder={'Enter your email'}
      textContentType={'emailAddress'}
      autoCapitalize={'none'}
      errors={formik.errors.email}
      touched={formik.touched.email}
      />
      <FormInput 
      title={'username'}
      value={formik.values.username}
      onBlur={formik.handleBlur('username')}
      onChangeText={formik.handleChange('username')}
      placeholder={'Enter an username'}
      autoCapitalize={'none'}
      errors={formik.errors.username}
      touched={formik.touched.username}
      />
      <PasswordFormInput
      value={formik.values.password}
      onBlur={formik.handleBlur('password')}
      onChangeText={formik.handleChange('password')}
      title={'password'}
      placeholder={'Enter your password'}
      error={formik.errors.password}
      touched={formik.touched.password}
      />
      <FormButton
      loading={loading}
      onPress={loading?() => {}:formik.handleSubmit}
      title={'Sign up'}
      />
      <Text 
        style={styles.signup}
        onPress={() => navigation.navigate('Login')}
      >Have an account?</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:20,
  },
  title:{
    fontSize:28,
    marginBottom:20,
  },
  signup:{
    marginVertical:10,
    color:'#a4a4a4'
  },
});

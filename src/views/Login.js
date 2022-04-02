import React, { useContext, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import FormInput from '../components/Form/FormInput'
import PasswordFormInput from '../components/Form/PasswordFormInput'
import FormButton from '../components/Form/FormButton'
import { AuthContext } from '../hooks/authContext'

export default function Login({ navigation }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Enter your email')
      .email('Enter a valid email'),
    password: Yup.string()
      .required('Enter your password')
  })

  const formik = useFormik({
    initialValues: {
      email: '', password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values)
  })

  const handleSubmit = (values) => {
    setLoading(true)
    fetch('https://auth-serverless-santiagolunav.vercel.app/api/auth/login',{
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
      signIn({
        token:x.token,
        userId:x.userId,
      })
    })
    .catch(e => {
      setError(e)
      setLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      {error?<Text style={styles.error}>{error}</Text>:null}
      <FormInput 
      title={'email*'}
      value={formik.values.email}
      onBlur={formik.handleBlur('email')}
      onChangeText={formik.handleChange('email')}
      placeholder={'Enter your email'}
      textContentType={'emailAddress'}
      autoCapitalize={'none'}
      autoFocus={true}
      errors={formik.errors.email}
      touched={formik.touched.email}
      />
      <PasswordFormInput
      value={formik.values.password}
      onBlur={formik.handleBlur('password')}
      onChangeText={formik.handleChange('password')}
      title={'password*'}
      placeholder={'Enter your password'}
      error={formik.errors.password}
      touched={formik.touched.password}
      />
      <FormButton
      loading={loading}
      onPress={loading?() => {}:formik.handleSubmit}
      title={'Sign in'}
      />
      <Text 
        style={styles.signup}
        onPress={() => navigation.navigate('Register')}
      >Don't have an account?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:28,
    marginBottom:10,
  },
  signup:{
    marginVertical:10,
    color:'#a4a4a4'
  },
  error:{
    color:'tomato',
    fontWeight:'600',
    marginBottom:10,
  }
});

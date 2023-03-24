import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterScreenView } from './RegisterScreen.view';

export const RegisterScreen = ({ navigation }) => {
  
  const [loading, setLoading] = useState(false)
  // const { signUp } = useContext(AuthContext)

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
    /*setLoading(true)
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
    })*/
  }

  return (
    <RegisterScreenView formik={formik} loading={loading} navigation={navigation}/>
  )

  
}


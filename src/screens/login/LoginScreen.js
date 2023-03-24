import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'

//components
import { LoginScreenView } from './LoginScreen.view';
import { login } from '../../helpers/auth';
import { storeData } from '../../utils/asyncStorage';
import { TOKEN_KEY, USER_TOKEN_KEY } from '../../constants';
import { useAuthContext } from '../../contexts/auth';
import { AUTH_ACTIONS } from '../../contexts/actionTypes';

export const LoginScreen = ({ navigation }) => {
  const {dispatch} = useAuthContext()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Enter your email')
      .email('Enter a valid email'),
    password: Yup.string()
      .required('Enter your password')
  })

  const formik = useFormik({
    initialValues: {
      email: 'example@example.com', password: '123456'
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values)
  })

  const handleSubmit = async (values) => {
    setError('')
    setLoading(true)
    login(values).then(data => {
      const {token, userId} = JSON.parse(data)
      storeData(TOKEN_KEY,token)
      storeData(USER_TOKEN_KEY,userId)
      dispatch({type:AUTH_ACTIONS.SIGN_IN, token:token})
    })
    .catch((error) => {
      setError(error.message)
      setLoading(false)
    })
  }

  return(
    <LoginScreenView error={error} loading={loading} formik={formik} navigation={navigation}/>
  )
}

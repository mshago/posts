import 'react-native-gesture-handler';
import React, { useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

//navigators
import AuthNavigator from './src/navigators/AuthNavigator'
import UserNavigator from './src/navigators/UserNavigator'

import { AuthContext } from './src/hooks/authContext'
import { reducer, initialState } from './src/hooks/authReducer'

const StackNavigator = createStackNavigator();

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      let userId = null;

      try {
        userToken = await AsyncStorage.getItem('userToken')
        userId = await AsyncStorage.getItem('userId')
      } catch (e) {
        //
      }

      dispatch({type: 'RESTORE_TOKEN',token: userToken, userId: userId})
    }

    bootstrapAsync()
  },[])

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data.token, userId: data.userId })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: data.token, userId: data.userId })
      },
      user: () => { return state }
    }),
    []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <AuthNavigator />
        ) : (
          <UserNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//screens
import LoginScreen from '../views/Login'
import RegisterScreen from '../views/Register'

const AuthStackNavigator = createStackNavigator()

export default function AuthNavigator() {
    return (
        <AuthStackNavigator.Navigator 
        screenOptions={{headerShown:false}}>
            <AuthStackNavigator.Screen 
                name='Login' 
                component={LoginScreen} />
            <AuthStackNavigator.Screen 
                name='Register' 
                component={RegisterScreen} />
        </AuthStackNavigator.Navigator>
    )
}

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

//screens
import HomeScreen from '../views/Home'
import PostScreen from '../views/Post'
import UserScreen from '../views/User'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const UserStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Posts' component={HomeScreen} />
            <Stack.Screen name='Post' component={PostScreen} />
        </Stack.Navigator>
    )
}

export default function UserTabNavigator() {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name === 'Home'){
                        iconName = focused
                        ? 'ios-home-sharp'
                        : 'ios-home-outline';
                    } else if(route.name === 'User'){
                        iconName = focused 
                        ? 'ios-person'
                        : 'ios-person-outline' 
                    }

                    return <Icon name={iconName} size={size} color={color} type='ionicon' />
                },
            })}>
            <Tab.Screen name='Home' component={UserStackNavigator} />
            <Tab.Screen name='User' component={UserScreen} />
        </Tab.Navigator>
    )
}

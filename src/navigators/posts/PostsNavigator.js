import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

//screens
import { HomeScreen, PostScreen, ProfileScreen } from "../../screens";
import { Colors } from "../../constants";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PostsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:Colors.primary,
    }}
     >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
};

export const PostsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Home" || route.name === "Post") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={Colors.primary}
              type="ionicon"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={PostsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import PostJobScreen from '../screens/PostJobScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import ApplicationsScreen from '../screens/ApplicationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'MyJobs') iconName = focused ? 'briefcase' : 'briefcase-outline'; 
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline'; 
        else iconName = 'help-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3A6FF8',
      tabBarInactiveTintColor: '#8A94A6',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyJobs" component={MyJobsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? 'HomeMain' : 'Login'}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="HomeMain" 
          component={HomeTabs}
        />
        <Stack.Screen 
          name="JobDetails" 
          component={JobDetailsScreen}
          options={{ headerShown: true, title: 'Job Details' }} 
        />
        <Stack.Screen 
          name="PostJob" 
          component={PostJobScreen}
          options={{ headerShown: true, title: 'Post a Job' }} 
        />
        <Stack.Screen 
          name="Applications" 
          component={ApplicationsScreen}
          options={{ headerShown: true, title: 'Applications' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

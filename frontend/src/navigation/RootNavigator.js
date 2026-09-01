import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Auth Screens
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import RegisterScreen from '../screens/AuthScreen/RegisterScreen';

// App Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import KaroBotScreen from '../screens/KaroBot/KaroBotScreen';
import CreateLessonScreen from '../screens/Lessons/CreateLessonScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'KaroBot') {
          iconName = 'robot';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3498db',
      tabBarInactiveTintColor: '#95a5a6',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 8,
        paddingTop: 8,
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'الرئيسية',
      }}
    />
    <Tab.Screen
      name="KaroBot"
      component={KaroBotScreen}
      options={{
        tabBarLabel: 'كروبوت',
      }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#3498db',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
    }}
  >
    <Stack.Screen
      name="MainApp"
      component={AppTabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CreateLesson"
      component={CreateLessonScreen}
      options={{
        title: 'إنشاء درس',
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
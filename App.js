import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Button, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeView from './Views/HomeView';
import AboutView from './Views/AboutView';

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40}}
      source={require('./assets/icon.png')}
    />
  );
}

const Tab = createBottomTabNavigator();

// requestLocationPermission()

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeView} Icons="grid"
        options={{

          tabBarLabel: 'Home',

          tabBarIcon: ({ color, size }) => {(<MaterialCommunityIcons name="home" color={color} size={size} /> )},

          headerTitle: (props) => <LogoTitle {...props} />
          
        }}/>
        <Tab.Screen
        name="About us"
        component={AboutView} 
        options={{

          tabBarLabel: 'About us',

          tabBarIcon: ({ color, size }) => {(<MaterialCommunityIcons name="information" color={color} size={size} /> )},
          
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

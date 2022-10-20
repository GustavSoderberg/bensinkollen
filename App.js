import * as React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from './Views/HomeView';
import SettingsView from './Views/SettingsView';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Bensinkollen permission",
        message: "Need your location thanks",
        buttonNeutral: "Not now",
        buttonNegative: "No",
        buttonPositive: "Yes"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can have my location");
    } else {
      console.log("You can not have my location");
    }
  } catch(err){
    console.warn(err);
  }
};

const Tab = createBottomTabNavigator();

requestLocationPermission()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeView} Icons="grid"/>
        <Tab.Screen name="Settings" component={SettingsView} />
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

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import { mapManager } from '../ViewModels/MapManager';
import { ApiManager, getBensinmack, fetchStations, apiManager } from '../ViewModels/ApiManager'
import { settings } from '../Models/Settings';

import DropdownComponent from './DropDownView';
import DropdownTwo from './DropDownView';




// getBensinmack()

export default class Home extends React.Component {
  render() {
    
    return (
      
      <ScrollView style={{ marginTop: 0}}>
      <DropdownComponent/>
      </ScrollView>
      
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      zIndex: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#212121',
      textAlign:'center'
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  })
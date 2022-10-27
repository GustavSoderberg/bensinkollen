/**
 * 
 * AboutView
 * 
 * This is a view that displays information about our app creators
 * 
 * @authors
 * Hampus B
 * Karol Ö
 * Oscar K
 * Gustav S
 * 
 */

import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';

import FullMapView from './FullMapView';





export default class Home extends React.Component {
  render() {
    
    return (
      
      <ScrollView style={{ marginTop: 0}}>
      <FullMapView/>
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
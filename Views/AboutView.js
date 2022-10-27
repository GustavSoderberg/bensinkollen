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

import React, { useState } from 'react';
import { SafeAreaView, Button, Alert,StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default class AboutView extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/logos/BK_icon_only_1024.png')} style={{ width: 100, height: 100 }} />
                <Text style={{ marginTop: 50}}>We are not held liable if you run out of gas</Text>
                <Text style={{ marginTop: 50, fontWeight: "bold"}}>This app was created by</Text>
                <Text>Gustav</Text>
                <Text>Oscar</Text>
                <Text>Karol</Text>
                <Text>Hampus</Text>
            </View>
        );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#212121',
      textAlign:'center'
    },
    button: {
      width:300,
      borderRadius: 25,
      backgroundColor:'#FCE4EC',
      marginVertical: 10,
      paddingVertical:16
  
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
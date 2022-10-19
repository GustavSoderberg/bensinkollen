import React, { useState } from 'react';
import { SafeAreaView, Button, Alert,StyleSheet, Text, TextInput, View } from 'react-native';
import { mapManager } from '../ViewModels/MapManager';
import { settings } from '../Models/Settings'

export default class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SafeAreaView>
                 <TextInput
                  value={settings.RadiusCircle.toString()}
                  style={styles.input}
                  placeholder="Radius"
                  keyboardType="numeric"
                  />
                <TextInput
                  style={styles.input}
                  value={mapManager.currentUser.lat.toString()}
                  placeholder="Lat"
                  keyboardType="numeric"
                  />
                <TextInput
                  style={styles.input}
                  value={mapManager.currentUser.long.toString()}
                  placeholder="Long"
                  keyboardType="numeric"
                  />
               <Button 
                 title='Save'
                 onPress={() => (console.log(mapManager))}
                 />
                </SafeAreaView>
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
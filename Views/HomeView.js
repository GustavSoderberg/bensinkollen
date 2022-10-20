import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import { mapManager } from '../ViewModels/MapManager';
import { ApiManager, getBensinmack, fetchStations, apiManager } from '../ViewModels/ApiManager'
import { settings } from '../Models/Settings';

import DropdownComponent from './DropDownView';




getBensinmack()
//mapManager.initialize()

export default class Home extends React.Component {
    render() {

        return (
            <ScrollView style={{ marginTop: 0}}>

                <DropdownComponent/>

                  <MapView style={styles.map}
                  onMapReady={() => {
                    PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ).then(granted => {
                      alert(granted) // just to ensure that permissions were granted
                    });
                  }}
                    initialRegion={{
                        latitude: (mapManager.currentUser.lat),
                        longitude: (mapManager.currentUser.long),
                        latitudeDelta: ((settings.LatDelta)),
                        longitudeDelta: ((settings.LngDelta)),
                    }}
                    region={this.props.coordinate}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    provider="google"
                    >

                    {/* <Marker coordinate={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} /> */}
                    
                      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={(settings.RadiusCircle)} />

                    {/* { mapManager.listOfGasStations.map(n => (
                      <Marker coordinate={{ latitude: n.lat, longitude: n.long }} pinColor="blue"><Image source={n.logo} style={{ width: settings.LogoWidth, height: settings.LogoHeight }} /><Callout><Text style={{ width: 50, height:  50 }}>{n.name + "\n" + "some more text here"}</Text></Callout></Marker>
                    )) } */}

                    </MapView>
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
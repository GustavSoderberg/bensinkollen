import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import { mapManager } from '../ViewModels/MapManager';
import { ApiManager, getBensinmack, fetchStations, apiManager } from '../ViewModels/ApiManager'
import { settings } from '../Models/Settings';

import DropdownComponent from './DropDownView';





getBensinmack()
//mapManager.initialize()

var stations = Array()
const station1 = ["Ingo","Nämndemansvägen 2, 757 57 Uppsala", "44.44"]
const station2 = ["OKQ8","Svartbäcksgatan 69, 753 33 Uppsala", "11.11"]
const station3 = ["ST1","Klangs gränd 2, 752 33 Uppsala", "22.22"]
const station4 = ["Shell","Vaksalagatan 85, 753 31 Uppsala", "33.33"]
const station5 = ["OKQ8","Skebogatan 2, 752 28 Uppsala", "33.33"]
const station6 = ["Circle K","Gamla Uppsalagatan 48, 754 25 Uppsala", "33.33"]
const station7 = ["Ingo","Kungsgatan 72, 753 21 Uppsala", "33.33"]
const station8 = ["Preem","Marmorvägen 2, 752 44 Uppsala", "33.33"]
stations.push(station1)
stations.push(station2)
stations.push(station3)
stations.push(station4)
stations.push(station5)
stations.push(station6)
stations.push(station7)
stations.push(station8)
//fetchStations(stations)


export default class Home extends React.Component {
    render() {

        return (
            <ScrollView style={{ marginTop: 0}}>

                <DropdownComponent/>

                  <MapView style={styles.map}
                    initialRegion={{
                        latitude: (mapManager.currentUser.lat),
                        longitude: (mapManager.currentUser.long),
                        latitudeDelta: ((settings.LatDelta)),
                        longitudeDelta: ((settings.LngDelta)),
                    }}
                    showsUserLocation={true}
                    provider="google"
                    >

                    {/* <Marker coordinate={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} /> */}
                    
                      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={(settings.RadiusCircle)} />

                    { mapManager.listOfGasStations.map(n => (
                      <Marker coordinate={{ latitude: n.lat, longitude: n.long }} pinColor="blue"><Image source={n.logo} style={{ width: settings.LogoWidth, height: settings.LogoHeight }} /><Callout><Text style={{ width: 50, height:  50 }}>{n.name + "\n" + "some more text here"}</Text></Callout></Marker>
                    )) }

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
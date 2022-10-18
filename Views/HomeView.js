import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import { mapManager } from '../ViewModels/MapManager';
import { ApiManager, getBensinmack, fetchStations } from '../ViewModels/ApiManager'
import { settings } from '../Models/Settings';



getBensinmack()

var stations = Array()
const station1 = ["OKQ8","Årstagatan 5-7, 754 34 Uppsala", "123"]
const station2 = ["Preem","Gärdets Bilgata 38, 754 20 Uppsala", "23"]
const station3 = ["Circle K","Gränby Bilgata 2, 754 31 Uppsala", "22.23"]
const station4 = ["Shell","Vaksalagatan 85, 753 31 Uppsala", "200"]
stations.push(station1)
stations.push(station2)
stations.push(station3)
stations.push(station4)
fetchStations(stations)

export default class Home extends React.Component {
    render() {

        return (
            <View style={{ marginTop: 0, flex: 1}}>
                  <MapView style={styles.map}
                    initialRegion={{
                        latitude: (mapManager.currentUser.lat),
                        longitude: (mapManager.currentUser.long),
                        latitudeDelta: ((settings.LatDelta*settings.RadiusConstant)),
                        longitudeDelta: ((settings.LngDelta*settings.RadiusConstant)),
                    }}
                    showsUserLocation={true}
                    provider="google"
                    >

                    {/* <Marker coordinate={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} /> */}
                    
                      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={(settings.RadiusCircle*settings.RadiusConstant)} />
                    
                    

                    {mapManager.listOfGasStations.map(n => (
                      <Marker coordinate={{ latitude: n.lat, longitude: n.long }} pinColor="blue"><Image source={n.logo} style={{ width: 25, height: 43.3 }} /><Callout><Text style={{ width: 50, height:  50 }}>{n.name + "\n" + n.price}</Text></Callout></Marker>
                    ))}

                    </MapView>
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
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
  
    }
  })
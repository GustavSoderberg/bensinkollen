import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import { mapManager } from '../ViewModels/MapManager';
import { ApiManager, getBensinmack } from '../ViewModels/ApiManager'



getBensinmack()

export default class Home extends React.Component {
  
    render() {

        return (
            <View style={{ marginTop: 0, flex: 1}}>
                  <MapView style={styles.map}
                    initialRegion={{
                        latitude: mapManager.currentUser.lat,
                        longitude: mapManager.currentUser.long,
                        latitudeDelta: 0.0085,
                        longitudeDelta: 0.005,
                    }}
                    provider="google"
                    >

                    <Marker coordinate={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} />
                    <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={200} />

                    {mapManager.listOfGasStations.map(n => (
                      <Marker coordinate={{ latitude: n.lat, longitude: n.long }} pinColor="blue"><Callout><Text>{n.name}</Text></Callout></Marker>
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
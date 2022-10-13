import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapManager from '../ViewModels/MapManager';


export default class Home extends React.Component {
  
    render() {

        return (
            <View style={{ marginTop: 0, flex: 1}}>
                  <MapView style={styles.map}
                    initialRegion={{
                        latitude: 59.361631,
                        longitude: 17.959703,
                        latitudeDelta: 0.0085,
                        longitudeDelta: 0.005,
                    }}
                    mapType="mutedStandard"
                    provider="google"
                    >

                    <Marker coordinate={{ latitude: 59.361631, longitude: 17.959703 }} />
                    <Circle center={{ latitude: 59.361631, longitude: 17.959703 }} radius={200} />

                    <Marker coordinate={{ latitude: 37.78428, longitude: -122.4324 }} />

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
  });
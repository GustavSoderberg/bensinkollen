import React, { useState } from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { mapManager } from '../ViewModels/MapManager';
import { settings } from '../Models/Settings';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: '1 km', value: '1000' },
  { label: '2 km', value: '2000' },
  { label: '3 km', value: '3000' },
  { label: '4 kq', value: '4000' },
  { label: '5 km', value: '5000' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
        Dropdown label
        </Text>
        );
      }
      return null;
    };
    
    return (
      <View>
      <View style={styles.container}>
      {renderLabel()}
      <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      //search  search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Radius' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        settings.RadiusConstant = value
        setValue(item.value);
        setIsFocus(false);
      }}
      />
      </View>
      <MapView style={styles.map}
      initialRegion={{
        latitude: (mapManager.currentUser.lat),
        longitude: (mapManager.currentUser.long),
        latitudeDelta: ((settings.LatDelta)),
        longitudeDelta: ((settings.LngDelta)),
      }}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsUserLocation={true}
      provider="google"
      >
      
      {/* <Marker coordinate={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} /> */}
      
      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={value} />
      
      {/* { mapManager.listOfGasStations.map(n => (
        <Marker coordinate={{ latitude: n.lat, longitude: n.long }} pinColor="blue"><Image source={n.logo} style={{ width: settings.LogoWidth, height: settings.LogoHeight }} /><Callout><Text style={{ width: 50, height:  50 }}>{n.name + "\n" + "some more text here"}</Text></Callout></Marker>
      )) } */}
      
      </MapView>
      </View>
      );
    };
    
    export default DropdownComponent;
    
    const styles = StyleSheet.create({
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#212121',
        textAlign:'center'
      },
      map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      },
  container: {
    position: 'absolute',
    zIndex: 90,
    paddingHorizontal: 16,
    width: '40%',
  },
  //dropdown button collapsed vvv
  dropdown: {
    height: 50,
    width: 110,
    backgroundColor: 'blue',
    //borderColor: 'white',
    //borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingTop: 8,
    top: 20,
  },
  item: {
    width: 110,
    color: 'blue',
    padding: 2,
  },
  icon: {
    marginRight: 5,
  },
  //top label vvv
  label: {
    position: 'absolute',
    backgroundColor: 'blue',
    borderRadius: 8,
    left: 16,
    top: 16,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    width: 110,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  //arrow icon size vvv
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
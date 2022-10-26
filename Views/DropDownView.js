import React, { useState, useEffect } from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { mapManager } from '../ViewModels/MapManager';
import { settings } from '../Models/Settings';
import { Dropdown } from 'react-native-element-dropdown';

import * as Location from 'expo-location'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

const data = [
  { label: '1 km', value: '1000' },
  { label: '2 km', value: '2000' },
  { label: '3 km', value: '3000' },
  { label: '4 km', value: '4000' },
  { label: '5 km', value: '5000' },
];

const bgColor = 'rgba(30, 124, 220, 0.65)'

const DropdownComponent = () => {
  const [value, setValue] = useState(3000);
  const [isFocus, setIsFocus] = useState(false);
  const [fetchedStations, setfetchedStations] = useState([]);


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'white' }]}>
          Search Radius
        </Text>
      );
    }
    return null;
  };


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
[]
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();

    (async () => {

      const stations = await mapManager.initialize(value)
      setfetchedStations(stations)

    })();
  }, []);

  var text = 'Waiting...!';
  if (errorMsg) {
    text = errorMsg; 
  } else if (location) {
    text = location;
    mapManager.currentUser.lat = location.coords.latitude
    mapManager.currentUser.long = location.coords.longitude
  }
  return (
      <View>
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, !isFocus && {  
          borderBottomStartRadius: !isFocus ? 8 : 0,
          borderBottomEndRadius: !isFocus ? 8 : 0,
        }]}
        placeholderStyle={styles.selectedOption}
        selectedTextStyle={styles.selectedOption}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.itemContainer}
        itemContainerStyle={styles.item}
        itemTextStyle={styles.itemText}
        data={data}
      //search  search
        //maxHeight={300}
        labelField="label"
        valueField={!isFocus ? value/1000 + " km" : '...'}
        placeholder={!isFocus ? value/1000 + " km" : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
        // settings.RadiusConstant = value
          setValue(item.value);
          setIsFocus(false);
          mapManager.initialize(item.value);
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
      showsMyLocationButton={false}
      showsCompass={false}
      followsUserLocation={true}
      showsUserLocation={true}
      provider="google"
      >
      
      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={parseInt(value)} />
      
       {fetchedStations.map(n => (
        <Marker coordinate={{
          latitude: (n.lat),
          longitude: (n.long),
        }}
        key={n.key}
        >
          { <Image source={(n.logo)} style={{ width: settings.LogoWidth, height: settings.LogoHeight }} />}
          <Callout>
            <Text style={{width: 50, height: 15 }}>{n.name}</Text>
          </Callout>
        </Marker>
        )) }
      
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

//top label vvv
label: {
  position: 'absolute',
  backgroundColor: 'transparent',
  color: 'white',
  borderRadius: 8,
  left: 16,
  top: 16,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  width: 120,
  },

//dropdown button collapsed vvv
dropdown: {
height: 60,
width: 120,
backgroundColor: bgColor,
borderTopStartRadius: 8,
borderTopEndRadius: 8,
paddingHorizontal: 8,
paddingTop: 14,
top: 14,
color: 'white'
},

//container for items vvv
itemContainer:{
  borderWidth: 0,
  shadowColor: 'transparent',
  backgroundColor: bgColor,
  marginTop: -26, 
  borderBottomStartRadius: 8,
  borderBottomEndRadius: 8,
},

//item in list vvv
item: {
  backgroundColor: bgColor,
  marginHorizontal: 3,
  marginVertical: 1,
  borderRadius: 5,
  //shadowColor: 'black',
  //borderColor: 'black',
  //borderWidth: 1,
  maxHeight: 30,
  paddingTop: 0,
  //position: 'relative',
  //top: -13,
  //bottom: 5,
},

//item text in list vvv
itemText: {
  color: 'white',
  fontSize: 16,
  //backgroundColor: 'green',
  height: '100%',
},

//selected text before selecting vvv
selectedOption: {
fontSize: 16,
color: 'white',
},

//arrow icon vvv
iconStyle: {
width: 20,
height: 20,
tintColor: 'white',
},

inputSearchStyle: {
height: 40,
fontSize: 16,
},
});